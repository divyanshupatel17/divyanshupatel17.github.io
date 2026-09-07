import SectionPlaceholder from '../SectionPlaceholder'

export default function About() {
  return (
    <SectionPlaceholder
      id="about"
      label="02 — About"
      title="Who I Am"
      tone="light"
      todo={[
        'Short bio / positioning statement',
        'Skills and tech stack',
        'Key metrics (projects, years, certifications)',
        '"Know More" link to full profile',
      ]}
    />
  )
}
