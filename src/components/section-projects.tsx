import { ArrowRight, ArrowUpRight, ExternalLink, FileText, Github, Play } from 'lucide-react'
import { useState } from 'react'

import { projectCategories, type Project } from '../data/projects'
import { Magnet, Reveal } from './motion-primitives'
import { cn } from '../lib/utils'

const pad = (n: number) => String(n).padStart(2, '0')

// Notable affiliations/tags called out with a filled red chip instead of an outline one.
const HIGHLIGHT_TAGS = new Set(['aws', 'isro', 'hackathon'])

function ProjectCard({
  project,
  centered,
  delay,
}: {
  project: Project
  centered: boolean
  delay: number
}) {
  const { links } = project
  const primaryLink = links.website ?? links.playStore ?? links.paper ?? links.presentation ?? links.github

  return (
    <Reveal
      delay={delay}
      className={cn(centered && 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.5rem)]')}
    >
      <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-ink-soft transition-colors hover:border-red/50">
        <video
          src="/videos/project-preview.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity duration-500 group-hover:opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 transition-opacity duration-300 group-hover:opacity-90" />

        {primaryLink && (
          <a
            href={primaryLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name}`}
            className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full border border-paper/25 bg-ink/50 text-paper backdrop-blur transition-colors hover:border-red hover:bg-red"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          <div className="pr-10">
            <h3 className="display text-xl text-paper sm:text-2xl">{project.name}</h3>
            <p className="mt-1 max-w-xs font-mono text-[0.68rem] leading-snug text-paper/70">
              {project.shortDesc}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2 py-2 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide',
                    HIGHLIGHT_TAGS.has(tag.toLowerCase())
                      ? 'border-red bg-red text-primary-foreground'
                      : 'border-paper/30 text-paper/80',
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="max-w-md font-mono text-[0.6rem] leading-relaxed text-paper/55">
              {project.techStack.join(' · ')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/85 transition-colors hover:text-red"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {links.playStore && (
              <a
                href={links.playStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/85 transition-colors hover:text-red"
              >
                <Play className="h-3.5 w-3.5" />
                Play Store
              </a>
            )}
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/85 transition-colors hover:text-red"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {links.paper && (
              <a
                href={links.paper}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/85 transition-colors hover:text-red"
              >
                <FileText className="h-3.5 w-3.5" />
                Paper
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function SectionProjects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const category = projectCategories[activeIndex]

  return (
    <section
      id="projects"
      className="section-screen relative flex flex-col overflow-hidden bg-ink pt-32"
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-50" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div>
            <Reveal className="label flex items-center gap-3 text-muted-foreground">
              <span>A Few Things I Built</span>
            </Reveal>

            <h2 className="display mt-3 text-[clamp(2.1rem,4.6vw,3.2rem)]">
              <Reveal>Ideas into</Reveal>
              <Reveal delay={0.08} className="mt-1 flex items-center gap-2">
                <span className="text-red">Real Products.</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-paper" />
              </Reveal>
            </h2>

            <Reveal delay={0.14}>
              <nav className="mt-8 flex flex-col">
                {projectCategories.map((cat, i) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'label flex items-center justify-between gap-3 border-l-2 py-3 pl-4 text-left transition-colors',
                      i === activeIndex
                        ? 'border-red text-paper'
                        : 'border-border text-muted-foreground hover:border-paper/40 hover:text-paper',
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono text-[0.65rem]">{pad(i + 1)}</span>
                  </button>
                ))}
              </nav>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Magnet strength={8}>
                <a
                  href="https://github.com/divyanshupatel17"
                  target="_blank"
                  rel="noreferrer"
                  className="label group inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-paper transition-colors hover:border-red hover:bg-red"
                >
                  <Github className="h-3.5 w-3.5" />
                  View All Projects
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnet>
            </Reveal>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {category.projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  centered={category.projects.length % 2 === 1 && i === category.projects.length - 1}
                  delay={0.06 * i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
