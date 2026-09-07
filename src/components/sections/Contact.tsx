import useReveal from '../../hooks/useReveal'
import Button from '../ui/Button'
import { ArrowRightIcon, ArrowUpRightIcon, BrandMark } from '../ui/Icons'
import { brand, contact, navLinks } from '../../data/content'

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <section id="contact" className="section-cta">
        <div className="padding-global">
          <div className="container-large">
            <div className="cta-wrap">
              <div className="spacer spacer-xlarge" aria-hidden="true" />
              <div className="cta-header">
                <h2 className="h2 capitalize reveal">{contact.heading}</h2>
                <p className="text-xlarge text-alternate reveal">{contact.paragraph}</p>
              </div>
              <div className="spacer spacer-large" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="padding-global">
          <div className="container-medium">
            <div className="cta-button-row reveal">
              <a href={contact.cta.href} className="bubble-arrow">
                <span className="bubble-arrow__arrow is-duplicate" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
                <span className="bubble-arrow__content">
                  <span>{contact.cta.label}</span>
                  <span>{contact.cta.hoverLabel}</span>
                </span>
                <span className="bubble-arrow__arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="spacer spacer-xlarge" aria-hidden="true" />
      </section>

      <footer className="section-footer">
        <div className="padding-global">
          <div className="container-large">
            <div className="footer-wrapper">
              <div className="footer-content reveal">
                <h2 className="h5">
                  {contact.footerHeading.split('\n').map((line, i) => (
                    <span key={line + i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
                <div className="button-group">
                  {contact.buttons.map((button) => (
                    <Button href={button.href} variant={button.variant} key={button.label}>
                      {button.label}
                    </Button>
                  ))}
                </div>
              </div>

              <nav className="footer-links reveal" aria-label="Footer">
                {navLinks.map((link) => (
                  <a href={link.href} className="footer-link h6" key={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="footer-social reveal">
                {contact.socials.map((social) => (
                  <a href={social.href} className="text-medium" key={social.label}>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="spacer spacer-large" aria-hidden="true" />

            <div className="footer-logo">
              <BrandMark className="footer-logo__mark" />
              {brand.name}
            </div>

            <div className="spacer spacer-xsmall" aria-hidden="true" />

            <div className="footer-legal text-small">
              {contact.legal.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="spacer spacer-small" aria-hidden="true" />
          </div>
        </div>
      </footer>
    </div>
  )
}
