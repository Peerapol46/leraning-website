import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!container || reducedMotion.matches || !('IntersectionObserver' in window)) return
    const elements = [...container.querySelectorAll('[data-reveal]')]
    const reveal = (element) => {
      element.classList.remove('scroll-reveal-pending')
      observer.unobserve(element)
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target) })
    }, { root: container, threshold: 0.08 })
    elements.forEach((element) => {
      element.classList.add('scroll-reveal-ready', 'scroll-reveal-pending')
      observer.observe(element)
    })
    const revealFocused = (event) => {
      const element = event.target.closest('[data-reveal]')
      if (element) reveal(element)
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) elements.forEach(reveal)
    }
    container.addEventListener('focusin', revealFocused)
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      container.removeEventListener('focusin', revealFocused)
      reducedMotion.removeEventListener('change', onMotionChange)
      elements.forEach((element) => element.classList.remove('scroll-reveal-ready', 'scroll-reveal-pending'))
    }
  }, [])
  return containerRef
}
