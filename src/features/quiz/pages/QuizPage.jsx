import React, { useState, useRef, useEffect } from 'react'
import { useSessionState } from '../../../hooks/useSessionState'
import RecordStatus from '../../../components/common/RecordStatus'
import { createRecordId } from '../../../services/googleSheets'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

import { QUESTION_BANKS, CHOICE_LABELS } from '../data/questions'


export function QuizPage({ type, onQuizComplete }) {
  const revealRef = useScrollReveal()
  const isPre = type === 'pretest'
  const [identityForm, setIdentityForm] = useSessionState('quiz:v3:' + type + ':identityForm', { name: '', number: '', room: '' })
  const [quizStudent, setQuizStudent] = useSessionState('quiz:v3:' + type + ':quizStudent', null)
  const [identityError, setIdentityError] = useSessionState('quiz:v3:' + type + ':identityError', '')
  const questions = QUESTION_BANKS[type] || []
  const [index, setIndex] = useSessionState('quiz:v3:' + type + ':index', 0)
  const [selected, setSelected] = useSessionState('quiz:v3:' + type + ':selected', null)
  const [score, setScore] = useSessionState('quiz:v3:' + type + ':score', 0)
  const [finished, setFinished] = useSessionState('quiz:v3:' + type + ':finished', false)
  const [recordState, setRecordState] = useSessionState('quiz:v3:' + type + ':recordState', 'idle')
  const [recordError, setRecordError] = useSessionState('quiz:v3:' + type + ':recordError', '')

  const [requestId, setRequestId] = useSessionState('quiz:v3:' + type + ':requestId', createRecordId)
  const submission = useRef(0)
  const sending = useRef(false)
  useEffect(() => () => { submission.current += 1 }, [])
  const resetQuiz = () => {
    submission.current += 1
    sending.current = false
    setRequestId(createRecordId())
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setRecordState('idle')
    setRecordError('')
  }
  const restart = () => resetQuiz()
  const changeIdentity = () => { setQuizStudent(null); resetQuiz() }
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
  const sendRecord = async () => {
    if (sending.current) return
    sending.current = true
    const generation = submission.current
    setRecordState('saving')
    try {
      const response = await onQuizComplete({ requestId, testType: type, score, maxScore: questions.length, student: quizStudent })
      if (generation === submission.current) setRecordState(response.confirmed ? 'confirmed' : 'unconfirmed')
    } catch (error) {
      if (generation === submission.current) { setRecordState('error'); setRecordError(error.message) }
    } finally { if (generation === submission.current) sending.current = false }
  }
  const next = () => {
    if (selected === null) return
    if (index === questions.length - 1) { setFinished(true); sendRecord() }
    else { setIndex((value) => value + 1); setSelected(null) }
  }

  return <main className="learning-page" ref={revealRef}>
    <section className="learning-hero" data-reveal>
      <span className="eyebrow">{isPre ? 'เริ่มต้นการเรียนรู้' : 'ทบทวนสิ่งที่เรียนรู้'}</span>
      <h1>{isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}</h1>
      <p>{isPre ? 'สำรวจความรู้พื้นฐานก่อนเริ่มเรียน' : 'วัดความเข้าใจหลังเรียนจบ'} · {questions.length} ข้อ</p>
    </section>
    <section className="quiz-card" data-reveal aria-live="polite">
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
          <button className="learning-btn" type="submit">เริ่มทำแบบทดสอบ</button>
        </div>
      </form> : finished ? <div className="quiz-result">
        <div className="result-icon">{score >= 8 ? '🏆' : '✨'}</div>
        <span className="eyebrow">ทำแบบทดสอบเสร็จแล้ว</span>
        <h2>คุณได้ {score} / {questions.length} คะแนน</h2>
        <p>{score >= 8 ? 'ยอดเยี่ยม! คุณเข้าใจเนื้อหาได้ดีมาก' : 'ลองทบทวนเนื้อหา แล้วกลับมาทำแบบทดสอบอีกครั้งได้เลย'}</p>
        <RecordStatus state={recordState === 'saving' && !sending.current ? 'unconfirmed' : recordState} error={recordError} />
        <div className="quiz-result-actions"><button className="learning-btn" onClick={restart}>ทำอีกครั้ง</button><button className="learning-btn secondary" onClick={changeIdentity}>เปลี่ยนข้อมูลผู้ทำ</button></div>
      </div> : <>
        <div className="quiz-student-summary"><span>{quizStudent.name} · เลขที่ {quizStudent.number} · {quizStudent.room}</span><button type="button" onClick={changeIdentity}>แก้ไขข้อมูล</button></div>
        <div className="quiz-progress-row"><span>ข้อ {index + 1} จาก {questions.length}</span><span>คะแนน {score}</span></div>
        <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
        <h2 className="question-title">{questions[index].q}</h2>
        <div className="answer-list">{questions[index].choices.map((choice, i) => <button key={choice} className={`answer-option ${selected !== null && i === questions[index].answer ? 'correct' : ''} ${selected === i && i !== questions[index].answer ? 'incorrect' : ''}`} onClick={() => answer(i)} disabled={selected !== null}><span className="answer-letter">{CHOICE_LABELS[i]}</span>{choice}<span className="answer-mark">{selected !== null && i === questions[index].answer ? '✓' : selected === i ? '×' : ''}</span></button>)}</div>
        {selected !== null && <div className={`quiz-feedback ${selected === questions[index].answer ? 'good' : 'try-again'}`}><strong>{selected === questions[index].answer ? 'ตอบถูกแล้ว!' : 'ยังไม่ถูก ลองจำคำตอบที่ถูกไว้นะ'}</strong><p>{questions[index].why}</p></div>}
        <div className="quiz-footer"><span>เลือกคำตอบที่ถูกต้องเพื่อไปต่อ</span><button className="learning-btn" onClick={next} disabled={selected === null}>{index === questions.length - 1 ? 'ดูผลคะแนน' : 'ข้อต่อไป →'}</button></div>
      </>}
    </section>
    <p className="learning-note">คะแนนจะถูกบันทึกในชีต "{isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}" พร้อมชื่อ เลขที่ ห้อง และคะแนน</p>
  </main>
}
