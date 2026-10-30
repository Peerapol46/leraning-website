import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

function server() {
  const sheets = new Map()
  const spreadsheet = { getId: () => 'test-sheet', getSheetByName: (name) => sheets.get(name), insertSheet(name) {
    const rows = []
    const sheet = { rows, getLastRow: () => rows.length, appendRow: (row) => rows.push(row), getRange(row, column) { return {
      setValues(values) { rows[row - 1] = values[0] },
      createTextFinder(value) { return { matchEntireCell() { return this }, findNext() { return rows.slice(row - 1).some((entry) => entry[column - 1] === value) ? {} : null } } },
    } } }
    sheets.set(name, sheet); return sheet
  } }
  const properties = new Map()
  const context = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => spreadsheet, openById: () => spreadsheet },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (key) => properties.get(key), setProperty: (key, value) => properties.set(key, value) }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }) },
    ContentService: { MimeType: { JSON: 'json', JAVASCRIPT: 'js' }, createTextOutput: (body) => ({ body, setMimeType() { return this } }) },
    Utilities: { getUuid: () => 'generated-request-id' },
  })
  vm.runInContext(fs.readFileSync(new URL('./Code.gs', import.meta.url), 'utf8'), context)
  context.setupSheets()
  return { context, sheets, post: (request) => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(request) } }).body) }
}
const student = { name: 'Test learner', number: '1', room: 'DBT 2.1' }
test('quiz records are saved once, and receipt exposes only ID and status', () => {
  const { post, context, sheets } = server()
  const record = { requestId: 'quiz-test-001', action: 'saveQuizRecord', student, testType: 'pretest', topic: 'windows', score: 8, maxScore: 10 }
  assert.equal(post(record).ok, true)
  assert.equal(post(record).ok, true)
  assert.equal([...sheets.values()].filter((sheet) => sheet.rows.length === 2).length, 1)
  const response = context.doGet({ parameter: { requestId: record.requestId, callback: '__sheetReceipt_test' } }).body
  assert.match(response, /"ok":true/)
  assert.ok(!response.includes(student.name))
})
test('Windows practice scores are rejected and no practice sheet is created', () => {
  const { post, sheets } = server()
  assert.equal(sheets.size, 2)
  assert.equal(post({ requestId: 'windows-test-001', action: 'saveWindowsRecord', student, edition: 'Windows 10 Pro', mode: 'practice', score: 95, mistakes: 1, elapsedSeconds: 50 }).ok, false)
  assert.equal(sheets.size, 2)
  assert.ok([...sheets.values()].every((sheet) => sheet.rows.length === 1))
})
