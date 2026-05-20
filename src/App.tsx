import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import About from './components/About'
import Services from './components/Services'
import TeamBios from './components/TeamBios'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] dark:bg-ob-black text-ob-black dark:text-ob-white">
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
        <About />
        <Services />
        <TeamBios />
      </main>
      <Footer />
    </div>
  )
}
