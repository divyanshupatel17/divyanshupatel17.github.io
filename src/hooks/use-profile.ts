import { useEffect, useState } from 'react'

import fallbackProfile from '../data/profile.json'

const PROFILE_URL = 'https://raw.githubusercontent.com/divyanshupatel17/divyanshu-profile/main/profile.json'

export type Profile = typeof fallbackProfile

/**
 * Social links live in divyanshupatel17/divyanshu-profile so they only need
 * updating in one place. Falls back to the bundled copy of the same file if
 * the fetch fails (offline, rate limited, repo unreachable).
 */
export function useProfile(): Profile {
  const [profile, setProfile] = useState<Profile>(fallbackProfile)

  useEffect(() => {
    let cancelled = false

    fetch(PROFILE_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`profile.json request failed: ${res.status}`)
        return res.json() as Promise<Profile>
      })
      .then((data) => {
        if (!cancelled) setProfile(data)
      })
      .catch(() => {
        /* keep the bundled fallback */
      })

    return () => {
      cancelled = true
    }
  }, [])

  return profile
}
