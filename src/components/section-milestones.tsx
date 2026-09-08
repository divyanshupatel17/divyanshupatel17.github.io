import { ArrowRight, Award, GitBranch, GraduationCap, Smartphone, Trophy } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from './motion-primitives'
import { cn } from '../lib/utils'

const filters = ['All', 'Built', 'Achieved', 'Certified', 'Contributed'] as const
type Filter = (typeof filters)[number]

const milestones: {
  year: string
  title: string
  body: string
  tag: Exclude<Filter, 'All'>
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    year: '2023',
    title: 'Started the Journey',
    body: 'B.Tech at VIT Chennai',
    tag: 'Achieved',
    Icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'First App Published',
    body: 'Launched TaskMate on Play Store',
    tag: 'Built',
    Icon: Smartphone,
  },
  {
    year: '2024',
    title: 'Hackathon Winner',
    body: 'Won at university hackathon',
    tag: 'Achieved',
    Icon: Trophy,
  },
  {
    year: '2025',
    title: 'Google Certification',
    body: 'Completed Google certification',
    tag: 'Certified',
    Icon: Award,
  },
  {
    year: '2025',
    title: 'Open Source',
    body: 'Contributed to open-source projects',
    tag: 'Contributed',
    Icon: GitBranch,
  },
]

export function SectionMilestones() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = milestones.filter((m) => filter === 'All' || m.tag === filter)

  return (
    <section id="achievements" className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="grid-texture-light absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="label flex items-center gap-3 text-ink/50">
          <span className="text-red">04</span>
          <span className="h-px w-6 bg-ink/20" />
          <span>Things I&apos;ve Done</span>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="display text-[clamp(2.3rem,6.2vw,4.4rem)]">
              <Reveal>Milestones</Reveal>
              <Reveal delay={0.08}>
                &amp; <span className="text-red">More.</span>
              </Reveal>
            </h2>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-ink/70">
                A timeline of projects, achievements, certifications and contributions that keep me
                moving forward.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'label rounded-full border px-4 py-2 transition-colors',
                  filter === f
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/20 text-ink/60 hover:border-ink hover:text-ink',
                )}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="relative mt-14">
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-5">
            {visible.map((m, i) => (
              <Reveal key={m.title} delay={0.06 * i}>
                <article className="group relative h-full border border-ink/15 bg-white/70 p-5 transition-colors hover:border-red">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-ink/50">{m.year}</span>
                    <m.Icon className="h-5 w-5 shrink-0 text-ink/70 transition-colors group-hover:text-red" />
                  </div>
                  <h3 className="mt-4 font-display text-lg uppercase leading-tight tracking-wide">
                    {m.title}
                  </h3>
                  <p className="mt-2 font-mono text-[0.7rem] leading-relaxed text-ink/60">
                    {m.body}
                  </p>
                  <span className="label mt-5 block text-red">{m.tag}</span>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 hidden items-center gap-4 md:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-ink" />
            <span className="h-px flex-1 bg-ink/25" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-ink" />
            <span className="h-px flex-1 bg-ink/25" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-red" />
            <a
              href="#contact"
              className="label group ml-4 inline-flex shrink-0 items-center gap-2 text-ink/60 hover:text-red"
            >
              Keep exploring
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
