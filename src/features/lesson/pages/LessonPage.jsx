import React, { useState } from 'react'

export default function LessonPage() {
  const [viewMode, setViewMode] = useState('embed') // 'embed' or 'text'
  const pdfUrl = '/lesson.pdf'

  return (
    <main className="pdf-lesson-container">
      {/* Action Header */}
      <div className="pdf-lesson-toolbar">
        <div className="pdf-toolbar-title">
          <span className="pdf-unit-badge">หน่วยที่ 3</span>
          <h1>ใบความรู้: งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</h1>
        </div>
        <div className="pdf-toolbar-actions">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-btn primary"
          >
            📥 เปิด / ดาวน์โหลด PDF
          </a>
          <button
            type="button"
            className="pdf-btn secondary"
            onClick={() => setViewMode(viewMode === 'embed' ? 'doc' : 'embed')}
          >
            {viewMode === 'embed' ? '📄 ดูแบบเอกสารหน้าเว็บ' : '📑 ดูผ่าน PDF Viewer'}
          </button>
        </div>
      </div>

      {/* Main Display: Embedded PDF */}
      {viewMode === 'embed' ? (
        <div className="pdf-viewer-frame-wrap">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title="ใบความรู้ หน่วยที่ 3 PDF"
            className="pdf-iframe"
          />
        </div>
      ) : (
        /* Clean Document Pages (เหมือนหน้า PDF) */
        <div className="pdf-doc-reader">
          {/* PAGE 1 */}
          <div className="doc-page-sheet">
            <div className="doc-page-header-official">
              <table className="doc-official-table">
                <tbody>
                  <tr>
                    <td rowSpan="3" className="col-emblem-td">
                      <div className="emblem-wrapper">
                        <div className="emblem-symbol">สอศ.</div>
                      </div>
                    </td>
                    <td className="col-center-td"><strong>ใบความรู้</strong></td>
                    <td className="col-right-td"><strong>หน่วยที่ 3</strong></td>
                  </tr>
                  <tr>
                    <td className="col-center-td">รหัสวิชา วิชา การติดตั้งและบริการงานคอมพิวเตอร์</td>
                    <td className="col-right-td">สอนครั้งที่ 3</td>
                  </tr>
                  <tr>
                    <td className="col-center-td">ชื่อหน่วยการเรียนรู้ งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</td>
                    <td className="col-right-td">ทฤษฎี 5 ชม. &nbsp; ปฏิบัติ 7 ชม.</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="col-footer-td">
                      <strong>ชื่อเรื่อง/งาน:</strong> งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-page-body">
              <h2 className="doc-h2">ความหมายของการประกอบคอมพิวเตอร์</h2>
              <p>
                <strong>การประกอบคอมพิวเตอร์ (Computer Assembly)</strong> หมายถึง การนำอุปกรณ์ฮาร์ดแวร์ (Hardware) หรือชิ้นส่วนต่าง ๆ ของคอมพิวเตอร์มาประกอบเข้าด้วยกันอย่างถูกต้องตามตำแหน่งและวิธีการติดตั้ง เพื่อให้คอมพิวเตอร์สามารถทำงานได้อย่างสมบูรณ์ตามความต้องการของผู้ใช้งาน
              </p>
              <p className="doc-subnote">
                <em>* การประกอบคอมพิวเตอร์จำเป็นต้องอาศัยความรู้เกี่ยวกับอุปกรณ์แต่ละชนิด หน้าที่ของอุปกรณ์ และความเข้ากันได้ของอุปกรณ์ก่อนนำมาประกอบ</em>
              </p>

              <h2 className="doc-h2">ความสำคัญและประโยชน์ของการประกอบคอมพิวเตอร์</h2>
              <p>
                การประกอบคอมพิวเตอร์ช่วยให้ผู้เรียนเข้าใจการทำงานร่วมกันของอุปกรณ์แต่ละส่วน สามารถเลือกชิ้นส่วนให้เหมาะกับลักษณะงาน และวางแผนการอัปเกรดหรือบำรุงรักษาเครื่องได้ตรงความต้องการ
              </p>
              <p>
                การเรียนรู้ขั้นตอนการประกอบอย่างถูกต้องยังช่วยลดความเสี่ยงจากการติดตั้งผิดตำแหน่ง ความเสียหายจากไฟฟ้าสถิต และการเชื่อมต่อสายไฟไม่ครบถ้วน จึงควรตรวจสอบความเข้ากันได้ของอุปกรณ์และปฏิบัติตามข้อควรระวังทุกครั้ง
              </p>

              <h2 className="doc-h2">อุปกรณ์หลักในการประกอบคอมพิวเตอร์</h2>
              <div className="doc-hw-box">
                <h3>1. เมนบอร์ด (Motherboard)</h3>
                <p>แผงวงจรหลักของคอมพิวเตอร์ ทำหน้าที่เชื่อมต่อและควบคุมการทำงานร่วมกันของอุปกรณ์ต่าง ๆ เช่น CPU, RAM และอุปกรณ์จัดเก็บข้อมูล</p>
              </div>
              <div className="doc-hw-box">
                <h3>2. หน่วยประมวลผลกลาง (CPU)</h3>
                <p>ทำหน้าที่ประมวลผลคำสั่ง คำนวณข้อมูล และควบคุมการทำงานของคอมพิวเตอร์ เปรียบเสมือนสมองของคอมพิวเตอร์</p>
              </div>
            </div>
            <div className="doc-page-footer">หน้าที่ 1</div>
          </div>

          {/* PAGE 2 */}
          <div className="doc-page-sheet">
            {/* แถบหน้าใหม่ หน้าเนื้อหา */}
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 2</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <h2 className="doc-h2">อุปกรณ์หลักในการประกอบคอมพิวเตอร์ (ต่อ)</h2>
              <div className="doc-hw-box">
                <h3>3. หน่วยความจำแรม (RAM)</h3>
                <p>ทำหน้าที่เก็บข้อมูลและโปรแกรมที่กำลังใช้งานอยู่ชั่วคราว เมื่อปิดเครื่องข้อมูลใน RAM จะหายไป (DDR4 และ DDR5)</p>
              </div>
              <div className="doc-hw-box">
                <h3>4. อุปกรณ์จัดเก็บข้อมูล (Storage)</h3>
                <p>ใช้จัดเก็บระบบปฏิบัติการ โปรแกรม และไฟล์ข้อมูล เช่น HDD และ SSD โดย SSD มีความเร็วในการอ่านและเขียนข้อมูลสูงกว่า HDD โดยทั่วไป (NVMe M.2 และ SATA SSD)</p>
              </div>
              <div className="doc-hw-box">
                <h3>5. พาวเวอร์ซัพพลาย (Power Supply Unit: PSU)</h3>
                <p>ทำหน้าที่แปลงกระแสไฟฟ้าจากแหล่งจ่ายไฟให้เป็นแรงดันไฟฟ้าที่เหมาะสมสำหรับอุปกรณ์ภายในคอมพิวเตอร์</p>
              </div>
              <div className="doc-hw-box">
                <h3>6. การ์ดจอ (Graphics Card)</h3>
                <p>ทำหน้าที่ประมวลผลและแสดงผลภาพออกทางหน้าจอ เหมาะสำหรับงานกราฟิก งานออกแบบ และเกม โดยบาง CPU มี GPU ในตัวอยู่แล้ว</p>
              </div>
              <div className="doc-hw-box">
                <h3>7. ระบบระบายความร้อน (Cooling System)</h3>
                <p>ทำหน้าที่ระบายความร้อนจาก CPU และอุปกรณ์ภายในเครื่อง เพื่อป้องกันอุณหภูมิสูงเกินไป เช่น พัดลมระบายความร้อนและชุดน้ำ</p>
              </div>
              <div className="doc-hw-box">
                <h3>8. เคสคอมพิวเตอร์ (Computer Case)</h3>
                <p>เป็นโครงสร้างสำหรับติดตั้งและปกป้องอุปกรณ์ต่าง ๆ ภายในคอมพิวเตอร์ รวมถึงช่วยจัดการการไหลเวียนของอากาศ</p>
              </div>

              <h2 className="doc-h2">เครื่องมือที่ใช้ในการประกอบคอมพิวเตอร์</h2>
              <ol className="doc-ol">
                <li><strong>ไขควงแฉก:</strong> ใช้ขันและคลายสกรูยึดอุปกรณ์</li>
                <li><strong>ซิลิโคนระบายความร้อน:</strong> ใช้ช่วยถ่ายเทความร้อนระหว่าง CPU กับชุดระบายความร้อน</li>
                <li><strong>เคเบิลไทร์:</strong> ใช้จัดเก็บสายไฟภายในเคสให้เป็นระเบียบ</li>
              </ol>
            </div>
            <div className="doc-page-footer">หน้าที่ 2</div>
          </div>

          {/* PAGE 3 */}
          <div className="doc-page-sheet">
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 3</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <h2 className="doc-h2">ขั้นตอนการประกอบคอมพิวเตอร์</h2>
              
              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 1 เตรียมอุปกรณ์และพื้นที่ทำงาน</h3>
                <ul>
                  <li>ตรวจสอบอุปกรณ์ให้ครบถ้วน</li>
                  <li>ตรวจสอบความเข้ากันได้ของอุปกรณ์</li>
                  <li>เตรียมเครื่องมือและพื้นที่ทำงานให้สะอาด</li>
                  <li>ถอดปลั๊กไฟและป้องกันไฟฟ้าสถิต</li>
                </ul>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 2 ติดตั้งเมนบอร์ดลงในเคส</h3>
                <ol>
                  <li>ติดตั้ง I/O Shield ที่ด้านหลังของเคส</li>
                  <li>ค่อยๆ วางเมนบอร์ดของคุณลงในเคสด้วยมุม 45 องศา</li>
                  <li>ดูให้รูใส่น็อตบนเมนบอร์ดตรงกันกับรูใส่น็อตของแท่นยึดเมนบอร์ดในเคส</li>
                  <li>ยึดเมนบอร์ดด้วยน็อตที่ให้มา</li>
                </ol>
                <div className="doc-tip"><strong>เคล็ดลับ:</strong> ควรไขน็อตยึดเมนบอร์ดให้ครบทุกตัว การติดตั้งเมนบอร์ดอย่างแน่นหนาจะช่วยยึดไม่ให้เมนบอร์ดโยกไปมาได้</div>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 3 ติดตั้ง CPU</h3>
                <ol>
                  <li>ปลดตัวล็อคของซ็อกเก็ต CPU ออก</li>
                  <li>วาง CPU ลงบนซ็อกเก็ต โดยวางให้รอยมาร์คที่ CPU อยู่ตรงกับรอยมาร์คบนซ็อกเก็ต จากนั้นค่อยๆ ใส่ CPU เข้ากับซ็อกเก็ตอย่างระมัดระวัง</li>
                  <li>ตรวจสอบให้แน่ใจว่าติดตั้ง CPU อย่างถูกต้อง จากนั้นปิดตัวล็อค CPU เพื่อล็อค CPU เข้ากับซ็อกเก็ตให้เรียบร้อย</li>
                </ol>
                <div className="doc-caution"><strong>ข้อควรระวัง:</strong> ระมัดระวัง พินต่างๆ บน CPU หรือบนซ็อกเก็ตให้ดีเนื่องจากพินเหล่านี้บอบบางมาก การกระแทกหรือการฝืนดันเพียงเล็กน้อยอาจทำให้พินหักหรืองอได้</div>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 4 ติดตั้ง RAM</h3>
                <ol>
                  <li>กดขาล็อค RAM ที่อยู่ตรงสุดปลายสล็อตใส่ RAM ลงให้สุด (อยู่ในตำแหน่งปลดล็อค)</li>
                  <li>ตรวจสอบลำดับสล็อตในการติดตั้ง RAM ในคู่มือเมนบอร์ดอีกครั้ง ดูให้แน่ใจว่าควรติดตั้ง RAM ลงในสล็อตไหนก่อน-หลัง</li>
                  <li>กด RAM ลงในสล็อตจนกระทั่งคุณจะได้ยินเสียง "คลิก" จากการที่ขาล็อคแรมถูกดันกลับเข้ามาในตำแหน่งล็อค RAM ไว้แล้ว</li>
                </ol>
                <div className="doc-tip"><strong>เคล็ดลับ:</strong> ลำดับที่แนะนำในการติดตั้งสล็อต RAM ก่อน-หลัง อาจแตกต่างกันไปในเมนบอร์ดแต่ละรุ่น เช่น เมนบอร์ด MSI จะแนะนำให้ใส่ RAM ลงในสล็อต Dimm1 เป็นลำดับแรก</div>
              </div>
            </div>
            <div className="doc-page-footer">หน้าที่ 3</div>
          </div>

          {/* PAGE 4 */}
          <div className="doc-page-sheet">
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 4</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 5 ติดตั้งชุดระบายความร้อน</h3>
                <ol>
                  <li>ประกอบ backplate เข้ากับด้านหลังของเมนบอร์ด (หากมี)</li>
                  <li>ทาซิลิโคนลงบนกระดอง CPU</li>
                  <li>เชื่อมต่อสายเคเบิลพัดลม CPU เข้ากับขั้วเสียบสายพัดลม CPU บนเมนบอร์ด</li>
                  <li>วางชุดระบายความร้อนให้ทับลงบน CPU ตรงๆ ค่อยๆ สลับขันน็อตที่อยู่ฝั่งตรงข้ามกันให้แน่นเท่าๆ กัน</li>
                </ol>
                <div className="doc-caution"><strong>ข้อควรระวัง:</strong> ควรทาซิลิโคนในปริมาณที่เหมาะสม เพราะหากใช้น้อยเกินไปหรือมากเกินไปจะทำให้หน้าสัมผัสไม่ดีหรือซิลิโคนเยิ้มลงในซ็อกเก็ต</div>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 6 ติดตั้งชุดจ่ายไฟ (Power Supply)</h3>
                <ol>
                  <li>ติดตั้ง Power supply (PSU) เข้ากับเคส และไขน็อตยึด Power supply ให้ครบถ้วน</li>
                  <li>เสียบสายไฟ 24 พินเข้ากับซ็อกเก็ตบนเมนบอร์ด</li>
                  <li>เสียบสายไฟ CPU 8 พินเข้ากับเมนบอร์ด</li>
                  <li>เชื่อมต่อสาย 16-pin 12V-2x6 เข้ากับการ์ดจอ (หรือสาย 6+2 Pin PCI-E)</li>
                  <li>เสียบสายไฟ SATA เข้ากับฮาร์ดไดรฟ์</li>
                  <li>เสียบสายไฟ Molex (ที่มีพินแนวนอน 4 พิน) เข้ากับอุปกรณ์เพิ่มเติมอื่นๆ</li>
                </ol>
                <div className="doc-tip"><strong>เคล็ดลับ:</strong> การเลือก Power supply ที่มีวัตต์เพียงพอเป็นเรื่องสำคัญ สามารถคำนวณและเลือกวัตต์ที่มากกว่าจำเป็นเพื่อรองรับการอัปเกรดในอนาคต</div>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 7 ติดตั้ง SSD ไดร์ฟ M.2</h3>
                <ol>
                  <li>ใช้ไขควงไขน็อตยึดช่อง M.2 บนเมนบอร์ดออกก่อน</li>
                  <li>ค่อยๆ สอดไดร์ฟของคุณเข้าไปในช่องเสียบ M.2 บนเมนบอร์ดแบบเฉียงๆ ด้วยมุมประมาณ 45 องศา</li>
                  <li>เมื่อใส่ไดร์ฟ M.2 เข้ากับช่องเสียบได้แล้ว ค่อยๆ กดตัวไดร์ฟ M.2 ลงมาให้แนบไปกับตัวเมนบอร์ด จากนั้นใส่น็อตยึดช่อง M.2 กลับไปที่เดิมเพื่อยึดไดร์ฟ M.2 ไว้</li>
                </ol>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 8 ติดตั้งการ์ดจอ</h3>
                <p>เสียบการ์ดจอลงในช่อง PCIe x16 หลักให้ล็อคแน่นสนิท และยึดน็อตเข้ากับเคสด้านหลัง</p>
              </div>
            </div>
            <div className="doc-page-footer">หน้าที่ 4</div>
          </div>

          {/* PAGE 5 */}
          <div className="doc-page-sheet">
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 5</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 9 ตรวจสอบชิ้นส่วนทั้งหมด</h3>
                <ol>
                  <li>ต่อสายสวิตช์เปิด, ปิด / สวิตช์รีเซ็ต / LED เพาเวอร์ / สาย LED ของ HDD เข้ากับช่อง JFP1 บนเมนบอร์ด</li>
                  <li>ต่อสาย USB ด้านหน้าเคสเข้ากับช่อง USB บนเมนบอร์ด</li>
                  <li>ต่อสาย USB 3.0 และ USB 2.0 เข้ากับช่อง USB 3.0 / USB 2.0 บนเมนบอร์ด</li>
                  <li>ต่อสาย USB Type-C ด้านหน้าเคสไปยังช่อง USB Type-C</li>
                  <li>ต่อสายสัญญาณเสียง (ลำโพง) เข้ากับช่อง JAUD1 ของเมนบอร์ด</li>
                </ol>
              </div>

              <div className="doc-step-block">
                <h3>ขั้นตอนที่ 10 เปิดเครื่องและติดตั้ง Windows</h3>
                <ol>
                  <li>เตรียมแฟลชไดรฟ์ USB 3.0 ขนาด 8GB ขึ้นไป</li>
                  <li>บนคอมพิวเตอร์ที่เชื่อมต่ออินเทอร์เน็ต ให้ดาวน์โหลด Windows 11 / 10 Installation Media Tool เพื่อสร้างอิมเมจติดตั้งลงใน USB</li>
                  <li>เสียบแฟลชไดรฟ์ติดตั้งเข้ากับพอร์ต USB 3.0 ด้านหลังของพีซีเครื่องใหม่ เปิดเครื่องเข้า BIOS บันทึกและรีสตาร์ทเพื่อบูตจาก USB</li>
                </ol>
              </div>

              <h2 className="doc-h2">ข้อควรระวังในการประกอบคอมพิวเตอร์</h2>
              <ol className="doc-ol">
                <li>ควรถอดปลั๊กไฟทุกครั้งก่อนประกอบหรือถอดอุปกรณ์</li>
                <li>หลีกเลี่ยงการสัมผัสขั้วสัมผัสของ RAM และ CPU โดยตรง</li>
                <li>ไม่ควรออกแรงกดอุปกรณ์หากติดตั้งไม่ตรงตำแหน่ง</li>
                <li>ตรวจสอบความเข้ากันได้ของ CPU กับเมนบอร์ด</li>
                <li>ตรวจสอบกำลังไฟของ Power Supply ให้เพียงพอ</li>
                <li>ตรวจสอบการเชื่อมต่อสายไฟทุกจุดก่อนเปิดเครื่อง</li>
                <li>ระมัดระวังไฟฟ้าสถิตที่อาจทำให้อุปกรณ์เสียหาย</li>
              </ol>

              <h2 className="doc-h2">การตรวจสอบหลังประกอบคอมพิวเตอร์</h2>
              <table className="doc-checklist-table">
                <thead>
                  <tr>
                    <th>รายการตรวจสอบ</th>
                    <th>สิ่งที่ต้องตรวจสอบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>CPU</td><td>ตรวจพบรุ่น CPU ใน BIOS</td></tr>
                  <tr><td>RAM</td><td>ตรวจพบความจุ RAM ครบถ้วน</td></tr>
                  <tr><td>SSD/HDD</td><td>ตรวจพบอุปกรณ์จัดเก็บข้อมูล</td></tr>
                  <tr><td>GPU</td><td>ตรวจพบการ์ดจอ (ถ้ามี)</td></tr>
                  <tr><td>พัดลม</td><td>พัดลมหมุนและระบายความร้อนได้</td></tr>
                  <tr><td>จอภาพ</td><td>แสดงผลได้ตามปกติ</td></tr>
                  <tr><td>BIOS/UEFI</td><td>เข้าสู่หน้าตั้งค่าได้</td></tr>
                </tbody>
              </table>
            </div>
            <div className="doc-page-footer">หน้าที่ 5</div>
          </div>

          {/* PAGE 6 */}
          <div className="doc-page-sheet">
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 6</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <h2 className="doc-h2">การติดตั้ง Windows 10</h2>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 1:</strong> เปิดเครื่องทำการเข้า BIOS ของเครื่องคอมพิวเตอร์ โดยการกด Del/F2 แล้วแต่ BIOS ของแต่ละเครื่อง
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 2:</strong> จะปรากฏหน้า BIOS ขึ้นมา แล้วเลือกที่เมนู Boot เพื่อทำการตั้งค่าการ Boot CD_ROM โดยเลือกที่ Boot Device Priority
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 3:</strong> เมื่อปรากฏหน้าจอดังภาพ ให้เลือก Boot จาก CD-ROM / USB เป็นอันดับแรก แล้วกด F10 เพื่อทำการ Save
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 4:</strong> ทำการกดปุ่ม Enter เพื่อทำการ Boot CD-ROM หรือ DVD-ROM (ข้อความบนหน้าจอ: Press any key to boot from CD or DVD...)
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 5:</strong> จะปรากฏหน้าต่างสำหรับเริ่มการติดตั้ง Windows 10 ให้คลิก Next
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 6:</strong> เมื่อปรากฏหน้าต่างดังภาพ ให้คลิก Install now
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 7:</strong> ทำการเลือกเครื่องหมายถูกในช่อง I accept license terms จากนั้นคลิก Next
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 8:</strong> เลือก Custom : Install Windows Only (Advanced)
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 9:</strong> ทำการแบ่ง Partition ให้กับ Windows กดที่ Disk 0 : Unallocated Space และทำการระบุ Size ของ Drive กด Apply
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 10:</strong> กด OK เพื่อทำการยืนยัน การแบ่ง Partition Drive
              </div>
            </div>
            <div className="doc-page-footer">หน้าที่ 6</div>
          </div>

          {/* PAGE 7 */}
          <div className="doc-page-sheet">
            <div className="doc-running-header">
              <div className="running-header-content">
                <span className="running-badge">ใบความรู้ หน่วยที่ 3</span>
                <span className="running-title">งานการประกอบเครื่องคอมพิวเตอร์และติดตั้งระบบปฏิบัติการ</span>
                <span className="running-page-num">หน้าที่ 7</span>
              </div>
              <div className="running-header-line" />
            </div>

            <div className="doc-page-body">
              <h2 className="doc-h2">การติดตั้ง Windows 10 (ต่อ)</h2>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 11:</strong> จะปรากฏหน้าต่างขึ้นมาอีกครั้งให้คลิก New เพื่อทำการแบ่ง Partition Drive ใหม่
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 12:</strong> เมื่อปรากฏหน้าต่างดังภาพให้คลิก Apply
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 13:</strong> คลิกเลือก Disk 0 Partition 2 แล้วกดปุ่ม Next
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 14:</strong> จะปรากฏหน้าต่างการติดตั้งไฟล์ Windows 10
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 15:</strong> เมื่อติดตั้งเสร็จเรียบร้อย จะมีเครื่องหมายถูกขึ้นหน้าข้อ
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 16:</strong> เมื่อติดตั้งครบแล้ว เครื่องจะ Restart ตัวเอง 1 ครั้ง
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 17:</strong> เครื่องคอมพิวเตอร์จะ Start ขึ้นมาใหม่ (ข้อความบนหน้าจอ: Getting ready)
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 18:</strong> เมื่อปรากฏหน้าต่างดังภาพ ให้คลิก Use Express settings
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 19:</strong> เมื่อติดตั้งเสร็จเรียบร้อยแล้ว ให้ตั้งชื่อเครื่องคอมพิวเตอร์ จากนั้นคลิก Next
              </div>
              <div className="doc-win-step">
                <strong>ขั้นตอนที่ 20:</strong> จะปรากฏหน้า Desktop ดังภาพ เป็นอันเสร็จสิ้นขั้นตอนการติดตั้งวินโดว์ และพร้อมใช้งาน
              </div>

              <h2 className="doc-h2" style={{ marginTop: '14px' }}>สรุปความรู้</h2>
              <p>
                การประกอบคอมพิวเตอร์และการติดตั้งระบบปฏิบัติการเป็นทักษะพื้นฐานที่สำคัญสำหรับงานด้านคอมพิวเตอร์ โดยในขั้นตอนการประกอบเครื่อง ผู้ปฏิบัติจำเป็นต้องรู้จักหน้าที่ของอุปกรณ์ฮาร์ดแวร์แต่ละชนิด เข้าใจลำดับขั้นตอนการติดตั้ง และปฏิบัติตามหลักความปลอดภัยอย่างเคร่งครัด เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับอุปกรณ์ จากนั้นจึงดำเนินการติดตั้งระบบปฏิบัติการ Windows 10 ตั้งแต่การตั้งค่าลำดับการบูตใน BIOS การแบ่งพาร์ติชันฮาร์ดดิสก์ การติดตั้งและตั้งค่าระบบ ไปจนถึงการเปิดใช้งาน (Activate) อย่างถูกต้อง เพื่อให้คอมพิวเตอร์สามารถทำงานได้อย่างเต็มประสิทธิภาพ เสถียร และพร้อมใช้งานได้อย่างสมบูรณ์
              </p>
            </div>
            <div className="doc-page-footer">หน้าที่ 7</div>
          </div>
        </div>
      )}
    </main>
  )
}
