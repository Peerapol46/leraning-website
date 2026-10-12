import React, { useEffect, useState } from 'react'

const PRE_QUESTIONS = [
  { q: 'อุปกรณ์ใดเป็นหน่วยประมวลผลหลักของคอมพิวเตอร์?', choices: ['RAM', 'CPU', 'SSD', 'PSU'], answer: 1, why: 'CPU ทำหน้าที่ประมวลผลคำสั่งหลักของระบบ' },
  { q: 'ควรติดตั้ง CPU ลงบนอุปกรณ์ใด?', choices: ['เมนบอร์ด', 'เคส', 'พาวเวอร์ซัพพลาย', 'ฮาร์ดดิสก์'], answer: 0, why: 'CPU ติดตั้งบนซ็อกเก็ตของเมนบอร์ด' },
  { q: 'อุปกรณ์ใดใช้เก็บข้อมูลแม้ปิดเครื่อง?', choices: ['RAM', 'CPU', 'SSD', 'พัดลม'], answer: 2, why: 'SSD เป็นหน่วยเก็บข้อมูลถาวร' },
  { q: 'PSU มีหน้าที่ใด?', choices: ['แสดงภาพ', 'จ่ายไฟให้ชิ้นส่วน', 'ประมวลผล', 'เก็บไฟล์'], answer: 1, why: 'PSU แปลงและจ่ายพลังงานไฟฟ้าให้กับอุปกรณ์ในเครื่อง' },
  { q: 'ก่อนทำงานภายในเคสควรทำสิ่งใดก่อน?', choices: ['เปิดเครื่องทิ้งไว้', 'ถอดปลั๊กและป้องกันไฟฟ้าสถิต', 'ถอด CPU', 'ล้างเมนบอร์ด'], answer: 1, why: 'ถอดปลั๊กและป้องกันไฟฟ้าสถิตเพื่อลดความเสี่ยงต่ออุปกรณ์' },
]
const POST_QUESTIONS = [
  { q: 'RAM มีบทบาทหลักอย่างไร?', choices: ['เก็บข้อมูลชั่วคราวขณะทำงาน', 'จ่ายไฟให้เครื่อง', 'ระบายความร้อน', 'แสดงผลภาพ'], answer: 0, why: 'RAM เก็บข้อมูลชั่วคราวที่ระบบกำลังใช้งาน' },
  { q: 'สายไฟหลักที่จ่ายพลังงานให้เมนบอร์ดโดยทั่วไปคือข้อใด?', choices: ['SATA data', '24-pin ATX', 'HDMI', 'USB'], answer: 1, why: 'ขั้วต่อ ATX 24-pin จ่ายไฟหลักให้เมนบอร์ด' },
  { q: 'ควรทาซิลิโคนระบายความร้อนตรงไหน?', choices: ['ใต้เมนบอร์ด', 'ระหว่าง CPU กับชุดระบายความร้อน', 'บน RAM', 'ในช่อง SSD'], answer: 1, why: 'ซิลิโคนช่วยถ่ายเทความร้อนระหว่าง CPU และฮีตซิงก์' },
  { q: 'หลังประกอบเสร็จ ขั้นตอนตรวจสอบเบื้องต้นคืออะไร?', choices: ['ตรวจการเชื่อมต่อและเปิดทดสอบ POST/BIOS', 'ถอด RAM ออก', 'ฟอร์แมต SSD ทันที', 'ปิดช่องลม'], answer: 0, why: 'ตรวจสายและชิ้นส่วนก่อนเปิดทดสอบ POST หรือ BIOS' },
  { q: 'ระบบปฏิบัติการควรติดตั้งลงที่ใด?', choices: ['SSD หรือ HDD', 'พัดลมเคส', 'แรม', 'เมนบอร์ดโดยตรง'], answer: 0, why: 'ระบบปฏิบัติการติดตั้งบนอุปกรณ์จัดเก็บข้อมูล เช่น SSD' },
]

const HOME_CARDS = [
  { id: 'assembly', icon: '🖥️', number: '01', title: 'ฝึกประกอบคอม', description: 'เรียนรู้ตำแหน่งอุปกรณ์และฝึกประกอบคอมพิวเตอร์ในห้อง 3 มิติ', action: 'เริ่มประกอบ', theme: 'assembly-card' },
  { id: 'windows', icon: '💿', number: '02', title: 'ฝึกลง Windows', description: 'ฝึกตามขั้นตอนตั้งแต่เตรียม USB จนถึงการตั้งค่า Windows ครั้งแรก', action: 'เริ่มฝึกติดตั้ง', theme: 'windows-card' },
  { id: 'pretest', icon: '📝', number: '03', title: 'ก่อนเรียน', description: 'สำรวจความรู้พื้นฐานก่อนเริ่มบทเรียน ใช้เวลาไม่นาน', action: 'ทำแบบทดสอบ', theme: 'pretest-card' },
  { id: 'posttest', icon: '🎓', number: '04', title: 'หลังเรียน', description: 'ทบทวนและวัดความเข้าใจหลังเรียนจบ', action: 'ทำแบบทดสอบ', theme: 'posttest-card' },
]

export function HomePage({ onNavigate }) {
  return <main className="home-page">
    <section className="home-hero">
      <div className="home-hero-copy"><span className="eyebrow">บทเรียนคอมพิวเตอร์แบบลงมือทำ</span><h1>เรียนรู้คอมพิวเตอร์<br /><span>ทีละขั้นตอน</span></h1><p>เริ่มจากทำแบบทดสอบก่อนเรียน ฝึกประกอบคอมและติดตั้ง Windows แล้วกลับมาทดสอบความเข้าใจอีกครั้ง</p><button className="learning-btn" onClick={() => onNavigate('pretest')}>เริ่มจากแบบทดสอบก่อนเรียน →</button></div>
      <div className="home-hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-device">🖥️</div><span className="floating-chip chip-cpu">CPU</span><span className="floating-chip chip-ram">RAM</span><span className="floating-chip chip-ssd">SSD</span></div>
    </section>
    <section className="home-courses"><div className="home-section-title"><div><span className="eyebrow">เลือกบทเรียน</span><h2>เริ่มฝึกได้เลย</h2></div><span className="course-count">4 บทเรียน</span></div><div className="course-grid">{HOME_CARDS.map((card) => <button key={card.id} className={`course-card ${card.theme}`} onClick={() => onNavigate(card.id)}><div className="course-art"><span className="course-number">{card.number}</span><span className="course-illustration" aria-hidden="true">{card.icon}</span><span className="course-art-glow" /></div><div className="course-content"><h3>{card.title}</h3><p>{card.description}</p><span className="course-action">{card.action} <span aria-hidden="true">→</span></span></div></button>)}</div></section>
    <footer className="home-footer"><span>ประกอบคอมพิวเตอร์ · เรียนรู้ด้วยการลงมือทำ</span><span>เลือกบทเรียนเพื่อเริ่มต้น</span></footer>
  </main>
}

export function LearningPage({ type }) {
  const questions = type === 'pretest' ? PRE_QUESTIONS : POST_QUESTIONS
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const isPre = type === 'pretest'
  const restart = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false) }
  const answer = (choice) => {
    if (selected !== null) return
    setSelected(choice)
    if (choice === questions[index].answer) setScore((value) => value + 1)
  }
  const next = () => {
    if (index === questions.length - 1) setFinished(true)
    else { setIndex((value) => value + 1); setSelected(null) }
  }

  return <main className="learning-page">
    <section className="learning-hero">
      <span className="eyebrow">{isPre ? 'เริ่มต้นการเรียนรู้' : 'ทบทวนสิ่งที่เรียนรู้'}</span>
      <h1>{isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}</h1>
      <p>{isPre ? 'ลองตอบคำถามเพื่อสำรวจความรู้พื้นฐานก่อนเริ่มประกอบคอมพิวเตอร์' : 'ทดสอบความเข้าใจหลังเรียนรู้การประกอบคอมพิวเตอร์'}</p>
    </section>
    <section className="quiz-card" aria-live="polite">
      {finished ? <div className="quiz-result"><div className="result-icon">{score >= 4 ? '🏆' : '✨'}</div><span className="eyebrow">ทำแบบทดสอบเสร็จแล้ว</span><h2>คุณได้ {score} / {questions.length} คะแนน</h2><p>{score >= 4 ? 'ยอดเยี่ยม! คุณเข้าใจเนื้อหาได้ดีมาก' : 'ทำได้ดี ลองทบทวนเนื้อหาแล้วทำอีกครั้งได้เลย'}</p><button className="learning-btn" onClick={restart}>ทำแบบทดสอบอีกครั้ง</button></div> : <>
        <div className="quiz-progress-row"><span>ข้อ {index + 1} จาก {questions.length}</span><span>คะแนน {score}</span></div>
        <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
        <h2 className="question-title">{questions[index].q}</h2>
        <div className="answer-list">{questions[index].choices.map((choice, i) => <button key={choice} className={`answer-option ${selected !== null && i === questions[index].answer ? 'correct' : ''} ${selected === i && i !== questions[index].answer ? 'incorrect' : ''}`} onClick={() => answer(i)} disabled={selected !== null}><span className="answer-letter">{String.fromCharCode(65 + i)}</span>{choice}<span className="answer-mark">{selected !== null && i === questions[index].answer ? '✓' : selected === i ? '×' : ''}</span></button>)}</div>
        {selected !== null && <div className={`quiz-feedback ${selected === questions[index].answer ? 'good' : 'try-again'}`}><strong>{selected === questions[index].answer ? 'ตอบถูกแล้ว!' : 'ยังไม่ถูก ลองจำคำตอบที่ถูกไว้นะ'}</strong><p>{questions[index].why}</p></div>}
        <div className="quiz-footer"><span>เลือกคำตอบที่ถูกต้องเพื่อไปต่อ</span><button className="learning-btn" onClick={next} disabled={selected === null}>{index === questions.length - 1 ? 'ดูผลคะแนน' : 'ข้อต่อไป →'}</button></div>
      </>}
    </section>
    <p className="learning-note">แบบทดสอบนี้ใช้เพื่อการเรียนรู้ คะแนนจะแสดงบนอุปกรณ์นี้เท่านั้น</p>
  </main>
}

const SIM_STEPS = ['บูตจาก USB', 'ภาษาและคีย์บอร์ด', 'เริ่มติดตั้ง', 'Product Key', 'เลือกรุ่น Windows', 'ยอมรับสิทธิ์ใช้งาน', 'ประเภทการติดตั้ง', 'เลือกพาร์ทิชัน', 'ติดตั้งไฟล์', 'ภูมิภาคและคีย์บอร์ด', 'ตั้งค่าบัญชี', 'เดสก์ท็อป']
const INITIAL_PARTITIONS = [
  { id: 'unallocated-0', name: 'Drive 0 Unallocated Space', total: 32768, free: 32768, type: 'Unallocated', drive: 0 },
  { id: 'partition-4', name: 'Drive 1 Partition 1: Data', total: 512000, free: 460800, type: 'Primary', drive: 1 },
]

const formatSize = (mb) => mb >= 1024 ? `${(mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1)} GB` : `${mb} MB`

export function WindowsPractice() {
  const [stage, setStage] = useState(0)
  const [language, setLanguage] = useState('ไทย')
  const [keyboard, setKeyboard] = useState('US')
  const [edition, setEdition] = useState('Windows 10 Pro')
  const [disk, setDisk] = useState('unallocated-0')
  const [accepted, setAccepted] = useState(false)
  const [confirmDisk, setConfirmDisk] = useState(false)
  const [progress, setProgress] = useState(0)
  const [accountName, setAccountName] = useState('Student')
  const [region, setRegion] = useState('ไทย')
  const [userType, setUserType] = useState('local')
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [error, setError] = useState('')
  const [bootChoice, setBootChoice] = useState('usb')
  const [partitions, setPartitions] = useState(INITIAL_PARTITIONS)
  const [partitionAction, setPartitionAction] = useState(null)
  const [partitionSize, setPartitionSize] = useState(51200)
  const [partitionPrompt, setPartitionPrompt] = useState(null)
  const [formatFileSystem, setFormatFileSystem] = useState('NTFS')
  const [volumeLabel, setVolumeLabel] = useState('Windows')
  const [showDriverDialog, setShowDriverDialog] = useState(false)
  const [driverLoaded, setDriverLoaded] = useState(false)
  const [installType, setInstallType] = useState('custom')
  const [mistakes, setMistakes] = useState(0)

  const reportMistake = (message) => {
    setMistakes((count) => count + 1)
    setError(message)
  }

  useEffect(() => {
    if (stage !== 8 || progress >= 100) return undefined
    const timer = window.setTimeout(() => setProgress((value) => Math.min(value + 4, 100)), 180)
    return () => window.clearTimeout(timer)
  }, [stage, progress])

  useEffect(() => {
    if (stage === 8 && progress === 100) {
      const timer = window.setTimeout(() => setStage(9), 900)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [stage, progress])

  const goNext = () => {
    setError('')
    if (stage === 0 && bootChoice !== 'usb') { reportMistake(bootChoice === 'bios' ? 'ยังอยู่ใน BIOS Setup — กลับเมนู Boot แล้วเลือก UEFI: KingstonDT USB ก่อนกด Enter' : 'ยังไม่ได้เลือกสื่อบูต — เลือก UEFI: KingstonDT USB แล้วกด Enter'); return }
    if (stage === 5 && !accepted) { reportMistake('ยังไม่ได้ยอมรับเงื่อนไข — ทำเครื่องหมาย “ฉันยอมรับเงื่อนไขสิทธิ์การใช้งาน” ก่อนกดถัดไป'); return }
    if (stage === 6 && installType !== 'custom') { reportMistake('เลือก Upgrade ไม่ได้เมื่อบูตจาก USB — เลือก “กำหนดเอง: ติดตั้ง Windows เท่านั้น” เพื่อไปหน้าพาร์ทิชัน'); return }
    if (stage === 7 && (partitionAction || partitionPrompt || showDriverDialog)) { reportMistake('ยังมีหน้าต่างจัดการดิสก์เปิดอยู่ — ยืนยันหรือยกเลิกหน้าต่างก่อนดำเนินการต่อ'); return }
    if (stage === 7 && !confirmDisk) { reportMistake('ยังไม่ได้ยืนยันความเสี่ยงของดิสก์ — ตรวจชื่อ Disk 0 และทำเครื่องหมายยืนยันก่อนติดตั้ง'); return }
    if (stage === 7 && !partitions.some((partition) => partition.id === disk && partition.drive === 0 && partition.type === 'Primary')) { reportMistake('เลือกไดรฟ์ไม่ถูกต้อง — คู่มือนี้ให้ติดตั้งบน Disk 0 Partition หลักเท่านั้น อย่าเลือก Disk 1 ซึ่งเก็บข้อมูล'); return }
    if (stage === 8) return
    setStage((value) => Math.min(value + 1, 11))
    if (stage === 7) setProgress(0)
  }
  const goBack = () => { setError(''); setStage((value) => Math.max(value - 1, 0)) }
  const reset = () => { setStage(0); setProgress(0); setAccepted(false); setConfirmDisk(false); setError(''); setMistakes(0); setInstallType('custom'); setShowKeyboard(false); setBootChoice('usb'); setPartitions(INITIAL_PARTITIONS); setDisk('unallocated-0'); setPartitionAction(null); setPartitionPrompt(null); setShowDriverDialog(false); setDriverLoaded(false) }

  const updatePartition = (id, updates) => setPartitions((current) => current.map((partition) => partition.id === id ? { ...partition, ...updates } : partition))
  const adjacentUnallocated = (selected) => {
    if (!selected || selected.type === 'Unallocated') return selected
    const index = partitions.findIndex((partition) => partition.id === selected.id)
    return [partitions[index - 1], partitions[index + 1]].find((partition) => partition?.drive === selected.drive && partition.type === 'Unallocated')
  }
  const selectedPartition = partitions.find((partition) => partition.id === disk)
  const selectedFreeSpace = adjacentUnallocated(selectedPartition)
  const beginPartitionAction = (action) => {
    setError('')
    const selected = partitions.find((partition) => partition.id === disk)
    if (!selected || (action === 'extend' && selected.type !== 'Primary') || (action === 'new' && !['Primary', 'Unallocated'].includes(selected.type))) { reportMistake(action === 'new' ? 'สร้างพาร์ทิชันไม่ได้ — เลือก Unallocated Space หรือพาร์ทิชันหลักที่มีพื้นที่ว่างติดกัน' : 'ขยายได้เฉพาะพาร์ทิชัน Primary ที่ติดกับ Unallocated Space'); return }
    const freeSpace = adjacentUnallocated(selected)
    if (!freeSpace || freeSpace.total <= 0) { reportMistake('ไม่มี Unallocated Space ติดกับพาร์ทิชันที่เลือก — Windows ขยายหรือแบ่งพื้นที่ข้ามพาร์ทิชันอื่นไม่ได้'); return }
    setPartitionSize(Math.min(action === 'new' ? freeSpace.total : 16384, freeSpace.total))
    setPartitionAction(action)
  }
  const applyPartitionAction = () => {
    const selected = partitions.find((partition) => partition.id === disk)
    const freeSpace = adjacentUnallocated(selected)
    if (!selected || !freeSpace || !Number.isInteger(Number(partitionSize)) || Number(partitionSize) < 1 || Number(partitionSize) > freeSpace.total) {
      reportMistake(`ขนาดพาร์ทิชันไม่ถูกต้อง — ใส่จำนวนเต็มระหว่าง 1 ถึง ${freeSpace?.total ?? 0} MB`)
      return
    }
    const size = Number(partitionSize)
    if (partitionAction === 'new') {
      if (selected.type === 'Unallocated' && size < 1024) { reportMistake('พาร์ทิชัน Windows ต้องมีพื้นที่อย่างน้อย 1 GB ในแบบฝึกนี้'); return }
      const number = partitions.filter((partition) => partition.drive === selected.drive && partition.type !== 'Unallocated').length + 1
      const newPartition = { id: `partition-new-${Date.now()}`, name: `Drive ${selected.drive} Partition ${number}: Primary`, total: size, free: size, type: 'Primary', drive: selected.drive }
      setPartitions((current) => {
        const space = current.find((partition) => partition.id === freeSpace.id)
        const result = current.filter((partition) => partition.id !== freeSpace.id)
        const insertionIndex = current.findIndex((partition) => partition.id === freeSpace.id)
        result.splice(insertionIndex, 0, newPartition)
        if (space.total > size) result.splice(insertionIndex + 1, 0, { ...space, total: space.total - size, free: space.free - size })
        return result
      })
      setDisk(newPartition.id)
      setConfirmDisk(false)
      setError(`สร้าง ${newPartition.name} ขนาด ${formatSize(size)} แล้ว`)
    } else {
      updatePartition(selected.id, { total: selected.total + size, free: selected.free + size })
      if (freeSpace.total === size) setPartitions((current) => current.filter((partition) => partition.id !== freeSpace.id))
      else updatePartition(freeSpace.id, { total: freeSpace.total - size, free: freeSpace.free - size })
      setError(`ขยาย ${selected.name} เพิ่ม ${formatSize(size)} แล้ว`)
      setConfirmDisk(false)
    }
    setPartitionAction(null)
  }
  const deletePartition = () => {
    const selected = partitions.find((partition) => partition.id === disk)
    if (!selected || selected.type === 'Unallocated') { reportMistake('เลือกพาร์ทิชันที่มีอยู่ก่อน — Unallocated Space ไม่มีพาร์ทิชันให้ลบ'); return }
    setPartitionPrompt({ type: 'delete', partition: selected })
  }
  const confirmDeletePartition = () => {
    const selected = partitionPrompt?.partition
    if (!selected) return
    setPartitions((current) => {
      let result = current.map((partition) => partition.id === selected.id ? { ...partition, name: `Drive ${partition.drive} Unallocated Space`, type: 'Unallocated', free: partition.total } : partition)
      for (let i = result.length - 2; i >= 0; i -= 1) {
        if (result[i].drive === result[i + 1].drive && result[i].type === 'Unallocated' && result[i + 1].type === 'Unallocated') {
          result[i] = { ...result[i], total: result[i].total + result[i + 1].total, free: result[i].free + result[i + 1].free }
          result.splice(i + 1, 1)
        }
      }
      return result
    })
    setDisk(selected.id)
    setConfirmDisk(false)
    setPartitionPrompt(null)
    setError(`ลบ ${selected.name} แล้ว พื้นที่ถูกคืนเป็น Unallocated Space`)
  }
  const formatPartition = () => {
    const selected = partitions.find((partition) => partition.id === disk)
    if (!selected || selected.type === 'Unallocated') { reportMistake('Format ใช้กับพาร์ทิชันที่สร้างแล้วเท่านั้น — เลือกพาร์ทิชันที่ต้องการฟอร์แมต'); return }
    setFormatFileSystem(selected.fileSystem || 'NTFS')
    setVolumeLabel(selected.label || (selected.drive === 0 ? 'Windows' : 'Data'))
    setPartitionPrompt({ type: 'format', partition: selected })
  }
  const confirmFormatPartition = () => {
    const selected = partitionPrompt?.partition
    if (!selected) return
    updatePartition(selected.id, { free: selected.total, formatted: true, fileSystem: formatFileSystem, label: volumeLabel })
    setConfirmDisk(false)
    setPartitionPrompt(null)
    setError(`${selected.name} formatted as ${formatFileSystem}`)
  }

  const renderSetup = () => {
    if (stage === 0) return <div className="bios-screen"><div className="bios-instructions">Use the ↑(Up) and ↓(Down) arrow keys to move the pointer to the desired boot device.<br />Press Enter to attempt the boot or ESC to cancel. (* = Password Required)</div><div className="bios-status">Boot mode is set to: UEFI; Secure Boot: OFF</div><strong className="bios-heading">UEFI BOOT:</strong>{[['windows','Windows Boot Manager'],['usb','UEFI: KingstonDT 101 G2 PMAP']].map(([id,label]) => <button key={id} className={`bios-option ${bootChoice === id ? 'selected' : ''}`} onClick={() => { setBootChoice(id); setError(id === 'usb' ? '' : 'เลือกรายการ UEFI USB แล้วกด “บูตจาก USB” เพื่อเปิด Windows Setup') }}><span>{bootChoice === id ? '›' : ' '}</span>{label}</button>)}<strong className="bios-heading other-heading">OTHER OPTIONS:</strong>{['BIOS Setup','BIOS Flash Update','Diagnostics','Intel(R) Management Engine BIOS Extension (MEBx)','Change Boot Mode Settings'].map((label) => <button key={label} className={`bios-option bios-other ${bootChoice === label ? 'selected' : ''}`} onClick={() => { setBootChoice(label); reportMistake(`${label} ไม่ใช่ตัวติดตั้ง — เลือก UEFI: KingstonDT USB ในหมวด UEFI BOOT`) }}><span>{bootChoice === label ? '›' : ' '}</span>{label}</button>)}<span className="bios-footer">F2 Setup　 F12 Boot Options　 Enter Select　 ESC Exit</span></div>
    if (stage === 1) return <>
      <div className="sim-windows-mark">▦</div><h2>การตั้งค่า Windows</h2><p>เลือกภาษา รูปแบบเวลา และแป้นพิมพ์</p>
      <label className="sim-field">Language to install<select value={language} onChange={(event) => setLanguage(event.target.value)}><option>ไทย</option><option>English (United States)</option></select></label>
      <label className="sim-field">Time and currency format<select><option>ไทย</option><option>English (United States)</option></select></label>
      <label className="sim-field">Keyboard or input method<select value={keyboard} onChange={(event) => setKeyboard(event.target.value)}><option>US</option><option>ไทย เกษมณี</option></select></label>
    </>
    if (stage === 2) return <div className="sim-install-now"><div className="sim-windows-mark">▦</div><h2>Windows 10 Setup</h2><p>พร้อมติดตั้ง Windows 10 บนเครื่องจำลอง</p><button className="sim-install-now-btn" onClick={() => setStage(3)}>ติดตั้งเดี๋ยวนี้</button><span>หรือเลือกเครื่องมือซ่อมแซมคอมพิวเตอร์</span></div>
    if (stage === 3) return <><div className="sim-windows-mark">▦</div><h2>เปิดใช้งาน Windows</h2><p>ใส่คีย์ผลิตภัณฑ์ หรือข้ามขั้นตอนนี้ในแบบฝึก</p><label className="sim-field">คีย์ผลิตภัณฑ์<input placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX" /></label><button className="sim-text-button" onClick={goNext}>ฉันไม่มีคีย์ผลิตภัณฑ์</button><p className="sim-help">ใช้คีย์จริงของคุณได้เฉพาะตอนติดตั้งบนเครื่องจริง หน้านี้ไม่ส่งหรือบันทึกข้อมูล</p></>
    if (stage === 4) return <><div className="sim-windows-mark">▦</div><h2>เลือกรุ่นระบบปฏิบัติการ</h2><p>เลือกรุ่นที่ตรงกับลิขสิทธิ์ Windows ของคุณ</p><div className="sim-edition-list">{['Windows 10 Home','Windows 10 Pro','Windows 10 Education'].map((item) => <label key={item} className={`sim-edition ${edition === item ? 'selected' : ''}`}><input type="radio" name="edition" checked={edition === item} onChange={() => setEdition(item)} />{item}</label>)}</div><p className="sim-help">เลือกให้ตรงกับ Product Key หรือ Digital License</p></>
    if (stage === 5) return <><div className="sim-windows-mark">▦</div><h2>License terms</h2><div className="sim-license-box">Your use of this software is subject to the terms and conditions of the license agreement by which you acquired this software. If you are a volume license customer, your use of this software is subject to your volume license agreement. You may not use this software if you have not validly acquired a license for the software from Microsoft or its licensed distributors.<br /><br />EULAID: 10_R1_1_ED_EVAL_en-us</div><label className="sim-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />I accept the license terms</label></>
    if (stage === 6) return <><div className="sim-windows-mark">▦</div><h2>Which type of installation do you want?</h2><p>Choose the installation type</p><button className={`sim-choice ${installType === 'upgrade' ? 'selected' : ''}`} onClick={() => { setInstallType('upgrade'); reportMistake('Upgrade is available when Setup is started from Windows — choose Custom when booting from USB to perform a clean install.') }}><strong>Upgrade: Install Windows and keep files, settings, and applications</strong><span>The files, settings, and applications are moved to Windows.</span></button><button className={`sim-choice ${installType === 'custom' ? 'selected' : ''}`} onClick={() => { setInstallType('custom'); setError('') }}><strong>Custom: Install Windows only (advanced)</strong><span>This option is for making changes to partitions and drives.</span></button></>
    if (stage === 7) return <div className="partition-setup">
      <h2>Where do you want to install Windows?</h2>
      <div className="partition-table"><div className="partition-table-head"><span>Name</span><span>Total size</span><span>Free space</span><span>Type</span></div>{partitions.map((partition) => <button key={partition.id} type="button" aria-pressed={disk === partition.id} className={`partition-row ${disk === partition.id ? 'selected' : ''}`} onClick={() => { setDisk(partition.id); setConfirmDisk(false); setError('') }}><span>▰　{partition.name}{partition.label ? ` (${partition.label})` : ''}{partition.formatted ? ` · ${partition.fileSystem || 'NTFS'}` : ''}</span><span>{formatSize(partition.total)}</span><span>{formatSize(partition.free)}</span><span>{partition.type}</span></button>)}</div>
      <div className="partition-toolbar"><button onClick={() => { setPartitions([...INITIAL_PARTITIONS]); setDisk('unallocated-0'); setConfirmDisk(false); setPartitionAction(null); setPartitionPrompt(null); setError('Disk list refreshed') }}>⟳ Refresh</button><button onClick={() => { setShowDriverDialog(true); setError('') }}>▧ Load driver</button><button disabled={!selectedPartition || selectedPartition.type === 'Unallocated'} onClick={deletePartition}>✕ Delete</button><button disabled={!selectedPartition || selectedPartition.type === 'Unallocated'} onClick={formatPartition}>▤ Format</button><button disabled={!selectedPartition || (!['Primary', 'Unallocated'].includes(selectedPartition.type)) || (selectedPartition.type === 'Primary' && !selectedFreeSpace)} onClick={() => beginPartitionAction('new')}>✦ New</button><button disabled={!selectedPartition || selectedPartition.type !== 'Primary' || !selectedFreeSpace} onClick={() => beginPartitionAction('extend')}>↔ Extend</button></div>
      {partitionAction && <div className="partition-size-panel"><label>Size: <input aria-label="Partition size in MB" type="number" min="1" max={selectedFreeSpace?.total ?? 0} value={partitionSize} onChange={(event) => setPartitionSize(event.target.value)} /> MB <small>Available: {formatSize(selectedFreeSpace?.total ?? 0)}</small></label><button className="partition-apply" onClick={applyPartitionAction}>Apply</button><button className="partition-cancel" onClick={() => { setPartitionAction(null); setError('Operation cancelled') }}>Cancel</button></div>}
      <p className="partition-message" role="status">{error || (selectedPartition ? `Disk ${selectedPartition.drive} · ${selectedPartition.name} · ${formatSize(selectedPartition.total)} total, ${formatSize(selectedPartition.free)} free` : 'Select a disk or partition to continue')}</p><label className="sim-check partition-warning"><input type="checkbox" checked={confirmDisk} onChange={(event) => setConfirmDisk(event.target.checked)} />I understand installing Windows on the selected partition may overwrite its data</label>
      {showDriverDialog && <div className="driver-dialog-backdrop"><div className="driver-dialog"><h3>Load driver</h3><p>Select a storage driver</p><label><input type="radio" name="driver" defaultChecked /> Standard NVM Express Controller</label><label><input type="radio" name="driver" /> Intel SATA AHCI Controller</label><div><button onClick={() => { setDriverLoaded(true); setShowDriverDialog(false); setError('Storage driver loaded') }}>Load</button><button onClick={() => setShowDriverDialog(false)}>Cancel</button></div></div></div>}
      {partitionPrompt && <div className="driver-dialog-backdrop partition-confirm-backdrop"><div className="driver-dialog partition-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="partition-dialog-title">
        <h3 id="partition-dialog-title">{partitionPrompt.type === 'delete' ? 'Delete partition' : 'Format partition'}</h3>
        <p><strong>{partitionPrompt.partition.name}</strong> · {formatSize(partitionPrompt.partition.total)} on Disk {partitionPrompt.partition.drive}</p>
        {partitionPrompt.partition.drive === 1 && <p className="partition-risk">This is the data disk. Confirm only if you intend to erase its contents.</p>}
        {partitionPrompt.type === 'format' ? <><label className="partition-dialog-field">File system<select value={formatFileSystem} onChange={(event) => setFormatFileSystem(event.target.value)}><option>NTFS</option><option>FAT32</option><option>exFAT</option></select></label><label className="partition-dialog-field">Volume label<input value={volumeLabel} maxLength={32} onChange={(event) => setVolumeLabel(event.target.value)} /></label><p>Formatting removes all files on this partition.</p></> : <p>Deleting removes the partition and returns its space as Unallocated Space. All files on it will be lost.</p>}
        <div><button className="partition-danger-button" onClick={partitionPrompt.type === 'delete' ? confirmDeletePartition : confirmFormatPartition}>{partitionPrompt.type === 'delete' ? 'Delete' : 'Format'}</button><button onClick={() => setPartitionPrompt(null)}>Cancel</button></div>
      </div></div>}
    </div>
    if (stage === 8) return <div className="sim-installing"><div className="sim-windows-mark">▦</div><h2>กำลังติดตั้ง Windows</h2><p>เครื่องจะรีสตาร์ตหลังจากติดตั้งไฟล์เสร็จ</p><div className="sim-progress-track"><span style={{ width: `${progress}%` }} /></div><strong>{progress}% เสร็จสมบูรณ์</strong><ul><li className={progress >= 20 ? 'complete' : ''}>กำลังคัดลอกไฟล์ Windows</li><li className={progress >= 45 ? 'complete' : ''}>กำลังเตรียมไฟล์สำหรับติดตั้ง</li><li className={progress >= 70 ? 'complete' : ''}>กำลังติดตั้งคุณลักษณะ</li><li className={progress >= 90 ? 'complete' : ''}>กำลังดำเนินการอัปเดต</li></ul>{progress === 100 && <p className="sim-help">รีสตาร์ตเครื่องจำลอง…</p>}</div>
    if (stage === 9) return <><div className="sim-windows-mark">▦</div><h2>{showKeyboard ? 'เพิ่มรูปแบบแป้นพิมพ์' : 'มาเริ่มจากภูมิภาคกันก่อน'}</h2><p>{showKeyboard ? 'เลือกเค้าโครงแป้นพิมพ์ที่ต้องการเพิ่ม หรือข้ามขั้นตอนนี้' : 'เลือกภูมิภาคและรูปแบบแป้นพิมพ์'}</p>{showKeyboard ? <><button className="sim-choice" onClick={() => { setKeyboard('ไทย เกษมณี'); setShowKeyboard(false) }}><strong>ไทย เกษมณี</strong><span>เพิ่มแป้นพิมพ์ภาษาไทย</span></button><button className="sim-text-button" onClick={() => setShowKeyboard(false)}>ข้าม</button></> : <><label className="sim-field">ประเทศหรือภูมิภาค<select value={region} onChange={(event) => setRegion(event.target.value)}><option>ไทย</option><option>United States</option><option>Japan</option></select></label><label className="sim-field">รูปแบบแป้นพิมพ์<select value={keyboard} onChange={(event) => setKeyboard(event.target.value)}><option>US</option><option>ไทย เกษมณี</option></select></label><button className="sim-text-button" onClick={() => setShowKeyboard(true)}>เพิ่มรูปแบบแป้นพิมพ์</button></>}</>
    if (stage === 10) return <><div className="sim-windows-mark">▦</div><h2>ตั้งค่าบัญชีผู้ใช้</h2><p>เลือกวิธีการตั้งค่าบัญชีสำหรับเครื่องจำลอง</p><div className="sim-account-options"><button className={`sim-choice ${userType === 'local' ? 'selected' : ''}`} onClick={() => setUserType('local')}><strong>บัญชีภายในเครื่อง</strong><span>ฝึกสร้างชื่อผู้ใช้โดยไม่ใช้บัญชีออนไลน์</span></button><button className={`sim-choice ${userType === 'online' ? 'selected' : ''}`} onClick={() => setUserType('online')}><strong>บัญชีออนไลน์ (ตัวอย่าง)</strong><span>ไม่ต้องกรอกอีเมลหรือรหัสผ่านจริง</span></button></div><label className="sim-field">ชื่อผู้ใช้<input value={accountName} onChange={(event) => setAccountName(event.target.value)} maxLength={24} /></label><div className="sim-network"><span>🌐</span><div><strong>เครือข่าย</strong><p>เชื่อมต่อแล้ว (สถานะจำลอง)</p></div><span className="sim-network-status">● ออนไลน์</span></div><p className="sim-help">อย่ากรอกรหัสผ่านจริงในแบบฝึกจำลอง</p></>
    return <div className="sim-desktop"><div className="sim-desktop-icon">▣<span>พีซีเครื่องนี้</span></div><div className="sim-welcome"><div className="sim-windows-mark">▦</div><h2>ยินดีต้อนรับ {accountName || 'ผู้ใช้'}</h2><p>ติดตั้ง Windows 10 จำลองเรียบร้อยแล้ว</p><span>{edition} · ภูมิภาค: {region} · แป้นพิมพ์: {keyboard}</span></div><div className="sim-taskbar"><span>▦</span><span>🔍 พิมพ์ที่นี่เพื่อค้นหา</span><span className="sim-clock">09:41　06/10/2026</span></div></div>
  }

  return <main className="learning-page windows-page">
    <section className="learning-hero"><span className="eyebrow">ห้องฝึกจำลอง · ขั้นตอน {Math.min(stage + 1, SIM_STEPS.length)} / {SIM_STEPS.length}</span><h1>ฝึกติดตั้ง Windows 10</h1><p>ฝึกตามลำดับตั้งแต่บูตจาก USB ไปจนถึงตั้งค่าผู้ใช้และเข้าเดสก์ท็อป จำลองตามคู่มือติดตั้งแบบ Step by Step</p></section>
    <div className="windows-sim-layout">
      <aside className="sim-step-list" aria-label="ขั้นตอนการจำลอง">{SIM_STEPS.map((label, index) => <div key={label} className={`sim-step ${stage === index ? 'current' : ''} ${stage > index ? 'done' : ''}`}><span className="sim-step-dot">{stage > index ? '✓' : index + 1}</span><span>{label}</span></div>)}<div className="sim-mistake-count" aria-live="polite">ข้อผิดพลาดที่ตรวจพบ <strong>{mistakes}</strong></div><button className="sim-reset" onClick={reset}>↻ เริ่มการจำลองใหม่</button><a className="sim-reference" href="https://muit.mahidol.ac.th/documents/userguide/os-install/Installation_Windows10.pdf" target="_blank" rel="noreferrer">คู่มือ ม.มหิดล ↗</a></aside>
      <section className={`windows-simulator sim-stage-${stage} ${stage === 11 ? 'desktop-stage' : ''}`}><div className={`sim-screen ${stage === 11 ? 'desktop-screen' : ''}`}>
        {stage === 0 || stage === 11 ? renderSetup() : <div className={`setup-window-shell setup-window-stage-${stage}`}>
          <div className="setup-window-title"><span className="setup-title-icon">▦</span>Windows Setup<span className="setup-window-controls">－　□　×</span></div>
          <div className={`setup-window-content setup-content-stage-${stage}`}>{renderSetup()}</div>
          {stage !== 8 && stage !== 2 && <div className="setup-window-actions"><p className={`sim-error ${error ? 'has-error' : ''}`} role={error ? 'alert' : 'status'} aria-live="assertive">{error ? `⚠ ${error}` : ''}</p><div className="sim-actionbar">{stage > 0 && <button className="sim-back" onClick={goBack}>ย้อนกลับ</button>}<button className="sim-next" onClick={goNext}>{stage === 10 ? 'เสร็จสิ้น' : 'ถัดไป'} <span>›</span></button></div></div>}
        </div>}
        {stage >= 5 && stage <= 8 && <div className="setup-statusbar"><span><b>1</b> Collecting information</span><i /><span><b>2</b> Installing Windows</span></div>}
      </div>
        {stage === 0 && <><p className={`sim-error ${error ? 'has-error' : ''}`} role={error ? 'alert' : 'status'} aria-live="assertive">{error ? `⚠ ${error}` : ''}</p><div className="sim-actionbar"><button className="sim-next" onClick={goNext}>บูตจาก USB <span>›</span></button></div></>}
        {stage === 11 && <div className="sim-actionbar"><button className="sim-next" onClick={reset}>เริ่มฝึกอีกครั้ง ↻</button></div>}
      </section>
    </div>
    <p className="learning-note">จำลองตาม <a href="https://muit.mahidol.ac.th/documents/userguide/os-install/Installation_Windows10.pdf" target="_blank" rel="noreferrer">คู่มือติดตั้ง Windows 10 ของมหาวิทยาลัยมหิดล</a> หน้าจอนี้เป็นแบบฝึกเท่านั้น ไม่ติดตั้งหรือเปลี่ยนแปลงคอมพิวเตอร์จริง</p>
  </main>
}
