const SHEET_HEADERS = {
  'แบบทดสอบก่อนเรียน': ['วันที่บันทึก', 'ชื่อ', 'เลขที่', 'ห้อง', 'บทเรียน', 'คะแนนที่ได้', 'คะแนนเต็ม'],
  'แบบทดสอบหลังเรียน': ['วันที่บันทึก', 'ชื่อ', 'เลขที่', 'ห้อง', 'บทเรียน', 'คะแนนที่ได้', 'คะแนนเต็ม'],
}

function setupSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  if (!spreadsheet) throw new Error('กรุณาเปิด Apps Script จาก Google Sheet ที่ต้องการใช้')
  PropertiesService.getScriptProperties().setProperty('TARGET_SPREADSHEET_ID', spreadsheet.getId())
  Object.keys(SHEET_HEADERS).forEach((name) => {
    const sheet = getSheet_(name, spreadsheet)
    sheet.getRange(1, 1, 1, SHEET_HEADERS[name].length).setValues([SHEET_HEADERS[name]])
  })
}

function doPost(event) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(10000)
    const request = JSON.parse(event?.postData?.contents || '{}')
    const result = saveQuizRecord_(request)
    return jsonResponse_({ ok: true, ...result })
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error?.message || error) })
  } finally {
    if (lock.hasLock()) lock.releaseLock()
  }
}

function saveQuizRecord_(request) {
  const sheetName = request.testType === 'pretest'
    ? 'แบบทดสอบก่อนเรียน'
    : request.testType === 'posttest' ? 'แบบทดสอบหลังเรียน' : ''
  if (!sheetName) throw new Error('ไม่รู้จักประเภทแบบทดสอบนี้')

  const student = validateQuizStudent_(request.student)
  const score = Number(request.score)
  const maxScore = Number(request.maxScore)
  if (!Number.isInteger(score) || !Number.isInteger(maxScore) || score < 0 || maxScore < 1 || score > maxScore) {
    throw new Error('คะแนนแบบทดสอบไม่ถูกต้อง')
  }
  const topic = request.topic === 'assembly' ? 'ประกอบคอม' : request.topic === 'windows' ? 'ลง Windows' : ''
  if (!topic) throw new Error('ไม่รู้จักบทเรียนนี้')

  getSheet_(sheetName).appendRow([
    new Date(), safeCell_(student.name), safeCell_(student.number),
    safeCell_(student.room), topic, score, maxScore,
  ])
  return { action: 'saveQuizRecord', sheet: sheetName }
}

function validateQuizStudent_(student) {
  const value = {
    name: String(student?.name || '').trim(),
    number: String(student?.number || '').trim(),
    room: String(student?.room || student?.department || '').trim(),
  }
  if (Object.values(value).some((field) => !field)) throw new Error('กรอกข้อมูลผู้ทำแบบทดสอบให้ครบทุกช่อง')
  return value
}

function getSheet_(name, selectedSpreadsheet) {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('TARGET_SPREADSHEET_ID')
  const spreadsheet = selectedSpreadsheet || (spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : null)
  if (!spreadsheet) throw new Error('กรุณารัน setupSheets จาก Google Sheet ที่ต้องการใช้ก่อน')
  let sheet = spreadsheet.getSheetByName(name)
  if (!sheet) sheet = spreadsheet.insertSheet(name)
  if (sheet.getLastRow() === 0) sheet.appendRow(SHEET_HEADERS[name])
  return sheet
}

function safeCell_(value) {
  const text = String(value ?? '').trim()
  return /^[=+\-@]/.test(text) ? `'${text}` : text
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}
