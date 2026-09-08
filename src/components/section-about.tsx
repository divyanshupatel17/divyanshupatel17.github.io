import { Compass, GraduationCap, Hammer, Lightbulb } from 'lucide-react'

import camera from '../assets/collage-camera.jpg'
import city from '../assets/collage-city.jpg'
import laptop from '../assets/collage-laptop.jpg'
import mountain from '../assets/collage-mountain.jpg'
import { CountUp, Reveal, TiltedCard } from './motion-primitives'

const cards = [
  { Icon: GraduationCap, title: 'VIT Chennai', body: 'B.Tech CSE' },
  { Icon: Hammer, title: 'Building', body: 'Apps, websites & digital products' },
  { Icon: Lightbulb, title: 'Exploring', body: 'AI, emerging technology & new ideas' },
  { Icon: Compass, title: 'Interests', body: 'Technology, design, photography, exploration' },
]

const stats = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '', label: 'Apps / Products' },
  { value: 6, suffix: '', label: 'Certifications' },
  { value: null, suffix: '∞', label: 'Things to Explore' },
]

function Polaroid({
  src,
  alt,
  className,
  rotate,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  rotate: string
  width: number
  height: number
}) {
  return (
    <TiltedCard max={7} className={className}>
      <div
        className="bg-white p-2 pb-6 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]"
        style={{ transform: `rotate(${rotate})` }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </TiltedCard>
  )
}

export function SectionAbout() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="grid-texture-light absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          <div>
            <Reveal className="label flex items-center gap-3 text-ink/50">
              <span className="text-red">02</span>
              <span className="h-px w-6 bg-ink/20" />
              <span>Beyond the Code</span>
            </Reveal>

            <h2 className="display mt-6 text-[clamp(2.3rem,6.2vw,4.4rem)]">
              <Reveal>Curious mind.</Reveal>
              <Reveal delay={0.08}>
                Creative <span className="text-red">builder.</span>
              </Reveal>
            </h2>

            <Reveal delay={0.14}>
              <p className="mt-7 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
                I&apos;m Divyanshu Patel, a developer who enjoys turning ideas into useful digital
                products. I like exploring new technologies, building things from scratch, and
                continuously learning through real-world projects.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={0.06 * i}>
                  <div className="group h-full border border-ink/15 bg-white/60 p-5 transition-colors hover:border-red">
                    <Icon className="h-6 w-6 text-ink transition-colors group-hover:text-red" />
                    <h3 className="mt-6 font-display text-lg uppercase tracking-wide">{title}</h3>
                    <p className="mt-1 font-mono text-[0.7rem] leading-relaxed text-ink/60">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.06 * i}>
                  <div>
                    <p className="display text-4xl text-red md:text-5xl">
                      {s.value === null ? s.suffix : <CountUp to={s.value} suffix={s.suffix} />}
                    </p>
                    <p className="label mt-2 text-ink/55">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Editorial collage */}
          <Reveal y={40} className="relative min-h-[520px] lg:min-h-[640px]">
            <div className="hand absolute -top-2 right-2 z-30 text-right text-2xl leading-tight text-ink">
              Build
              <br />
              Explore
              <br />
              Repeat.
              <span className="mt-1 ml-auto block h-0.5 w-14 -skew-x-12 bg-red" />
            </div>

            <div className="absolute left-0 top-16 z-30 w-40 -rotate-6 bg-[#f3e6b8] p-4 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)]">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-red" />
              <p className="hand text-lg leading-snug text-ink">
                Same Curiosity.
                <br />
                Different Horizons.
              </p>
            </div>

            <Polaroid
              src="/portrait.jpg"
              alt="Divyanshu Patel"
              rotate="4deg"
              width={800}
              height={1000}
              className="absolute left-[18%] top-0 z-20 w-[52%]"
            />
            <Polaroid
              src={city}
              alt="City skyline at night"
              rotate="-3deg"
              width={700}
              height={900}
              className="absolute right-0 top-6 z-10 w-[34%]"
            />
            <Polaroid
              src={laptop}
              alt="Laptop with code at night"
              rotate="-2deg"
              width={900}
              height={700}
              className="absolute bottom-8 left-0 z-20 w-[46%]"
            />
            <Polaroid
              src={mountain}
              alt="Snow capped mountain"
              rotate="5deg"
              width={800}
              height={800}
              className="absolute bottom-0 left-[38%] z-30 w-[34%]"
            />
            <Polaroid
              src={camera}
              alt="Mirrorless camera"
              rotate="-5deg"
              width={800}
              height={700}
              className="absolute bottom-14 right-0 z-10 w-[36%]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
