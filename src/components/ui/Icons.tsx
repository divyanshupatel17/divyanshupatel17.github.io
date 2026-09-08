type IconProps = { className?: string }

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </svg>
  )
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  )
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.9h3.3V20H3.3V8.9Zm5.5 0h3.16v1.52h.05c.44-.83 1.52-1.7 3.12-1.7 3.34 0 3.96 2.2 3.96 5.05V20h-3.3v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V20H8.8V8.9Z" />
    </svg>
  )
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="3" />
      <path d="m3.6 7 7.3 5.2a2 2 0 0 0 2.2 0L20.4 7" />
    </svg>
  )
}
