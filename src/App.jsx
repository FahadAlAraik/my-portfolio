import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { ArrowUp, Sun, Moon } from 'lucide-react'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import NetworkBackground from './components/NetworkBackground'

function AppContent() {
  const { isDark, toggleTheme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-theme-primary">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at top, #0a1a1a 0%, #0a0a0a 50%, #0a0a0a 100%)'
              : 'radial-gradient(ellipse at top, #ecfdf5 0%, #ffffff 50%, #ffffff 100%)'
          }}
        />
        {/* Multiple glowing orbs for depth */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Neural network background */}
      <NetworkBackground />

      {/* Main content */}
      <div className="relative z-10">
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>

      {/* Floating controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-3 glass rounded-full shadow-lg hover:scale-110 transition-transform"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} className="text-theme-primary" /> : <Moon size={18} className="text-theme-primary" />}
        </motion.button>

        {/* Scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:scale-110 transition-all"
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
