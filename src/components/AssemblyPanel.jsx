import React from 'react'

export default function AssemblyPanel({ store }) {
  const {
    mode, setMode, ASSEMBLY_STEPS, currentStepIndex, currentStep,
    progress, feedback, feedbackType, showHint, useHint, assemblyComplete,
  } = store

  return (
    <>
      <h2>Mode</h2>
      <div className="mode-row">
        <button
          className={`btn-mode ${mode === 'learning' ? 'active-learn' : ''}`}
          onClick={() => setMode('learning')}
        >
          Learning
        </button>
        <button
          className={`btn-mode ${mode === 'practice' ? 'active-prac' : ''}`}
          onClick={() => setMode('practice')}
        >
          Practice
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: 4 }}>
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <h2>Assembly Steps</h2>
      <ul className="step-list">
        {ASSEMBLY_STEPS.map((step, idx) => {
          const done = idx < currentStepIndex || (assemblyComplete && idx <= 8)
          const current = idx === currentStepIndex && !assemblyComplete
          return (
            <li key={step.id} className={done ? 'done' : current ? 'current' : ''}>
              <span style={{ width: 16, flexShrink: 0 }}>
                {done ? '✓' : current ? '→' : `${step.id}.`}
              </span>
              <span>{step.title}</span>
            </li>
          )
        })}
      </ul>

      <div className="task-box">
        <h3>Current Task</h3>
        <p>
          {assemblyComplete
            ? 'Assembly complete! Power on the computer.'
            : currentStep?.instruction}
        </p>
        {mode === 'learning' && !assemblyComplete && (
          <button className="btn-hint" onClick={useHint}>Show Hint</button>
        )}
        {(showHint || (mode === 'learning' && currentStep?.hint)) && currentStep?.hint && (
          <div className="hint-box">Hint: {currentStep.hint}</div>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedbackType}`}>{feedback}</div>
      )}

      <div className="step-footer">
        Step {Math.min(currentStepIndex + 1, 10)} / 10
      </div>
    </>
  )
}
