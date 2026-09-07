import Moon from '../moon/Moon'
import { useSocialProfile } from '../../hooks/useSocialProfile'
import {
  ArrowLongRightIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from '../icons/SocialIcons'
import type { SocialLink } from '../../data/socialLinks'

const NAME_LETTERS = 'DIVYANSHU'.split('')

const RIBBON_ITEMS: { key: SocialLink['key']; label: string; Icon: typeof GithubIcon }[] = [
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'x', label: 'Twitter', Icon: XIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
]

const NAME_GRADIENT = 'linear-gradient(180deg, #f2262b 0%, #e0272a 30%, #8e1114 72%, #3a0608 100%)'

export default function Contact() {
  const { links, email } = useSocialProfile()
  const linkByKey = Object.fromEntries(links.map((link) => [link.key, link]))

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-ink text-white"
    >
      <div className="flex flex-1 flex-col justify-end gap-6 px-6 pb-6 pt-12 sm:px-10 sm:pb-8">
        <h2
          className="text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.25rem, 7.5vw, 6.5rem)' }}
        >
          <span className="text-white">Get In </span>
          <span className="text-accent">Touch.</span>
        </h2>

        <a
          href={`mailto:${email}`}
          className="flex items-center justify-center gap-4 self-center text-white transition hover:text-accent sm:self-end sm:pr-[6%]"
        >
          <MailIcon className="h-5 w-5 shrink-0" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] sm:text-sm">
            Let&apos;s Connect
          </span>
          <ArrowLongRightIcon className="h-2 w-16 shrink-0 sm:h-3 sm:w-24" />
        </a>
      </div>

      {/* scaleY does not grow the layout box, so the letter size is capped
          against this band's height as well or the letter tops get clipped. */}
      <div className="relative flex h-[40vh] w-full shrink-0 items-end justify-center overflow-hidden sm:h-[60vh]">
        <div
          className="relative z-0 flex w-full select-none justify-center font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.75rem, min(22vw, 34vh), 22rem)', letterSpacing: '-0.035em' }}
        >
          {NAME_LETTERS.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block origin-bottom bg-clip-text text-transparent"
              style={{ transform: 'scaleY(1.85)', backgroundImage: NAME_GRADIENT }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="absolute inset-0 z-10">
          <Moon />
        </div>
      </div>

      <div className="relative z-20 grid w-full grid-cols-2 divide-x divide-y divide-white/35 bg-accent sm:grid-cols-4 sm:divide-y-0">
        {RIBBON_ITEMS.map(({ key, label, Icon }) => {
          const link = linkByKey[key]
          if (!link) return null
          return (
            <a
              key={key}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-4 py-5 text-white transition hover:bg-ink sm:gap-4 sm:py-6"
            >
              <Icon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <span className="text-sm font-bold uppercase tracking-wide sm:text-base">{label}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
