import React from 'react'

export default function AssemblyPanel({ store }) {
  const {
    mode, setMode, ASSEMBLY_STEPS, currentStepIndex, currentStep,
    progress, feedback, feedbackType, showHint, useHint, assemblyComplete,
  } = store

  return (
    <>
      <h2>โหมด</h2>
      <div className="mode-row">
        <button
          className={`btn-mode ${mode === 'learning' ? 'active-learn' : ''}`}
          onClick={() => setMode('learning')}
        >
          เรียนรู้
        </button>
        <button
          className={`btn-mode ${mode === 'practice' ? 'active-prac' : ''}`}
          onClick={() => setMode('practice')}
        >
          ฝึกเอง
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: 4 }}>
        <span>ความคืบหน้า</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <h2>ขั้นตอนการประกอบ</h2>
      <ul className="step-list">
        {ASSEMBLY_STEPS.map((step, idx) => {
          const done = idx < currentStepIndex || (assemblyComplete && idx < ASSEMBLY_STEPS.length)
          const current = idx === currentStepIndex && !assemblyComplete
          return (
              <li
                key={step.id}
                className={done
                  ? `done ${mode === 'practice' ? 'done-practice' : ''}`
                  : current ? 'current' : ''}
              >
              <span style={{ width: 16, flexShrink: 0 }}>
                {done ? '✓' : current ? '→' : `${step.id}.`}
              </span>
              <span>{step.title}</span>
            </li>
          )
        })}
      </ul>

      <div className="task-box">
        <h3>ขั้นตอนปัจจุบัน</h3>
        <p>
          {assemblyComplete
            ? 'ประกอบครบแล้ว กด “เปิดเครื่อง” เพื่อจบขั้นตอน'
            : currentStep?.instruction}
        </p>
        {mode === 'learning' && !assemblyComplete && (
          <button className="btn-hint" onClick={useHint}>ดูคำใบ้</button>
        )}
        {(showHint || (mode === 'learning' && currentStep?.hint)) && currentStep?.hint && (
          <div className="hint-box">คำใบ้: {currentStep.hint}</div>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedbackType}`}>{feedback}</div>
      )}

      <div className="step-footer">
        ขั้นที่ {Math.min(currentStepIndex + 1, ASSEMBLY_STEPS.length)} / {ASSEMBLY_STEPS.length}
      </div>
    </>
  )
}
