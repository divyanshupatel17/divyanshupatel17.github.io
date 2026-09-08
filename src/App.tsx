import { SiteNav } from './components/site-nav'
import { SectionHero } from './components/section-hero'
import { SectionAbout } from './components/section-about'
import { SectionProjects } from './components/section-projects'
import { SectionMilestones } from './components/section-milestones'
import { SectionContact } from './components/section-contact'
import { SiteFooter } from './components/site-footer'

export default function App() {
  return (
    <>
      <SiteNav />
      <main>
        <SectionHero />
        <SectionAbout />
        <SectionProjects />
        <SectionMilestones />
        <SectionContact />
      </main>
      <SiteFooter />
    </>
  )
}
