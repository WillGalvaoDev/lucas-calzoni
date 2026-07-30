import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Work } from './components/sections/Work'
import { Gallery } from './components/sections/Gallery'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
