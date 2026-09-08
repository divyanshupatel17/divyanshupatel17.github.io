import { Mail } from 'lucide-react'

import { InteractiveGlobe } from './interactive-globe'
import { SiteFooter } from './site-footer'
import { Reveal } from './motion-primitives'

export function SectionContact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-ink"
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-40" />

      <div className="relative flex flex-1 flex-col pt-20">
        <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
          {/* Globe: large, centered, cropped to just its top dome, shifted down toward DIVYANSHU */}
          <div className="absolute inset-x-0 top-0 z-0 h-[260px] overflow-hidden sm:h-[320px] md:h-[380px] lg:h-[460px]">
            <InteractiveGlobe />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, var(--ink) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 py-4">
            <Reveal className="label flex items-center gap-3 text-muted-foreground">
              <span>Let&apos;s Make Something</span>
            </Reveal>

            <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <h2 className="display text-[clamp(2.3rem,5.6vw,4rem)]">
                  <Reveal>Get in</Reveal>
                  <Reveal delay={0.08} className="mt-1 text-red md:mt-2">
                    Touch.
                  </Reveal>
                </h2>
                <Reveal delay={0.14}>
                  <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
                    Open to opportunities, collaborations or just a good conversation.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.16} className="flex flex-wrap items-center gap-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=itzdivyanshupatel@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Email Divyanshu on Gmail"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-red hover:bg-red"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <p className="hand text-xl leading-tight text-paper">
                  Drop me a &ldquo;hi&rdquo;.
                  <br />
                  Let&apos;s catch up soon.
                  <span className="mt-1 block h-0.5 w-14 -skew-x-12 bg-red" />
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div aria-hidden className="flex-1" />

        {/* Cinematic DIVYANSHU signoff */}
        <div className="relative z-10 mt-2 md:mt-4">
          <h2
            aria-hidden
            className="display w-full text-center text-[clamp(4rem,19vw,15rem)] leading-[0.82] tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, var(--red) 0%, var(--red-deep) 60%, var(--ink) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Divyanshu
          </h2>
          <span className="sr-only">Divyanshu Patel</span>

          <div className="label relative mt-2 flex flex-wrap items-center justify-center gap-4 pb-4 text-muted-foreground">
            <span>Keep Exploring</span>
            <span className="text-red">/</span>
            <span>Keep Building</span>
            <span className="text-red">/</span>
            <span>Keep Going</span>
          </div>
        </div>
      </div>

      <SiteFooter />
    </section>
  )
}
