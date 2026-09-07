import Nav from './components/layout/Nav'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <Home />
        <About />
        <Work />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
