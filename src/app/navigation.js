// Route IDs are shared by browser history and the main navigation.
export const HOME_PAGE = 'home'

export const NAV_ITEMS = [
  ['home', '', 'หน้าแรก'],
  ['lesson', '', 'เนื้อหาบทเรียน'],
  ['pretest', '', 'ทดสอบก่อนเรียน'],
  ['assembly', '', 'ประกอบคอมพิวเตอร์'],
  ['windows', '', 'ติดตั้ง Windows'],
  ['posttest', '', 'ทดสอบหลังเรียน'],
]

export const PAGE_IDS = new Set(NAV_ITEMS.map(([id]) => id))
