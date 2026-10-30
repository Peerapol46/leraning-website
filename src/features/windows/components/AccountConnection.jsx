import { useState } from 'react'
import { EDITION_TASKS } from '../data/editionTasks'

export default function AccountConnection({ edition, onContinue }) {
  const home = edition === 'Windows 10 Home'
  const school = edition === 'Windows 10 Education'
  const [choice, setChoice] = useState(home ? 'local' : '')
  const [error, setError] = useState('')
  const next = () => {
    if (!choice) { setError('กรุณาเลือกวิธีตั้งค่าบัญชีก่อนดำเนินการต่อ'); return }
    onContinue(choice)
  }
  return <div className="manual-connect-screen">
    <h2>{home ? 'Set up for personal use' : school ? 'Set up for your school' : 'Choose how you’ll connect'}</h2>
    <p className="manual-connect-intro">{EDITION_TASKS[edition].title}</p>
    <p className="manual-connect-intro">{home ? 'ตั้งค่าคอมพิวเตอร์สำหรับใช้งานส่วนตัวหรือครอบครัว' : school ? 'เตรียมบัญชีสำหรับเครื่องในสถานศึกษา' : 'เลือกการใช้งานส่วนตัวหรือเตรียมเครื่องสำหรับองค์กร'}</p>
    <div className="manual-connect-options" role="group" aria-label="วิธีตั้งค่าบัญชี">
      <button className={choice === 'local' ? 'selected' : ''} aria-pressed={choice === 'local'} onClick={() => { setChoice('local'); setError('') }}>บัญชีภายในเครื่อง — Local account</button>
      {!home && <button className={choice === 'organization' ? 'selected' : ''} aria-pressed={choice === 'organization'} onClick={() => { setChoice('organization'); setError('') }}>{school ? 'เตรียมเชื่อมต่อสถานศึกษา' : 'เตรียมเข้าร่วมองค์กร'} — Join a domain later</button>}
    </div>
    <p className="manual-connect-description">{home ? 'บทเรียนนี้ใช้บัญชีภายในเครื่อง โดย Home ไม่มีตัวเลือกเข้าร่วมโดเมนหรือ Microsoft Entra ID' : 'เส้นทางนี้สร้างบัญชีภายในเครื่องก่อน แล้วฝึกตรวจสอบการเชื่อมต่อองค์กรหลังติดตั้ง ไม่ใช่การเข้าร่วมโดเมนจริง'}</p>
    <p className="manual-connect-description">แบบฝึกจำลอง Windows 10 แบบคลาสสิก ตัวเลือกจริงอาจต่างกันตามเวอร์ชันและสื่อที่ใช้ติดตั้ง</p>
    {error && <p className="connection-error" role="alert">{error}</p>}
    <button className="manual-connect-continue" onClick={next}>Continue</button>
  </div>
}
