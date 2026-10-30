import React from 'react'
import HomeHero from '../components/HomeHero.jsx'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

export default function HomePage({ onNavigate }) {
  const revealRef = useScrollReveal()
  return <main className="home-page tutor-home" ref={revealRef}>
    <HomeHero onNavigate={onNavigate} />
    <section className="tutor-courses" id="learning-courses"><div className="tutor-section-heading" data-reveal><div><p className="tutor-kicker">บทเรียนและกิจกรรม</p><h2>เลือกสิ่งที่อยากเรียนรู้</h2></div><p>เริ่มฝึกตามหัวข้อที่สนใจ<br />หรือทำแบบทดสอบก่อนเริ่มเรียน</p></div>
      <div className="tutor-course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  </main>
}
