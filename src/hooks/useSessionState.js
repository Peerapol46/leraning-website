import { useCallback, useState } from 'react'

const memory = new Map()
export function readSession(key, fallback) {
  try {
    const value = sessionStorage.getItem(key)
    if (value !== null) return JSON.parse(value)
  } catch { /* Session storage can be unavailable in private browsing. */ }
  return memory.has(key) ? memory.get(key) : (typeof fallback === 'function' ? fallback() : fallback)
}
export function writeSession(key, value) {
  memory.set(key, value)
  try { sessionStorage.setItem(key, JSON.stringify(value)) } catch { /* Keep the in-memory copy. */ }
}
export function clearSession(prefix) {
  for (const key of [...memory.keys()]) {
    if (key.startsWith(prefix)) memory.delete(key)
  }
  try {
    Object.keys(sessionStorage).filter((k) => k.startsWith(prefix)).forEach((k) => sessionStorage.removeItem(k))
  } catch { /* Session storage can be unavailable in private browsing. */ }
}
export function useSessionState(key, fallback) {
  const [value, setValue] = useState(() => {
    const initial = readSession(key, fallback)
    writeSession(key, initial)
    return initial
  })
  const set = useCallback((next) => setValue((previous) => {
    const resolved = typeof next === 'function' ? next(previous) : next
    writeSession(key, resolved)
    return resolved
  }), [key])
  return [value, set]
}
