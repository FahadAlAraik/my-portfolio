import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import NeuralNetwork3D from './components/NeuralNetwork3D'
import TerminalHero from './components/TerminalHero'
import About from './components/About'
import GitBranchExperience from './components/GitBranchExperience'
import WeightMatrixSkills from './components/WeightMatrixSkills'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const fireNodesRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, #16213e 0%, #1a1a2e 40%, #1a1a2e 100%)'
      }} />

      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-grid-pattern bg-grid" />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] opacity-12 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-1/5 w-[400px] h-[400px] opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(174,129,255,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* 3D neural network — ambient, non-distracting */}
      {!isMobile && <NeuralNetwork3D />}

      {/* Content */}
      <div className="relative z-10">
        <main>
          <TerminalHero />
          <About />
          <GitBranchExperience />
          <WeightMatrixSkills fireNodes={fireNodesRef} />
          <Projects fireNodes={fireNodesRef} />
        </main>
        <Footer />
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass hover:scale-110 transition-transform text-syntax-green"
            style={{ boxShadow: '0 0 15px rgba(166,226,46,0.2)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
