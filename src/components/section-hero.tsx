import { ArrowDown, ArrowRight } from 'lucide-react'

import { socials } from './icons'
import { Magnet, Reveal, RevealWords } from './motion-primitives'

export function SectionHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink pt-28 md:pt-24">
      <div aria-hidden className="grid-texture absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-[1400px] items-end gap-10 px-5 pb-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-0">
        <div className="pb-4 lg:pb-20 lg:pt-14">
          <Reveal className="label flex items-center gap-3 text-muted-foreground">
            <span className="text-red">01</span>
            <span className="h-px w-6 bg-border" />
            <span>Hello There</span>
          </Reveal>

          <h1 className="display mt-6 text-[clamp(3rem,11vw,7.5rem)]">
            <span className="block">
              <RevealWords text="I'm" />
            </span>
            <span className="block text-red">
              <RevealWords text="Divyanshu" />
            </span>
            <span className="block">
              <RevealWords text="Patel" />
            </span>
          </h1>

          <Reveal delay={0.15} className="label mt-6 text-paper">
            Developer <span className="text-red">·</span> Builder <span className="text-red">·</span>{' '}
            Problem Solver
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
              I build useful digital products that solve real problems and create meaningful
              experiences.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnet strength={8}>
              <a
                href="#projects"
                className="label group inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 text-primary-foreground transition-colors hover:bg-red-deep"
              >
                View My Work
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
            <Magnet strength={8}>
              <a
                href="/resume.pdf"
                download
                className="label group inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 text-paper transition-colors hover:border-paper"
              >
                Download Resume
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnet>
          </Reveal>

          <Reveal delay={0.38} className="mt-9 flex items-center gap-3">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={name}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-paper transition-colors hover:border-red hover:bg-red"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </Reveal>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 h-[78%] w-[70%] -translate-x-1/2 bg-red"
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-4 left-1/2 hidden h-[62%] w-[86%] -translate-x-1/2 border border-red/40 lg:block"
          />
          <Reveal y={40} delay={0.1} className="relative">
            <img
              src="/portrait.jpg"
              alt="Divyanshu Patel"
              width={1008}
              height={1200}
              className="relative mx-auto max-h-[74vh] w-full object-cover object-top mix-blend-lighten"
            />
          </Reveal>

          <div className="hand pointer-events-none absolute right-2 top-8 hidden text-2xl leading-tight text-paper lg:block">
            Keep
            <br />
            Exploring.
            <span className="mt-1 block h-0.5 w-16 -skew-x-12 bg-red" />
          </div>
        </div>
      </div>
    </section>
  )
}
