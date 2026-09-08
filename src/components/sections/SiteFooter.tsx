import useReveal from '../../hooks/useReveal'
import { footer, profile } from '../../data/profile'
import { socialIcons } from '../ui/socialIcons'
import GrassScene from './GrassScene'

export default function SiteFooter() {
  const ref = useReveal<HTMLElement>()

  return (
    <footer className="site-footer" id="contact" ref={ref}>
      <div className="container">
        <h2 className="site-footer__heading serif-xl reveal">
          {footer.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        <p className="site-footer__sub lead reveal">{footer.subheading}</p>

        <ul className="site-footer__socials reveal">
          {footer.socials.map((social) => {
            const Icon = socialIcons[social.icon]
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  data-cursor={social.label.toLowerCase()}
                  {...(social.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <Icon />
                </a>
              </li>
            )
          })}
        </ul>

        <p className="site-footer__legal">
          {profile.name} &middot; {profile.location}
        </p>
      </div>

      <GrassScene />
    </footer>
  )
}
