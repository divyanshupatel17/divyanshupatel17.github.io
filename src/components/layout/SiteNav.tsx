import { useEffect, useState } from 'react'
import { navLinks, profile } from '../../data/profile'
import { MoonIcon, SunIcon } from '../ui/Icons'
import Monogram from '../ui/Monogram'

type SiteNavProps = {
  night: boolean
  onToggleTheme: () => void
}

export default function SiteNav({ night, onToggleTheme }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#work')

  useEffect(() => {
    const ids = navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="site-nav">
      <div className="site-nav__bar">
        <a
          href="#top"
          className="site-nav__brand"
          aria-label={`${profile.name}, back to top`}
          data-cursor="home"
        >
          <Monogram />
        </a>

        <nav className="nav-tray" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-item${active === link.href ? ' is-active' : ''}`}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={night ? 'Switch to day' : 'Switch to night'}
          data-cursor={night ? 'day' : 'night'}
        >
          <span className="theme-toggle__icon">{night ? <MoonIcon /> : <SunIcon />}</span>
        </button>

        <button
          type="button"
          className={`nav-burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-overlay${open ? ' is-open' : ''}`}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
