import { useEffect, useRef, useState } from 'react'

/*
  A soft trailing dot that follows the pointer and picks up a label from any
  element carrying `data-cursor`. Only mounts for real mouse users, so touch
  devices are untouched and nothing runs when a pointer cannot hover.
*/
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    const fine =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const dot = dotRef.current
    if (!dot) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let raf = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY

      const hit = (event.target as Element | null)?.closest?.('[data-cursor]')
      const next = hit?.getAttribute('data-cursor') ?? ''
      setLabel(next)
      setActive(Boolean(hit))
    }

    const frame = () => {
      // Ease towards the pointer so the dot lags a touch behind it.
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(frame)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className={`custom-cursor${active ? ' is-active' : ''}`}
      aria-hidden="true"
    >
      {label ? <span className="custom-cursor__label">{label}</span> : null}
    </div>
  )
}
