import React from 'react'
import CourseArtwork from './CourseArtwork'

export default function CourseCard({ course, onNavigate }) {
  return (
    <button
      className={`tutor-course tutor-course-${course.type}`}
      data-reveal
      onClick={() => onNavigate(course.id)}
    >
      <div className="tutor-course-art">
        <CourseArtwork type={course.type} />
        <span className="tutor-category">{course.category}</span>
      </div>
      <div className="tutor-course-body">
        <p className="tutor-course-meta">{course.meta}</p>
        <h3>{course.title}</h3>
        <p className="tutor-course-description">{course.description}</p>
        <div className="tutor-course-action">
          {course.action}
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </button>
  )
}
