import { useState } from 'react'
import { EDITION_OPTIONS } from '../data/editions'
import { SCENARIOS } from '../data/scenarios'

export default function EditionSelector({ onSelect }) {
  const [mode, setMode] = useState('learning')
  return <main className="learning-page edition-selection-page">
    <section className="edition-selection-heading">
      <span className="eyebrow">ฝึกติดตั้งระบบปฏิบัติการ</span>
      <h1>เลือกภารกิจติดตั้ง Windows 10</h1>
      <p>อ่านความต้องการของผู้ใช้ แล้วเลือกรุ่นที่เหมาะสมใน Windows Setup</p>
      <div className="mode-row"><button className={'btn-mode ' + (mode === 'learning' ? 'active-learn' : '')} onClick={() => setMode('learning')}>เรียนรู้พร้อมคำแนะนำ</button><button className={'btn-mode ' + (mode === 'practice' ? 'active-prac' : '')} onClick={() => setMode('practice')}>ทดสอบจากสถานการณ์</button></div>
    </section>
    <div className="edition-choice-grid">
      {EDITION_OPTIONS.map((edition, index) => <button key={edition.name} className="edition-choice" onClick={() => onSelect(edition.name, mode)}>
        <span className="edition-choice-number">0{index + 1}</span>
        <h2>{mode === 'learning' ? edition.name : SCENARIOS[edition.name].title}</h2>
        {mode === 'learning' && <strong>{edition.audience}</strong>}
        <p>{SCENARIOS[edition.name].brief}</p><span className="edition-choice-action">เริ่มภารกิจ →</span>
      </button>)}
    </div>
    <p className="edition-selection-note">บทเรียนจำลองหน้าตั้งค่า Windows 10 แบบคลาสสิก มีการลดขั้นตอนเพื่อการฝึก ไม่เชื่อมต่อบัญชีหรือเปิดใช้งาน Windows จริง</p>
    <p className="edition-selection-note">Windows 10 รุ่นทั่วไปสิ้นสุดการสนับสนุนปกติเมื่อ 14 ตุลาคม 2025 ส่วน LTSC และ ESU มีเงื่อนไขแยกต่างหาก</p>
  </main>
}
