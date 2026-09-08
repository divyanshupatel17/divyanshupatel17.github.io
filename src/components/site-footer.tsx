import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { socials } from './icons'
import { TargetCursor } from './target-cursor'

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [cursorActive, setCursorActive] = useState(false)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const footer = footerRef.current
      if (!footer) return
      const rect = footer.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      setCursorActive(inside)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <footer ref={footerRef} className="relative z-10 shrink-0 text-primary-foreground">
      {cursorActive && (
        <TargetCursor targetSelector=".social-cursor-target" spinDuration={2} hoverDuration={0.3} hideDefaultCursor={false} />
      )}

      <div className="flex flex-wrap bg-red">
        {socials.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className="social-cursor-target label group inline-flex flex-1 basis-1/2 items-center justify-center gap-2 border-white/20 py-6 sm:basis-auto sm:border-l first:border-l-0"
          >
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{name}</span>
          </a>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 bg-ink px-5 py-2.5 text-paper md:px-10">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src="/avatar.png"
            alt=""
            className="h-7 w-7 shrink-0 rounded-full border border-paper/25 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-xs uppercase tracking-widest">
              Divyanshu Patel
            </p>
            <p className="font-mono text-[0.6rem] text-paper/60">
              Developer · Builder · Problem Solver
            </p>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] leading-relaxed text-paper/60">
          © 2026 Divyanshu Patel. All rights reserved.
        </p>

        <a
          href="#home"
          aria-label="Back to top"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-paper/25 text-paper transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  )
}
