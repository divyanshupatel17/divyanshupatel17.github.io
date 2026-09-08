import type { CSSProperties } from 'react'
import useReveal from '../../hooks/useReveal'
import { work } from '../../data/profile'
import { ArrowUpRightIcon } from '../ui/Icons'

export default function Work() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="work" ref={ref}>
      <div className="container">
        <header className="section-header reveal">
          <h2 className="serif-display">{work.title}</h2>
          <p className="lead">{work.subtitle}</p>
        </header>

        <div className="work-wall">
          {work.projects.map((project, i) => (
            <article
              className={`work-card work-card--${project.size} is-${project.accent} reveal`}
              key={project.id}
              style={{ '--reveal-delay': `${i * 0.08}s` } as CSSProperties}
              data-cursor="view"
            >
              <div className="work-card__art" aria-hidden="true">
                <span className="work-card__glow" />
                <span className="work-card__tile" />
                <span className="work-card__tile" />
                <span className="work-card__tile" />
              </div>

              <div className="work-card__body">
                <div className="work-card__top">
                  <span className="work-card__status">{project.status}</span>
                  <span className="work-card__meta">{project.meta}</span>
                </div>

                <h3 className="work-card__title">{project.title}</h3>
                <p className="work-card__blurb">{project.blurb}</p>

                <ul className="work-card__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <span className="work-card__arrow" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
