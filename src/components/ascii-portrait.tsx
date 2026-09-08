import { useEffect, useRef } from 'react'

/**
 * Canvas-based dither / ASCII portrait, inspired by the 21st.dev "Areeb Ascii"
 * effect. At rest each grid cell renders as a small luminance-sized dot
 * (dither look); on hover the same grid crossfades into monospace ASCII
 * glyphs. A slow per-cell shimmer keeps it alive even when idle.
 *
 * This reimplements only the two render modes this design actually uses
 * (dither + characters) plus brightness/contrast/tint color grading and a
 * shimmer animation — not the full 21st.dev parameter surface (the other
 * render modes, post-fx stack, lights and masking are out of scope here).
 */

const CHARSET = ' .:-=+*#%@'
const CELL_SIZE = 8
const CONTRAST = 1.35
const BRIGHTNESS = 0.02
const SHIMMER_SPEED = 0.9
const SHIMMER_INTENSITY = 0.12

type Cell = { x: number; y: number; lum: number; a: number; phase: number }

function rampColor(lum: number) {
  // dark ember red -> brand red -> warm highlight, matching the site's red/ink palette
  const stops: [number, number, number, number][] = [
    [0, 0x18, 0x04, 0x04],
    [0.45, 0xa5, 0x00, 0x0c],
    [0.75, 0xd8, 0x10, 0x1f],
    [1, 0xff, 0xe4, 0xd9],
  ]
  let lo = stops[0]
  let hi = stops[stops.length - 1]
  for (let i = 0; i < stops.length - 1; i++) {
    if (lum >= stops[i][0] && lum <= stops[i + 1][0]) {
      lo = stops[i]
      hi = stops[i + 1]
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

export function AsciiPortrait({
  src,
  hovered,
  className,
  alt = '',
}: {
  src: string
  hovered: boolean
  className?: string
  alt?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef(0)
  const targetRef = useRef(0)
  const cellsRef = useRef<Cell[]>([])
  const cellPxRef = useRef(CELL_SIZE)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
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
      if (!container || !canvas || !image) return

      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      // object-contain, anchored bottom-center, matching the previous <img> treatment
      const scale = Math.min(rect.width / image.width, rect.height / image.height)
      const drawW = image.width * scale
      const drawH = image.height * scale
      const drawX = (rect.width - drawW) / 2
      const drawY = rect.height - drawH

      const cellPx = Math.max(4, CELL_SIZE * dpr)
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
          if (a < 0.12) continue
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
          cells.push({
            x: drawX * dpr + x * cellPx,
            y: drawY * dpr + y * cellPx,
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

    let raf = 0
    const draw = (t: number) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (canvas && ctx) {
        hoverRef.current += (targetRef.current - hoverRef.current) * 0.08
        const hoverT = hoverRef.current
        const cellPx = cellPxRef.current
        const time = t / 1000

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${cellPx * 0.98}px "JetBrains Mono", ui-monospace, monospace`
        ctx.textBaseline = 'middle'

        for (const cell of cellsRef.current) {
          const shimmer = Math.sin(time * SHIMMER_SPEED + cell.phase) * SHIMMER_INTENSITY
          let lum = (cell.lum - 0.5) * CONTRAST + 0.5 + BRIGHTNESS + shimmer
          lum = Math.min(1, Math.max(0, lum))
          const color = rampColor(lum)
          const cx = cell.x + cellPx / 2
          const cy = cell.y + cellPx / 2

          if (hoverT < 0.98) {
            const dotR = (cellPx / 2) * (0.25 + lum * 0.7)
            ctx.globalAlpha = cell.a * (1 - hoverT)
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(cx, cy, dotR, 0, Math.PI * 2)
            ctx.fill()
          }

          if (hoverT > 0.02) {
            const idx = Math.min(CHARSET.length - 1, Math.floor(lum * CHARSET.length))
            const ch = CHARSET[idx]
            if (ch !== ' ') {
              ctx.globalAlpha = cell.a * hoverT
              ctx.fillStyle = color
              ctx.textAlign = 'center'
              ctx.fillText(ch, cx, cy + cellPx * 0.03)
            }
          }
        }
        ctx.globalAlpha = 1
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [src])

  useEffect(() => {
    targetRef.current = hovered ? 1 : 0
  }, [hovered])

  return (
    <div ref={containerRef} className={className} role="img" aria-label={alt}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
    </div>
  )
}
