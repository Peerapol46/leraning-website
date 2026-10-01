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
      <h2>Components</h2>
      <ul className="comp-list">
        {PARTS.map((part) => {
          const isInstalled = installed[part.id]
          const isSelected = selectedPartId === part.id
          return (
            <li key={part.id}>
              <button
                className={`comp-btn ${isSelected ? 'selected' : ''} ${isInstalled ? 'installed' : ''}`}
                onClick={() => setSelectedPartId(part.id)}
              >
                <span>{part.name}</span>
                <span style={{ fontSize: '0.7rem' }}>
                  {isInstalled ? 'Installed ✓' : 'Available'}
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
            Status:{' '}
            <span style={{ color: installed[selected.id] ? '#34d399' : '#fbbf24' }}>
              {installed[selected.id] ? 'Installed ✓' : 'Not installed'}
            </span>
          </div>
        </div>
      )}

      <h2>Installation Zones</h2>
      <div className="zone-list">
        {INSTALL_ZONES.map((z) => (
          <div
            key={z.id}
            className={`zone-item ${hoveredZoneId === z.id ? 'hot' : ''}`}
          >
            {z.label}
            {mode === 'learning' && z.accepts.length > 0 && (
              <span style={{ color: '#475569' }}> → {z.accepts.join(', ')}</span>
            )}
          </div>
        ))}
      </div>

      {hoveredZone && isDragging && (
        <div className="info-box" style={{ fontSize: '0.75rem' }}>
          Near: <span style={{ color: '#93c5fd' }}>{hoveredZone.label}</span>
          {draggingPart && (
            <div style={{ marginTop: 4 }}>
              {hoveredZone.accepts.includes(draggingPart.type) ? (
                <span style={{ color: '#34d399' }}>Release to install</span>
              ) : (
                <span style={{ color: '#f87171' }}>Incompatible zone</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="stats-footer">
        <div className="row">
          <span style={{ color: '#94a3b8' }}>Mistakes</span>
          <span className="red">{mistakes}</span>
        </div>
        <div className="row">
          <span style={{ color: '#94a3b8' }}>Hints used</span>
          <span className="amber">{hintsUsed}</span>
        </div>
      </div>
    </>
  )
}
