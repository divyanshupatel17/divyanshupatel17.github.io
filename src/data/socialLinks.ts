export type SocialLink = {
  key: 'linkedin' | 'x' | 'github' | 'instagram'
  label: string
  href: string
}

export const PROFILE_JSON_URL =
  'https://raw.githubusercontent.com/divyanshupatel17/divyanshu-profile/main/profile.json'

export const FALLBACK_SOCIAL_LINKS: SocialLink[] = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/patel-divyanshu/' },
  { key: 'x', label: 'X / Twitter', href: 'https://x.com/Divyanshu170404' },
  { key: 'github', label: 'GitHub', href: 'https://github.com/divyanshupatel17' },
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/patel_divyanshu_/' },
]

export const FALLBACK_EMAIL = 'divyanshupatel.dev@gmail.com'
