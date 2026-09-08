import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { GlassSurface } from './glass-surface'
import { Magnet } from './motion-primitives'
import { cn } from '../lib/utils'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  // Hide-on-scroll-down / show-on-scroll-up, disabled for now — restore
  // `const [hidden, setHidden] = useState(false)` and the block below to bring it back.
  const hidden = false
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY

      // const delta = y - lastY.current
      // if (open || y < 80) {
      //   setHidden(false)
      // } else if (delta > 4) {
      //   setHidden(true)
      // } else if (delta < -4) {
      //   setHidden(false)
      // }
      lastY.current = y

      const current = links.find((l) => {
        const el = document.querySelector(l.href)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= 120 && r.bottom > 120
      })
      if (current) setActive(current.href)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-4 z-50 flex justify-end px-4 transition-all duration-500 ease-out lg:justify-center',
        hidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <div className="flex flex-col items-end lg:items-center">
        <GlassSurface
          width="fit-content"
          height={64}
          borderRadius={999}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={50}
          opacity={0.93}
          blur={11}
          backgroundOpacity={0.06}
          saturation={1.8}
        >
          <div className="flex items-center gap-2 px-4 py-2 [text-shadow:0_1px_6px_rgb(0_0_0_/_75%)] md:gap-4 md:px-5">
            <a
              href="#home"
              aria-label="Home"
              className="shrink-0 overflow-hidden rounded-full border border-paper/40 shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
            >
              <img src="/avatar.png" alt="" className="h-9 w-9 object-cover" />
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'label relative py-1 tracking-[0.1em] transition-colors',
                    active === l.href ? 'text-paper' : 'text-paper/70 hover:text-paper',
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-red transition-transform duration-300',
                      active === l.href ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              ))}
            </nav>

            <span className="hidden h-5 w-px bg-paper/30 lg:block" />

            <Magnet strength={8} className="hidden lg:block">
              <a
                href="#contact"
                className="label group inline-flex items-center gap-2 rounded-full border border-paper/40 px-4 py-2 text-paper transition-colors hover:border-red hover:bg-red"
              >
                Let&apos;s Talk
                <ArrowRight className="h-3.5 w-3.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>

            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="shrink-0 rounded-full border border-paper/40 p-2 text-paper lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
              ) : (
                <Menu className="h-4 w-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
              )}
            </button>
          </div>
        </GlassSurface>

        {open && (
          <div className="mt-2 lg:hidden">
            <GlassSurface
              width={224}
              height="auto"
              borderRadius={20}
              distortionScale={-180}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
              brightness={50}
              opacity={0.93}
              blur={11}
              backgroundOpacity={0.12}
              saturation={1.8}
            >
              <nav className="flex w-56 flex-col gap-1 p-3 [text-shadow:0_1px_6px_rgb(0_0_0_/_75%)]">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="label rounded-lg px-3 py-2.5 text-paper transition-colors hover:bg-white/10"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="label mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-red px-4 py-2.5 text-primary-foreground"
                >
                  Let&apos;s Talk <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </nav>
            </GlassSurface>
          </div>
        )}
      </div>
    </header>
  )
}
