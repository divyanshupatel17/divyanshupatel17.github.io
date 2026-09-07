import type { CSSProperties } from 'react'
import useReveal from '../../hooks/useReveal'
import { stepIcons } from '../ui/stepIcons'
import { work } from '../../data/content'
import type { FeatureMedia } from '../../data/content'

export default function Work() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="work" className="section-cards" ref={ref}>
      <div className="spacer spacer-large" aria-hidden="true" />
      <div className="padding-global">
        <div className="container-large">
          <div className="feature-stack">
            {work.items.map((item, i) => {
              const Icon = stepIcons[item.icon]
              const copy = (
                <div className={`feature-copy${item.mediaFirst ? '' : ' is-padded'}`}>
                  <div className="feature-tag">
                    <span className="feature-tag__number">{item.number}</span>
                    <span className="feature-tag__body">
                      <span className="feature-tag__label">{item.label}</span>
                      <span className="feature-tag__icon">
                        <Icon />
                      </span>
                    </span>
                  </div>
                  <p className="text-huge">{item.body}</p>
                </div>
              )

              const media = (
                <div className="feature-media">
                  <FeatureMock kind={item.media} />
                </div>
              )

              return (
                <article
                  className={[
                    'feature-card',
                    'reveal',
                    item.accent ? 'is-accent' : '',
                    i === 0 ? 'no-margin-top' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  key={item.number}
                  style={{ zIndex: i + 1 } as CSSProperties}
                >
                  {item.mediaFirst ? media : copy}
                  {item.mediaFirst ? copy : media}
                </article>
              )
            })}
          </div>
        </div>
      </div>
      <div className="spacer spacer-large" aria-hidden="true" />
    </section>
  )
}

/* Stand in product surfaces, one per panel, all placeholder content. */
function FeatureMock({ kind }: { kind: FeatureMedia }) {
  if (kind === 'list') {
    return (
      <div className="mock-panel">
        <span className="mock-panel__title">Placeholder Panel</span>
        <div className="mock__list">
          {[1, 2, 3, 4, 5].map((n) => (
            <div className="mock__item" key={n}>
              <span className="mock__rank">{n}</span>
              <span className="mock__item-text">Placeholder row label goes here</span>
              <span className="tag is-mint">00%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'platforms') {
    return (
      <div className="mock-panel">
        <span className="mock-panel__title">Placeholder Panel</span>
        <div className="mock__list">
          {['Placeholder One', 'Placeholder Two', 'Placeholder Three'].map((label) => (
            <div className="mock-block" key={label}>
              <span className="mock-block__title">{label}</span>
              <div className="mock-block__tags">
                <span className="tag is-sand">Placeholder</span>
                <span className="tag is-sand">Placeholder</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'score') {
    return (
      <div className="mock-panel">
        <span className="mock-panel__title">Placeholder Panel</span>
        <div className="mock-score">
          <span className="mock-score__value">0.0</span>
          <span className="mock-score__max">/10</span>
        </div>
        <div className="mock__list">
          {['Placeholder quote line', 'Placeholder quote line'].map((quote, i) => (
            <div className="mock-quote" key={quote + i}>
              <span className="mock-quote__text">{quote}</span>
              <span className="mock-quote__author">Placeholder name</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mock-panel">
      <div className="mock__head">
        <span className="mock-panel__title">Placeholder Panel</span>
        <span className="tag is-mint">Placeholder</span>
      </div>
      <div className="mock-timeline">
        {[1, 2, 3, 4].map((n) => (
          <div className="mock-timeline__row" key={n}>
            <span className="mock-timeline__label">Placeholder step {n}</span>
            <span className="mock-timeline__track">
              <span className="mock-timeline__fill" style={{ width: `${30 + n * 15}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
