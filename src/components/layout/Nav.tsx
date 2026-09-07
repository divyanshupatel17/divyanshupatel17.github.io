import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { BrandMark } from '../ui/Icons'
import { brand, navLinks } from '../../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return (
    <>
      <div className="nav-frame" aria-hidden="true" />
      <header className={`nav${open ? ' is-open' : ''}`}>
        <div className="container-large padding-global">
          <div className="nav-inner">
            <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
              <BrandMark className="nav-brand__mark" />
              {brand.name}
            </a>

            <nav className="nav-menu" aria-label="Main">
              <div className="nav-menu__scroll">
                <ul className="nav-list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="nav-link" onClick={() => setOpen(false)}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="nav-list is-actions">
                  <li>
                    <Button href="#contact" variant="is-outline" small>
                      Résumé
                    </Button>
                  </li>
                  <li>
                    <Button href="#contact" variant="is-accent" small>
                      Get in Touch
                    </Button>
                  </li>
                </ul>
              </div>
            </nav>

            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>

            <div className="nav-corner is-left" aria-hidden="true" />
            <div className="nav-corner is-right" aria-hidden="true" />
          </div>
        </div>
      </header>
    </>
  )
}
