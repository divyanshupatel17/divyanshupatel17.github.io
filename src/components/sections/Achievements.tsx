import useReveal from '../../hooks/useReveal'
import { ClockIcon, CornerArrowIcon } from '../ui/Icons'
import { achievements } from '../../data/content'

export default function Achievements() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="achievements" className="section-cards" ref={ref}>
      <div className="spacer spacer-large" aria-hidden="true" />
      <div className="padding-global">
        <div className="container-large">
          <div className="cards-heading-wrapper">
            <h2 className="h6 text-medium-weight reveal">{achievements.heading}</h2>
          </div>
        </div>
      </div>

      <div className="spacer spacer-medium" aria-hidden="true" />

      <div className="padding-global">
        <div className="container-large">
          <div className="slide-bars">
            {achievements.rows.map((row) => (
              <div
                className={`slide-row is-${row.align} reveal from-${row.align}`}
                key={row.before + row.after}
              >
                <span className="slide-bar">
                  <span className="slide-bar__text">{row.before}</span>
                  {row.chip ? <span className="slide-bar__chip">{row.chip}</span> : null}
                  {row.icon ? (
                    <span className="slide-icon is-accent">
                      <ClockIcon />
                    </span>
                  ) : null}
                  <span className="slide-bar__text">{row.after}</span>
                </span>
                {row.trailingIcon ? (
                  <span className="slide-icon is-muted">
                    <CornerArrowIcon />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="spacer spacer-xlarge" aria-hidden="true" />
    </section>
  )
}
