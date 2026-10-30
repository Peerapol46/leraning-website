import { useSessionState } from '../../../hooks/useSessionState'
import { EDITION_TASKS } from '../data/editionTasks'
import { TARGET_EDITIONS, SIMULATED_PC } from '../data/editions'

export default function SystemVerification({ attemptId, edition, accountName, result, onVerify }) {
  const [answers, setAnswers] = useSessionState('windows:verification:' + attemptId + ':' + edition + ':' + accountName, { edition: '', ram: '', cpu: '', name: '' })
  const [error, setError] = useSessionState('windows:verification-error:' + attemptId + ':' + edition, '')
  const task = EDITION_TASKS[edition]
  const fields = [
    ['edition', 'รุ่น Windows ที่ติดตั้ง', TARGET_EDITIONS],
    ['ram', 'หน่วยความจำ RAM', ['4.0 GB', '8.0 GB', SIMULATED_PC.ram, '32.0 GB']],
    ['cpu', 'หน่วยประมวลผล', ['Intel Core i3-6100', SIMULATED_PC.processor, 'AMD Ryzen 5 5600']],
  ]
  const submit = (event) => {
    event.preventDefault()
    if (answers.edition !== edition || answers.ram !== SIMULATED_PC.ram || answers.cpu !== SIMULATED_PC.processor || answers.name.trim() !== accountName || Number(answers.task) !== task.answer || answers.task === undefined || answers.task === '') {
      setError('ข้อมูลยังไม่ครบหรือไม่ตรงกับ System กรุณาตรวจสอบรุ่น Windows, RAM, CPU ชื่อผู้ใช้ และคำถามภารกิจเฉพาะรุ่นอีกครั้ง')
      return
    }
    onVerify()
  }
  if (result) return <section className="system-verification" role="status"><h4>ผ่านภารกิจติดตั้งและตรวจสอบเครื่อง</h4><p>คะแนน {result.score}/100 · กดผิดระหว่างติดตั้ง {result.mistakes} ครั้ง · ใช้เวลา {result.elapsedSeconds} วินาที</p><p>เกณฑ์คะแนน: เริ่มต้น 100 หักครั้งละ 5 คะแนนเมื่อกดผิดระหว่างติดตั้ง แบบตรวจสเปกแก้ไขได้จนถูกต้อง</p></section>
  return <form className="system-verification" onSubmit={submit}>
    <h4>บันทึกผลตรวจสอบเครื่อง</h4><p>อ่านข้อมูลใน System ด้านบน แล้วกรอกผลให้ถูกต้องเพื่อจบภารกิจ</p>
    {fields.map(([key, label, options]) => <label key={key}>{label}<select required value={answers[key]} onChange={(event) => { setAnswers({ ...answers, [key]: event.target.value }); setError('') }}><option value="">เลือกคำตอบ</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
    <label>ชื่อผู้ใช้<input required value={answers.name} onChange={(event) => { setAnswers({ ...answers, name: event.target.value }); setError('') }} autoComplete="off" /></label>
    <label>{task.title} — {task.question}<select required value={answers.task ?? ''} onChange={(event) => { setAnswers({ ...answers, task: event.target.value }); setError('') }}><option value="">เลือกคำตอบภารกิจ</option>{task.options.map((option, index) => <option key={option} value={index}>{option}</option>)}</select></label>
    {error && <p role="alert">{error}</p>}<button type="submit">ตรวจคำตอบและสรุปผล</button>
  </form>
}
