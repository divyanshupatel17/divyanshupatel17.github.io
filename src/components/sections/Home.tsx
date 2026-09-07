import SectionPlaceholder from '../SectionPlaceholder'

export default function Home() {
  return (
    <SectionPlaceholder
      id="home"
      label="01 — Home"
      title="Hero + Introduction"
      tone="dark"
      todo={[
        'Name, role, and tagline',
        'Profile photo / portrait treatment',
        '"View My Work" and "Let\'s Talk" CTAs',
        'Scroll indicator',
      ]}
    />
  )
}
