import React from 'react'
import homeBannerUrl from '../../../assets/images/home-banner.jpg'

export default function HomeHero({ onNavigate }) {
  return <>
    <section className="computer-hero computer-hero-with-banner">
      <div className="computer-hero-copy" data-reveal>
        <p className="computer-subject"><span aria-hidden="true">▣</span> การติดตั้งและบริการงานคอมพิวเตอร์</p>
        <h1>ประกอบคอมพิวเตอร์<br /><span>และติดตั้ง Windows</span></h1>
        <p className="computer-hero-description">เรียนรู้ทุกขั้นตอนการประกอบคอมพิวเตอร์อย่างถูกต้อง<br className="desktop-break" /> พร้อมการติดตั้งระบบปฏิบัติการ Windows ทีละขั้นตอน<br className="desktop-break" /> เข้าใจง่าย ใช้ได้จริง</p>
        <div className="computer-hero-actions">
          <button className="learning-btn" onClick={() => onNavigate('lesson')}>📖 อ่านเนื้อหาบทเรียน <span aria-hidden="true">→</span></button>
          <button className="learning-btn secondary" onClick={() => onNavigate('assembly')}>ฝึกประกอบคอม <span aria-hidden="true">→</span></button>
          <button className="learning-btn secondary" onClick={() => onNavigate('windows')}>ฝึกติดตั้ง Windows <span aria-hidden="true">→</span></button>
        </div>
        <a className="hero-course-link" href="#learning-courses">ดูบทเรียนทั้งหมด <span aria-hidden="true">&#8595;</span></a>
        <p className="computer-hero-note">เรียนรู้ผ่านแบบจำลอง ฝึกซ้ำได้ตามต้องการ</p>
      </div>
      <div className="computer-hero-photo"><img src={homeBannerUrl} alt="Computer assembly workspace and Windows installation" fetchPriority="high" width="1672" height="941" /></div>
    </section>
    <section className="computer-features" aria-label="กิจกรรมการเรียนรู้">
      <button data-reveal onClick={() => onNavigate('assembly')}><span className="computer-feature-icon" aria-hidden="true">▣</span><span><strong>ประกอบคอมพิวเตอร์</strong><small>รู้จักอุปกรณ์ ติดตั้งอย่างถูกต้อง</small></span><span className="feature-arrow" aria-hidden="true">→</span></button>
      <button data-reveal onClick={() => onNavigate('windows')}><span className="computer-feature-icon windows-feature-icon" aria-hidden="true"><i /><i /><i /><i /></span><span><strong>ติดตั้ง Windows</strong><small>จัดการระบบ พร้อมใช้งาน</small></span><span className="feature-arrow" aria-hidden="true">→</span></button>
      <button data-reveal onClick={() => onNavigate('pretest')}><span className="computer-feature-icon" aria-hidden="true">✓</span><span><strong>ฝึกปฏิบัติ / ทบทวนความรู้</strong><small>เรียน ทวน ทำซ้ำได้ทุกที่</small></span><span className="feature-arrow" aria-hidden="true">→</span></button>
    </section>
  </>
}
