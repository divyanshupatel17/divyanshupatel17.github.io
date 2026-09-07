import Button from '../ui/Button'
import SplitWords from '../ui/SplitWords'
import { ArrowRightIcon } from '../ui/Icons'
import { home } from '../../data/content'

export default function Home() {
  const lead = home.headingLead.split(' ').length
  const second = home.headingSecond.split(' ').length
  const accentLead = home.headingAccentLead.split(' ').length

  const ariaHeading = [
    home.headingLead,
    home.headingSecond,
    home.headingAccentLead,
    home.headingAccent,
  ].join(' ')

  return (
    <section id="home" className="section-hero">
      <div className="padding-global">
        <div className="container-large">
          <div className="hero-comp">
            <h1 className="h1 hero-heading capitalize" aria-label={ariaHeading}>
              <span aria-hidden="true">
                <SplitWords text={home.headingLead} offset={0} />{' '}
                <SplitWords text={home.headingSecond} offset={lead} />{' '}
                <SplitWords text={home.headingAccentLead} offset={lead + second} />{' '}
                <span className="text-accent">
                  <SplitWords text={home.headingAccent} offset={lead + second + accentLead} />
                </span>
              </span>
            </h1>

            <p className="hero-paragraph text-medium">{home.paragraph}</p>

            <div className="button-group hero-buttons">
              <Button href={home.primaryCta.href} variant="is-light">
                {home.primaryCta.label}
              </Button>
              <Button href={home.secondaryCta.href} variant="is-ghost">
                {home.secondaryCta.label}
              </Button>
            </div>

            <div className="hero-showcase">
              <div className="hero-showcase__row">
                <div className="hero-card is-w1">
                  <FeaturedCard />
                </div>
                <div className="hero-card is-w3 is-accent">
                  <SignalCard />
                </div>
              </div>

              <div className="hero-showcase__row">
                <div className="hero-card is-w2">
                  <BudgetCard />
                </div>
                <div className="hero-card is-w4">
                  <RankingCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer spacer-large" aria-hidden="true" />
    </section>
  )
}

function FeaturedCard() {
  return (
    <div className="mock">
      <div className="mock__row">
        <div className="mock__col">
          <div className="mock__thumb" />
        </div>
        <div className="mock__col">
          <div className="mock__head">
            <span className="mock__title">{home.featured.title}</span>
            <span className="tag is-yellow">{home.featured.tag}</span>
          </div>
          <div className="mock__item">{home.featured.stack}</div>
          <dl className="mock__grid">
            {home.featured.stats.map((stat, i) => (
              <div className="mock__stat" key={`${stat.label}-${i}`}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function SignalCard() {
  return (
    <div className="mock">
      <div className="mock__head">
        <span className="mock__title">{home.signal.title}</span>
        <span className="tag is-mint">{home.signal.badge}</span>
      </div>
      <div className="mock__avatars">
        <span className="mock__avatar" />
        <span className="mock__avatar" />
        <span className="mock__avatar" />
        <span className="mock__avatar" />
        <span className="mock__avatar is-count">12</span>
      </div>
      <span className="mock__link">
        {home.signal.link}
        <ArrowRightIcon className="mock__link-icon" />
      </span>
    </div>
  )
}

function BudgetCard() {
  return (
    <div className="mock">
      <span className="mock__title">{home.budget.title}</span>
      <div className="mock__bars">
        <span className="mock__bar" />
        <span className="mock__bar" />
        <span className="mock__bar" />
      </div>
      <div className="mock__row">
        {home.budget.items.map((item) => (
          <span className="tag is-sand" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function RankingCard() {
  return (
    <div className="mock">
      <div className="mock__head">
        {home.ranking.columns.map((column) => (
          <span className="text-small" key={column}>
            {column}
          </span>
        ))}
      </div>
      <div className="mock__list">
        {home.ranking.rows.map((row) => (
          <div className="mock__item" key={row.rank}>
            <span className="mock__rank">{row.rank}</span>
            <span className="mock__item-text">{row.label}</span>
            <span className="tag is-mint">{row.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
