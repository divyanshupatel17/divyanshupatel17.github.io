import { useEffect, useState } from 'react'
import { FALLBACK_EMAIL, FALLBACK_SOCIAL_LINKS, PROFILE_JSON_URL, type SocialLink } from '../data/socialLinks'

type ProfileJson = {
  email?: { professional?: string; personal?: string }
  social?: { github?: string; linkedin?: string; instagram?: string; x?: string }
}

export function useSocialProfile() {
  const [links, setLinks] = useState<SocialLink[]>(FALLBACK_SOCIAL_LINKS)
  const [email, setEmail] = useState(FALLBACK_EMAIL)

  useEffect(() => {
    let cancelled = false

    fetch(PROFILE_JSON_URL)
      .then((res) => (res.ok ? (res.json() as Promise<ProfileJson>) : Promise.reject(res.status)))
      .then((data) => {
        if (cancelled) return
        const social = data.social ?? {}
        const fallbackByKey = Object.fromEntries(FALLBACK_SOCIAL_LINKS.map((link) => [link.key, link.href]))
        setLinks([
          { key: 'linkedin', label: 'LinkedIn', href: social.linkedin || fallbackByKey.linkedin },
          { key: 'x', label: 'X / Twitter', href: social.x || fallbackByKey.x },
          { key: 'github', label: 'GitHub', href: social.github || fallbackByKey.github },
          { key: 'instagram', label: 'Instagram', href: social.instagram || fallbackByKey.instagram },
        ])
        setEmail(data.email?.professional || data.email?.personal || FALLBACK_EMAIL)
      })
      .catch(() => {
        if (cancelled) return
        setLinks(FALLBACK_SOCIAL_LINKS)
        setEmail(FALLBACK_EMAIL)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { links, email }
}
