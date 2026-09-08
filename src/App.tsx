import { ClickSpark } from './components/click-spark'
import { SiteNav } from './components/site-nav'
import { SectionHero } from './components/section-hero'
import { SectionAbout } from './components/section-about'
import { SectionProjects } from './components/section-projects'
import { SectionMilestones } from './components/section-milestones'
import { SectionContact } from './components/section-contact'

export default function App() {
  return (
    <ClickSpark sparkColor="#e5322f" sparkSize={12} sparkRadius={26} sparkCount={9} duration={400}>
      <SiteNav />
      <main>
        <SectionHero />
        <SectionAbout />
        <SectionProjects />
        <SectionMilestones />
        <SectionContact />
      </main>
    </ClickSpark>
  )
}
