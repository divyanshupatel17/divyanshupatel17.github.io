import { useEffect, useRef } from 'react'
import { hero } from '../../data/profile'
import { mountDappledLight } from './dappledLight'
import type { DappledHandle } from './dappledLight'
import Stamp from './Stamp'
import PixelTiles from './PixelTiles'

/*
  The hero is laid out as a fixed 1440x776 design canvas and scaled to fit
  narrower viewports with a CSS transform, which is how the reference keeps the
  hand placed grid, tiles and stamp in exact relation to the type. Below the
  tablet breakpoint it drops to a normal stacked flow instead.
*/
export default function Hero({ night }: { night: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<DappledHandle | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    handleRef.current = mountDappledLight(canvas)
    return () => {
      handleRef.current?.destroy()
      handleRef.current = null
    }
  }, [])

  useEffect(() => {
    handleRef.current?.setDark(night)
  }, [night])

  return (
    <section className="hero" id="top">
      <div className="hero__dappled" aria-hidden="true">
        <canvas ref={canvasRef} className="hero__dappled-canvas" />
      </div>

      <div className="hero__frame">
        {/* Dashed setting grid the composition is hung from */}
        <div className="hero__grid" aria-hidden="true">
          <span className="hero__line hero__line--h1" />
          <span className="hero__line hero__line--h2" />
          <span className="hero__line hero__line--h3" />
          <span className="hero__line hero__line--h4" />
          <span className="hero__line hero__line--v1" />
          <span className="hero__line hero__line--v2" />
          <span className="hero__line hero__line--v3" />
          <span className="hero__line hero__line--v4" />
          <span className="hero__corner hero__corner--tl" />
          <span className="hero__corner hero__corner--tr" />
          <span className="hero__corner hero__corner--bl" />
          <span className="hero__corner hero__corner--br" />
        </div>

        <PixelTiles />

        <div className="hero__content">
          <p className="hero__tag">
            {hero.greeting} <em>{hero.greetingName}</em>
          </p>

          <h1 className="hero__headline">
            {hero.headline.map((line, i) => (
              <span className="hero__headline-line" key={i}>
                {line.text}
                {line.em ? <em>{line.em}</em> : null}
              </span>
            ))}
          </h1>

          <p className="hero__credit">
            <svg className="hero__credit-arrow" viewBox="0 0 72 96" fill="none" aria-hidden="true">
              <path
                d="M6 92C10 66 22 44 42 30c8-6 16-9 22-10"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M56 12c4 2 8 5 10 8-4 1-8 3-11 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hero__credit-text hand">{hero.credit}</span>
          </p>
        </div>

        {/* Loose stickers pinned over the headline panel */}
        <div className="hero__stickers" aria-hidden="true">
          <span className="hero__sticker hero__sticker--bar" />
          <span className="hero__sticker hero__sticker--dot" />
          <span className="hero__sticker hero__sticker--square" />
        </div>

        <div className="hero__stamp">
          <Stamp />
        </div>
      </div>
    </section>
  )
}
