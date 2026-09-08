import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import type { ComponentType } from 'react'

import { useProfile } from '../hooks/use-profile'

export type Social = { name: string; href: string; Icon: ComponentType<{ className?: string }> }

/** Social links, sourced from the divyanshu-profile repo (see useProfile). */
export function useSocials(): Social[] {
  const profile = useProfile()
  const social = profile.social
  const email = profile.email?.personal

  const socials: Social[] = []
  if (social?.github) socials.push({ name: 'GitHub', href: social.github, Icon: Github })
  if (social?.linkedin) socials.push({ name: 'LinkedIn', href: social.linkedin, Icon: Linkedin })
  if (social?.instagram) socials.push({ name: 'Instagram', href: social.instagram, Icon: Instagram })
  if (social?.x) socials.push({ name: 'Twitter', href: social.x, Icon: Twitter })
  if (email) socials.push({ name: 'Email', href: `mailto:${email}`, Icon: Mail })

  return socials
}
