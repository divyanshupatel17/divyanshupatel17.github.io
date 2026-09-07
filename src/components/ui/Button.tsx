import type { ReactNode } from 'react'

type ButtonVariant = 'is-solid' | 'is-outline' | 'is-accent' | 'is-light' | 'is-ghost'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  small?: boolean
  className?: string
}

export default function Button({
  href,
  children,
  variant = 'is-solid',
  small = false,
  className = '',
}: ButtonProps) {
  const classes = ['button', variant, small ? 'is-small' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={classes}>
      <span className="button__label">{children}</span>
      <span className="button__fill" aria-hidden="true" />
    </a>
  )
}
