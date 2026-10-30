import { useCallback, useEffect, useState } from 'react'
import { HOME_PAGE, PAGE_IDS as pages } from '../navigation.js'

const basePath = import.meta.env?.BASE_URL || '/'

export function pageFromPath(pathname, base = basePath) {
  const prefix = base.endsWith('/') ? base : `${base}/`
  if (pathname === prefix.slice(0, -1)) return HOME_PAGE
  if (!pathname.startsWith(prefix)) return HOME_PAGE
  const page = pathname.slice(prefix.length).replace(/\/$/, '') || HOME_PAGE
  return pages.has(page) ? page : HOME_PAGE
}

export function navigateToPage(page, browser = window, base = basePath) {
  if (!pages.has(page)) return false
  const prefix = base.endsWith('/') ? base : `${base}/`
  const pathname = page === HOME_PAGE ? prefix : `${prefix}${page}`
  if (browser.location.pathname !== pathname) {
    // Only an actual page change adds an entry; Back/Forward never pushes one.
    browser.history.pushState(null, '', `${pathname}${browser.location.search}`)
  }
  return true
}

export function usePageNavigation() {
  const [activePage, setActivePage] = useState(() => pageFromPath(window.location.pathname))

  useEffect(() => {
    const syncPage = () => setActivePage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', syncPage)
    // Also synchronize if the URL changed between rendering and subscription.
    syncPage()
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const navigate = useCallback((page) => {
    if (navigateToPage(page)) setActivePage(page)
  }, [])

  return [activePage, navigate]
}
