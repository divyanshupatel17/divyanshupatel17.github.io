import { ArrowRight, ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
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
    <SpotlightCard className={cn('group flex h-full flex-col border border-border bg-ink-soft/60', className)}>
      <div className={cn('flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br', project.gradient)}>
        <span className="display text-2xl text-paper/25 transition-transform duration-700 group-hover:scale-105">
          {project.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="display flex items-center gap-2 text-lg">
          {project.name}
          <ArrowUpRight className="h-3.5 w-3.5 text-red opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="mt-1 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-border px-1.5 py-0.5 font-mono text-[0.58rem]">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-2.5">
          {project.links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              className="group/l inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/80 transition-colors hover:text-red"
            >
              <Icon className="h-3 w-3" />
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
    <section
      id="projects"
      className="section-screen relative flex flex-col justify-center overflow-hidden bg-ink pt-20"
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-50" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-6 md:px-10">
        <Reveal className="label flex items-center gap-3 text-muted-foreground">
          <span>A Few Things I Built</span>
        </Reveal>

        <div className="mt-3 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <h2 className="display text-[clamp(2.1rem,5.2vw,3.8rem)]">
            <Reveal>Ideas into</Reveal>
            <Reveal delay={0.08} className="mt-1 flex items-end gap-3 md:mt-2">
              <span className="text-red">Real Products.</span>
              <ArrowUpRight className="mb-1 hidden h-6 w-6 text-paper sm:block" />
            </Reveal>
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            <p className="hand max-w-[14rem] text-lg leading-tight text-paper">
              Not just projects, but solutions to real problems.
              <span className="mt-1 block h-0.5 w-14 -skew-x-12 bg-red" />
            </p>
            <Magnet strength={8}>
              <a
                href="https://github.com/divyanshupatel17"
                target="_blank"
                rel="noreferrer"
                className="label group inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-paper transition-colors hover:border-red hover:bg-red"
              >
                View All Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={0.06 * i}>
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
