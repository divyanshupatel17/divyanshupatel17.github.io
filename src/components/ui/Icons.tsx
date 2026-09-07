type IconProps = {
  className?: string
}

export function BulbIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
    </svg>
  )
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.6-.7 1.6-1.5 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.8.6-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8Z" />
      <circle cx="7.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function DropperIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m19.5 3.5-1 1a2.1 2.1 0 0 0-3 0l-1.6 1.6-1-1-1.4 1.4 5.9 5.9 1.4-1.4-1-1 1.6-1.6a2.1 2.1 0 0 0 0-3l1-1a1 1 0 0 0-1.4-1.4Z" />
      <path d="m13.4 9.2-7 7a2 2 0 0 0-.6 1.2L5.4 20l2.6-.4a2 2 0 0 0 1.2-.6l7-7" />
    </svg>
  )
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3c3.3 2 5 5.4 5 9l-2.6 2.6H9.6L7 12c0-3.6 1.7-7 5-9Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.6 14.6 7.5 16.7c-.6.6-.9 1.4-.9 2.2v1.5l1.5-.1c.8 0 1.6-.4 2.2-.9l1.1-1.1" />
      <path d="M14.4 14.6l2.1 2.1c.6.6.9 1.4.9 2.2v1.5l-1.5-.1c-.8 0-1.6-.4-2.2-.9L12.6 18" />
    </svg>
  )
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function CornerArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4v8a2 2 0 0 0 2 2h8" />
      <path d="m13 10 4 4-4 4" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" aria-hidden="true">
      <path
        d="M83.68 26.55 76.06 34.17l25.1 25.1H12.88v10.74h88.28l-25.1 25.1 7.62 7.62 38.09-38.09-38.09-38.09Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" aria-hidden="true">
      <path
        d="M51.17 24.24v10.77h35.5L24.24 97.44l7.59 7.6 62.43-62.44v35.5h10.77V24.24H51.17Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BrandMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M20 2a14 14 0 0 0 0 28" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M13 4a14 14 0 0 0 0 24" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.65" />
      <path d="M6 7a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.35" />
    </svg>
  )
}
