import { useEffect, useRef } from 'react'

type Blade = { x: number; h: number; lean: number; phase: number; speed: number; shade: number }

/*
  The meadow that closes the page: procedurally drawn grass swaying in a slow
  wind, with a small rover trundling across it. Everything is generated on a 2D
  canvas so there is no illustration to ship, and it redraws only while it is on
  screen.
*/
export default function GrassScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let blades: Blade[] = []
    let raf = 0
    let visible = true
    let running = true
    const start = performance.now()

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = Math.round(width / 1.15)
      blades = Array.from({ length: density }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          h: (0.26 + depth * 0.66) * height,
          lean: (Math.random() - 0.5) * 0.75,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
          shade: depth,
        }
      })
      // Draw far blades first so near ones sit in front.
      blades.sort((a, b) => a.shade - b.shade)
    }

    const draw = (now: number) => {
      if (!running) return
      const t = reduced ? 0 : (now - start) / 1000

      ctx.clearRect(0, 0, width, height)

      // Soft haze so the grass fades up into the page rather than starting hard.
      const haze = ctx.createLinearGradient(0, 0, 0, height)
      haze.addColorStop(0, 'rgba(252, 251, 249, 0)')
      haze.addColorStop(0.55, 'rgba(206, 226, 176, 0.28)')
      haze.addColorStop(1, 'rgba(150, 190, 118, 0.5)')
      ctx.fillStyle = haze
      ctx.fillRect(0, 0, width, height)

      const wind = Math.sin(t * 0.45) * 0.5 + Math.sin(t * 0.17) * 0.3

      for (const blade of blades) {
        const sway = Math.sin(t * blade.speed + blade.phase) * 0.16 + wind * 0.22
        const tipX = blade.x + (blade.lean + sway) * blade.h * 0.45
        const tipY = height - blade.h
        const ctrlX = blade.x + (blade.lean + sway) * blade.h * 0.18

        // Far blades are pale and hazy, near ones deeper and more solid.
        const light = 80 - blade.shade * 34
        const sat = 26 + blade.shade * 22
        const alpha = 0.35 + blade.shade * 0.5
        ctx.strokeStyle = `hsla(${102 - blade.shade * 16}, ${sat}%, ${light}%, ${alpha})`
        ctx.lineWidth = 1.4 + blade.shade * 3.2
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(blade.x, height)
        ctx.quadraticCurveTo(ctrlX, height - blade.h * 0.55, tipX, tipY)
        ctx.stroke()
      }

      drawRover(ctx, t, width, height)

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting
              if (visible && !running) {
                running = true
                raf = requestAnimationFrame(draw)
              } else if (!visible) {
                running = false
                cancelAnimationFrame(raf)
              }
            },
            { rootMargin: '120px' },
          )
        : null

    const onResize = () => {
      build()
      if (reduced) draw(performance.now())
    }

    build()
    observer?.observe(canvas)
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="grass-scene" aria-hidden="true" />
}

/* A boxy little rover that drives left to right and loops. */
function drawRover(
  ctx: CanvasRenderingContext2D,
  t: number,
  width: number,
  height: number,
) {
  const period = 34
  const progress = ((t % period) + period) % period / period
  const x = -120 + progress * (width + 240)
  const bob = Math.sin(t * 5) * 1.4
  const y = height - 46 + bob
  const s = 1

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s, s)

  ctx.fillStyle = 'rgba(60, 70, 50, 0.18)'
  ctx.beginPath()
  ctx.ellipse(22, 30, 30, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // wheels
  ctx.fillStyle = '#5c6470'
  for (const wx of [6, 38]) {
    ctx.beginPath()
    ctx.arc(wx, 26, 7, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'
  ctx.lineWidth = 1.6
  for (const wx of [6, 38]) {
    const spin = t * 3
    ctx.beginPath()
    ctx.moveTo(wx + Math.cos(spin) * 4, 26 + Math.sin(spin) * 4)
    ctx.lineTo(wx - Math.cos(spin) * 4, 26 - Math.sin(spin) * 4)
    ctx.stroke()
  }

  // body
  ctx.fillStyle = '#f4f6f8'
  roundRect(ctx, 0, 2, 44, 24, 7)
  ctx.fill()
  ctx.strokeStyle = 'rgba(70, 80, 95, 0.35)'
  ctx.lineWidth = 1.2
  roundRect(ctx, 0, 2, 44, 24, 7)
  ctx.stroke()

  // visor and eyes
  ctx.fillStyle = '#4a5566'
  roundRect(ctx, 5, 8, 26, 11, 4)
  ctx.fill()
  ctx.fillStyle = '#f4f6f8'
  ctx.beginPath()
  ctx.arc(13, 13.5, 2.1, 0, Math.PI * 2)
  ctx.arc(22, 13.5, 2.1, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
