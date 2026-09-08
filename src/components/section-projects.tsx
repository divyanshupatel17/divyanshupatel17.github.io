import { ArrowRight, ArrowUpRight, ExternalLink, FolderOpen, Github, Play } from 'lucide-react'
import type { ComponentType } from 'react'

import { Magnet, Reveal, SpotlightCard } from './motion-primitives'
import { cn } from '../lib/utils'

type Link = { label: string; href: string; Icon: ComponentType<{ className?: string }> }

type Project = {
  name: string
  description: string
  gradient: string
  stack: string[]
  links: Link[]
}

const projects: Project[] = [
  {
    name: 'Findr',
    description: 'A smart lost & found platform for students.',
    gradient: 'from-emerald-800 via-emerald-900 to-ink',
    stack: ['Android', 'Kotlin', 'Firebase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/divyanshupatel17', Icon: Github },
      { label: 'Play Store', href: '#projects', Icon: Play },
      { label: 'Live Demo', href: '#projects', Icon: ExternalLink },
    ],
  },
  {
    name: 'StudySync',
    description: 'Collaborative learning platform for students.',
    gradient: 'from-slate-200 via-slate-300 to-slate-500',
    stack: ['Next.js', 'Tailwind', 'MongoDB'],
    links: [
      { label: 'GitHub', href: 'https://github.com/divyanshupatel17', Icon: Github },
      { label: 'Live Demo', href: '#projects', Icon: ExternalLink },
    ],
  },
  {
    name: 'TaskMate',
    description: 'A minimal and powerful task management app.',
    gradient: 'from-slate-800 via-slate-900 to-ink',
    stack: ['Kotlin', 'Firebase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/divyanshupatel17', Icon: Github },
      { label: 'Play Store', href: '#projects', Icon: Play },
    ],
  },
  {
    name: 'Portfolio',
    description: 'My personal portfolio website.',
    gradient: 'from-red-deep via-ink to-ink',
    stack: ['React', 'Three.js', 'Tailwind'],
    links: [
      { label: 'GitHub', href: 'https://github.com/divyanshupatel17', Icon: Github },
      { label: 'Live Demo', href: '#home', Icon: ExternalLink },
    ],
  },
]

function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <SpotlightCard className={cn('group h-full border border-border bg-ink-soft/60', className)}>
      <div className={cn('flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br', project.gradient)}>
        <span className="display text-4xl text-paper/25 transition-transform duration-700 group-hover:scale-105">
          {project.name}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="display flex items-center gap-2 text-2xl">
          {project.name}
          <ArrowUpRight className="h-4 w-4 text-red opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-border px-2.5 py-1 font-mono text-[0.65rem]">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-border pt-4">
          {project.links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              className="group/l inline-flex items-center gap-2 font-mono text-[0.7rem] text-paper/80 transition-colors hover:text-red"
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="underline-offset-4 group-hover/l:underline">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

export function SectionProjects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ink">
      <div aria-hidden className="grid-texture absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="label flex items-center gap-3 text-muted-foreground">
          <span className="text-red">03</span>
          <span className="h-px w-6 bg-border" />
          <span>A Few Things I Built</span>
        </Reveal>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <h2 className="display text-[clamp(2.3rem,6.2vw,4.4rem)]">
            <Reveal>Ideas into</Reveal>
            <Reveal delay={0.08} className="flex items-end gap-3">
              <span className="text-red">Real Products.</span>
              <ArrowUpRight className="mb-2 hidden h-8 w-8 text-paper sm:block" />
            </Reveal>
          </h2>

          <div className="flex flex-wrap items-center gap-8">
            <p className="hand max-w-[14rem] text-xl leading-tight text-paper">
              Not just projects, but solutions to real problems.
              <span className="mt-1 block h-0.5 w-14 -skew-x-12 bg-red" />
            </p>
            <Magnet strength={8}>
              <a
                href="https://github.com/divyanshupatel17"
                target="_blank"
                rel="noreferrer"
                className="label group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-paper transition-colors hover:border-red hover:bg-red"
              >
                View All Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
          </div>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ProjectCard project={projects[0]!} className="h-full" />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <ProjectCard project={projects[1]!} className="h-full" />
          </Reveal>
          <Reveal delay={0.04} className="lg:col-span-4">
            <ProjectCard project={projects[2]!} className="h-full" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <ProjectCard project={projects[3]!} className="h-full" />
          </Reveal>
          <Reveal delay={0.16} className="lg:col-span-4">
            <SpotlightCard className="flex h-full flex-col justify-between border border-border bg-ink-soft/60 p-6">
              <div>
                <FolderOpen className="h-9 w-9 text-paper" />
                <h3 className="display mt-8 text-2xl">More Projects</h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                  Explore more of my work, experiments and open-source contributions.
                </p>
              </div>
              <a
                href="https://github.com/divyanshupatel17"
                target="_blank"
                rel="noreferrer"
                className="label group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-paper transition-colors hover:border-red hover:bg-red"
              >
                View All Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
