import { ArrowUp } from 'lucide-react'

import { socials } from './icons'

export function SiteFooter() {
  return (
    <footer className="bg-red text-primary-foreground">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-8 md:px-10 lg:grid-cols-3">
        <div className="flex min-w-0 items-center gap-4">
          <span className="display shrink-0 text-3xl">
            DP<span className="text-ink">.</span>
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm uppercase tracking-widest">
              Divyanshu Patel
            </p>
            <p className="font-mono text-[0.65rem] text-white/75">
              Developer · Builder · Problem Solver
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:justify-center">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={name}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:border-ink hover:bg-ink"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 lg:justify-end">
          <p className="font-mono text-[0.65rem] leading-relaxed text-white/85 lg:text-right">
            © 2026 Divyanshu Patel.
            <br />
            All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform hover:-translate-y-1"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
