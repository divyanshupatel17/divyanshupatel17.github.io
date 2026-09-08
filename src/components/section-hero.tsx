import { ArrowDown, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

import { PortraitSpotlight } from './portrait-spotlight'
import { useSocials } from './icons'
import { Magnet, Reveal, RevealWords } from './motion-primitives'

export function SectionHero() {
  const pointerRef = useRef({ x: -9999, y: -9999 })
  const socials = useSocials()

  return (
    <section
      id="home"
      onPointerMove={(e) => {
        pointerRef.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: -9999, y: -9999 }
      }}
      className="section-screen relative z-10 flex flex-col bg-ink pt-20"
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-stretch gap-8 px-5 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-4">
        <div className="flex flex-col justify-center py-6">
          <Reveal className="label flex items-center gap-3 text-muted-foreground">
            <span>Hello There</span>
          </Reveal>

          <h1 className="display mt-5 text-[clamp(2.9rem,10vw,7.2rem)] leading-[1.05]">
            <span className="block">
              <RevealWords text="I'm" />
            </span>
            <span className="mt-1 block text-red md:mt-2">
              <RevealWords text="Divyanshu" />
            </span>
            <span className="mt-1 block md:mt-2">
              <RevealWords text="Patel" />
            </span>
          </h1>

          <Reveal delay={0.15} className="label mt-5 text-paper">
            Developer <span className="text-red">·</span> Builder <span className="text-red">·</span>{' '}
            Problem Solver
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
              I build useful digital products that solve real problems and create meaningful
              experiences.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-7 flex flex-wrap items-center gap-4">
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

          <Reveal delay={0.38} className="mt-7 flex items-center gap-3">
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

        <div className="relative h-full min-h-[50dvh] overflow-hidden">
          <Reveal y={40} delay={0.1} className="absolute inset-0">
            <PortraitSpotlight
              src="/user-portrait.webp"
              pointerRef={pointerRef}
              alt="Divyanshu Patel"
              className="h-full w-full"
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
