import React from 'react';

const NAV_ITEMS = [
  ['home', '⌂', 'หน้าแรก'],
  ['pretest', '📝', 'แบบทดสอบก่อนเรียน'],
  ['posttest', '🎓', 'แบบทดสอบหลังเรียน'],
  ['assembly', '🧩', 'ประกอบคอม'],
  ['windows', '💿', 'ฝึกติดตั้ง Windows'],
]

export default function TopNav({ store, activePage, onNavigate }) {
  const {
    progress,
    score,
    mode,
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
    if (score >= 95 && mistakes === 0) return { title: 'ช่างประกอบระดับยอดเยี่ยม (S)', color: '#34d399' };
    if (score >= 80) return { title: 'ช่างประกอบระดับดีมาก (A)', color: '#38bdf8' };
    if (score >= 60) return { title: 'ช่างประกอบระดับดี (B)', color: '#fbbf24' };
    return { title: 'กำลังฝึกประกอบ (C)', color: '#f87171' };
  };

  const rank = getRank();
  const practiceMode = mode === 'practice';
  const rankColor = practiceMode ? '#94a3b8' : rank.color;
  const neutralTextColor = practiceMode ? '#cbd5e1' : undefined;

  return (
    <>
      <nav className="site-nav" aria-label="เมนูหลัก">
        {NAV_ITEMS.map(([id, icon, label]) => <button key={id} className={`site-nav-link ${activePage === id ? 'active' : ''}`} aria-current={activePage === id ? 'page' : undefined} onClick={() => onNavigate(id)}><span aria-hidden="true">{icon}</span>{label}</button>)}
      </nav>
      {activePage === 'assembly' && <header className="topnav">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1>ฝึกประกอบคอมพิวเตอร์</h1>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: 999,
                fontWeight: 600,
                background: isPoweredOn && !practiceMode ? 'rgba(5, 150, 105, 0.3)' : 'rgba(30, 41, 59, 0.8)',
                color: isPoweredOn && !practiceMode ? '#34d399' : '#94a3b8',
                border: `1px solid ${isPoweredOn && !practiceMode ? '#059669' : '#334155'}`,
              }}
            >
              {isPoweredOn ? '● เปิดเครื่องแล้ว' : '○ พร้อมเริ่ม'}
            </span>
          </div>
          <p className="sub">จำลองการประกอบชิ้นส่วนคอมพิวเตอร์แบบ 3 มิติ</p>
        </div>

        <div className="topnav-stats">
          <div className="stat">
            <div className="label">ความคืบหน้า</div>
            <div className="val cyan">{progress}%</div>
          </div>
          <div className="stat">
            <div className="label">คะแนน</div>
            <div className={`val ${mode === 'practice' ? 'cyan' : 'green'}`}>{score}</div>
          </div>
          <div className="stat">
            <div className="label">เวลา</div>
            <div className="val">{formatTime(elapsed)}</div>
          </div>

          <button className="btn" onClick={reset}>
            เริ่มใหม่
          </button>

          {assemblyComplete && !isPoweredOn && (
            <button className={`btn btn-primary ${practiceMode ? 'btn-practice' : ''}`} onClick={powerOn}>
              ⚡ เปิดเครื่อง →
            </button>
          )}

          {isPoweredOn && (
            <button
              className={`btn btn-primary ${practiceMode ? 'btn-practice' : ''}`}
              style={practiceMode ? undefined : { background: '#059669', borderColor: '#10b981' }}
              onClick={() => setShowCompletionModal(true)}
            >
              📊 ดูผลสรุป
            </button>
          )}
        </div>
      </header>}

      {/* Completion Summary Modal */}
      {showCompletionModal && (
        <div className="modal-overlay" onClick={() => setShowCompletionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎉 ประกอบคอมพิวเตอร์สำเร็จ!</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowCompletionModal(false)}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 16 }}>
              ติดตั้งชิ้นส่วนครบทั้ง 7 ชิ้นแล้ว และระบบผ่านการตรวจสอบตอนเริ่มเปิดเครื่อง (BIOS) แบบจำลอง
            </p>

            <div className="modal-rank" style={{ borderColor: rankColor, color: rankColor }}>
              {rank.title}
            </div>

            <div className="modal-stats-grid">
              <div className="modal-stat-box">
                <div className="modal-stat-label">คะแนนรวม</div>
                <div className="modal-stat-val" style={{ color: practiceMode ? '#cbd5e1' : '#34d399' }}>
                  {score} / 100
                </div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">เวลาที่ใช้</div>
                <div className="modal-stat-val">{formatTime(elapsed)}</div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">วางผิดตำแหน่ง</div>
                <div className="modal-stat-val" style={{ color: practiceMode ? '#cbd5e1' : mistakes > 0 ? '#f87171' : '#34d399' }}>
                  {mistakes}
                </div>
              </div>
              <div className="modal-stat-box">
                <div className="modal-stat-label">ใช้คำใบ้</div>
                <div className="modal-stat-val" style={{ color: neutralTextColor || (hintsUsed > 0 ? '#fbbf24' : '#94a3b8') }}>
                  {hintsUsed}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className={`btn btn-primary ${practiceMode ? 'btn-practice' : ''}`}
                style={{ flex: 1 }}
                onClick={() => {
                  setShowCompletionModal(false);
                  reset();
                }}
              >
                เริ่มประกอบใหม่
              </button>
              <button
                className="btn"
                onClick={() => setShowCompletionModal(false)}
              >
                ดูโมเดล 3 มิติ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

