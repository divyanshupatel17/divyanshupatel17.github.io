import SiteNav from './components/layout/SiteNav'
import Hero from './components/hero/Hero'
import Work from './components/sections/Work'
import Beyond from './components/sections/Beyond'
import About from './components/sections/About'
import SiteFooter from './components/sections/SiteFooter'
import CustomCursor from './components/effects/CustomCursor'
import LeafFall from './components/effects/LeafFall'
import useTheme from './hooks/useTheme'

export default function App() {
  const { night, toggle } = useTheme()

  return (
    <>
      <SiteNav night={night} onToggleTheme={toggle} />
      <main className="site-main">
        <Hero night={night} />
        <Work />
        <Beyond />
        <About />
        <SiteFooter />
      </main>
      <LeafFall />
      <CustomCursor />
    </>
  )
}
