import { Compass, GraduationCap, Hammer, Lightbulb } from 'lucide-react'

import camera from '../assets/collage-camera.jpg'
import city from '../assets/collage-city.jpg'
import laptop from '../assets/collage-laptop.jpg'
import mountain from '../assets/collage-mountain.jpg'
import { BorderGlow } from './border-glow'
import { CountUp, Reveal, TiltedCard } from './motion-primitives'

const cards = [
  { Icon: GraduationCap, title: 'VIT Chennai', body: 'B.Tech CSE' },
  { Icon: Hammer, title: 'Building', body: 'Apps, websites & digital products' },
  { Icon: Lightbulb, title: 'Exploring', body: 'AI, emerging technology & new ideas' },
  { Icon: Compass, title: 'Interests', body: 'Technology, design, photography, exploration' },
]

const GLOW_COLORS = ['#ff6a52', '#d8101f', '#7a0710']

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
    <section
      id="about"
      className="section-screen relative flex flex-col justify-center overflow-hidden bg-paper pt-20 text-ink"
    >
      <div aria-hidden className="grid-texture-light absolute inset-0 opacity-70" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          <div>
            <Reveal className="label flex items-center gap-3 text-ink/50">
              <span>Beyond the Code</span>
            </Reveal>

            <h2 className="display mt-4 text-[clamp(2.3rem,5.6vw,4.2rem)]">
              <Reveal>Curious mind.</Reveal>
              <Reveal delay={0.08} className="mt-1 md:mt-2">
                Creative <span className="text-red">builder.</span>
              </Reveal>
            </h2>

            <Reveal delay={0.14}>
              <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
                I&apos;m Divyanshu Patel, a developer who enjoys turning ideas into useful digital
                products. I like exploring new technologies, building things from scratch, and
                continuously learning through real-world projects.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={0.06 * i} className="h-full">
                  <BorderGlow
                    className="group h-full"
                    backgroundColor="#f7f6f1"
                    borderRadius={6}
                    glowColor="355 86 46"
                    glowRadius={22}
                    glowIntensity={1.15}
                    edgeSensitivity={35}
                    coneSpread={28}
                    colors={GLOW_COLORS}
                    fillOpacity={0.32}
                  >
                    <div className="h-full p-4">
                      <Icon className="h-5 w-5 text-ink transition-colors group-hover:text-red" />
                      <h3 className="mt-4 font-display text-base uppercase tracking-wide">{title}</h3>
                      <p className="mt-1 font-mono text-[0.68rem] leading-relaxed text-ink/60">
                        {body}
                      </p>
                    </div>
                  </BorderGlow>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.06 * i}>
                  <div>
                    <p className="display text-3xl text-red md:text-4xl">
                      {s.value === null ? s.suffix : <CountUp to={s.value} suffix={s.suffix} />}
                    </p>
                    <p className="label mt-2 text-ink/55">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Editorial collage */}
          <Reveal y={40} className="relative min-h-[360px] lg:min-h-[440px]">
            <div className="hand absolute top-2 right-2 z-40 rounded-lg bg-paper/95 px-3 py-2 text-right text-2xl leading-tight text-ink shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)]">
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
