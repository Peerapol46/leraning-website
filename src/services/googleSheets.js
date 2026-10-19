const WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL?.trim() || ''

async function sendToGoogleSheets(payload) {
  if (!WEB_APP_URL) {
    throw new Error('ยังไม่ได้ตั้งค่า URL สำหรับเชื่อมต่อ Google Sheets')
  }

  try {
    // text/plain keeps the request simple so the Apps Script endpoint does not
    // need to answer a browser CORS preflight. Apps Script responses are opaque.
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'include',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('ส่งข้อมูลไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตและ URL ของ Google Sheets')
  }

  return { submitted: true }
}

export function saveQuizRecord({ testType, student, topic, score, maxScore }) {
  return sendToGoogleSheets({ action: 'saveQuizRecord', testType, student, topic, score, maxScore })
}
