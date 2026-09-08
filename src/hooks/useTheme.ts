import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function readInitial(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'night') return true
    if (stored === 'day') return false
  } catch {
    // Private browsing or blocked storage; fall through to the system setting.
  }
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export default function useTheme() {
  const [night, setNight] = useState(readInitial)

  useEffect(() => {
    document.body.classList.toggle('night-mode', night)
    try {
      localStorage.setItem(STORAGE_KEY, night ? 'night' : 'day')
    } catch {
      // Nothing to do; the theme still applies for this session.
    }
  }, [night])

  const toggle = useCallback(() => setNight((value) => !value), [])

  return { night, toggle }
}
