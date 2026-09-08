import { ArrowRight, Mail } from 'lucide-react'

import { InteractiveMoon } from './interactive-moon'
import { Magnet, Reveal } from './motion-primitives'

export function SectionContact() {
  return (
    <section
      id="contact"
      className="section-screen relative flex flex-col justify-center overflow-hidden bg-ink pt-20"
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-4 md:px-10">
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
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border">
              <Mail className="h-4 w-4" />
            </span>
            <p className="hand text-xl leading-tight text-paper">
              Drop me a &ldquo;hi&rdquo;.
              <br />
              Let&apos;s catch up soon.
              <span className="mt-1 block h-0.5 w-14 -skew-x-12 bg-red" />
            </p>
            <Magnet strength={10}>
              <a
                href="mailto:itzdivyanshupatel@gmail.com"
                className="label group inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-primary-foreground transition-colors hover:bg-red-deep"
              >
                <Mail className="h-3.5 w-3.5" />
                Say Hi
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
          </Reveal>
        </div>
      </div>

      {/* Cinematic DIVYANSHU + moon composition */}
      <div className="relative mt-6 md:mt-8">
        <h2
          aria-hidden
          className="display relative z-10 w-full text-center text-[clamp(2.6rem,13vw,9rem)] leading-[0.8]"
          style={{
            background: 'linear-gradient(180deg, var(--red) 42%, var(--red-deep) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Divyanshu
        </h2>
        <span className="sr-only">Divyanshu Patel</span>

        <div className="relative -mt-[6%] h-[100px] w-full overflow-hidden md:h-[160px] lg:h-[200px]">
          <InteractiveMoon />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, var(--ink) 0%, transparent 22%)',
            }}
          />
        </div>

        <div className="label relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4 pb-6 text-muted-foreground">
          <span>Keep Exploring</span>
          <span className="text-red">/</span>
          <span>Keep Building</span>
          <span className="text-red">/</span>
          <span>Keep Going</span>
        </div>
      </div>
    </section>
  )
}
