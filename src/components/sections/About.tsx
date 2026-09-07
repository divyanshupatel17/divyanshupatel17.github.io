import type { CSSProperties } from 'react'
import useReveal from '../../hooks/useReveal'
import { SunIcon } from '../ui/Icons'
import { stepIcons } from '../ui/stepIcons'
import { about } from '../../data/content'

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" className="section-cards" ref={ref}>
      <div className="spacer spacer-xlarge" aria-hidden="true" />
      <div className="padding-global">
        <div className="container-large">
          <div className="cards-comp">
            <div className="cards-heading-wrapper">
              <h2 className="h2 cards-heading capitalize reveal">
                {about.headingLead}
                <br />
                {about.headingSecondLead}{' '}
                <span className="inline-badge" aria-hidden="true">
                  <SunIcon />
                </span>{' '}
                <span className="underline-accent">{about.headingSecondAccent}</span>
              </h2>

              <p className="text-xlarge cards-paragraph reveal" style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
                {about.paragraph}
              </p>

              <p className="h6 reveal" style={{ '--reveal-delay': '0.2s' } as CSSProperties}>
                {about.stepsLabel}
              </p>
            </div>

            <div className="spacer spacer-medium" aria-hidden="true" />

            <div className="steps-outer">
              <div className="steps-grid">
                {about.steps.map((step, i) => {
                  const Icon = stepIcons[step.icon as keyof typeof stepIcons]
                  return (
                    <div
                      className="step-card reveal"
                      key={step.label}
                      style={{ '--reveal-delay': `${i * 0.1}s` } as CSSProperties}
                    >
                      <span className="step-pill">
                        <span className="step-pill__label">{step.label}</span>
                        <span className="step-pill__icon">
                          <Icon />
                        </span>
                      </span>
                      <p className="text-medium">
                        {step.body.split('\n').map((line, index) => (
                          <span key={line + index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  )
                })}
              </div>

              <StepConnectors />
            </div>
          </div>
        </div>
      </div>
      <div className="spacer spacer-large" aria-hidden="true" />
    </section>
  )
}

/* The dashed loop that threads between the step cards. */
function StepConnectors() {
  return (
    <svg
      className="steps-lines"
      viewBox="0 0 1200 220"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M40 220V60a20 20 0 0 1 20-20h60"
        stroke="var(--gray-300)"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      <path d="M114 34l10 6-10 6" stroke="var(--gray-300)" strokeWidth="2" />
      <path
        d="M1160 220V60a20 20 0 0 0-20-20h-60"
        stroke="var(--gray-300)"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      <circle cx="1080" cy="40" r="4" fill="var(--gray-300)" />
    </svg>
  )
}
