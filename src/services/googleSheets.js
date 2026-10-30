const WEB_APP_URL = import.meta.env?.VITE_GOOGLE_SHEETS_WEB_APP_URL?.trim() || ''
export const createRecordId = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)

export function checkReceipt(url, requestId, timeout = 5000) {
  return new Promise((resolve) => {
    const callback = '__sheetReceipt_' + createRecordId().replaceAll('-', '_')
    const script = document.createElement('script')
    let timer
    const finish = (confirmed) => {
      clearTimeout(timer)
      script.remove()
      delete window[callback]
      resolve(confirmed)
    }
    window[callback] = (response) => finish(response?.ok === true && response?.requestId === requestId)
    const target = new URL(url)
    target.searchParams.set('action', 'receipt')
    target.searchParams.set('requestId', requestId)
    target.searchParams.set('callback', callback)
    script.src = target.toString()
    script.onerror = () => finish(false)
    timer = setTimeout(() => finish(false), timeout)
    document.head.appendChild(script)
  })
}

export async function sendToGoogleSheets(payload, { url = WEB_APP_URL, fetcher = fetch, receipt = checkReceipt } = {}) {
  if (!url) throw new Error('ยังไม่ได้ตั้งค่า URL สำหรับบันทึก Google Sheets')
  const requestId = payload.requestId || createRecordId()
  // Retry first checks the same receipt, so a lost response does not duplicate a row.
  if (await receipt(url, requestId)) return { confirmed: true, requestId }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    await fetcher(url, {
      method: 'POST', mode: 'no-cors', credentials: 'omit', signal: controller.signal,
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({ ...payload, requestId }),
    })
  } catch { throw new Error('ส่งผลไม่สำเร็จ กรุณาตรวจสอบเครือข่ายแล้วลองอีกครั้ง') }
  finally { clearTimeout(timer) }
  // An opaque fetch response alone never counts as a confirmed save.
  const confirmed = await receipt(url, requestId)
  return { confirmed, requestId }
}
export const saveQuizRecord = (record) => sendToGoogleSheets({ ...record, action: 'saveQuizRecord' })
