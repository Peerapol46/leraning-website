# เว็บไซต์ต้นแบบสำหรับเรียนรู้การประกอบคอมพิวเตอร์และติดตั้ง Windows

เว็บไซต์ประกอบด้วยบทเรียนแบบโต้ตอบ การฝึกประกอบคอมพิวเตอร์แบบ 3 มิติ การจำลองติดตั้ง Windows และแบบทดสอบก่อนเรียนกับหลังเรียน โดยบันทึกผลแบบทดสอบลง Google Sheets

## เทคโนโลยีที่ใช้

- React 18
- Vite 5
- Three.js
- React Three Fiber
- @react-three/drei

## ติดตั้งและเริ่มใช้งาน

ติดตั้งแพ็กเกจและเปิดเซิร์ฟเวอร์สำหรับพัฒนา:

```bash
npm install
npm run dev
```

สร้างไฟล์สำหรับเผยแพร่:

```bash
npm run build
```

## ตั้งค่าการบันทึกผลลง Google Sheets

เมื่อเริ่มทำแบบทดสอบ ระบบจะให้กรอกชื่อ เลขที่ และเลือกห้องจาก DBT 2.1, DBT 2.2, DBT 2.3 หรือ DBT 2.4 ข้อมูลที่บันทึกประกอบด้วยชื่อ เลขที่ ห้อง บทเรียน ประเภทแบบทดสอบ คะแนน คะแนนเต็ม และเวลาที่ส่งคำตอบ ระบบบันทึกเฉพาะผลแบบทดสอบ ไม่มีระบบสมัครสมาชิกและไม่บันทึกเวลาฝึก

1. สร้างหรือเปิด Google Sheets ที่ต้องการใช้เก็บผล
2. ใน Google Sheets เลือก **ส่วนขยาย → Apps Script** แล้วคัดลอกโค้ดจาก `google-apps-script/Code.gs` ไปวางในเครื่องมือแก้ไขสคริปต์
3. เรียกใช้ฟังก์ชัน `setupSheets` หนึ่งครั้ง และอนุญาตสิทธิ์ที่ Google ขอ ระบบจะสร้างชีต `แบบทดสอบก่อนเรียน` และ `แบบทดสอบหลังเรียน` พร้อมหัวตาราง หากมีข้อมูลเดิม แถวข้อมูลเดิมจะยังอยู่
4. หากมีการ Deploy เว็บแอปอยู่แล้ว ให้ไปที่ **Deploy → Manage deployments** แก้ไข Deployment เลือก **New version** แล้ว Deploy หากยังไม่มี ให้เลือก **Deploy → New deployment → Web app** ตั้งค่าให้ทำงานในนามบัญชีของคุณ และกำหนดผู้มีสิทธิ์เข้าถึงตามนโยบายของโรงเรียน จากนั้นคัดลอก URL ที่ลงท้ายด้วย `/exec`
5. คัดลอก `.env.example` เป็น `.env.local` แล้วกำหนดค่า `VITE_GOOGLE_SHEETS_WEB_APP_URL` เป็น URL ของเว็บแอปที่คัดลอกไว้
6. เริ่มเซิร์ฟเวอร์ใหม่ หรือ Build และ Deploy เว็บไซต์อีกครั้ง เพื่อให้เว็บไซต์ใช้ URL ที่ตั้งค่าไว้

เบราว์เซอร์ส่งข้อมูลในโหมด `no-cors` จึงตรวจคำตอบจาก Apps Script โดยตรงไม่ได้ หลังส่งแบบทดสอบ ให้เปิด Google Sheets และตรวจว่าผลปรากฏในชีตที่ตรงกับประเภทแบบทดสอบ

## ความสามารถของเว็บไซต์

- ฝึกประกอบคอมพิวเตอร์แบบ 3 มิติ
- ฝึกจำลองขั้นตอนติดตั้ง Windows
- ทำแบบทดสอบก่อนเรียนและหลังเรียน
- เลือกทำแบบทดสอบเรื่องการประกอบคอมพิวเตอร์หรือการติดตั้ง Windows
- ดูคะแนนและคำอธิบายหลังตอบแต่ละข้อ
- บันทึกคะแนนแบบทดสอบลง Google Sheets แยกตามประเภทแบบทดสอบ

## โครงสร้างโปรเจกต์

```text
src/
  main.jsx
  app/
    App.jsx
    navigation.js
    hooks/
      usePageNavigation.js
      usePageNavigation.test.js
  assets/images/
    home-banner.png
    computer.png
    windows.png
  components/
    common/ErrorBoundary.jsx
    layout/TopNav.jsx
  features/
    home/
      pages/HomePage.jsx
      components/
      data/courses.js
      styles/
    assembly/
      pages/AssemblyPage.jsx
      components/
      scene/
      models/
      hooks/useAssemblyStore.js
      data/
    windows/
      pages/WindowsPractice.jsx
      data/
      utils/formatters.js
    quiz/
      pages/QuizPage.jsx
      data/questions.js
  services/googleSheets.js
  styles/
    index.css
    base.css
    interface.css
    assembly.css
    responsive.css
    theme.css
    windows/

public/                    # Static 3D models and public assets
google-apps-script/Code.gs  # Google Sheets integration
```

## วิธีใช้

1. เลือกฝึกประกอบคอมพิวเตอร์ ฝึกติดตั้ง Windows หรือเลือกแบบทดสอบก่อนเรียน/หลังเรียน
2. หากทำแบบทดสอบ ให้กรอกชื่อ เลขที่ และเลือกห้อง
3. เลือกหัวข้อประกอบคอมพิวเตอร์หรือติดตั้ง Windows แล้วตอบคำถาม 10 ข้อ
4. ตรวจคะแนน และตรวจผลที่บันทึกไว้ในชีต Google Sheets ที่ตรงกับแบบทดสอบ


## Code organization

- `app/`: application shell, shared route IDs, and browser history.
- `components/`: shared navigation and error handling.
- `features/home/`: homepage, hero, course cards, and homepage styles.
- `features/assembly/`: assembly page, panels, 3D scene, models, state, and hardware data.
- `features/windows/`: installer simulation, guide/step data, and formatting helpers.
- `features/quiz/`: quiz screen and question banks.
- `services/`: Google Sheets requests.
- `assets/images/`: images imported into the production bundle.
- `styles/index.css`: the stylesheet entry point; import order preserves the existing cascade.

Edit course titles in `features/home/data/courses.js`, questions in `features/quiz/data/questions.js`, and Windows guide content in `features/windows/data/guide.js` (all paths under `src/`).

Run `npm test` for navigation tests, `npm run build` for a production build, and `npm run dev` for local development.
