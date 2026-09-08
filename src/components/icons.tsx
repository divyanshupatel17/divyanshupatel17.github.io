import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import type { ComponentType } from 'react'

export type Social = { name: string; href: string; Icon: ComponentType<{ className?: string }> }

export const socials: Social[] = [
  { name: 'GitHub', href: 'https://github.com/divyanshupatel17', Icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/patel-divyanshu', Icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/patel_divyanshu_/', Icon: Instagram },
  { name: 'Email', href: 'mailto:itzdivyanshupatel@gmail.com', Icon: Mail },
]
