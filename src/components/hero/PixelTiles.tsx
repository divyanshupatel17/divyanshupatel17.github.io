import { useCallback, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Tile = { key: string; left: number; top: number; color?: string; opacity?: number }

const PALETTE = ['#fcc0cb', '#d6dbf8', '#f9e3d0', '#bcf8d8', '#f9b3e1', '#bfe7fb', '#fddabb']

/* Positions are in the hero's 1440x776 design space. */
const TILES: Tile[] = [
  { key: 'l1', left: 199, top: 298, color: '#fcc0cb' },
  { key: 'l2', left: 229, top: 328, color: '#d6dbf8' },
  { key: 'l3', left: 259, top: 298, color: '#f9e3d0' },
  { key: 'l4', left: 259, top: 358, color: '#bcf8d8' },
  { key: 'l5', left: 289, top: 388, color: '#f9b3e1' },
  { key: 'l6', left: 199, top: 388, color: '#bfe7fb' },
  { key: 'l7', left: 229, top: 358, opacity: 0.55 },
  { key: 'r1', left: 1099, top: 268, color: '#bcf8d8' },
  { key: 'r2', left: 1129, top: 298, color: '#f9b3e1' },
  { key: 'r3', left: 1189, top: 358, color: '#bfe7fb' },
  { key: 'r4', left: 1159, top: 388, color: '#fddabb' },
]

type Burst = { id: number; left: number; top: number; shards: { dx: number; dy: number; rot: number; color: string }[] }

/*
  The confetti tiles scattered around the headline. Poking one scatters it into
  shards and it fades back in, which is the small reward the reference gives for
  noticing them.
*/
export default function PixelTiles() {
  const [bursts, setBursts] = useState<Burst[]>([])
  const [hidden, setHidden] = useState<Record<string, boolean>>({})
  const nextId = useRef(0)

  const pop = useCallback((tile: Tile) => {
    if (hidden[tile.key]) return
    const id = nextId.current++

    const shards = Array.from({ length: 7 }, () => ({
      dx: (Math.random() - 0.5) * 120,
      dy: -20 - Math.random() * 90,
      rot: (Math.random() - 0.5) * 320,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }))

    setHidden((prev) => ({ ...prev, [tile.key]: true }))
    setBursts((prev) => [...prev, { id, left: tile.left, top: tile.top, shards }])

    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 900)
    window.setTimeout(() => {
      setHidden((prev) => ({ ...prev, [tile.key]: false }))
    }, 1400)
  }, [hidden])

  return (
    <>
      {TILES.map((tile) => (
        <button
          type="button"
          key={tile.key}
          className={`hero__pixel${hidden[tile.key] ? ' is-popped' : ''}`}
          style={{
            left: tile.left,
            top: tile.top,
            background: tile.color ?? 'var(--tile)',
            opacity: tile.opacity,
          }}
          onClick={() => pop(tile)}
          onPointerEnter={() => pop(tile)}
          aria-label="Decorative tile"
          tabIndex={-1}
          data-cursor="pop"
        />
      ))}

      {bursts.map((burst) => (
        <span
          className="hero__burst"
          key={burst.id}
          style={{ left: burst.left, top: burst.top }}
          aria-hidden="true"
        >
          {burst.shards.map((shard, i) => (
            <span
              key={i}
              className="hero__shard"
              style={
                {
                  background: shard.color,
                  '--dx': `${shard.dx}px`,
                  '--dy': `${shard.dy}px`,
                  '--rot': `${shard.rot}deg`,
                } as CSSProperties
              }
            />
          ))}
        </span>
      ))}
    </>
  )
}
