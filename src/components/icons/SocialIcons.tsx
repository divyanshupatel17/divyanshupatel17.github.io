type IconProps = { className?: string }

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0ZM7.12 20.45H3.55V9h3.57v11.45ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm15.11 13.02h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29Z" />
    </svg>
  )
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.53 10.6 20.4 3h-1.7l-5.98 6.6L7.9 3H3l7.2 10.3L3 21h1.7l6.3-6.96L16.1 21H21l-7.47-10.4Zm-2.24 2.47-.73-1.02L5 4.3h2.2l4.7 6.56.73 1.02 6.1 8.53h-2.2l-4.99-6.94Z" />
    </svg>
  )
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 1 0 12 23.5 11.5 11.5 0 0 0 12 .5ZM12 2.6a9.4 9.4 0 0 0-2.97 18.32c.47.09.64-.2.64-.45v-1.74c-2.61.57-3.17-1.26-3.17-1.26-.43-1.08-1.04-1.37-1.04-1.37-.85-.58.06-.57.06-.57.94.07 1.44.97 1.44.97.84 1.43 2.2 1.02 2.74.78.08-.61.33-1.02.6-1.25-2.09-.24-4.29-1.05-4.29-4.65 0-1.03.37-1.87.97-2.53-.1-.24-.42-1.2.09-2.48 0 0 .79-.26 2.59.96a9.02 9.02 0 0 1 4.7 0c1.8-1.22 2.59-.96 2.59-.96.51 1.28.19 2.24.09 2.48.6.66.97 1.5.97 2.53 0 3.62-2.2 4.42-4.3 4.65.34.29.64.86.64 1.74v2.57c0 .25.17.55.65.45A9.4 9.4 0 0 0 12 2.6Z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12h16M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowLongRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 96 12"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M0 6h94M88 1.5 94 6l-6 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
