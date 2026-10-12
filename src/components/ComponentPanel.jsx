import React from 'react'
import { PARTS } from '../data/parts'
import { INSTALL_ZONES } from '../data/installationZones'

export default function ComponentPanel({ store }) {
  const {
    selectedPartId, setSelectedPartId, installed, mistakes, hintsUsed,
    mode, hoveredZoneId, isDragging, draggingPartId,
  } = store

  const selected = PARTS.find((p) => p.id === selectedPartId)
  const hoveredZone = INSTALL_ZONES.find((z) => z.id === hoveredZoneId)
  const draggingPart = PARTS.find((p) => p.id === draggingPartId)

  return (
    <>
      <h2>ชิ้นส่วน</h2>
      <ul className="comp-list">
        {PARTS.map((part) => {
          const isInstalled = installed[part.id]
          const isSelected = selectedPartId === part.id
          return (
            <li key={part.id}>
              <button
                className={`comp-btn ${isSelected ? 'selected' : ''} ${isInstalled
                  ? mode === 'practice' ? 'practice-installed' : 'installed'
                  : ''}`}
                onClick={() => setSelectedPartId(part.id)}
              >
                <span>{part.name}</span>
                <span style={{ fontSize: '0.7rem' }}>
                  {isInstalled ? 'ติดตั้งแล้ว ✓' : 'พร้อมติดตั้ง'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {selected && (
        <div className="info-box">
          <h3>{selected.label}</h3>
          <p>{selected.description}</p>
          <div style={{ marginTop: 8, fontSize: '0.75rem' }}>
            สถานะ:{' '}
            <span style={{ color: mode === 'practice'
              ? '#cbd5e1'
              : installed[selected.id] ? '#34d399' : '#fbbf24' }}>
              {installed[selected.id] ? 'ติดตั้งแล้ว ✓' : 'ยังไม่ได้ติดตั้ง'}
            </span>
          </div>
        </div>
      )}

      <h2>ตำแหน่งติดตั้ง</h2>
      <div className="zone-list">
        {INSTALL_ZONES.map((z) => (
          <div
            key={z.id}
            className={`zone-item ${hoveredZoneId === z.id ? 'hot' : ''}`}
          >
            {z.label}
            {mode === 'learning' && z.accepts.length > 0 && (
              <span style={{ color: '#475569' }}>
                {' → '}{z.accepts.map((type) => PARTS.find((part) => part.type === type)?.name || type).join(', ')}
              </span>
            )}
          </div>
        ))}
      </div>

      {hoveredZone && isDragging && (
        <div className="info-box" style={{ fontSize: '0.75rem' }}>
          ใกล้ตำแหน่ง: <span style={{ color: '#93c5fd' }}>{hoveredZone.label}</span>
          {draggingPart && (
            <div style={{ marginTop: 4 }}>
              {hoveredZone.accepts.includes(draggingPart.type) ? (
                <span style={{ color: mode === 'practice' ? '#cbd5e1' : '#34d399' }}>ปล่อยเมาส์เพื่อติดตั้ง</span>
              ) : (
                <span style={{ color: mode === 'practice' ? '#cbd5e1' : '#f87171' }}>ชิ้นส่วนนี้ไม่ตรงกับช่อง</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="stats-footer">
        <div className="row">
          <span style={{ color: '#94a3b8' }}>วางผิดตำแหน่ง</span>
          <span className={mode === 'practice' ? 'neutral' : 'red'}>{mistakes}</span>
        </div>
        <div className="row">
          <span style={{ color: '#94a3b8' }}>ใช้คำใบ้</span>
          <span className="amber">{hintsUsed}</span>
        </div>
      </div>
    </>
  )
}
