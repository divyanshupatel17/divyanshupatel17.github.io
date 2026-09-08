import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
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
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-border bg-ink/90 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <a href="#home" className="display min-w-0 text-2xl tracking-tight">
          DP<span className="text-red">.</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                'label relative py-1 tracking-[0.12em] transition-colors',
                active === l.href ? 'text-paper' : 'text-muted-foreground hover:text-paper',
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

        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full border border-border p-2 text-paper"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden lg:block">
          <Magnet strength={8}>
            <a
              href="#contact"
              className="label group inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-paper transition-colors hover:border-red hover:bg-red"
            >
              Let&apos;s Talk
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnet>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-ink px-5 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display block border-b border-border py-3 text-2xl text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="label mt-5 inline-flex items-center gap-2 bg-red px-5 py-3 text-primary-foreground"
          >
            Let&apos;s Talk <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      )}
    </header>
  )
}
