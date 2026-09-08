import { useEffect, useRef } from 'react'

type Leaf = {
  x: number
  y: number
  size: number
  rot: number
  spin: number
  drift: number
  fall: number
  phase: number
  hue: number
  alpha: number
}

const HUES = [
  [188, 248, 216],
  [252, 192, 203],
  [249, 227, 208],
  [214, 219, 248],
  [191, 231, 251],
  [253, 218, 187],
]

/*
  A handful of leaves drifting down the page, on a 2D canvas rather than DOM
  nodes so the count can stay generous without touching layout. Leaves are
  seeded across the full height on mount so the effect never starts empty.
*/
export default function LeafFall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let leaves: Leaf[] = []
    let raf = 0
    let running = true
    let last = performance.now()

    const count = () => (window.innerWidth < 720 ? 5 : 10)

    const seed = (initial: boolean): Leaf => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -40 - Math.random() * 120,
      size: 6 + Math.random() * 8,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.9,
      drift: 12 + Math.random() * 26,
      fall: 16 + Math.random() * 26,
      phase: Math.random() * Math.PI * 2,
      hue: Math.floor(Math.random() * HUES.length),
      alpha: 0.18 + Math.random() * 0.22,
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (leaves.length !== count()) {
        leaves = Array.from({ length: count() }, () => seed(true))
      }
    }

    const drawLeaf = (leaf: Leaf) => {
      const [r, g, b] = HUES[leaf.hue]
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rot)
      ctx.globalAlpha = leaf.alpha
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      // A simple pointed leaf: two mirrored quadratic curves.
      ctx.beginPath()
      ctx.moveTo(0, -leaf.size)
      ctx.quadraticCurveTo(leaf.size * 0.72, 0, 0, leaf.size)
      ctx.quadraticCurveTo(-leaf.size * 0.72, 0, 0, -leaf.size)
      ctx.fill()
      ctx.restore()
    }

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i]
        leaf.phase += dt * 0.9
        leaf.y += leaf.fall * dt
        leaf.x += Math.sin(leaf.phase) * leaf.drift * dt
        leaf.rot += leaf.spin * dt

        if (leaf.y > height + 60) leaves[i] = seed(false)
      }

      leaves.forEach(drawLeaf)
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="leaf-fall" aria-hidden="true" />
}
