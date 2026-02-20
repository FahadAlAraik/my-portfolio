import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Award, ArrowUpRight } from 'lucide-react'
import { projects, education } from '../data/portfolio'

export default function Projects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const titleY = useTransform(scrollYProgress, [0, 0.15], [80, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const allProjects = [
    ...projects.filter(p => p.featured),
    ...education.projects.map(p => ({ ...p, isEducation: true }))
  ]

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-32 sm:py-40"
    >
      <div className="container-custom max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary">
            Things I've
            <br />
            <span className="gradient-text">built.</span>
          </h2>
        </motion.div>

        {/* Projects grid with scroll animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {allProjects.map((project, index) => {
            const cardRef = useRef(null)
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "center center"]
            })

            const cardY = useTransform(cardProgress, [0, 1], [80, 0])
            const cardOpacity = useTransform(cardProgress, [0, 0.5], [0, 1])
            const cardScale = useTransform(cardProgress, [0, 1], [0.9, 1])

            return (
              <motion.div
                key={project.title || project.name}
                ref={cardRef}
                style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
                className="group"
              >
                <div className="glass-card glow-border h-full p-6 sm:p-8 relative overflow-hidden transition-all duration-500">
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(6,182,212,0.05) 100%)'
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] bg-yellow-500/10 text-yellow-500 rounded-full font-medium">
                            <Award size={10} />
                            {project.badge}
                          </span>
                        )}
                        {project.isEducation && (
                          <span className="px-2 py-1 text-[10px] bg-purple-500/10 text-purple-400 rounded-full font-medium">
                            University
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-theme-subtle hover:text-theme-primary hover:bg-white/5 transition-all"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-theme-subtle hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-3 group-hover:text-primary-400 transition-colors flex items-center gap-2">
                      {project.title || project.name}
                      <ArrowUpRight
                        size={20}
                        className="opacity-0 -translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary-400"
                      />
                    </h3>

                    {/* Description */}
                    <p className="text-theme-muted text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 text-theme-subtle font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-theme-subtle">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/FahadAlAraik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-theme-subtle hover:text-primary-400 transition-colors group"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
