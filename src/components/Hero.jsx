import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Mail, Linkedin } from 'lucide-react'
import Scene3D from './Scene3D'
import { personalInfo } from '../data/portfolio'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { isDark } = useTheme()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Apple-style transforms (no blur - expensive)
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Scene3D />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)'
              : 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,1) 100%)'
          }}
        />

        {/* Content */}
        <motion.div
          style={{ scale, opacity, y }}
          className="relative z-10 text-center px-4"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-6"
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl sm:text-2xl md:text-3xl text-theme-muted font-light mb-2"
          >
            {personalInfo.title}
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-theme-subtle mb-10"
          >
            {personalInfo.location}
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-3"
          >
            {[
              { icon: Github, href: personalInfo.github, label: "GitHub" },
              { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email", accent: true }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                className={`p-4 rounded-full glass transition-all ${
                  item.accent
                    ? 'hover:bg-primary-500/20 hover:text-primary-400'
                    : 'hover:bg-white/10 hover:text-theme-primary'
                } text-theme-muted`}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
              >
                <item.icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-theme-subtle/30 flex justify-center pt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-theme-subtle rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
