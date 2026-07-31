import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <main>
        <About />
        <Projects />
      </main>
      <Contact />
      <Footer />
    </div>
  )
}