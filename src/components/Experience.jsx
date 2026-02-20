import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, ChevronRight, ChevronDown } from 'lucide-react'
import { experience } from '../data/portfolio'

export default function Experience() {
  const [expandedCards, setExpandedCards] = useState({})

  return (
    <section
      id="experience"
      className="relative py-32 sm:py-40"
    >
      <div className="container-custom max-w-5xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary">
            Where I've
            <br />
            <span className="gradient-text">worked.</span>
          </h2>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <div className="glass-card glow-border p-8 sm:p-10 relative overflow-hidden group">
                  {/* Gradient line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 via-cyan-400 to-teal-400" />

                  {/* Background glow */}
                  <div className="absolute -right-32 -top-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="pl-6 relative">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 size={20} className="text-primary-400" />
                          <span className="text-primary-400 font-semibold text-lg">{exp.company}</span>
                          {exp.current && (
                            <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary">{exp.role}</h3>
                      </div>
                      <span className="text-theme-subtle text-sm font-mono">{exp.period}</span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-3">
                      {(expandedCards[exp.company] ? exp.highlights : exp.highlights.slice(0, 4)).map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="flex items-start gap-3 text-theme-muted"
                        >
                          <ChevronRight size={18} className="text-primary-400 mt-0.5 shrink-0" />
                          <span className="text-sm sm:text-base">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {exp.highlights.length > 4 && (
                      <button
                        onClick={() => setExpandedCards(prev => ({
                          ...prev,
                          [exp.company]: !prev[exp.company]
                        }))}
                        className="relative z-10 flex items-center gap-1 text-primary-400 text-sm mt-4 font-medium pl-7 hover:text-primary-300 transition-colors cursor-pointer"
                      >
                        <span>
                          {expandedCards[exp.company]
                            ? 'Show less'
                            : `+${exp.highlights.length - 4} more achievements`
                          }
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${expandedCards[exp.company] ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
