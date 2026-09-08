import { useEffect, useRef } from 'react'

/*
  Adds `is-visible` to every `.reveal` inside the returned ref once it scrolls
  into view. One observer per section keeps the work off the scroll handler.
*/
export default function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('.reveal')
    if (targets.length === 0) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
