import SectionPlaceholder from '../SectionPlaceholder'

export default function Work() {
  return (
    <SectionPlaceholder
      id="work"
      label="03 — Work"
      title="Projects + Demos"
      tone="dark"
      todo={[
        'Project cards with screenshots',
        'Tech stack tags per project',
        'GitHub / Play Store / Live Demo links',
        '"View All Projects" link',
      ]}
    />
  )
}
