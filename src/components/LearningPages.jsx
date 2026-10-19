import React, { useState } from 'react'

const QUESTION_BANKS = {
  assembly: {
    pretest: [
      { q: 'อุปกรณ์ใดเป็นหน่วยประมวลผลหลักของคอมพิวเตอร์?', choices: ['RAM', 'CPU', 'SSD', 'PSU'], answer: 1, why: 'CPU ทำหน้าที่ประมวลผลคำสั่งหลักของระบบ' },
      { q: 'ควรติดตั้ง CPU ลงบนอุปกรณ์ใด?', choices: ['เมนบอร์ด', 'เคส', 'พาวเวอร์ซัพพลาย', 'ฮาร์ดดิสก์'], answer: 0, why: 'CPU ติดตั้งบนซ็อกเก็ตของเมนบอร์ด' },
      { q: 'RAM ใช้ทำอะไรเป็นหลัก?', choices: ['เก็บข้อมูลชั่วคราวขณะเครื่องทำงาน', 'จ่ายไฟให้เครื่อง', 'เก็บไฟล์เมื่อปิดเครื่อง', 'ระบายความร้อน CPU'], answer: 0, why: 'RAM เก็บข้อมูลชั่วคราวที่ระบบกำลังใช้งาน' },
      { q: 'อุปกรณ์ใดเก็บไฟล์ไว้ได้แม้ปิดเครื่อง?', choices: ['RAM', 'CPU', 'SSD', 'พัดลมเคส'], answer: 2, why: 'SSD เป็นอุปกรณ์เก็บข้อมูลถาวร' },
      { q: 'PSU มีหน้าที่ใด?', choices: ['แสดงภาพ', 'จ่ายไฟให้ชิ้นส่วน', 'ประมวลผลคำสั่ง', 'เก็บไฟล์'], answer: 1, why: 'PSU แปลงและจ่ายพลังงานให้กับอุปกรณ์ในเครื่อง' },
      { q: 'ก่อนทำงานภายในเคสควรทำสิ่งใด?', choices: ['เปิดเครื่องทิ้งไว้', 'ถอดสายไฟและลดความเสี่ยงไฟฟ้าสถิต', 'วางเมนบอร์ดบนพรม', 'จับหน้าสัมผัสของ RAM'], answer: 1, why: 'ตัดไฟก่อนทำงาน และใช้วิธีป้องกันไฟฟ้าสถิตที่เหมาะสม' },
      { q: 'เมนบอร์ดควรวางบนอะไรเมื่อติดตั้งลงในเคส?', choices: ['เสารองเมนบอร์ดที่ตรงกับรูยึด', 'พื้นเคสโดยตรง', 'สายไฟ PSU', 'พัดลม CPU'], answer: 0, why: 'เสารองช่วยยกเมนบอร์ดพ้นพื้นเคสและตรงกับตำแหน่งสกรู' },
      { q: 'สายไฟหลัก 24-pin ต่อเข้ากับอุปกรณ์ใด?', choices: ['เมนบอร์ด', 'การ์ดจอ', 'SSD แบบ M.2', 'พัดลมเคส'], answer: 0, why: 'ขั้วต่อ ATX 24-pin เป็นไฟหลักของเมนบอร์ด' },
      { q: 'อุปกรณ์ใดมักใช้ส่งภาพจากคอมพิวเตอร์ไปจอ?', choices: ['HDMI หรือ DisplayPort', 'สาย SATA power', 'สายไฟ CPU', 'สาย front panel'], answer: 0, why: 'HDMI และ DisplayPort ใช้ส่งสัญญาณภาพและเสียงไปยังจอ' },
      { q: 'คู่มือเมนบอร์ดช่วยเรื่องใดได้มากที่สุด?', choices: ['ดูตำแหน่งสล็อตและขั้วต่อให้ถูกต้อง', 'เพิ่มความจุ SSD', 'เปลี่ยนรุ่น CPU', 'ทำให้ PSU จ่ายไฟมากขึ้น'], answer: 0, why: 'ผังในคู่มือระบุตำแหน่งสล็อต ขั้วต่อ และวิธีติดตั้งของรุ่นนั้น' },
    ],
    posttest: [
      { q: 'ก่อนวาง CPU ลงซ็อกเก็ต ควรตรวจอะไรเป็นอันดับแรก?', choices: ['ตำแหน่งเครื่องหมายสามเหลี่ยมและแนววาง', 'สีของพัดลมเคส', 'ความยาวสาย SATA', 'ความจุของ SSD'], answer: 0, why: 'จัดแนวเครื่องหมายบน CPU ให้ตรงกับซ็อกเก็ต แล้ววางโดยไม่ฝืนกด' },
      { q: 'เมนบอร์ดมีสล็อต RAM สี่ช่อง คู่มือระบุให้ใช้ A2 และ B2 เมื่อติดตั้งสองแถว ควรทำอย่างไร?', choices: ['ใส่ตามสล็อต A2 และ B2 ในคู่มือ', 'ใส่สล็อตใดก็ได้ติดกัน', 'ใส่ RAM ทั้งสองแถวในสล็อตเดียว', 'ไม่ต้องกดให้ตัวล็อกเข้าที่'], answer: 0, why: 'ให้ยึดตำแหน่งสล็อตตามคู่มือเพื่อใช้งานหน่วยความจำแบบ dual-channel ตามที่บอร์ดกำหนด' },
      { q: 'ซิลิโคนระบายความร้อนควรอยู่ตรงไหน?', choices: ['ระหว่างหน้าสัมผัส CPU กับชุดระบายความร้อน', 'บนขา CPU', 'บนสล็อต RAM', 'ใต้เมนบอร์ด'], answer: 0, why: 'ซิลิโคนช่วยเติมช่องว่างเล็ก ๆ ระหว่าง CPU กับฮีตซิงก์เพื่อถ่ายเทความร้อน' },
      { q: 'สาย EPS/CPU จาก PSU ควรต่อเข้าที่ใด?', choices: ['ขั้วไฟ CPU บริเวณด้านบนของเมนบอร์ด', 'ช่อง SATA data', 'พอร์ตเสียงด้านหลัง', 'สล็อต M.2'], answer: 0, why: 'ขั้ว EPS/CPU จ่ายไฟให้หน่วยประมวลผล ตรวจฉลากและรูปทรงขั้วก่อนเสียบ' },
      { q: 'สาย SATA data ใช้เชื่อมต่ออะไร?', choices: ['ไดรฟ์ SATA กับพอร์ต SATA บนเมนบอร์ด', 'PSU กับเต้ารับผนัง', 'จอกับการ์ดจอ', 'ปุ่มเปิดเครื่องกับ PSU โดยตรง'], answer: 0, why: 'สาย SATA data ส่งข้อมูลระหว่างไดรฟ์ SATA และเมนบอร์ด ส่วนสาย SATA power มาจาก PSU' },
      { q: 'ก่อนขันสกรูเมนบอร์ดลงเคสควรตรวจอะไร?', choices: ['เสารองตรงกับรูยึดและไม่มีเสาเกินตำแหน่ง', 'ทุกสล็อต RAM ว่าง', 'ถอดฝาหลัง PSU', 'เสียบปลั๊กไฟบ้านแล้ว'], answer: 0, why: 'เสารองที่อยู่ผิดตำแหน่งอาจสัมผัสด้านหลังเมนบอร์ดและทำให้เกิดปัญหาไฟฟ้า' },
      { q: 'การติดตั้ง SSD แบบ M.2 ควรทำอย่างไร?', choices: ['เสียบเอียงตามแนวสล็อตแล้วกดลงยึดกับเสารอง', 'วางทับสล็อต RAM', 'ต่อด้วยสาย HDMI', 'กดลงตรง ๆ โดยไม่ดูรอยบาก'], answer: 0, why: 'จัดรอยบากให้ตรง เสียบตามมุมที่ผู้ผลิตกำหนด แล้วขันยึดที่ตำแหน่งรองรับความยาวไดรฟ์' },
      { q: 'กดปุ่มเปิดเครื่องแล้วไม่มีภาพ ควรตรวจขั้นต้นอย่างไรให้ปลอดภัย?', choices: ['ปิดเครื่องและถอดไฟก่อนตรวจสายจอ ไฟการ์ดจอ และการติดตั้ง RAM', 'ถอด RAM ขณะเครื่องเปิด', 'เปิด PSU ค้างไว้แล้วถอด CPU', 'ลัดวงจรขั้วบนเมนบอร์ดด้วยโลหะ'], answer: 0, why: 'ปิดเครื่องและตัดไฟก่อนตรวจการเชื่อมต่อหรือขยับชิ้นส่วน' },
      { q: 'สายปุ่ม Power ของเคสต่อเข้าที่ใด?', choices: ['ขั้ว Front Panel ตามผังในคู่มือเมนบอร์ด', 'ช่อง CPU_FAN', 'พอร์ต SATA data', 'ช่อง EPS/CPU'], answer: 0, why: 'ตำแหน่งขั้ว Front Panel ต่างกันตามรุ่น ให้ดูผังในคู่มือเมนบอร์ด' },
      { q: 'หลังประกอบเสร็จ การตรวจสอบครั้งแรกที่เหมาะสมคืออะไร?', choices: ['ตรวจสายและพัดลม แล้วเปิดดูว่า POST/BIOS พบอุปกรณ์ครบหรือไม่', 'ฟอร์แมตไดรฟ์ทันที', 'ปิดช่องระบายอากาศ', 'ถอดสายไฟเมนบอร์ดออก'], answer: 0, why: 'ตรวจการทำงานพื้นฐานใน POST/BIOS รวมถึงอุณหภูมิ หน่วยความจำ และไดรฟ์ก่อนติดตั้งระบบ' },
    ],
  },
  windows: {
    pretest: [
      { q: 'อุปกรณ์ใดมักใช้เริ่มติดตั้ง Windows ใหม่?', choices: ['USB ติดตั้งที่บูตได้', 'สาย HDMI', 'แผ่นระบายความร้อน', 'สาย SATA data'], answer: 0, why: 'ต้องใช้สื่อที่มีไฟล์ติดตั้งและบูตเครื่องได้ เช่น USB ติดตั้ง' },
      { q: 'ปุ่มใดในตัวอย่างใช้เปิด One-Time Boot Menu?', choices: ['F1', 'F12', 'Caps Lock', 'Print Screen'], answer: 1, why: 'คู่มือฝึกนี้ใช้ F12 เพื่อเปิดเมนูเลือกอุปกรณ์บูตครั้งเดียว' },
      { q: 'หากต้องเริ่มติดตั้งจาก USB ในเมนู UEFI ควรเลือกอะไร?', choices: ['UEFI: ชื่อ USB ติดตั้ง', 'Windows Boot Manager', 'Diagnostics', 'BIOS Flash Update'], answer: 0, why: 'เลือกรายการ USB ที่ขึ้นต้นด้วย UEFI เพื่อเริ่มจากสื่อติดตั้ง' },
      { q: 'ก่อนลบหรือ format พาร์ทิชันควรทำสิ่งใด?', choices: ['สำรองไฟล์และตรวจให้แน่ใจว่าเลือกดิสก์ถูกลูก', 'กด Delete ทุกพาร์ทิชันทันที', 'ถอดปลั๊กระหว่างติดตั้ง', 'เปลี่ยนชื่อไดรฟ์ก่อน'], answer: 0, why: 'การลบหรือ format อาจทำให้ข้อมูลในพาร์ทิชันนั้นสูญหาย' },
      { q: 'การติดตั้งแบบ Custom เหมาะกับกรณีใด?', choices: ['ติดตั้ง Windows ใหม่และเลือกพาร์ทิชันปลายทางเอง', 'เพิ่มความสว่างหน้าจอ', 'เปลี่ยนรหัส Wi-Fi', 'ติดตั้งไดรเวอร์เครื่องพิมพ์เท่านั้น'], answer: 0, why: 'Custom ให้เลือกตำแหน่งติดตั้งและจัดการพาร์ทิชันได้' },
      { q: 'พาร์ทิชันบนดิสก์มีไว้ทำอะไร?', choices: ['แบ่งพื้นที่เก็บข้อมูลออกเป็นส่วน ๆ', 'เพิ่มความเร็วอินเทอร์เน็ต', 'จ่ายไฟให้ CPU', 'เปลี่ยนขนาด RAM'], answer: 0, why: 'พาร์ทิชันแบ่งพื้นที่ของดิสก์เพื่อจัดเก็บระบบหรือข้อมูล' },
      { q: 'Product Key ใช้เพื่ออะไร?', choices: ['เปิดใช้งาน Windows ตามสิทธิ์การใช้งาน', 'แบ่งพาร์ทิชัน', 'เลือกคีย์บอร์ด', 'บูตเข้า BIOS'], answer: 0, why: 'Product Key ใช้ยืนยันสิทธิ์ใช้งาน Windows; ควรเลือก edition ให้ตรงกับ license' },
      { q: 'ถ้าไม่กรอก Product Key ระหว่างติดตั้ง ควรทำอย่างไร?', choices: ['เลือกตัวเลือกทำต่อโดยไม่มี Product Key หากมีสิทธิ์เปิดใช้งานภายหลัง', 'กรอกรหัสสุ่ม', 'ปิดเครื่องทันที', 'ลบ USB ติดตั้ง'], answer: 0, why: 'สามารถทำการติดตั้งต่อได้ในบางกรณี แล้วเปิดใช้งานภายหลังด้วย license ที่ถูกต้อง' },
      { q: 'ระหว่าง Windows คัดลอกและติดตั้งไฟล์ ควรปฏิบัติอย่างไร?', choices: ['เสียบไฟและรอจนกระบวนการเสร็จ', 'ปิดเครื่องเพื่อประหยัดไฟ', 'ถอดดิสก์ปลายทาง', 'กดปุ่มบูต USB ซ้ำทุกครั้ง'], answer: 0, why: 'อย่าขัดจังหวะการติดตั้ง และให้เครื่องมีไฟเลี้ยงต่อเนื่อง' },
      { q: 'หลังเครื่องรีสตาร์ตระหว่างติดตั้ง ควรทำอย่างไร?', choices: ['ปล่อยให้บูตต่อจากดิสก์ภายในและเข้าสู่การตั้งค่า Windows', 'เริ่มติดตั้งจาก USB ซ้ำทุกครั้ง', 'ลบพาร์ทิชันใหม่', 'ตัดไฟทันที'], answer: 0, why: 'หลังคัดลอกไฟล์แล้ว Windows จะเริ่มจากดิสก์ภายในเพื่อทำการตั้งค่าต่อ' },
    ],
    posttest: [
      { q: 'ใน Boot Menu รายการใดตรงกับ USB ติดตั้งในโหมด UEFI?', choices: ['UEFI: KingstonDT 101 G2 PMAP', 'Windows Boot Manager', 'BIOS Setup', 'Diagnostics'], answer: 0, why: 'เลือกชื่อ USB ที่มีคำนำหน้า UEFI ตามสื่อที่เสียบไว้' },
      { q: 'ก่อนเริ่ม Clean Install สิ่งใดสำคัญที่สุด?', choices: ['สำรองข้อมูลและยืนยันดิสก์เป้าหมาย', 'ลบทุกไดรฟ์ที่เห็น', 'ปิดการต่อไฟ', 'เปลี่ยนชื่อคอมพิวเตอร์'], answer: 0, why: 'การติดตั้งใหม่หรือแก้พาร์ทิชันอาจลบข้อมูล จึงต้องสำรองและตรวจดิสก์ก่อน' },
      { q: 'หน้าประเภทการติดตั้งต้องการติดตั้งใหม่และเลือกดิสก์เอง ควรเลือกตัวเลือกใด?', choices: ['Custom: Install Windows only (advanced)', 'Upgrade: Keep files and applications', 'Repair your computer', 'BIOS Setup'], answer: 0, why: 'Custom ใช้เลือกตำแหน่งติดตั้งและจัดการพาร์ทิชันสำหรับการติดตั้งใหม่' },
      { q: 'เมื่อหน้าติดตั้งถามหา Product Key แต่ยังไม่มีรหัส ควรทำอย่างไร?', choices: ['เลือก I don’t have a product key หากต้องการทำต่อและมีแผนเปิดใช้งานภายหลัง', 'ใส่รหัสจากอินเทอร์เน็ตแบบสุ่ม', 'เลือก edition ใดก็ได้โดยไม่ตรวจ license', 'ลบพาร์ทิชันทั้งหมด'], answer: 0, why: 'ตัวเลือกนี้ช่วยทำการติดตั้งต่อได้ แต่ยังต้องมี license ที่ถูกต้องเพื่อเปิดใช้งาน' },
      { q: 'ควรเลือก Windows edition อย่างไร?', choices: ['เลือก edition ที่ตรงกับ license หรือสิทธิ์ดิจิทัลของเครื่อง', 'เลือก edition ที่ชื่อยาวที่สุด', 'เลือกตามขนาด USB', 'เลือกแบบสุ่ม'], answer: 0, why: 'edition ที่ไม่ตรงกับ license อาจเปิดใช้งานไม่ได้' },
      { q: 'ก่อนกด New เพื่อสร้างพาร์ทิชัน ควรเลือกแถวใด?', choices: ['Unallocated Space บนดิสก์เป้าหมายที่ตรวจสอบแล้ว', 'USB ติดตั้ง', 'Windows Boot Manager', 'พาร์ทิชันข้อมูลที่ต้องการเก็บไว้'], answer: 0, why: 'สร้างพาร์ทิชันจากพื้นที่ว่างบนดิสก์ที่ยืนยันแล้ว เพื่อป้องกันกระทบข้อมูลอื่น' },
      { q: 'หลังระบุขนาดพาร์ทิชันแล้วต้องกดอะไรเพื่อยืนยันการสร้าง?', choices: ['Apply', 'Refresh', 'Load driver', 'Repair'], answer: 0, why: 'Apply ใช้ยืนยันขนาดและสร้างพาร์ทิชันตามที่ระบุ' },
      { q: 'ถ้า Windows Setup แจ้งว่าจะสร้างพาร์ทิชันเพิ่มเติมสำหรับไฟล์ระบบ ควรทำอย่างไร?', choices: ['อ่านคำเตือนและกดยืนยันเมื่อเลือกดิสก์และพื้นที่ถูกต้องแล้ว', 'ยกเลิกไฟทั้งหมด', 'ถอด USB ทันที', 'เลือกดิสก์อื่นโดยไม่ตรวจ'], answer: 0, why: 'Windows อาจต้องใช้พาร์ทิชันระบบเพิ่มเติม ตรวจข้อความและเป้าหมายให้ถูกก่อนยืนยัน' },
      { q: 'พาร์ทิชันใดควรเลือกเพื่อติดตั้ง Windows?', choices: ['พาร์ทิชันหลักที่สร้างไว้สำหรับ Windows บนดิสก์เป้าหมาย', 'USB ติดตั้ง', 'พาร์ทิชันสำรองข้อมูลที่ต้องเก็บไว้', 'รายการ Diagnostics'], answer: 0, why: 'เลือกพาร์ทิชันหลักที่ตั้งใจใช้ติดตั้ง โดยตรวจดิสก์ ชนิด และขนาด; หมายเลขอาจต่างกันในแต่ละเครื่อง' },
      { q: 'หลังติดตั้งและเข้าสู่หน้าตั้งค่าครั้งแรก ควรทำอะไร?', choices: ['ตั้งค่าบัญชีและชื่อเครื่องตามต้องการ แล้วตรวจการทำงานหลังเข้าหน้า Desktop', 'ลบพาร์ทิชันระบบ', 'ปิดเครื่องก่อนตั้งค่าบัญชี', 'บูต USB เพื่อติดตั้งซ้ำ'], answer: 0, why: 'ดำเนินการตั้งค่าครั้งแรกให้เสร็จ แล้วตรวจ Desktop และอุปกรณ์พื้นฐาน' },
    ],
  },
}

const QUIZ_TOPICS = [
  { id: 'assembly', icon: '🖥️', title: 'ประกอบคอม', description: 'อุปกรณ์ การติดตั้ง และการตรวจสอบเครื่อง', theme: 'assembly' },
  { id: 'windows', icon: '💿', title: 'ติดตั้ง Windows', description: 'บูตจาก USB จัดการพาร์ทิชัน และตั้งค่า Windows', theme: 'windows' },
]

const HOME_CARDS = [
  { id: 'assembly', icon: '🖥️', number: '01', title: 'ฝึกประกอบคอม', description: 'เรียนรู้ตำแหน่งอุปกรณ์และฝึกประกอบคอมพิวเตอร์ในห้อง 3 มิติ', action: 'เริ่มประกอบ', theme: 'assembly-card' },
  { id: 'windows', icon: '💿', number: '02', title: 'ฝึกลง Windows', description: 'ฝึกตั้งแต่เตรียม USB จนถึงการตั้งค่า Windows ครั้งแรก', action: 'เริ่มฝึกติดตั้ง', theme: 'windows-card' },
  { id: 'pretest', icon: '📝', number: '03', title: 'ก่อนเรียน', description: 'เลือกบทประกอบคอมหรือติดตั้ง Windows บทละ 10 ข้อ', action: 'ทำแบบทดสอบ', theme: 'pretest-card' },
  { id: 'posttest', icon: '🎓', number: '04', title: 'หลังเรียน', description: 'เลือกบทประกอบคอมหรือติดตั้ง Windows บทละ 10 ข้อ', action: 'ทำแบบทดสอบ', theme: 'posttest-card' },
]

export function HomePage({ onNavigate }) {
  return <main className="home-page">
    <section className="home-hero">
      <div className="home-hero-copy"><span className="eyebrow">บทเรียนคอมพิวเตอร์แบบลงมือทำ</span><h1>เรียนรู้คอมพิวเตอร์<br /><span>ทีละขั้นตอน</span></h1><p>ทำแบบทดสอบก่อนเรียน ฝึกประกอบคอมและติดตั้ง Windows แล้วกลับมาทดสอบความเข้าใจอีกครั้ง</p><button className="learning-btn" onClick={() => onNavigate('pretest')}>เริ่มจากแบบทดสอบก่อนเรียน →</button></div>
      <div className="home-hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-device">🖥️</div><span className="floating-chip chip-cpu">CPU</span><span className="floating-chip chip-ram">RAM</span><span className="floating-chip chip-ssd">SSD</span></div>
    </section>
    <section className="home-courses"><div className="home-section-title"><div><span className="eyebrow">เลือกบทเรียน</span><h2>เริ่มฝึกได้เลย</h2></div><span className="course-count">4 บทเรียน</span></div><div className="course-grid">{HOME_CARDS.map((card) => <button key={card.id} className={`course-card ${card.theme}`} onClick={() => onNavigate(card.id)}><div className="course-art"><span className="course-number">{card.number}</span><span className="course-illustration" aria-hidden="true">{card.icon}</span><span className="course-art-glow" /></div><div className="course-content"><h3>{card.title}</h3><p>{card.description}</p><span className="course-action">{card.action} <span aria-hidden="true">→</span></span></div></button>)}</div></section>
    <footer className="home-footer"><span>ประกอบคอมพิวเตอร์ · เรียนรู้ด้วยการลงมือทำ</span><span>เลือกบทเรียนเพื่อเริ่มต้น</span></footer>
  </main>
}

export function LearningPage({ type, onQuizComplete }) {
  const isPre = type === 'pretest'
  const [identityForm, setIdentityForm] = useState({ name: '', number: '', room: '' })
  const [quizStudent, setQuizStudent] = useState(null)
  const [identityError, setIdentityError] = useState('')
  const [topic, setTopic] = useState(null)
  const questions = topic ? QUESTION_BANKS[topic][type] : []
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [recordState, setRecordState] = useState('idle')
  const [recordError, setRecordError] = useState('')

  const resetQuiz = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setRecordState('idle')
    setRecordError('')
  }
  const startTopic = (topicId) => { setTopic(topicId); resetQuiz() }
  const restart = () => resetQuiz()
  const changeTopic = () => { setTopic(null); resetQuiz() }
  const changeIdentity = () => { setQuizStudent(null); setTopic(null); resetQuiz() }
  const submitIdentity = (event) => {
    event.preventDefault()
    const student = {
      name: identityForm.name.trim(),
      number: identityForm.number.trim(),
      room: identityForm.room.trim(),
    }
    if (Object.values(student).some((value) => !value)) {
      setIdentityError('กรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    setQuizStudent(student)
    setIdentityError('')
  }
  const answer = (choice) => {
    if (selected !== null) return
    setSelected(choice)
    if (choice === questions[index].answer) setScore((value) => value + 1)
  }
  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true)
      setRecordState('saving')
      Promise.resolve()
        .then(() => onQuizComplete?.({ testType: type, topic, score, maxScore: questions.length, student: quizStudent }))
        .then(() => setRecordState('submitted'))
        .catch((error) => { setRecordState('error'); setRecordError(error.message || 'ส่งคะแนนไม่สำเร็จ') })
    } else {
      setIndex((value) => value + 1)
      setSelected(null)
    }
  }

  return <main className="learning-page">
    <section className="learning-hero">
      <span className="eyebrow">{isPre ? 'เริ่มต้นการเรียนรู้' : 'ทบทวนสิ่งที่เรียนรู้'}</span>
      <h1>{isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}</h1>
      <p>{isPre ? 'เลือกบทเรียนเพื่อสำรวจความรู้พื้นฐาน ก่อนเริ่มบทนั้น' : 'เลือกบทเรียนเพื่อวัดความเข้าใจหลังเรียนจบ แต่ละบทมี 10 ข้อ'}</p>
    </section>
    <section className="quiz-card" aria-live="polite">
      {!quizStudent ? <form className="quiz-identity-form" noValidate onSubmit={submitIdentity}>
        <div className="quiz-topic-heading">
          <span className="eyebrow">ข้อมูลสำหรับบันทึกคะแนน</span>
          <h2>ก่อนเริ่มทำแบบทดสอบ</h2>
          <p>กรอกข้อมูลผู้ทำแบบทดสอบ ระบบจะใช้ข้อมูลนี้บันทึกคะแนน โดยไม่ต้องสมัครสมาชิก</p>
        </div>
        <div className="registration-fields">
          <label className="registration-field registration-field-wide">
            <span>ชื่อ–นามสกุล</span>
            <input autoComplete="name" name="name" value={identityForm.name} onChange={(event) => setIdentityForm((current) => ({ ...current, name: event.target.value }))} required maxLength={120} placeholder="เช่น เด็กชายสมชาย ใจดี" />
          </label>
          <label className="registration-field">
            <span>เลขที่</span>
            <input inputMode="numeric" name="number" value={identityForm.number} onChange={(event) => setIdentityForm((current) => ({ ...current, number: event.target.value }))} required maxLength={20} placeholder="เลขที่ในห้อง" />
          </label>
          <label className="registration-field">
            <span>ห้อง</span>
            <select name="room" value={identityForm.room} onChange={(event) => setIdentityForm((current) => ({ ...current, room: event.target.value }))} required>
              <option value="" disabled>เลือกห้อง</option>
              <option value="DBT 2.1">DBT 2.1</option>
              <option value="DBT 2.2">DBT 2.2</option>
              <option value="DBT 2.3">DBT 2.3</option>
              <option value="DBT 2.4">DBT 2.4</option>
            </select>
          </label>
        </div>
        {identityError && <p className="registration-error" role="alert">{identityError}</p>}
        <div className="registration-footer">
          <p>ระบบบันทึกเฉพาะข้อมูลที่ใช้ระบุผู้ทำแบบทดสอบและคะแนน</p>
          <button className="learning-btn" type="submit">ไปเลือกแบบทดสอบ</button>
        </div>
      </form> : !topic ? <div className="quiz-topic-screen">
        <div className="quiz-topic-heading"><span className="eyebrow">เลือกบทเรียน</span><h2>ต้องการทดสอบเรื่องใด?</h2><p>แต่ละบทมี 10 ข้อ พร้อมคำอธิบายหลังเลือกคำตอบ</p></div>
        <div className="quiz-student-summary"><span>{quizStudent.name} · เลขที่ {quizStudent.number} · {quizStudent.room}</span><button type="button" onClick={changeIdentity}>แก้ไขข้อมูล</button></div>
        <div className="quiz-topic-grid">{QUIZ_TOPICS.map((item) => <button type="button" key={item.id} className={`quiz-topic-card ${item.theme}`} onClick={() => startTopic(item.id)}><span className="quiz-topic-icon" aria-hidden="true">{item.icon}</span><span className="quiz-topic-copy"><strong>{item.title}</strong><small>{item.description}</small></span><span className="quiz-topic-count">10 ข้อ <b>→</b></span></button>)}</div>
      </div> : finished ? <div className="quiz-result">
        <div className="result-icon">{score >= 8 ? '🏆' : '✨'}</div>
        <span className="eyebrow">{QUIZ_TOPICS.find((item) => item.id === topic).title} · ทำแบบทดสอบเสร็จแล้ว</span>
        <h2>คุณได้ {score} / {questions.length} คะแนน</h2>
        <p>{score >= 8 ? 'ยอดเยี่ยม! คุณเข้าใจเนื้อหาบทนี้ได้ดีมาก' : 'ลองทบทวนบทนี้ แล้วกลับมาทำแบบทดสอบอีกครั้งได้เลย'}</p>
        {recordState === 'saving' && <p className="quiz-save-status">กำลังส่งคะแนนไปยัง Google Sheets…</p>}
        {recordState === 'submitted' && <p className="quiz-save-status success">ส่งคำขอบันทึกคะแนนแล้ว</p>}
        {recordState === 'error' && <p className="quiz-save-status error" role="alert">{recordError}</p>}
        <div className="quiz-result-actions"><button className="learning-btn" onClick={restart}>ทำบทนี้อีกครั้ง</button><button className="learning-btn secondary" onClick={changeTopic}>เลือกบทเรียนอื่น</button></div>
      </div> : <>
        <div className="quiz-active-topic"><span>{QUIZ_TOPICS.find((item) => item.id === topic).icon} {QUIZ_TOPICS.find((item) => item.id === topic).title}</span><button type="button" onClick={changeTopic}>เปลี่ยนบทเรียน</button></div>
        <div className="quiz-progress-row"><span>ข้อ {index + 1} จาก {questions.length}</span><span>คะแนน {score}</span></div>
        <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
        <h2 className="question-title">{questions[index].q}</h2>
        <div className="answer-list">{questions[index].choices.map((choice, i) => <button key={choice} className={`answer-option ${selected !== null && i === questions[index].answer ? 'correct' : ''} ${selected === i && i !== questions[index].answer ? 'incorrect' : ''}`} onClick={() => answer(i)} disabled={selected !== null}><span className="answer-letter">{String.fromCharCode(65 + i)}</span>{choice}<span className="answer-mark">{selected !== null && i === questions[index].answer ? '✓' : selected === i ? '×' : ''}</span></button>)}</div>
        {selected !== null && <div className={`quiz-feedback ${selected === questions[index].answer ? 'good' : 'try-again'}`}><strong>{selected === questions[index].answer ? 'ตอบถูกแล้ว!' : 'ยังไม่ถูก ลองจำคำตอบที่ถูกไว้นะ'}</strong><p>{questions[index].why}</p></div>}
        <div className="quiz-footer"><span>เลือกคำตอบที่ถูกต้องเพื่อไปต่อ</span><button className="learning-btn" onClick={next} disabled={selected === null}>{index === questions.length - 1 ? 'ดูผลคะแนน' : 'ข้อต่อไป →'}</button></div>
      </>}
    </section>
    <p className="learning-note">คะแนนจะถูกบันทึกในชีต “{isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}” พร้อมชื่อ เลขที่ ห้อง บทเรียน และคะแนน</p>
  </main>
}

export { default as WindowsPractice } from './WindowsPractice.jsx'
