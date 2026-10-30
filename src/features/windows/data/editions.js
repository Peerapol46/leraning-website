export const EDITION_OPTIONS = [
  { name: 'Windows 10 Home', audience: 'สำหรับผู้ใช้ทั่วไปและครอบครัว', description: 'ฝึกเลือกและติดตั้ง Windows สำหรับการใช้งานส่วนตัวที่บ้าน' },
  { name: 'Windows 10 Pro', audience: 'สำหรับธุรกิจขนาดเล็ก และ Power User', description: 'ฝึกเลือกและติดตั้ง Windows สำหรับการทำงานและผู้ใช้ขั้นสูง' },
  { name: 'Windows 10 Enterprise', audience: 'สำหรับองค์กรขนาดใหญ่', description: 'ฝึกเลือกและติดตั้ง Windows สำหรับสภาพแวดล้อมขององค์กร' },
  { name: 'Windows 10 Education', audience: 'สำหรับสถานศึกษา', description: 'ฝึกเลือกและติดตั้ง Windows สำหรับการเรียนและสถานศึกษา' },
]

// Four practice tasks, with similar editions included as distractors in Setup.
export const TARGET_EDITIONS = EDITION_OPTIONS.map(({ name }) => name)
export const WINDOWS_EDITIONS = [
  'Windows 10 Home',
  'Windows 10 Home N',
  'Windows 10 Home Single Language',
  'Windows 10 Pro',
  'Windows 10 Pro N',
  'Windows 10 Pro Education',
  'Windows 10 Pro Education N',
  'Windows 10 Pro for Workstations',
  'Windows 10 Pro N for Workstations',
  'Windows 10 Enterprise',
  'Windows 10 Enterprise N',
  'Windows 10 Education',
  'Windows 10 Education N',
]
export const isCorrectEdition = (selected, target) => TARGET_EDITIONS.includes(target) && selected === target
export const editionMismatchMessage = (selected, target) => selected
  ? `เลือกรุ่นไม่ตรงกับโจทย์: คุณเลือก ${selected} กรุณาเลือก ${target} แล้วกด Next อีกครั้ง`
  : `ยังไม่ได้เลือกรุ่น Windows กรุณาเลือก ${target} แล้วกด Next`

// Fixed lesson hardware, consistent with the existing 16 GB BIOS / 32 GB disk.
export const SIMULATED_PC = {
  name: 'DESKTOP-PC-LAB',
  processor: 'Intel Core i5-6500 CPU @ 3.20 GHz',
  ram: '16.0 GB',
  systemType: '64-bit Operating System, x64-based processor',
}
