import React from 'react';

export default function TopNav({ store }) {
  const {
    progress,
    score,
    elapsed,
    formatTime,
    reset,
    assemblyComplete,
    isPoweredOn,
    powerOn,
    showCompletionModal,
    setShowCompletionModal,
    mistakes,
    hintsUsed,
  } = store;

  const getRank = () => {
    if (score >= 95 && mistakes === 0) return { title: 'Master PC Builder (S-Rank)', color: '#34d399' };
    if (score >= 80) return { title: 'Proficient Technician (A-Rank)', color: '#38bdf8' };
    if (score >= 60) return { title: 'Junior Assembler (B-Rank)', color: '#fbbf24' };
    return { title: 'Apprentice (C-Rank)', color: '#f87171' };
  };

  const rank = getRank();

  return (
    <>
      <header className="topnav">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1>Computer Assembly Prototype</h1>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: 999,
                fontWeight: 600,
                background: isPoweredOn ? 'rgba(5, 150, 105, 0.3)' : 'rgba(30, 41, 59, 0.8)',
                color: isPoweredOn ? '#34d399' : '#94a3b8',
                border: `1px solid ${isPoweredOn ? '#059669' : '#334155'}`,
              }}
            >
              {isPoweredOn ? '● SYSTEM ONLINE' : '○ STANDBY'}
            </span>
          </div>
          <p className="sub">Interactive 3D Hardware Assembly Simulation</p>
        </div>

        <div className="topnav-stats">
          <div className="stat">
            <div className="label">Progress</div>
            <div className="val cyan">{progress}%</div>
          </div>
          <div className="stat">
            <div className="label">Score</div>
            <div className="val green">{score}</div>
          </div>
          <div className="stat">
            <div className="label">Time</div>
            <div className="val">{formatTime(elapsed)}</div>
          </div>

          <button className="btn" onClick={reset}>
            Reset
          </button>

          {assemblyComplete && !isPoweredOn && (
            <button className="btn btn-primary" onClick={powerOn}>
              ⚡ Power On →
            </button>
          )}

          {isPoweredOn && (
            <button
              className="btn btn-primary"
              style={{ background: '#059669', borderColor: '#10b981' }}
              onClick={() => setShowCompletionModal(true)}
            >
              📊 Results
            </button>
          )}
        </div>
      </header>

      {/* Completion Summary Modal */}
      {showCompletionModal && (
        <div className="modal-overlay" onClick={() => setShowCompletionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎉 PC Assembly Successful!</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowCompletionModal(false)}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 16 }}>
              All 8 core computer components have been properly seated and verified. The system successfully booted through BIOS POST checks.
            </p>

            <div className="modal-rank" style={{ borderColor: rank.color, color: rank.color }}>
              {rank.title}
            </div>

            <div className="modal-stats-grid">
              <div className="modal-stat-box">
                <div className="modal-stat-label">Final Score</div>
                <div className="modal-stat-val" style={{ color: '#34d399' }}>
                  {score} / 100
                </div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">Time Taken</div>
                <div className="modal-stat-val">{formatTime(elapsed)}</div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">Mistakes</div>
                <div className="modal-stat-val" style={{ color: mistakes > 0 ? '#f87171' : '#34d399' }}>
                  {mistakes}
                </div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">Hints Used</div>
                <div className="modal-stat-val" style={{ color: hintsUsed > 0 ? '#fbbf24' : '#94a3b8' }}>
                  {hintsUsed}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  setShowCompletionModal(false);
                  reset();
                }}
              >
                Assemble Again
              </button>
              <button
                className="btn"
                onClick={() => setShowCompletionModal(false)}
              >
                Inspect 3D Rig
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

