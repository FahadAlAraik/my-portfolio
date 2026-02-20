import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { skills } from '../data/portfolio'

const allSkills = Object.values(skills).flat()

function SkillPill({ skill, index, totalSkills }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Stagger based on position - creates wave effect
  const staggerOffset = (index / totalSkills) * 0.3

  const opacity = useTransform(
    scrollYProgress,
    [0 + staggerOffset, 0.4 + staggerOffset],
    [0, 1]
  )
  const y = useTransform(
    scrollYProgress,
    [0 + staggerOffset, 0.5 + staggerOffset],
    [60, 0]
  )
  const scale = useTransform(
    scrollYProgress,
    [0 + staggerOffset, 0.5 + staggerOffset],
    [0.8, 1]
  )

  return (
    <motion.span
      ref={ref}
      style={{ opacity, y, scale }}
      className="inline-block px-5 py-3 sm:px-6 sm:py-3.5 rounded-full glass text-sm sm:text-base text-theme-secondary cursor-default transition-colors duration-300 hover:bg-primary-500/10 hover:text-primary-400"
    >
      {skill}
    </motion.span>
  )
}

export default function Skills() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const titleY = useTransform(scrollYProgress, [0, 0.2], [80, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom max-w-5xl mx-auto px-4">
        {/* Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary">
            What I
            <br />
            <span className="gradient-text">know.</span>
          </h2>
        </motion.div>

        {/* Skills with scroll-linked fade in */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {allSkills.map((skill, index) => (
            <SkillPill
              key={skill}
              skill={skill}
              index={index}
              totalSkills={allSkills.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
