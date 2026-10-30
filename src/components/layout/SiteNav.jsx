import React, { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '../../app/navigation'

export default function SiteNav({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const toggleRef = useRef(null)

  const navigate = (page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  useEffect(() => setMenuOpen(false), [activePage])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <nav className="site-nav" aria-label="เมนูหลัก" ref={navRef}>
      <button className="site-brand" onClick={() => navigate('home')} aria-label="Computer & Windows หน้าแรก">
        <span className="site-brand-mark" aria-hidden="true">PC</span>
        Computer &amp; Windows
      </button>
      <button
        className="site-nav-toggle"
        ref={toggleRef}
        aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          {menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
        <span>เมนู</span>
      </button>
      <div className={`site-nav-links${menuOpen ? ' is-open' : ''}`} id="site-navigation-links">
        {NAV_ITEMS.map(([id, icon, label]) => (
          <button
            key={id}
            className={`site-nav-link ${activePage === id ? 'active' : ''}`}
            aria-current={activePage === id ? 'page' : undefined}
            onClick={() => navigate(id)}
          >
            {icon && <span aria-hidden="true">{icon}</span>}
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
