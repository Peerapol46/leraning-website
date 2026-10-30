import React from 'react'

export default function SiteFooter({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <strong>Computer &amp; Windows</strong>
        <span>สื่อฝึกปฏิบัติการประกอบคอมพิวเตอร์และติดตั้ง Windows</span>
      </div>
      <div className="site-footer-links" aria-label="ลิงก์ท้ายเว็บ">
        <button type="button" onClick={() => onNavigate('home')}>หน้าแรก</button>
        <span aria-hidden="true">·</span>
        <span>เรียนรู้ผ่านการลงมือทำ</span>
      </div>
    </footer>
  )
}
