import { useEffect, useRef, useState } from 'react'

const SIM_STEPS = [
  'กด F12 เพื่อเปิด UEFI Boot Menu',
  'เลือก USB ติดตั้งจาก UEFI Boot Menu',
  'บูตเครื่องจาก USB ติดตั้ง',
  'กำลังเริ่ม Windows Setup',
  'ตั้งค่าภาษาและกด Next',
  'กด Install now',
  'ยอมรับ License terms',
  'เลือก Custom installation',
  'แบ่งพื้นที่ Disk 0 แล้วกด Apply',
  'ยืนยันการสร้างพาร์ทิชัน',
  'สร้างพาร์ทิชันที่เหลือด้วย New',
  'กด Apply เพื่อแบ่งพื้นที่',
  'เลือก Disk 0 Partition 2 แล้วกด Next',
  'ติดตั้งไฟล์ Windows',
  'ตรวจสถานะติดตั้งครบ',
  'Restart เครื่อง',
  'เริ่มเครื่องหลังรีสตาร์ต',
  'เลือก Use Express settings',
  'เลือกวิธีการเชื่อมต่อ',
  'สร้างบัญชีผู้ใช้สำหรับคอมพิวเตอร์',
  'เข้าสู่หน้า Desktop',
]

const SIM_GUIDANCE = [
  'เปิดเครื่อง แล้วกด F12 ตามหน้าจอเริ่มต้นเพื่อเปิด One-Time Boot Menu',
  'ใน UEFI Boot Menu ใช้ปุ่มลูกศรเลือก UEFI: KingstonDT 101 G2 PMAP แล้วกด Enter เพื่อเริ่มจาก USB',
  'รอให้เครื่องอ่านไฟล์เริ่มต้นจาก USB และโหลดตัวติดตั้ง Windows',
  'รอ Windows Setup เริ่มทำงาน แล้วตรวจหน้าตั้งค่าภาษา',
  'ตรวจ Language, Time and currency format และ Keyboard or input method แล้วกด Next',
  'กด Install now เพื่อเริ่มติดตั้ง Windows 10',
  'ทำเครื่องหมาย I accept the license terms ก่อนกด Next',
  'เลือก Custom: Install Windows only (advanced) สำหรับการติดตั้งใหม่',
  'เลือก Disk 0 Unallocated Space ใส่ขนาดพาร์ทิชัน Windows แล้วกด New และ Apply',
  'ยืนยันข้อความที่ Windows อาจสร้างพาร์ทิชันสำหรับไฟล์ระบบด้วยปุ่ม OK',
  'เลือกพื้นที่ Unallocated ที่เหลือ แล้วกด New เพื่อเตรียมแบ่งพื้นที่อีกครั้ง',
  'ตรวจขนาดพื้นที่ แล้วกด Apply เพื่อสร้างพาร์ทิชัน',
  'เลือก Disk 0 Partition 2 ซึ่งเป็นพาร์ทิชันหลัก แล้วกด Next',
  'รอ Windows คัดลอกไฟล์ ติดตั้งฟีเจอร์ และอัปเดตจนเสร็จ',
  'ตรวจให้ครบทุกสถานะก่อนปล่อยให้เครื่องรีสตาร์ต',
  'รอการ Restart อัตโนมัติหนึ่งครั้ง และอย่าปิดเครื่องระหว่างทำงาน',
  'หลังเครื่องเริ่มใหม่ ปล่อยให้ Windows Setup เปิดหน้าตั้งค่าครั้งแรก',
  'เลือก Use Express settings ตามคู่มือเพื่อใช้การตั้งค่าแนะนำ',
  'เลือก Join a domain ตามภาพ แล้วกด Continue เพื่อไปตั้งชื่อเครื่อง',
  'ตั้งชื่อบัญชีผู้ใช้ MUIT และกรอกรหัสผ่านตามต้องการ จากนั้นกด Next',
  'ตรวจหน้า Desktop เพื่อยืนยันว่าติดตั้งและตั้งค่าเครื่องเสร็จแล้ว',
]

const SIM_HINTS = [
  'เครื่อง Dell ใช้ปุ่ม F12 เพื่อเปิดเมนูบูตครั้งเดียวตามภาพตัวอย่าง',
  'ภาพตัวอย่างไฮไลต์ UEFI: Kingston DT 101 G2 PMAP ซึ่งเป็น USB ติดตั้ง; อย่าเลือก Windows Boot Manager',
  'ระหว่างเริ่มระบบจาก USB หน้าจออาจมืดและแสดงโลโก้ Windows พร้อมวงกลมโหลด',
  'เมื่อ Windows Setup พร้อมแล้ว หน้าตั้งค่าภาษาจะปรากฏขึ้นโดยอัตโนมัติ',
  'คู่มือใช้ English (United States) และ US keyboard',
  'ในแบบฝึก Repair your computer จะไปเครื่องมือซ่อม ไม่ใช่เริ่มติดตั้ง',
  'ยอมรับเงื่อนไขก่อนจึงจะไปหน้าประเภทการติดตั้งได้',
  'Upgrade ใช้เก็บไฟล์และแอปจาก Windows เดิม ส่วนการบูตจากสื่อติดตั้งใหม่ใช้ Custom',
  'ตัวอย่างในคู่มือแบ่งพื้นที่ 20,767 MB จากดิสก์ 32 GB และเหลือพื้นที่ Unallocated',
  'Windows Setup อาจสร้าง System Reserved เพิ่มเมื่อยืนยัน',
  'เลือกเฉพาะ Unallocated Space ที่เหลือบน Disk 0 ก่อนกด New',
  'ปุ่ม Apply จะยืนยันขนาดที่ใช้สร้างพาร์ทิชันใหม่',
  'ตรวจชื่อและหมายเลขดิสก์ให้ตรงก่อน Next เพราะการติดตั้งลงพาร์ทิชันผิดอาจทับข้อมูล',
  'การคัดลอกและติดตั้งทำงานอัตโนมัติ รอจนทุกแถบครบ',
  'ทุกขั้นควรมีเครื่องหมายถูกก่อนเริ่มใหม่',
  'อย่ากดปุ่มบูตจากแผ่นซ้ำหลังรีสตาร์ต เพื่อให้เริ่มจากฮาร์ดดิสก์',
  'หน้าจอเริ่มระบบจะเปลี่ยนจากตัวติดตั้งไปสู่การตั้งค่า Windows',
  'Express settings ใช้ค่าตั้งต้นที่แนะนำและข้ามการปรับทีละตัวเลือก',
  'หน้าตัวอย่างเลือก Join a domain เพื่อสร้างบัญชีในเครื่องก่อนเชื่อมต่อโดเมนภายหลัง',
  'ตัวอย่างใช้ชื่อบัญชี MUIT; รหัสผ่านเป็นตัวเลือกในแบบฝึกและใช้ตรวจสอบในหน้านี้เท่านั้น',
  'เมื่อเห็น Desktop ถือว่าจบขั้นตอนตามคู่มือ',
]

const DISPLAY_STEPS = [...SIM_STEPS.slice(0, 6), 'Activate Windows', 'เลือก Windows edition', ...SIM_STEPS.slice(6)]
const DISPLAY_GUIDANCE = [...SIM_GUIDANCE.slice(0, 6), 'กรอกรหัส Product Key หากมี หรือเลือก I don’t have a product key เพื่อทำต่อโดยไม่เปิดใช้งานตอนนี้', 'เลือก Windows 10 Home ตามภาพ แล้วกด Next เพื่อไป License terms', ...SIM_GUIDANCE.slice(6)]
const DISPLAY_HINTS = [...SIM_HINTS.slice(0, 6), 'ตามภาพตัวอย่าง ให้เลือก I don’t have a product key เพื่อไปหน้ารายการ Windows edition', 'เลือก Windows 10 Home ที่ถูกไฮไลต์ แล้วกด Next', ...SIM_HINTS.slice(6)]

const WINDOWS_EDITIONS = ['Windows 10 Home', 'Windows 10 Home N', 'Windows 10 Home Single Language', 'Windows 10 Education', 'Windows 10 Education N', 'Windows 10 Pro', 'Windows 10 Pro N']

const INSTALL_GUIDE = [
  { id: 'guide-prepare', kicker: 'ก่อนเริ่ม', title: 'เตรียมเครื่องและข้อมูล', text: 'คู่มือนี้เรียบเรียงตามแบบฝึกติดตั้งใหม่จาก USB และหน้าจอที่จำลองในเว็บ', bullets: ['สำรองไฟล์สำคัญก่อนเริ่ม และตรวจให้แน่ใจว่ามีสื่อ USB สำหรับติดตั้งที่บูตได้ (USB เปล่าขนาดอย่างน้อย 8 GB เมื่อสร้างสื่อใหม่)', 'เสียบไฟเลี้ยงแล็ปท็อป และถอดไดรฟ์เก็บข้อมูลภายนอกที่ไม่เกี่ยวข้อง เพื่อป้องกันเลือกดิสก์ผิด', 'ตรวจรุ่น Windows และสิทธิ์ใช้งานเดิมไว้ก่อน เพราะ edition ที่ติดตั้งควรตรงกับ digital license หรือ product key'], note: 'การติดตั้งแบบ Clean Install และการลบหรือ format พาร์ทิชันทำให้ไฟล์และโปรแกรมบนดิสก์นั้นหายได้ แบบฝึกนี้ใช้ Disk 0 ว่างจำลองขนาด 32 GB' },
  { id: 'guide-usb', kicker: 'ขั้นที่ 1', title: 'บูตจาก USB ติดตั้ง', text: 'เปิดเครื่อง แล้วกด F12 เพื่อเรียก One-Time Boot Menu จากนั้นใช้ปุ่มลูกศรเลือกสื่อ USB แบบ UEFI', bullets: ['เลือก UEFI: KingstonDT 101 G2 PMAP แล้วกด Enter', 'อย่าเลือก Windows Boot Manager เพราะจะบูต Windows เดิม', 'รอให้ตัวติดตั้งโหลดไฟล์และเปิดหน้า Windows Setup'] },
  { id: 'guide-language', kicker: 'ขั้นที่ 2', title: 'ตั้งค่าภาษาและเริ่มติดตั้ง', text: 'หน้าตั้งค่าภาษาให้เลือกค่าตามภาพฝึก แล้วกด Next', bullets: ['Language to install: English (United States)', 'Time and currency format: English (United States)', 'Keyboard or input method: US', 'หน้าถัดไปกด Install now เพื่อเริ่มติดตั้ง'] },
  { id: 'guide-product', kicker: 'ขั้นที่ 3', title: 'Product Key และ edition', text: 'ถ้ามี product key ที่ใช้ได้ ให้กรอกในหน้า Activate Windows หากยังไม่กรอก ให้เลือก I don’t have a product key แล้วเลือก edition ให้ตรงกับสิทธิ์ใช้งาน', bullets: ['ในแบบฝึกให้เลือก I don’t have a product key เพื่อไปต่อ', 'เลือก Windows 10 Home ตามภาพตัวอย่าง จากนั้นกด Next', 'การข้าม Product Key ไม่ได้ให้สิทธิ์ใช้งาน Windows โดยอัตโนมัติ ต้องมี product key หรือ digital license ที่ตรงกับ edition'], note: 'Privacy Statement ไม่ใช่ขั้นตอนติดตั้ง ให้ข้ามตามแบบฝึกและกด I don’t have a product key' },
  { id: 'guide-license', kicker: 'ขั้นที่ 4', title: 'ยอมรับ License terms', text: 'อ่านเงื่อนไขการใช้งาน ทำเครื่องหมาย I accept the license terms แล้วกด Next', bullets: ['ถ้ายังไม่ทำเครื่องหมาย ปุ่ม Next จะยังไม่ผ่านไปขั้นต่อไป', 'หากย้อนกลับไปแก้ edition ให้ตรวจอีกครั้งว่าตรงกับ license'] },
  { id: 'guide-install-type', kicker: 'ขั้นที่ 5', title: 'เลือก Custom installation', text: 'เลือก Custom: Install Windows only (advanced) เมื่อต้องการติดตั้งใหม่และจัดการพาร์ทิชัน', bullets: ['อย่าเลือก Upgrade ในแบบฝึกนี้ เพราะตัวติดตั้งเริ่มจาก USB ไม่ได้อัปเกรด Windows เดิม', 'การติดตั้ง Custom อาจลบไฟล์เดิมเมื่อเปลี่ยนหรือลบพาร์ทิชัน จึงต้องสำรองข้อมูลก่อน'] },
  { id: 'guide-partitions', kicker: 'ขั้นที่ 6', title: 'แบ่งพื้นที่ Disk 0', text: 'ตัวอย่างนี้เริ่มจาก Disk 0 Unallocated Space ขนาด 32 GB และสร้างพาร์ทิชันหลักขนาด 20,767 MB', bullets: ['เลือก Disk 0 Unallocated Space แล้วกด New ใส่ 20,767 MB จากนั้นกด Apply', 'เมื่อ Windows Setup แจ้งว่าจะสร้างพาร์ทิชันสำหรับไฟล์ระบบเพิ่ม ให้กด OK', 'เลือกพื้นที่ Unallocated ที่เหลือ กด New แล้ว Apply เพื่อสร้างพาร์ทิชันเพิ่ม', 'เลือก Disk 0 Partition 2 ซึ่งเป็นพาร์ทิชันหลัก แล้วกด Next'], note: 'ตัวเลขและจำนวนพาร์ทิชันในเครื่องจริงอาจต่างจากภาพ อย่าลบหรือ format พาร์ทิชันจนกว่าจะยืนยันดิสก์และสำรองข้อมูลแล้ว' },
  { id: 'guide-install', kicker: 'ขั้นที่ 7', title: 'รอติดตั้งและเริ่มเครื่องใหม่', text: 'ปล่อยให้ Windows คัดลอกไฟล์ ติดตั้งฟีเจอร์ และอัปเดตจนทุกสถานะแสดงเสร็จ', bullets: ['อย่าปิดเครื่องหรือถอดไฟเลี้ยงระหว่างติดตั้ง', 'เมื่อเครื่องรีสตาร์ต ให้เริ่มจากดิสก์ภายในต่อ หากมีข้อความให้กดปุ่มเพื่อบูต USB ซ้ำ อย่ากดปุ่มนั้น', 'รอหน้า Getting ready เพื่อเข้าสู่การตั้งค่าเริ่มต้นของ Windows'] },
  { id: 'guide-oobe', kicker: 'ขั้นที่ 8', title: 'ตั้งค่า Windows ครั้งแรก', text: 'ดำเนินการตามหน้าจอหลังติดตั้งเสร็จ โดยแบบฝึกนี้จำลองลำดับตามภาพอ้างอิง', bullets: ['เลือก Use Express settings', 'หน้า Choose how you’ll connect ให้เลือก Join a domain แล้วกด Continue; การเลือก Join Azure AD จะแจ้งเตือนในแบบฝึก', 'หน้าสร้างบัญชีใช้ชื่อ MUIT รหัสผ่านเป็นตัวเลือก หากตั้งรหัสผ่านให้กรอกซ้ำให้ตรงและใส่ Password hint', 'กด Next แล้วรอจนเข้าสู่หน้า Desktop'] },
  { id: 'guide-finish', kicker: 'ตรวจสอบหลังติดตั้ง', title: 'ตรวจผลและสถานะสิทธิ์ใช้งาน', text: 'ตรวจว่าเข้า Desktop ได้และอุปกรณ์พื้นฐานทำงาน ก่อนนำเครื่องกลับไปใช้งานจริง', bullets: ['ต่ออินเทอร์เน็ตและตรวจสถานะ Activation ใน Settings', 'ถ้าเคยมี digital license บนอุปกรณ์เดิม ให้เชื่อมต่ออินเทอร์เน็ตและลงชื่อเข้าใช้บัญชี Microsoft ที่ผูกกับ license ตามกรณี', 'ถ้าไม่มี license หรือ edition ไม่ตรง Windows อาจยังไม่ activated ให้แก้ไขสิทธิ์ใช้งานก่อนใช้ต่อ'] },
]

const formatProductKey = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 25).match(/.{1,5}/g)?.join('-') ?? ''

const INITIAL_PARTITIONS = [
  { id: 'unallocated-0', name: 'Drive 0 Unallocated Space', total: 32766, free: 32766, type: 'Unallocated', drive: 0 },
]

const BOOT_MENU_OPTIONS = [
  { id: 'windows', label: 'Windows Boot Manager', group: 'UEFI BOOT:' },
  { id: 'usb', label: 'UEFI: KingstonDT 101 G2 PMAP', group: 'UEFI BOOT:' },
  { id: 'bios', label: 'BIOS Setup', group: 'OTHER OPTIONS:' },
  { id: 'flash', label: 'BIOS Flash Update', group: 'OTHER OPTIONS:' },
  { id: 'diagnostics', label: 'Diagnostics', group: 'OTHER OPTIONS:' },
  { id: 'mebx', label: 'Intel(R) Management Engine BIOS Extension (MEBx)', group: 'OTHER OPTIONS:' },
  { id: 'boot-settings', label: 'Change Boot Mode Settings', group: 'OTHER OPTIONS:' },
]

const formatSize = (mb) => mb >= 1024
  ? (mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1) + ' GB'
  : mb + ' MB'
const formatPartitionSize = (mb) => mb >= 1024
  ? (mb / 1024).toFixed(1) + ' GB'
  : mb.toFixed(1) + ' MB'

export default function WindowsPractice({ onComplete }) {
  const startedAtRef = useRef(Date.now())
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('learning')
  const [showHint, setShowHint] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [error, setError] = useState('')
  const [guideOpen, setGuideOpen] = useState(false)
  const [bootChoice, setBootChoice] = useState('windows')
  const [language, setLanguage] = useState('English (United States)')
  const [timeFormat, setTimeFormat] = useState('English (United States)')
  const [keyboard, setKeyboard] = useState('US')
  const [accepted, setAccepted] = useState(false)
  const [installType, setInstallType] = useState('custom')
  const [showInstallHelp, setShowInstallHelp] = useState(false)
  const [partitions, setPartitions] = useState(INITIAL_PARTITIONS)
  const [selectedPartitionId, setSelectedPartitionId] = useState('unallocated-0')
  const [windowsPartitionId, setWindowsPartitionId] = useState('')
  const [partitionSize, setPartitionSize] = useState('20767')
  const [partitionDialog, setPartitionDialog] = useState(null)
  const [pendingSystemPartition, setPendingSystemPartition] = useState(null)
  const [partitionPrompt, setPartitionPrompt] = useState(null)
  const [guideLayoutReady, setGuideLayoutReady] = useState(false)
  const [accountName, setAccountName] = useState('MUIT')
  const [accountPassword, setAccountPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordHint, setPasswordHint] = useState('')
  const [activationPage, setActivationPage] = useState(false)
  const [editionPage, setEditionPage] = useState(false)
  const [selectedEdition, setSelectedEdition] = useState('Windows 10 Home')
  const [productKey, setProductKey] = useState('')
  const [progress, setProgress] = useState(0)

  const displayStepIndex = editionPage && step === 5 ? 7 : activationPage && step === 5 ? 6 : step > 5 ? step + 2 : step

  const reportMistake = (message) => {
    setMistakes((count) => count + 1)
    setError(message)
  }

  const attemptBoot = () => {
    if (bootChoice === 'usb') {
      setError('')
      setStep(2)
      return
    }
    const selected = BOOT_MENU_OPTIONS.find((option) => option.id === bootChoice)
    reportMistake(bootChoice === 'windows'
      ? 'เลือก Windows Boot Manager ซึ่งจะเข้า Windows เดิม ให้เลือก UEFI: KingstonDT 101 G2 PMAP เพื่อเริ่มติดตั้งใหม่'
      : selected?.label + ' ไม่ใช่สื่อ USB ติดตั้ง Windows ให้เลือก UEFI: KingstonDT 101 G2 PMAP')
  }

  useEffect(() => setShowHint(false), [step])

  useEffect(() => {
    const list = document.querySelector('.windows-install-step-list')
    const current = step === 20 ? list?.lastElementChild : list?.querySelector('li.current')
    current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [step, activationPage])

  useEffect(() => {
    if (step !== 0 && step !== 1) return undefined
    const handleSetupKeys = (event) => {
      if (step === 0 && event.key === 'F12') {
        event.preventDefault()
        setError('')
        setStep(1)
      } else if (step === 1 && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
        setError('')
        setBootChoice((current) => {
          const index = BOOT_MENU_OPTIONS.findIndex((option) => option.id === current)
          const delta = event.key === 'ArrowDown' ? 1 : -1
          return BOOT_MENU_OPTIONS[(index + delta + BOOT_MENU_OPTIONS.length) % BOOT_MENU_OPTIONS.length].id
        })
      } else if (step === 1 && event.key === 'Enter') {
        event.preventDefault()
        attemptBoot()
      } else if (step === 1 && event.key === 'Escape') {
        event.preventDefault()
        setError('ออกจาก Boot Menu แล้ว กลับไปหน้าเริ่มต้นระบบ')
        setStep(0)
      }
    }
    window.addEventListener('keydown', handleSetupKeys)
    return () => window.removeEventListener('keydown', handleSetupKeys)
  }, [step, bootChoice])

  useEffect(() => {
    if (step === 2) {
      const timer = window.setTimeout(() => setStep(3), 1800)
      return () => window.clearTimeout(timer)
    }
    if (step === 3) {
      const timer = window.setTimeout(() => setStep(4), 1800)
      return () => window.clearTimeout(timer)
    }
    if (step !== 13 || progress >= 100) return undefined
    const timer = window.setTimeout(() => setProgress((value) => Math.min(value + 5, 100)), 170)
    return () => window.clearTimeout(timer)
  }, [step, progress])

  useEffect(() => {
    if (step === 13 && progress === 100) {
      const timer = window.setTimeout(() => setStep(14), 500)
      return () => window.clearTimeout(timer)
    }
    if (step === 14) {
      const timer = window.setTimeout(() => setStep(15), 2400)
      return () => window.clearTimeout(timer)
    }
    if (step === 15) {
      const timer = window.setTimeout(() => setStep(16), 1100)
      return () => window.clearTimeout(timer)
    }
    if (step === 16) {
      const timer = window.setTimeout(() => setStep(17), 4000)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [step, progress])

  const selectedPartition = partitions.find((partition) => partition.id === selectedPartitionId)
  const selectedWindowsPartition = partitions.find((partition) => partition.id === windowsPartitionId)
  const setPartitionError = (message) => setError(message)
  const updatePartition = (id, updates) => setPartitions((items) => items.map((partition) => partition.id === id ? { ...partition, ...updates } : partition))

  const openNewPartition = () => {
    setError('')
    if (!selectedPartition || selectedPartition.type !== 'Unallocated') {
      reportMistake('เลือก Unallocated Space ก่อนสร้างพาร์ทิชันใหม่')
      return
    }
    if (step === 10 && selectedPartition.drive !== 0) {
      reportMistake('คู่มือให้สร้างพาร์ทิชันจากพื้นที่ว่างที่เหลือบน Disk 0')
      return
    }
    setPartitionSize(String(step === 8 && selectedPartition.id === 'unallocated-0' ? Math.min(20767, selectedPartition.total - 2048) : selectedPartition.total))
    setPartitionDialog({ type: 'new', partition: selectedPartition })
    if (step === 10) setStep(11)
  }

  const openExtendPartition = () => {
    const index = partitions.findIndex((partition) => partition.id === selectedPartitionId)
    const freeSpace = [partitions[index - 1], partitions[index + 1]].find((partition) => partition && partition.drive === selectedPartition?.drive && partition.type === 'Unallocated')
    if (!selectedPartition || selectedPartition.type !== 'Primary' || !freeSpace) {
      reportMistake('Extend ใช้กับพาร์ทิชัน Primary ที่ติดกับพื้นที่ Unallocated เท่านั้น')
      return
    }
    setPartitionSize(String(freeSpace.total))
    setPartitionDialog({ type: 'extend', partition: selectedPartition, freeSpace })
  }

  const applyPartitionDialog = () => {
    const target = partitionDialog?.partition
    const size = Number(partitionSize)
    if (!target || !Number.isInteger(size) || size < 1 || size > target.total) {
      reportMistake('ขนาดพาร์ทิชันไม่ถูกต้อง ตรวจให้เป็นจำนวนเต็มและไม่เกินพื้นที่ว่าง')
      return
    }
    if (partitionDialog.type === 'extend') {
      const freeSpace = partitionDialog.freeSpace
      if (!freeSpace || size > freeSpace.total) {
        reportMistake('ขนาดที่ขยายเกินพื้นที่ Unallocated ที่ติดกัน')
        return
      }
      updatePartition(target.id, { total: target.total + size, free: target.free + size })
      if (size === freeSpace.total) setPartitions((items) => items.filter((partition) => partition.id !== freeSpace.id))
      else updatePartition(freeSpace.id, { total: freeSpace.total - size, free: freeSpace.free - size })
      setPartitionDialog(null)
      setPartitionError('Extend partition สำเร็จ')
      return
    }
    if (target.type !== 'Unallocated') {
      reportMistake('สร้างพาร์ทิชันได้จาก Unallocated Space เท่านั้น')
      return
    }

    if (step === 8 && !guideLayoutReady && target.id === 'unallocated-0' && target.drive === 0) {
      const systemSize = 500
      if (size < systemSize + 1024 || size >= target.total) {
        reportMistake('กำหนดขนาดรวมให้เหลืออย่างน้อย 1 GB สำหรับพาร์ทิชัน Windows หลังหัก System Reserved และให้เหลือพื้นที่ว่างบน Disk 0')
        return
      }
      setPendingSystemPartition({ targetId: target.id, size })
      setPartitionDialog(null)
      setError('')
      setStep(9)
      return
    }

    const number = partitions.filter((partition) => partition.drive === target.drive && partition.type !== 'Unallocated').length + 1
    const newPartition = { id: 'partition-' + Date.now(), name: 'Drive ' + target.drive + ' Partition ' + number, total: size, free: size, type: 'Primary', drive: target.drive }
    const remainder = target.total - size
    setPartitions((items) => {
      const result = []
      items.forEach((partition) => {
        if (partition.id !== target.id) result.push(partition)
        else {
          result.push(newPartition)
          if (remainder > 0) result.push({ ...partition, id: 'unallocated-' + Date.now(), name: 'Drive ' + target.drive + ' Unallocated Space', total: remainder, free: remainder })
        }
      })
      return result
    })
    setSelectedPartitionId(step === 11 && windowsPartitionId && partitions.some((partition) => partition.id === windowsPartitionId)
      ? windowsPartitionId
      : newPartition.id)
    setPartitionDialog(null)
    setError(step === 11 ? '' : 'สร้างพาร์ทิชัน ' + newPartition.name + ' ขนาด ' + formatSize(size) + ' แล้ว')
    if (step === 11) setStep(12)
  }

  const confirmSystemPartitionCreation = () => {
    const pending = pendingSystemPartition
    const target = partitions.find((partition) => partition.id === pending?.targetId)
    if (!pending || !target || target.type !== 'Unallocated') {
      reportMistake('ไม่พบพื้นที่ Unallocated Space สำหรับยืนยันการแบ่งพาร์ทิชัน')
      return
    }
    const system = { id: 'system-reserved', name: 'Drive 0 Partition 1: System Reserved', total: 500, free: 483, type: 'System', drive: 0 }
    const windowsSize = pending.size - system.total
    const windows = { id: 'windows-partition', name: 'Drive 0 Partition 2', total: windowsSize, free: windowsSize, type: 'Primary', drive: 0 }
    const remaining = target.total - pending.size
    const replacement = [system, windows]
    if (remaining > 0) replacement.push({ id: 'unallocated-after-windows', name: 'Drive 0 Unallocated Space', total: remaining, free: remaining, type: 'Unallocated', drive: 0 })
    setPartitions((items) => items.flatMap((partition) => partition.id === target.id ? replacement : [partition]))
    setSelectedPartitionId(remaining > 0 ? 'unallocated-after-windows' : windows.id)
    setWindowsPartitionId(windows.id)
    setGuideLayoutReady(true)
    setPendingSystemPartition(null)
    setError('')
    setStep(10)
  }

  const openDeletePartition = () => {
    if (!selectedPartition || selectedPartition.type === 'Unallocated') {
      reportMistake('เลือกพาร์ทิชันที่มีอยู่ก่อน เพราะ Unallocated Space ไม่มีพาร์ทิชันให้ลบ')
      return
    }
    setPartitionPrompt({ type: 'delete', partition: selectedPartition })
  }

  const openFormatPartition = () => {
    if (!selectedPartition || selectedPartition.type === 'Unallocated') {
      reportMistake('เลือกพาร์ทิชันที่สร้างแล้วก่อนกด Format')
      return
    }
    setPartitionPrompt({ type: 'format', partition: selectedPartition })
  }

  const confirmPartitionPrompt = () => {
    const target = partitionPrompt?.partition
    if (!target) return
    if (partitionPrompt.type === 'format') {
      updatePartition(target.id, { free: target.total, formatted: true, fileSystem: 'NTFS' })
      setPartitionPrompt(null)
      setError('Format ' + target.name + ' เป็น NTFS แล้ว')
      return
    }
    setPartitions((items) => {
      const converted = items.map((partition) => partition.id === target.id
        ? { ...partition, name: 'Drive ' + partition.drive + ' Unallocated Space', free: partition.total, type: 'Unallocated', formatted: false }
        : partition)
      return converted.reduce((result, partition) => {
        const previous = result[result.length - 1]
        if (partition.type === 'Unallocated' && previous?.type === 'Unallocated' && previous.drive === partition.drive) {
          result[result.length - 1] = { ...previous, id: partition.id === target.id ? target.id : previous.id, total: previous.total + partition.total, free: previous.free + partition.free }
        } else result.push(partition)
        return result
      }, [])
    })
    setPartitionPrompt(null)
    setError('ลบ ' + target.name + ' แล้ว พื้นที่กลับเป็น Unallocated Space')
  }

  const goNext = () => {
    setError('')
    if (step === 4 && (language !== 'English (United States)' || timeFormat !== 'English (United States)' || keyboard !== 'US')) {
      reportMistake('ตั้งค่าให้ตรงกับคู่มือ: English (United States), รูปแบบเวลา English (United States), และแป้นพิมพ์ US')
      return
    }
    if (step === 6 && !accepted) { reportMistake('ทำเครื่องหมาย I accept the license terms ก่อนกด Next'); return }
    if (step === 7 && installType !== 'custom') { reportMistake('เลือก Custom: Install Windows only (advanced) สำหรับการติดตั้งใหม่'); return }
    if (step === 8) { reportMistake('เลือก Disk 0 Unallocated Space แล้วกด New, กำหนดขนาด และ Apply'); return }
    if (step === 9) { reportMistake('กดยืนยัน OK ในหน้าต่าง Windows Setup ก่อนดำเนินการต่อ'); return }
    if (step === 10) { reportMistake('เลือกพื้นที่ Unallocated บน Disk 0 แล้วกด New'); return }
    if (step === 11) { reportMistake('กด Apply เพื่อยืนยันการแบ่งพาร์ทิชัน'); return }
    if (step === 12) {
      if (!selectedWindowsPartition || selectedPartitionId !== windowsPartitionId) {
        reportMistake('เลือก Disk 0 Partition 2 ซึ่งเป็นพาร์ทิชันหลักที่สร้างไว้ แล้วกด Next')
        return
      }
      setProgress(0)
      setStep(13)
      return
    }
    if (step === 19) {
      if (!accountName.trim()) { reportMistake('กรอกชื่อผู้ใช้ก่อนกด Next'); return }
      if (accountPassword && !confirmPassword) { reportMistake('กรอกรหัสผ่านซ้ำในช่อง Re-enter password'); return }
      if (accountPassword !== confirmPassword) { reportMistake('รหัสผ่านทั้งสองช่องไม่ตรงกัน ตรวจและกรอกใหม่'); return }
      if (accountPassword && !passwordHint.trim()) { reportMistake('เพิ่ม Password hint เพื่อช่วยจำรหัสผ่านก่อนกด Next'); return }
      setStep(20)
      onComplete?.({ elapsedSeconds: Math.floor((Date.now() - startedAtRef.current) / 1000) })
      return
    }
    if (step === 20) { reset(); return }
    if ([0, 1, 2, 3, 5, 13, 15, 16, 17].includes(step)) return
    setStep((value) => Math.min(value + 1, SIM_STEPS.length - 1))
  }

  const skipProductKey = () => {
    setError('')
    setActivationPage(false)
    setEditionPage(true)
  }

  const continueFromEdition = () => {
    if (selectedEdition !== 'Windows 10 Home') {
      reportMistake('เลือก Windows 10 Home ตามภาพตัวอย่างและ edition ที่ใช้ในแบบฝึกนี้')
      return
    }
    setError('')
    setEditionPage(false)
    setStep(6)
  }

  const submitProductKey = () => {
    if (productKey.replace(/-/g, '').length !== 25) {
      reportMistake('กรอกรหัส Product Key ให้ครบ 25 ตัว หรือเลือก I don’t have a product key')
      return
    }
    setError('')
    setActivationPage(false)
    setStep(6)
  }

  const goBack = () => {
    setError('')
    if (partitionDialog) { setPartitionDialog(null); if (step === 11) setStep(10); return }
    if (partitionPrompt) { setPartitionPrompt(null); return }
    if (step === 9 || step === 10) {
      setPartitions(INITIAL_PARTITIONS)
      setSelectedPartitionId('unallocated-0')
      setWindowsPartitionId('')
      setGuideLayoutReady(false)
      setPendingSystemPartition(null)
      setPartitionDialog(null)
      setStep(8)
      return
    }
    if (step === 11 || step === 12) setStep(10)
    else setStep((value) => Math.max(value - 1, 0))
  }

  const reset = () => {
    startedAtRef.current = Date.now()
    setStep(0)
    setMode('learning')
    setShowHint(false)
    setMistakes(0)
    setError('')
    setBootChoice('windows')
    setLanguage('English (United States)')
    setTimeFormat('English (United States)')
    setKeyboard('US')
    setAccepted(false)
    setInstallType('custom')
    setShowInstallHelp(false)
    setPartitions(INITIAL_PARTITIONS)
    setSelectedPartitionId('unallocated-0')
    setWindowsPartitionId('')
    setPartitionSize('20767')
    setPartitionDialog(null)
    setPendingSystemPartition(null)
    setPartitionPrompt(null)
    setGuideLayoutReady(false)
    setAccountName('MUIT')
    setAccountPassword('')
    setConfirmPassword('')
    setPasswordHint('')
    setActivationPage(false)
    setEditionPage(false)
    setSelectedEdition('Windows 10 Home')
    setProductKey('')
    setProgress(0)
  }

  const progressPercent = step === 20 ? 100 : Math.round((displayStepIndex / (DISPLAY_STEPS.length - 1)) * 100)
  const setupStatus = step === 20 ? 'เสร็จแล้ว' : step >= 13 && step <= 15 ? 'กำลังติดตั้ง' : step === 0 ? 'พร้อมเริ่ม' : step === 2 || step === 3 ? 'กำลังบูต' : 'กำลังฝึก'

  const renderPartitionTable = () => <div className="partition-setup manual-partition-setup">
    <h2>Where do you want to install Windows?</h2>
    <div className="partition-table">
      <div className="partition-table-head"><span>Name</span><span>Total size</span><span>Free space</span><span>Type</span></div>
      {partitions.map((partition) => <button key={partition.id} type="button" aria-pressed={selectedPartitionId === partition.id} className={'partition-row ' + (selectedPartitionId === partition.id ? 'selected' : '')} onClick={() => { setSelectedPartitionId(partition.id); setError('') }}>
        <span>▰　{partition.name}{partition.formatted ? ' · ' + partition.fileSystem : ''}</span><span>{formatPartitionSize(partition.total)}</span><span>{formatPartitionSize(partition.free)}</span><span>{partition.type}</span>
      </button>)}
    </div>
    <div className="partition-toolbar">
      <button type="button" onClick={() => { setPartitions(INITIAL_PARTITIONS); setSelectedPartitionId('unallocated-0'); setWindowsPartitionId(''); setGuideLayoutReady(false); setPendingSystemPartition(null); setPartitionDialog(null); setError('Disk list refreshed') }}>⟳ Refresh</button>
      <button type="button" onClick={openDeletePartition} disabled={!selectedPartition || selectedPartition.type === 'Unallocated'}>✕ Delete</button>
      <button type="button" onClick={openFormatPartition} disabled={!selectedPartition || selectedPartition.type === 'Unallocated'}>▤ Format</button>
      <button type="button" onClick={openNewPartition} disabled={!selectedPartition || selectedPartition.type !== 'Unallocated'}>✦ New</button>
      <button type="button" onClick={openExtendPartition} disabled={!selectedPartition || selectedPartition.type !== 'Primary'}>↔ Extend</button>
      {partitionDialog?.type === 'new' && (step === 8 || step === 11) && <div className="partition-size-panel"><label>Size <input type="number" min="1" max={partitionDialog.partition.total} value={partitionSize} onChange={(event) => setPartitionSize(event.target.value)} /> MB</label><button type="button" onClick={applyPartitionDialog}>Apply</button><button type="button" onClick={() => { setPartitionDialog(null); setError(''); if (step === 11) setStep(10) }}>Cancel</button></div>}
    </div>
    <p className={'partition-message ' + (error ? 'has-message' : '')} role="status">{error || (selectedPartition ? 'Disk ' + selectedPartition.drive + ' · ' + selectedPartition.name + ' · ' + formatSize(selectedPartition.total) + ' total, ' + formatSize(selectedPartition.free) + ' free' : 'Select a disk or partition to continue')}</p>
    <p className="partition-risk-note">ตรวจ Disk และ Partition ให้ถูกต้องก่อนลบ ฟอร์แมต หรือกด Next เพราะข้อมูลในพาร์ทิชันปลายทางจะถูกเขียนทับ</p>
    {partitionDialog && !(partitionDialog.type === 'new' && (step === 8 || step === 11)) && <div className="driver-dialog-backdrop"><div className="driver-dialog partition-confirm-dialog" role="dialog" aria-modal="true">
      <h3>{partitionDialog.type === 'new' ? 'Create a new partition' : 'Extend partition'}</h3>
      <p>{partitionDialog.type === 'new' ? 'ใส่ขนาดพาร์ทิชันจาก Unallocated Space บน Disk ' + partitionDialog.partition.drive : 'ใส่ขนาดพื้นที่ที่ต้องการเพิ่มให้พาร์ทิชัน'}</p>
      <label className="partition-dialog-field">Size <input type="number" min="1" max={partitionDialog.partition.total} value={partitionSize} onChange={(event) => setPartitionSize(event.target.value)} /> MB <small>Available: {formatSize(partitionDialog.partition.total)}</small></label>
      <div><button className="partition-danger-button" type="button" onClick={applyPartitionDialog}>Apply</button><button type="button" onClick={() => { setPartitionDialog(null); setError('ยกเลิกรายการจัดการพาร์ทิชันแล้ว') }}>Cancel</button></div>
    </div></div>}
    {partitionPrompt && <div className="driver-dialog-backdrop partition-confirm-backdrop"><div className="driver-dialog partition-confirm-dialog" role="alertdialog" aria-modal="true">
      <h3>{partitionPrompt.type === 'delete' ? 'Delete partition' : 'Format partition'}</h3>
      <p><strong>{partitionPrompt.partition.name}</strong> · {formatSize(partitionPrompt.partition.total)} on Disk {partitionPrompt.partition.drive}</p>
      <p className="partition-risk">การดำเนินการนี้ลบข้อมูลในพาร์ทิชันที่เลือกและย้อนกลับไม่ได้ในเครื่องจริง</p>
      <div><button className="partition-danger-button" type="button" onClick={confirmPartitionPrompt}>{partitionPrompt.type === 'delete' ? 'Delete' : 'Format as NTFS'}</button><button type="button" onClick={() => setPartitionPrompt(null)}>Cancel</button></div>
    </div></div>}
    {step === 9 && <div className="driver-dialog-backdrop partition-confirm-backdrop"><div className="driver-dialog partition-confirm-dialog windows-partition-warning-dialog" role="alertdialog" aria-modal="true">
      <div className="partition-dialog-title"><span className="partition-dialog-app-icon">▦</span>Windows Setup<span className="partition-dialog-close">×</span></div>
      <div className="partition-warning-message"><span className="partition-info-icon">i</span><p>To ensure that all Windows features work correctly, Windows might create additional partitions for system files.</p></div>
      <div className="partition-dialog-actions"><button className="partition-default-button" type="button" onClick={confirmSystemPartitionCreation}>OK</button><button type="button" onClick={goBack}>Cancel</button></div>
    </div></div>}
  </div>

  const renderSetup = () => {
    if (step === 4) return <><div className="sim-windows-mark" aria-label="Windows">▦</div><div className="manual-language-fields">
      <label className="sim-field">Language to install<select autoFocus value={language} onChange={(event) => setLanguage(event.target.value)}><option>English (United States)</option><option>Thai</option></select></label>
      <label className="sim-field">Time and currency format<select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value)}><option>English (United States)</option><option>Thai (Thailand)</option></select></label>
      <label className="sim-field">Keyboard or input method<select value={keyboard} onChange={(event) => setKeyboard(event.target.value)}><option>US</option><option>Thai Kedmanee</option></select></label>
      </div><p className="sim-help manual-language-help">Enter your language and other preferences, and click “Next” to continue.</p>
    </>
    if (step === 5) return editionPage ? <div className="manual-edition-content">
      <h2>Select the operating system you want to install</h2>
      <div className="manual-edition-list" role="listbox" aria-label="Operating system edition">
        <div className="manual-edition-header"><span>Operating system</span><span>Architecture</span><span>Date modified</span></div>
        {WINDOWS_EDITIONS.map((edition) => <button key={edition} className={'manual-edition-row ' + (selectedEdition === edition ? 'selected' : '')} type="button" role="option" aria-selected={selectedEdition === edition} onClick={() => { setSelectedEdition(edition); setError('') }}><span>{edition}</span><span>x64</span><span>8/8/2020</span></button>)}
      </div>
      <div className="manual-edition-description"><span>Description:</span><span>{selectedEdition}</span></div>
      {error && <p className="manual-edition-warning" role="alert">⚠ {error}</p>}
      <button className="manual-edition-next" type="button" onClick={continueFromEdition}>Next</button>
    </div> : activationPage ? <div className="manual-activation-content">
      <h2>Activate Windows</h2>
      <p>If this is the first time you’re installing Windows on this PC (or you’re installing a different edition), you need to enter a valid Windows product key. Your product key should be in the confirmation email you received after buying a digital copy of Windows or on a label inside the box that Windows came in.</p>
      <p>The product key looks like this: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
      <p>If you’re reinstalling Windows, select I don’t have a product key. Your copy of Windows will be automatically activated later.</p>
      <input className="manual-product-key-input" type="text" value={productKey} maxLength={29} autoFocus autoComplete="off" aria-label="Windows product key" placeholder="" onChange={(event) => { setProductKey(formatProductKey(event.target.value)); setError('') }} />
      {error && <p className="manual-activation-warning" role="alert">⚠ {error}</p>}
      <div className="manual-activation-footer">
        <button className="manual-privacy-statement" type="button" onClick={() => reportMistake('ไม่ต้องกด Privacy Statement ให้เลือก I don’t have a product key เพื่อไปต่อ')}>Privacy Statement</button>
        <button className="manual-product-key-skip" type="button" onClick={skipProductKey}>I don’t have a product key</button>
        <button className="manual-activation-next" type="button" disabled={!productKey} onClick={submitProductKey}>Next</button>
      </div>
    </div> : <div className="sim-install-now"><div className="sim-windows-mark" aria-label="Windows">▦</div><h2>Windows</h2><button className="sim-install-now-btn" type="button" onClick={() => { setError(''); setActivationPage(true) }}>Install now</button><button className="sim-text-button sim-repair-link" type="button" onClick={() => reportMistake('Repair your computer เปิดเครื่องมือซ่อมระบบ ให้กลับมากด Install now เพื่อทำตามคู่มือ')}>Repair your computer</button><span>© 2015 Microsoft Corporation. All rights reserved.</span></div>
    if (step === 6) return <><div className="sim-windows-mark">▦</div><h2>License terms</h2><div className="sim-license-box">Your use of this software is subject to the terms and conditions of the license agreement by which you acquired this software. If you are a volume license customer, use of this software is subject to your volume license agreement. You may not use this software if you have not validly acquired a license for the software from Microsoft or its licensed distributors.<br /><br />EULAID:T1C_1R_1_ED_E_V_en-us</div><label className="sim-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />I accept the license terms.</label></>
    if (step === 7) return <>
      <h2>Which type of installation do you want?</h2>
      <button type="button" className={'sim-choice sim-upgrade-choice ' + (installType === 'upgrade' ? 'selected' : '')} onClick={() => { setInstallType('upgrade'); reportMistake('การติดตั้งใหม่จาก USB ให้เลือก Custom: Install Windows only (advanced) การเลือก Upgrade ใช้กับการอัปเกรดจาก Windows เดิม') }}>
        <strong>Upgrade: Install Windows and keep files, settings, and applications</strong>
        <span>The files, settings, and applications are moved to Windows with this option. This option is only available when a supported version of Windows is already running on the computer.</span>
      </button>
      <button type="button" className={'sim-choice sim-custom-choice ' + (installType === 'custom' ? 'selected' : '')} onClick={() => { setInstallType('custom'); setError(''); setShowInstallHelp(false); setStep(8) }}>
        <strong>Custom: Install Windows only (advanced)</strong>
        <span>The files, settings, and applications aren’t moved to Windows with this option. If you want to make changes to partitions and drives, start the computer using the installation disc. We recommend backing up your files before you continue.</span>
      </button>
      <button type="button" className="sim-text-button sim-install-help-link" aria-expanded={showInstallHelp} onClick={() => setShowInstallHelp((visible) => !visible)}>Help me decide</button>
      {showInstallHelp && <p className="sim-install-help-copy">Upgrade keeps files and apps from an existing Windows installation. Choose Custom for a clean installation from USB and to manage disk partitions.</p>}
    </>
    if (step >= 8 && step <= 12) return renderPartitionTable()
    if (step === 15) return <div className="manual-restart-required">
      <h2>Windows needs to restart to continue</h2>
      <div className="manual-restart-install-progress" role="progressbar" aria-label="Windows Setup restart progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="92"><span /></div>
      <p>Restarting in 1 second</p>
      <button type="button" onClick={() => { setError(''); setStep(16) }}>Restart now</button>
    </div>
    if (step === 13 || step === 14) {
      const readyPercent = Math.min(100, Math.round((progress / 45) * 100))
      const statuses = [
        { label: 'Copying Windows files', complete: true },
        { label: `Getting files ready for installation${step === 14 ? '' : ` (${readyPercent}%)`}`, complete: step === 14 || progress >= 45, active: step === 13 && progress < 45 },
        { label: 'Installing features', complete: step === 14 || progress >= 70, active: step === 13 && progress >= 45 && progress < 70 },
        { label: 'Installing updates', complete: step === 14 || progress >= 90, active: step === 13 && progress >= 70 && progress < 90 },
        { label: 'Finishing up', complete: step === 14, active: step === 13 && progress >= 90 },
      ]
      return <div className="manual-installing">
        <h2>Installing Windows</h2>
        <p className="manual-install-status-label">Status</p>
        <ul aria-live="polite">{statuses.map((status) => <li key={status.label} className={(status.complete ? 'complete ' : '') + (status.active ? 'active' : '')}>
          <span className="manual-install-check" aria-hidden="true">{status.complete ? '✓' : ''}</span><span>{status.active ? <strong>{status.label}</strong> : status.label}</span>
        </li>)}</ul>
      </div>
    }
    if (step === 15) return <div className="manual-restart-screen"><div className="sim-windows-mark">▦</div><p>Restarting your PC</p><span className="manual-spinner" /><small>Windows will continue setup after restart</small></div>
    if (step === 16) return <div className="manual-windows-start-screen" role="status" aria-label="Windows is getting ready">
      <div className="manual-windows-start-logo" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="manual-windows-start-loading"><span className="manual-windows-start-spinner" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--dot-index': index }} />)}</span><p>Getting ready</p></div>
    </div>
    if (step === 17) return <div className="manual-express-screen"><h2>Get going fast</h2><p>Choose settings that work best for you. You can change these settings any time.</p><p>Express settings will enable recommended options for Windows and apps.</p><p>You can review privacy and personalization choices after setup.</p><button type="button" className="sim-next manual-express-button" onClick={() => { setError(''); setStep(18) }}>Use Express settings <span>›</span></button><button type="button" className="sim-text-button" onClick={() => reportMistake('คู่มือฉบับนี้ให้เลือก Use Express settings เพื่อดำเนินการต่อ')}>Customize settings</button></div>
    if (step === 18) return <div className="manual-connect-screen">
      <h2>Choose how you’ll connect</h2>
      <p className="manual-connect-intro">You can connect Windows to your organization in one of two ways:</p>
      <div className="manual-connect-options" role="group" aria-label="Choose how to connect">
        <button type="button" aria-pressed="false" onClick={() => reportMistake('Join Azure AD ไม่ใช่ตัวเลือกตามขั้นตอนฝึกนี้ ให้เลือก Join a domain เพื่อดำเนินการต่อ')}>
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 8V6.5A2.5 2.5 0 0 1 12.5 4h7A2.5 2.5 0 0 1 22 6.5V8M4 10h24v16H4zM4 15h24M13 14v3h6v-3" /></svg><span>Join Azure AD</span>
        </button>
        <button type="button" className="selected" aria-pressed="true" onClick={() => { setError(''); setStep(19) }}>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="9" r="6" /><path d="M4.5 28c.5-6.5 4.8-10 11.5-10s11 3.5 11.5 10z" /></svg><span>Join a domain</span>
        </button>
      </div>
      <p className="manual-connect-description">If you plan to join your PC to a domain, we’ll help you set up a local account now. When setup is finished, join the domain as you have in the past.</p>
      {error && <p className="manual-connect-warning" role="alert">⚠ {error}</p>}
      <p className="manual-connect-privacy">Privacy Statement for Windows and Microsoft services</p>
      <svg className="manual-connect-privacy-icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="M5 16h22M16 5c3 3 4.5 6.7 4.5 11S19 24 16 27m0-22c-3 3-4.5 6.7-4.5 11S13 24 16 27M23 8l4 1-1 4M27 9a13 13 0 0 1-4 18" /></svg>
      <button className="manual-connect-continue" type="button" onClick={() => { setError(''); setStep(19) }}>Continue</button>
    </div>
    if (step === 19) return <div className="manual-account-setup">
      <h2>Create an account for this PC</h2>
      <p className="manual-account-intro">If you want to use a password, choose something that will be easy for you to remember but hard for others to guess.</p>
      <label className="manual-account-label" htmlFor="manual-account-name">Who’s going to use this PC?</label>
      <div className="manual-account-name-field"><input id="manual-account-name" value={accountName} maxLength={30} onChange={(event) => { setAccountName(event.target.value); setError('') }} autoComplete="username" /><button type="button" aria-label="Clear account name" onClick={() => { setAccountName(''); setError('') }}>×</button></div>
      <h3>Make it secure.</h3>
      <div className="manual-account-password-fields">
        <input type="password" placeholder="Enter password" aria-label="Enter password" value={accountPassword} autoComplete="new-password" onChange={(event) => { setAccountPassword(event.target.value); setError('') }} />
        <input type="password" placeholder="Re-enter password" aria-label="Re-enter password" value={confirmPassword} autoComplete="new-password" onChange={(event) => { setConfirmPassword(event.target.value); setError('') }} />
        <input type="text" placeholder="Password hint" aria-label="Password hint" value={passwordHint} autoComplete="off" onChange={(event) => { setPasswordHint(event.target.value); setError('') }} />
      </div>
      {error && <p className="manual-account-warning" role="alert">⚠ {error}</p>}
      <svg className="manual-account-privacy-icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="M5 16h22M16 5c3 3 4.5 6.7 4.5 11S19 24 16 27m0-22c-3 3-4.5 6.7-4.5 11S13 24 16 27M23 8l4 1-1 4M27 9a13 13 0 0 1-4 18" /></svg>
      <button className="manual-account-next" type="button" onClick={goNext}>Next</button>
    </div>
    return <div className="manual-desktop-screen"><div className="manual-desktop-icon">▣<span>This PC</span></div><div className="manual-desktop-taskbar"><span>▦</span><span>Search the web and Windows</span><span className="sim-clock">09:41　06/10/2026</span></div><div className="manual-desktop-welcome"><strong>Windows 10</strong><p>Setup complete{accountName ? ' · ' + accountName : ''}</p></div></div>
  }

  const renderBios = () => {
    if (step === 0) return <div className="manual-post-screen"><div className="manual-post-brand">DELL</div><p>Press <b>F12</b> for Boot Options</p><div className="manual-post-hardware">BIOS Revision: 1.18.0<br />Memory: 16384 MB<br />Storage: SATA SSD detected</div><button type="button" onClick={() => { setError(''); setStep(1) }}>กด F12 เพื่อเปิดเมนูบูต</button><small>ฝึกกด F12 บนแป้นพิมพ์ได้</small></div>
    return <div className="manual-boot-menu" aria-label="UEFI Boot Menu">
      <div className="manual-boot-instructions">Use the ↑ (Up) and ↓ (Down) arrow keys to move the pointer to the desired boot device.<br />Press Enter to attempt the boot or ESC to Cancel. (* = Password Required)</div>
      <div className="manual-boot-status">Boot mode is set to: UEFI; Secure Boot: OFF</div>
      <div className="manual-boot-list" role="listbox" aria-label="Boot devices">
        {BOOT_MENU_OPTIONS.map((option, index) => {
          const previous = BOOT_MENU_OPTIONS[index - 1]
          const showGroup = !previous || previous.group !== option.group
          return <div className="manual-boot-item-wrap" key={option.id}>
            {showGroup && <div className="manual-boot-group">{option.group}</div>}
            <button type="button" role="option" aria-selected={bootChoice === option.id} className={'manual-boot-entry ' + (bootChoice === option.id ? 'selected' : '')} onClick={() => { setBootChoice(option.id); setError('') }}>
              {option.group === 'UEFI BOOT:' && <span className="manual-boot-tree">{index === 0 ? '└─' : '  └─'}</span>}{option.label}
            </button>
          </div>
        })}
      </div>
      <div className="manual-boot-footer"><span>↑ / ↓ Select device</span><button type="button" className="manual-boot-enter" onClick={attemptBoot}>ENTER Boot</button><span>ESC Cancel</span></div>
    </div>
  }

  const renderBootProgress = () => step === 2
    ? <div className="manual-boot-loading"><div className="manual-boot-windows-mark"><i /><i /><i /><i /></div><div className="manual-boot-spinner" /><p>Starting from UEFI: KingstonDT 101 G2 PMAP</p><small>Loading Windows installation files…</small></div>
    : <div className="manual-setup-loading"><div className="manual-setup-loading-window"><div className="manual-setup-loading-title"><span>▦</span> Windows Setup</div><div className="manual-setup-loading-content"><div className="manual-setup-loading-mark">▦</div><p>Windows is starting</p><div className="manual-loading-track"><span /></div><small>Please wait</small></div></div></div>

  const actionLabel = () => {
    if (step === 4 || step === 6 || step === 12) return 'Next'
    if (step === 8) return 'Next'
    if (step === 9) return 'รอยืนยัน Windows Setup'
    if (step === 10) return 'Next'
    if (step === 11) return 'รอกด Apply'
    if (step === 20) return 'เริ่มแบบฝึกใหม่'
    return ''
  }

  return <div className="windows-practice-shell">
    <header className="topnav windows-topnav">
      <div><div className="windows-topnav-title"><h1>ฝึกติดตั้ง Windows 10</h1><span className={'windows-topnav-badge ' + (step === 20 ? 'is-complete' : '')}>{step === 20 ? '● ติดตั้งแล้ว' : '○ ห้องฝึกจำลอง'}</span></div><p className="sub">จำลองตามคู่มือ ตั้งแต่เข้า BIOS จนถึงหน้า Desktop</p></div>
      <div className="topnav-stats"><div className="stat"><div className="label">ขั้นตอน</div><div className="val cyan">{displayStepIndex + 1} / {DISPLAY_STEPS.length}</div></div><div className="stat"><div className="label">ข้อผิดพลาด</div><div className="val red">{mistakes}</div></div><div className="stat"><div className="label">สถานะ</div><div className="val">{setupStatus}</div></div><button type="button" className="btn" onClick={reset}>เริ่มใหม่</button></div>
    </header>
    <main className="learning-page windows-page">
      <div className="windows-sim-layout">
        <aside className="panel panel-left windows-step-panel" aria-label="ขั้นตอนการติดตั้ง Windows">
          <h2>โหมด</h2><div className="mode-row"><button type="button" className={'btn-mode ' + (mode === 'learning' ? 'active-learn' : '')} onClick={() => setMode('learning')}>เรียนรู้</button><button type="button" className={'btn-mode ' + (mode === 'practice' ? 'active-prac' : '')} onClick={() => { setMode('practice'); setShowHint(false) }}>ฝึกเอง</button></div>
          <div className="windows-step-progress-label"><span>ความคืบหน้า</span><span>{progressPercent}%</span></div><div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: progressPercent + '%' }} /></div>
          <h2>ขั้นตอนการติดตั้ง</h2><ul className="step-list windows-install-step-list">{DISPLAY_STEPS.map((label, index) => { const done = displayStepIndex > index || step === 20; const current = displayStepIndex === index && step !== 20; return <li key={label} className={(done ? 'done ' + (mode === 'practice' ? 'done-practice' : '') : current ? 'current' : '')}><span className="windows-step-marker">{done ? '✓' : current ? '→' : (index + 1) + '.'}</span><span>{label}</span></li> })}</ul>
          <div className="task-box"><h3>ขั้นตอนปัจจุบัน</h3><p>{step === 20 ? 'ติดตั้งเสร็จแล้ว ตรวจหน้า Desktop เพื่อยืนยันผล' : DISPLAY_GUIDANCE[displayStepIndex]}</p>{mode === 'learning' && step !== 20 && <button type="button" className="btn-hint" onClick={() => setShowHint((value) => !value)}>{showHint ? 'ซ่อนคำใบ้' : 'ดูคำใบ้'}</button>}{showHint && mode === 'learning' && step !== 20 && <div className="hint-box">คำใบ้: {DISPLAY_HINTS[displayStepIndex]}</div>}</div>
          {mistakes > 0 && <div className="sim-mistake-count" aria-live="polite"><span>ข้อผิดพลาดที่ตรวจพบ</span><strong>{mistakes}</strong></div>}
          {error && <div className="feedback error" role="alert">{error}</div>}
          <button className="sim-reference sim-open-guide" type="button" onClick={() => setGuideOpen(true)}>เปิดคู่มือฉบับฝึก</button>
          <div className="step-footer">ขั้นที่ {displayStepIndex + 1} / {DISPLAY_STEPS.length}</div>
        </aside>
        <section className={'windows-simulator manual-simulator manual-stage-' + step + (editionPage ? ' manual-edition-page' : activationPage ? ' manual-activation-page' : '')}>
          <div className="sim-screen manual-sim-screen">
          {step <= 3 || step === 16 || step === 18 || step === 19 || step === 20
              ? (step <= 1 ? renderBios() : step <= 3 ? renderBootProgress() : renderSetup())
              : <div className="setup-window-shell manual-setup-shell">
                <div className="setup-window-title">{(editionPage || activationPage || step === 6 || step === 7 || (step >= 8 && step <= 12)) && <button type="button" className="setup-title-back" aria-label="Back" onClick={editionPage ? () => { setEditionPage(false); setActivationPage(true); setError('') } : activationPage ? () => { setActivationPage(false); setError('') } : goBack}>‹</button>}<span className="setup-title-icon">▦</span>Windows Setup<span className="setup-window-controls" aria-hidden="true"><i>－</i><i>□</i><i>×</i></span></div>
                <div className={'setup-window-content manual-setup-content manual-content-stage-' + step}>{renderSetup()}</div>
                <div className="setup-window-actions"><p className={'sim-error ' + (error ? 'has-error' : '')} role={error ? 'alert' : 'status'} aria-live="assertive">{error ? '⚠ ' + error : ''}</p><div className="sim-actionbar">
                  {step === 4 && <span className="manual-language-copyright">© 2015 Microsoft Corporation. All rights reserved.</span>}
                  {step >= 8 && step <= 12 && <button type="button" className="sim-back" onClick={goBack}>Back</button>}
                  {actionLabel() && <button type="button" className="sim-next" disabled={step === 9 || step === 11} onClick={() => step === 17 ? setStep(18) : goNext()}>{actionLabel()} <span>›</span></button>}
                </div></div>
              </div>}
            {step === 0 && <p className={'sim-error manual-boot-error ' + (error ? 'has-error' : '')} role={error ? 'alert' : 'status'}>{error ? '⚠ ' + error : ''}</p>}
            {step === 1 && <p className={'sim-error manual-boot-error ' + (error ? 'has-error' : '')} role={error ? 'alert' : 'status'} aria-live="assertive">{error ? '⚠ ' + error : ''}</p>}
            {((activationPage || editionPage) && step === 5 || step === 6 || step === 7 || (step >= 8 && step <= 15)) && <div className="setup-statusbar"><span><b>1</b> Collecting information</span><i /><span><b>2</b> Installing Windows</span>{((activationPage || editionPage) && step === 5 || step === 13 || step === 14 || step === 15) && <div className="setup-status-progress" aria-hidden="true"><span style={{ width: (step === 14 ? 100 : step === 15 ? 92 : step === 13 ? progress : editionPage ? 26 : 22) + '%' }} /></div>}</div>}
          </div>
          {step === 20 && <div className="sim-actionbar manual-desktop-action"><button type="button" className="sim-next" onClick={reset}>เริ่มฝึกอีกครั้ง ↻</button></div>}
        </section>
      </div>
    </main>
    {guideOpen && <div className="manual-guide-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setGuideOpen(false) }}>
      <section className="manual-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="manual-guide-title">
        <header className="manual-guide-header">
          <div><span className="manual-guide-eyebrow">คู่มือฉบับฝึก · เรียบเรียงใหม่</span><h2 id="manual-guide-title">ติดตั้ง Windows 10 แบบ Clean Install</h2><p>ไล่ตามลำดับหน้าจอในแบบฝึก พร้อมจุดตรวจและคำเตือนก่อนทำกับเครื่องจริง</p></div>
          <button type="button" className="manual-guide-close" aria-label="ปิดคู่มือ" onClick={() => setGuideOpen(false)}>×</button>
        </header>
        <div className="manual-guide-layout">
          <nav className="manual-guide-toc" aria-label="สารบัญคู่มือ">
            <strong>สารบัญ</strong>
            {INSTALL_GUIDE.map((section) => <button type="button" key={section.id} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span>{section.kicker}</span>{section.title}</button>)}
          </nav>
          <div className="manual-guide-content">
            {INSTALL_GUIDE.map((section) => <article id={section.id} className="manual-guide-section" key={section.id}>
              <span className="manual-guide-section-kicker">{section.kicker}</span><h3>{section.title}</h3><p>{section.text}</p>
              <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              {section.note && <p className="manual-guide-note"><strong>ข้อควรจำ</strong>{section.note}</p>}
            </article>)}
            <footer className="manual-guide-sources"><strong>แหล่งข้อมูลและสถานะ</strong><p>ขั้นตอนในเว็บเป็นแบบฝึกจำลอง ข้อมูลการติดตั้งและ license ตรวจทานกับเอกสาร Microsoft</p><a href="https://support.microsoft.com/en-US/Windows/Deployment/Install-Upgrade/reinstall-windows-with-the-installation-media" target="_blank" rel="noreferrer">Microsoft: Reinstall Windows with installation media ↗</a><a href="https://support.microsoft.com/en-us/windows/deployment/install-upgrade/create-installation-media-for-windows" target="_blank" rel="noreferrer">Microsoft: Create installation media for Windows ↗</a><a href="https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro" target="_blank" rel="noreferrer">Microsoft Lifecycle: Windows 10 Home and Pro ↗</a><p className="manual-guide-support-note">หมายเหตุ: Windows 10 Home/Pro สิ้นสุดการสนับสนุนปกติแล้วเมื่อ 14 ตุลาคม 2025; สำหรับเครื่องใช้งานจริงควรเลือก Windows รุ่นที่ยังได้รับการสนับสนุนและเข้ากันได้กับอุปกรณ์</p></footer>
          </div>
        </div>
      </section>
    </div>}
  </div>
}
