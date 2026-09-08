import type { CSSProperties } from 'react'
import useReveal from '../../hooks/useReveal'
import { beyond } from '../../data/profile'

export default function Beyond() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="beyond" ref={ref}>
      <div className="container">
        <header className="section-header reveal">
          <h2 className="serif-display">{beyond.title}</h2>
          <p className="lead">{beyond.subtitle}</p>
        </header>

        <div className="beyond-stage reveal">
          <div className="beyond-note" data-cursor="to-do">
            <p className="beyond-note__heading">{beyond.note.heading}</p>
            <ul className="beyond-note__list">
              {beyond.note.items.map((item) => (
                <li key={item.text} className={item.done ? 'is-done' : undefined}>
                  <span aria-hidden="true">&ndash;</span> {item.text}
                </li>
              ))}
            </ul>
          </div>

          <ul className="beyond-facts">
            {beyond.facts.map((fact, i) => (
              <li key={fact.label} style={{ '--reveal-delay': `${0.1 + i * 0.1}s` } as CSSProperties}>
                <span className="beyond-facts__value">{fact.value}</span>
                <span className="beyond-facts__label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
