import { useEffect, useRef } from 'react'

/**
 * Canvas-based duotone halftone portrait. At rest the whole silhouette
 * renders as a dense red/black halftone dot pattern; near the pointer a
 * soft circular "flashlight" reveals the real photo colors underneath.
 */

const CELL_SIZE = 6
const REVEAL_RADIUS = 130
const REVEAL_FEATHER = 60

// shadow -> brand red -> warm highlight, for gradient depth in the dot silhouette
const RAMP: [number, number, number, number][] = [
  [0, 0x24, 0x03, 0x02],
  [0.35, 0x8a, 0x0d, 0x12],
  [0.65, 0xd8, 0x10, 0x1f],
  [0.85, 0xff, 0x5a, 0x45],
  [1, 0xff, 0xd9, 0xc9],
]

function rampColor(lum: number) {
  let lo = RAMP[0]
  let hi = RAMP[RAMP.length - 1]
  for (let i = 0; i < RAMP.length - 1; i++) {
    if (lum >= RAMP[i][0] && lum <= RAMP[i + 1][0]) {
      lo = RAMP[i]
      hi = RAMP[i + 1]
      break
    }
  }
  const span = hi[0] - lo[0] || 1
  const t = (lum - lo[0]) / span
  const r = Math.round(lo[1] + (hi[1] - lo[1]) * t)
  const g = Math.round(lo[2] + (hi[2] - lo[2]) * t)
  const b = Math.round(lo[3] + (hi[3] - lo[3]) * t)
  return `rgb(${r}, ${g}, ${b})`
}

type Cell = { x: number; y: number; darkness: number; lum: number; a: number; phase: number }

export function PortraitSpotlight({
  src,
  pointerRef,
  className,
  alt = '',
}: {
  src: string
  pointerRef: { current: { x: number; y: number } }
  className?: string
  alt?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorLayerRef = useRef<HTMLCanvasElement | null>(null)
  const revealLayerRef = useRef<HTMLCanvasElement | null>(null)
  const cellsRef = useRef<Cell[]>([])
  const cellPxRef = useRef(CELL_SIZE)
  const rectRef = useRef({ left: 0, top: 0 })
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    colorLayerRef.current = document.createElement('canvas')
    revealLayerRef.current = document.createElement('canvas')

    const img = new Image()
    img.src = src
    img.onload = () => {
      imgRef.current = img
      sample()
    }

    const sample = () => {
      const container = containerRef.current
      const canvas = canvasRef.current
      const image = imgRef.current
      const colorLayer = colorLayerRef.current
      const revealLayer = revealLayerRef.current
      if (!container || !canvas || !image || !colorLayer || !revealLayer) return

      const rect = container.getBoundingClientRect()
      rectRef.current = { left: rect.left, top: rect.top }
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      colorLayer.width = w
      colorLayer.height = h
      revealLayer.width = w
      revealLayer.height = h

      // object-contain, anchored bottom-center
      const scale = Math.min(rect.width / image.width, rect.height / image.height)
      const drawW = image.width * scale
      const drawH = image.height * scale
      const drawX = (rect.width - drawW) / 2
      const drawY = rect.height - drawH

      // full-color layer, drawn once at display resolution for the spotlight reveal
      const colorCtx = colorLayer.getContext('2d')
      if (colorCtx) {
        colorCtx.clearRect(0, 0, w, h)
        colorCtx.drawImage(image, drawX * dpr, drawY * dpr, drawW * dpr, drawH * dpr)
      }

      const cellPx = Math.max(3, CELL_SIZE * dpr)
      cellPxRef.current = cellPx
      const cols = Math.max(1, Math.round((drawW * dpr) / cellPx))
      const rows = Math.max(1, Math.round((drawH * dpr) / cellPx))

      const sampleCanvas = document.createElement('canvas')
      sampleCanvas.width = cols
      sampleCanvas.height = rows
      const sctx = sampleCanvas.getContext('2d')
      if (!sctx) return
      sctx.imageSmoothingEnabled = true
      sctx.drawImage(image, 0, 0, cols, rows)
      const data = sctx.getImageData(0, 0, cols, rows).data

      const cells: Cell[] = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const a = data[i + 3] / 255
          if (a < 0.15) continue
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
          const darkness = Math.pow(1 - lum, 0.65)
          cells.push({
            x: drawX * dpr + x * cellPx,
            y: drawY * dpr + y * cellPx,
            darkness,
            lum,
            a,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
      cellsRef.current = cells
    }

    const ro = new ResizeObserver(sample)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('scroll', sample, { passive: true })

    let raf = 0
    const draw = (t: number) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const revealCanvas = revealLayerRef.current
      const colorCanvas = colorLayerRef.current
      const revealCtx = revealCanvas?.getContext('2d')
      if (canvas && ctx && revealCanvas && colorCanvas && revealCtx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const cellPx = cellPxRef.current
        const time = t / 1000
        const px = (pointerRef.current.x - rectRef.current.left) * dpr
        const py = (pointerRef.current.y - rectRef.current.top) * dpr

        // base halftone
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const cell of cellsRef.current) {
          const shimmer = Math.sin(time * 0.8 + cell.phase) * 0.05
          const darkness = Math.max(0, Math.min(1, cell.darkness + shimmer))
          const dotR = (cellPx / 2) * (0.18 + 0.8 * darkness)
          ctx.globalAlpha = cell.a
          ctx.fillStyle = rampColor(Math.max(0, Math.min(1, cell.lum - shimmer)))
          ctx.beginPath()
          ctx.arc(cell.x + cellPx / 2, cell.y + cellPx / 2, dotR, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1

        // spotlight: real photo colors, masked to a soft circle around the pointer
        const onCanvas = px > -REVEAL_RADIUS && px < canvas.width + REVEAL_RADIUS && py > -REVEAL_RADIUS && py < canvas.height + REVEAL_RADIUS
        if (onCanvas) {
          const r = (REVEAL_RADIUS + REVEAL_FEATHER) * dpr
          revealCtx.clearRect(0, 0, revealCanvas.width, revealCanvas.height)
          revealCtx.globalCompositeOperation = 'source-over'
          revealCtx.drawImage(colorCanvas, 0, 0)
          revealCtx.globalCompositeOperation = 'destination-in'
          const grad = revealCtx.createRadialGradient(px, py, Math.max(0, REVEAL_RADIUS * dpr - REVEAL_FEATHER * dpr), px, py, r)
          grad.addColorStop(0, 'rgba(255,255,255,1)')
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          revealCtx.fillStyle = grad
          revealCtx.fillRect(0, 0, revealCanvas.width, revealCanvas.height)
          revealCtx.globalCompositeOperation = 'source-over'

          ctx.drawImage(revealCanvas, 0, 0)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', sample)
      cancelAnimationFrame(raf)
    }
  }, [src, pointerRef])

  return (
    <div ref={containerRef} className={className} role="img" aria-label={alt}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
    </div>
  )
}
