import type { CSSProperties } from 'react'
import useReveal from '../../hooks/useReveal'
import { about } from '../../data/profile'

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <header className="section-header reveal">
          <h2 className="serif-display">{about.title}</h2>
        </header>

        <div className="about-grid">
          <div className="about-copy reveal">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="about-education">
              <p className="eyebrow">education</p>
              <p className="about-education__school">{about.education.school}</p>
              <p className="about-education__degree">{about.education.degree}</p>
              <p className="about-education__meta">
                {about.education.period} &middot; {about.education.detail}
              </p>
            </div>
          </div>

          <div className="about-skills">
            {about.skills.map((group, i) => (
              <div
                className="skill-group reveal"
                key={group.group}
                style={{ '--reveal-delay': `${i * 0.08}s` } as CSSProperties}
              >
                <p className="eyebrow">{group.group}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
