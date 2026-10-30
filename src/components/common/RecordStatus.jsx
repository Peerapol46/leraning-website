export default function RecordStatus({ state, error }) {
  return <div className="record-status" role="status">
    {state === 'saving' && <p>กำลังส่งผลและรอการยืนยันจาก Google Sheets…</p>}
    {state === 'confirmed' && <p>บันทึกผลลง Google Sheets สำเร็จแล้ว</p>}
    {state === 'unconfirmed' && <p>ส่งคะแนนสำเร็จ</p>}
    {state === 'error' && <p>{error || 'ส่งผลไม่สำเร็จ'}</p>}
  </div>
}
