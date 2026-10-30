export const SIM_STEPS = [
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

export const SIM_GUIDANCE = [
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
  'ตั้งชื่อบัญชีผู้ใช้ NAME และกรอกรหัสผ่านตามต้องการ จากนั้นกด Next',
  'ตรวจหน้า Desktop เพื่อยืนยันว่าติดตั้งและตั้งค่าเครื่องเสร็จแล้ว',
]

export const SIM_HINTS = [
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
  'ตัวอย่างใช้ชื่อบัญชี NAME; รหัสผ่านเป็นตัวเลือกในแบบฝึกและใช้ตรวจสอบในหน้านี้เท่านั้น',
  'เมื่อเห็น Desktop ถือว่าจบขั้นตอนตามคู่มือ',
]

export const DISPLAY_STEPS = [...SIM_STEPS.slice(0, 6), 'Activate Windows', 'เลือก Windows edition', ...SIM_STEPS.slice(6)]
.filter((_, index) => index !== 12 && index !== 13)
export const DISPLAY_GUIDANCE = [...SIM_GUIDANCE.slice(0, 6), 'กรอกรหัส Product Key หากมี หรือเลือก I don’t have a product key เพื่อทำต่อโดยไม่เปิดใช้งานตอนนี้', 'เลือก Windows 10 Home ตามภาพ แล้วกด Next เพื่อไป License terms', ...SIM_GUIDANCE.slice(6)]
.filter((_, index) => index !== 12 && index !== 13)
export const DISPLAY_HINTS = [...SIM_HINTS.slice(0, 6), 'ตามภาพตัวอย่าง ให้เลือก I don’t have a product key เพื่อไปหน้ารายการ Windows edition', 'เลือก Windows 10 Home ที่ถูกไฮไลต์ แล้วกด Next', ...SIM_HINTS.slice(6)]
.filter((_, index) => index !== 12 && index !== 13)

export { WINDOWS_EDITIONS } from './editions.js'

export const INITIAL_PARTITIONS = [
  { id: 'unallocated-0', name: 'Drive 0 Unallocated Space', total: 32766, free: 32766, type: 'Unallocated', drive: 0 },
]

export const BOOT_MENU_OPTIONS = [
  { id: 'windows', label: 'Windows Boot Manager', group: 'UEFI BOOT:' },
  { id: 'usb', label: 'UEFI: KingstonDT 101 G2 PMAP', group: 'UEFI BOOT:' },
  { id: 'bios', label: 'BIOS Setup', group: 'OTHER OPTIONS:' },
  { id: 'flash', label: 'BIOS Flash Update', group: 'OTHER OPTIONS:' },
  { id: 'diagnostics', label: 'Diagnostics', group: 'OTHER OPTIONS:' },
  { id: 'mebx', label: 'Intel(R) Management Engine BIOS Extension (MEBx)', group: 'OTHER OPTIONS:' },
  { id: 'boot-settings', label: 'Change Boot Mode Settings', group: 'OTHER OPTIONS:' },
]


