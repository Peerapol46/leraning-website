import React from 'react'
import { LESSON_META } from '../data/lessonData'

export default function LessonHeader({ headerStyle, setHeaderStyle, activeSection, onSectionSelect }) {
  const sections = [
    { id: 'intro', label: '📌 บทนำ' },
    { id: 'hardware', label: '🖥️ 8 อุปกรณ์หลัก' },
    { id: 'tools', label: '🔧 เครื่องมือ' },
    { id: 'assembly-steps', label: '🛠️ 10 ขั้นตอนประกอบ' },
    { id: 'precautions', label: '⚠️ ข้อควรระวัง' },
    { id: 'checklist', label: '✅ การตรวจเช็ค' },
    { id: 'windows-steps', label: '💽 ติดตั้ง Windows' },
    { id: 'summary', label: '📝 สรุปความรู้' },
  ]

  return (
    <header className="lesson-top-container">
      {/* Tool bar: Style switcher and Print helper */}
      <div className="lesson-toolbar no-print">
        <div className="toolbar-info">
          <span className="toolbar-badge">แถบหน้าเนื้อหาใหม่</span>
          <span className="toolbar-text">เลือกดูรูปแบบแถบส่วนหัว (Header) สำหรับหน้าเนื้อหา:</span>
        </div>
        <div className="toolbar-controls">
          <div className="style-selector" role="group" aria-label="เลือกสไตล์แถบหน้า">
            <button
              type="button"
              className={`style-btn ${headerStyle === 'minimal' ? 'active' : ''}`}
              onClick={() => setHeaderStyle('minimal')}
              title="แบบที่ 1: โมเดิร์นเรียบหรู ประหยัดพื้นที่สูงสุด"
            >
              ✨ 1. โมเดิร์นเรียบหรู
            </button>
            <button
              type="button"
              className={`style-btn ${headerStyle === 'badge' ? 'active' : ''}`}
              onClick={() => setHeaderStyle('badge')}
              title="แบบที่ 2: แถบป้ายวิชาการ ดูทันสมัยชัดเจน"
            >
              🏷️ 2. แถบป้ายวิชาการ
            </button>
            <button
              type="button"
              className={`style-btn ${headerStyle === 'compact-table' ? 'active' : ''}`}
              onClick={() => setHeaderStyle('compact-table')}
              title="แบบที่ 3: ตารางมาตรฐาน สอศ. แบบย่อแถวเดียว"
            >
              📋 3. ตารางย่อ สอศ.
            </button>
            <button
              type="button"
              className={`style-btn ${headerStyle === 'original' ? 'active' : ''}`}
              onClick={() => setHeaderStyle('original')}
              title="เปรียบเทียบกับตารางเดิมในไฟล์ PDF"
            >
              ⏮️ เปรียบเทียบแบบเดิม
            </button>
          </div>
          <button
            type="button"
            className="print-btn"
            onClick={() => window.print()}
            title="พิมพ์หน้านี้เป็น PDF หรือสั่งพิมพ์ทางเครื่องพิมพ์"
          >
            🖨️ พิมพ์ / บันทึก PDF
          </button>
        </div>
      </div>

      {/* RENDER THE SELECTED HEADER STYLE */}
      <div className={`lesson-banner-wrapper banner-style-${headerStyle}`}>
        {headerStyle === 'minimal' && (
          <div className="banner-minimal">
            <div className="banner-minimal-top">
              <div className="banner-title-group">
                <span className="banner-tag">ใบความรู้ หน่วยที่ {LESSON_META.unit}</span>
                <span className="banner-divider">|</span>
                <h1 className="banner-title">{LESSON_META.topic}</h1>
              </div>
              <div className="banner-meta-group">
                <span className="subject-name">วิชา {LESSON_META.subject}</span>
                <span className="hours-chip">ทฤษฎี {LESSON_META.hours.theory} ชม. · ปฏิบัติ {LESSON_META.hours.practical} ชม.</span>
              </div>
            </div>
            <div className="banner-minimal-rule" />
          </div>
        )}

        {headerStyle === 'badge' && (
          <div className="banner-badge">
            <div className="badge-identity">
              <div className="vocational-emblem" aria-hidden="true">
                <span className="emblem-circle">สอศ</span>
              </div>
              <div className="badge-text-block">
                <div className="badge-eyebrow">
                  <span className="badge-pill">หน่วยที่ {LESSON_META.unit}</span>
                  <span className="badge-code">วิชา {LESSON_META.subject} ({LESSON_META.code})</span>
                  <span className="badge-time">ทฤษฎี {LESSON_META.hours.theory} ชม. / ปฏิบัติ {LESSON_META.hours.practical} ชม.</span>
                </div>
                <h1 className="badge-main-heading">{LESSON_META.topic}</h1>
              </div>
            </div>
            <div className="badge-corner-meta">
              <span className="doc-type">ใบความรู้ประจำหน่วย</span>
              <span className="target-curriculum">หลักสูตร สอศ.</span>
            </div>
          </div>
        )}

        {headerStyle === 'compact-table' && (
          <div className="banner-compact-table">
            <table className="compact-table-el">
              <tbody>
                <tr>
                  <td className="col-emblem">
                    <span className="emblem-box">ตรา สอศ.</span>
                  </td>
                  <td className="col-main">
                    <div className="compact-title-row">
                      <strong>ใบความรู้ หน่วยที่ {LESSON_META.unit}:</strong> {LESSON_META.topic}
                    </div>
                    <div className="compact-sub-row">
                      วิชา {LESSON_META.subject} · รหัสวิชา {LESSON_META.code}
                    </div>
                  </td>
                  <td className="col-side">
                    <div>สอนครั้งที่ 3</div>
                    <div className="time-sub">ทฤษฎี {LESSON_META.hours.theory} / ปฏิบัติ {LESSON_META.hours.practical} ชม.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {headerStyle === 'original' && (
          <div className="banner-original-comparison">
            <div className="original-note-alert">
              ⚠️ <em>นี่คือตารางหัวกระดาษแบบเดิมในไฟล์ PDF ที่เคยถูกใส่ซ้ำหน้าละ 1 ครั้งตลอดทั้ง 24 หน้า ทำให้กินพื้นที่กระดาษไปกว่า 25%</em>
            </div>
            <table className="original-full-table">
              <tbody>
                <tr>
                  <td rowSpan="3" className="orig-logo-cell">
                    <div className="orig-emblem-demo">
                      <div className="emblem-badge-demo">สอศ.</div>
                    </div>
                  </td>
                  <td className="orig-center-cell">
                    <strong>ใบความรู้</strong>
                  </td>
                  <td className="orig-right-cell">หน่วยที่ 3</td>
                </tr>
                <tr>
                  <td className="orig-center-cell">
                    รหัสวิชา วิชา {LESSON_META.subject}
                  </td>
                  <td className="orig-right-cell">สอนครั้งที่</td>
                </tr>
                <tr>
                  <td className="orig-center-cell">
                    ชื่อหน่วยการเรียนรู้ {LESSON_META.unitTitle}
                  </td>
                  <td className="orig-right-cell">
                    ทฤษฎี {LESSON_META.hours.theory} ชม.<br />ปฏิบัติ {LESSON_META.hours.practical} ชม.
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="orig-bottom-cell">
                    ชื่อเรื่อง/งาน {LESSON_META.topic}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STICKY QUICK NAVIGATION / TABLE OF CONTENTS */}
      <nav className="lesson-quick-nav no-print" aria-label="สารบัญเนื้อหาด่วน">
        <div className="quick-nav-track">
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`quick-nav-pill ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => onSectionSelect(sec.id)}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
