import { LinkedinIcon, GithubIcon, InstagramIcon, MailIcon } from './Icons'

export const socialIcons = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
} as const

export type SocialIconName = keyof typeof socialIcons
