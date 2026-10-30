import { useEffect, useRef, useState } from 'react'
import SystemVerification from './SystemVerification'
import { SIMULATED_PC } from '../data/editions'
import { formatSize } from '../utils/formatters'
import { partitionTypeLabel } from '../utils/partitionPresentation'

export default function WindowsDesktop({ attemptId, edition, accountName, partitions, connection, result, onVerify }) {
  const [panel, setPanel] = useState(null)
  const closeRef = useRef(null)
  const openerRef = useRef(null)
  const open = (view, event) => { openerRef.current = event.currentTarget; setPanel(view) }
  const close = () => { setPanel(null); openerRef.current?.focus() }

  useEffect(() => {
    if (!panel) return
    closeRef.current?.focus()
    const handleKey = (event) => { if (event.key === 'Escape') { setPanel(null); openerRef.current?.focus() } }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [panel])

  const diskSize = partitions.filter((partition) => partition.drive === 0).reduce((total, partition) => total + partition.total, 0)
  const specs = [
    ['Windows edition', edition],
    ['Processor', SIMULATED_PC.processor],
    ['Installed memory (RAM)', SIMULATED_PC.ram],
    ['System type', SIMULATED_PC.systemType],
    ['Computer name', SIMULATED_PC.name],
    ['User name', accountName || 'Computer'],
    ['Organization connection', connection === 'organization' ? 'เตรียมบัญชีแล้ว — ยังไม่ได้เข้าร่วมองค์กรจริง' : 'Local account'],
    ['Windows activation', 'ระบบจำลอง — ไม่ได้ตรวจสอบหรือเปิดใช้งานสิทธิ์จริง'],
    ['Disk 0', `${formatSize(diskSize)} · SATA SSD`],
  ]

  return <div className="manual-desktop-screen lab-desktop">
    <div className="lab-desktop-icons">
      <button onClick={(event) => open('system', event)}><span aria-hidden="true">▣</span>This PC</button>
      <button onClick={(event) => open('control', event)}><span aria-hidden="true">⚙</span>Control Panel</button>
    </div>
    <div className="manual-desktop-welcome"><strong>{edition}</strong><p>Setup complete{accountName ? ` · ${accountName}` : ''}</p><small>เปิด Control Panel เพื่อเช็กสเปกและรุ่น Windows</small></div>
    {panel && <section className="lab-control-window" role="dialog" aria-labelledby="lab-control-title">
      <header><h2 id="lab-control-title">{panel === 'system' ? 'System' : 'Control Panel'}</h2><button ref={closeRef} onClick={close} aria-label="ปิด Control Panel">×</button></header>
      <div className="lab-control-content">
        <nav aria-label="Control Panel breadcrumb"><button onClick={() => setPanel('control')}>Control Panel</button>{panel === 'system' && <span> › System and Security › System</span>}</nav>
        {panel === 'control' ? <>
          <h3>Adjust your computer’s settings</h3>
          <button className="lab-system-category" onClick={() => setPanel('system')}><span aria-hidden="true">▣</span><span><strong>System and Security</strong><small>System — ดูรุ่น Windows และสเปกคอมพิวเตอร์</small></span><span aria-hidden="true">›</span></button>
          <p>เลือก System เพื่อดูข้อมูลระบบที่ติดตั้งเสร็จแล้ว</p>
        </> : <>
          <h3>View basic information about your computer</h3>
          <div className="lab-system-edition"><span className="lab-windows-symbol" aria-hidden="true"><i /><i /><i /><i /></span><strong>{edition}</strong></div>
          <dl className="lab-system-specs">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p>พาร์ติชันในบทเรียนเป็นแบบฝึกพื้นฐาน โครงสร้างจริงขึ้นอยู่กับโหมดบูตและสื่อการติดตั้ง</p>
          <SystemVerification attemptId={attemptId} edition={edition} accountName={accountName} result={result} onVerify={onVerify} />
          <h4>Disk partitions</h4><ul className="lab-system-partitions">{partitions.map((partition) => <li key={partition.id}>{partition.name} · {formatSize(partition.total)}{partitionTypeLabel(partition) ? ` · ${partitionTypeLabel(partition)}` : ''}</li>)}</ul>
        </>}
        <p className="lab-system-note">ข้อมูลสเปกเครื่องจำลองในบทเรียน ไม่ใช่สเปกของโทรศัพท์หรือคอมพิวเตอร์ที่กำลังเปิดเว็บ</p>
      </div>
    </section>}
    <div className="lab-desktop-bar"><span aria-hidden="true">⊞</span><button onClick={(event) => open('control', event)}>Control Panel</button><span>{edition}</span></div>
  </div>
}
