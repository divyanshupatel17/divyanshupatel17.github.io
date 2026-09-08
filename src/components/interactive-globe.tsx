import createGlobe, { type COBEOptions } from 'cobe'
import { useEffect, useRef } from 'react'

const BRAND_RED: [number, number, number] = [0xd8 / 255, 0x10 / 255, 0x1f / 255]

const MARKERS: COBEOptions['markers'] = [
  { location: [12.9698, 79.1559], size: 0.09 }, // VIT Chennai
  { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
  { location: [28.6139, 77.209], size: 0.05 }, // Delhi
  { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
  { location: [51.5072, -0.1276], size: 0.05 }, // London
  { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
]

/**
 * Dot-matrix globe drawn with cobe on a transparent canvas. Dragging
 * rotates it freely on both axes; released momentum keeps spinning in
 * that same direction and eases into a slow idle auto-rotation.
 */
export function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    const canvas = canvasRef.current
    if (!mount || !canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rotation = { phi: 0.25, theta: 0.15 }
    const velocity = { phi: 0.0022, theta: 0 }
    let dragging = false
    let lastX = 0
    let idleSince = performance.now()

    const measure = () => Math.max(1, Math.round(mount.getBoundingClientRect().width))

    const globe = createGlobe(canvas, {
      width: measure() * dpr,
      height: measure() * dpr,
      phi: rotation.phi,
      theta: rotation.theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.85, 0.85, 0.88],
      markerColor: BRAND_RED,
      glowColor: [0, 0, 0],
      markers: MARKERS,
      devicePixelRatio: dpr,
      onRender: (state) => {
        if (!dragging) {
          const idleFor = performance.now() - idleSince
          velocity.phi *= 0.985
          velocity.theta *= 0.94
          if (idleFor > 700) {
            velocity.phi += (0.0022 - velocity.phi) * 0.01
          }
          rotation.phi += velocity.phi
          rotation.theta += velocity.theta
        }
        rotation.theta = Math.max(-0.7, Math.min(0.7, rotation.theta))
        state.phi = rotation.phi
        state.theta = rotation.theta
        const w = measure() * dpr
        state.width = w
        state.height = w
      },
    })

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      canvas.style.cursor = 'grabbing'
      mount.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      const speed = 0.0055
      velocity.phi = dx * speed
      rotation.phi += dx * speed
      idleSince = performance.now()
    }
    const onPointerUp = (e: PointerEvent) => {
      dragging = false
      canvas.style.cursor = 'grab'
      try {
        mount.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
    }

    mount.addEventListener('pointerdown', onPointerDown)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerup', onPointerUp)
    mount.addEventListener('pointerleave', onPointerUp)

    requestAnimationFrame(() => {
      canvas.style.opacity = '1'
    })

    return () => {
      globe.destroy()
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerup', onPointerUp)
      mount.removeEventListener('pointerleave', onPointerUp)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive rotating globe, drag to spin"
      className="absolute left-1/2 top-0 aspect-square w-[82vw] max-w-[760px] -translate-x-1/2 translate-y-[2%] cursor-grab touch-none"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
      />
    </div>
  )
}
