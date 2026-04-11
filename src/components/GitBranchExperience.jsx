import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, GitBranch, GitCommit } from 'lucide-react'
import { experience } from '../data/portfolio'

function CommitNode({ exp, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Git branch connector line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[3px] rounded-full"
        style={{ background: `linear-gradient(180deg, ${exp.color}40, ${exp.color}10)` }}
      />

      {/* Commit dot */}
      <div className="flex items-start gap-5">
        <div className="relative z-10 mt-1">
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              exp.current ? 'git-commit-dot-active' : ''
            }`}
            style={{
              borderColor: exp.color,
              background: exp.current ? exp.color : 'var(--bg-deep)',
              boxShadow: `0 0 ${exp.current ? 16 : 8}px ${exp.color}60`,
            }}
          >
            <GitCommit size={16} className={exp.current ? 'text-mono-deep' : ''} style={{ color: exp.current ? 'var(--bg-deep)' : exp.color }} />
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 pb-10">
          <div className="glass-card glow-border p-6 sm:p-8 relative overflow-hidden group">
            {/* Gradient accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
              style={{ background: `linear-gradient(180deg, ${exp.color}, ${exp.color}40)` }}
            />

            {/* Hover glow */}
            <div
              className="absolute -right-32 -top-32 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `${exp.color}08` }}
            />

            <div className="pl-4 relative">
              {/* Branch tag + Period */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="syntax-tag-green font-mono text-[11px] flex items-center gap-1">
                  <GitBranch size={12} />
                  {exp.branch}
                </span>
                <span className="text-syntax-dim text-xs font-mono">{exp.period}</span>
                {exp.current && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full font-medium font-mono"
                    style={{ background: `${exp.color}20`, color: exp.color }}
                  >
                    HEAD
                  </span>
                )}
              </div>

              {/* Company & Role */}
              <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: exp.color }}>
                {exp.company}
              </h3>
              <p className="text-syntax-white/80 text-base mb-4 font-medium">{exp.role}</p>

              {/* Tech focus tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {exp.techFocus.map((tech) => (
                  <span key={tech} className="syntax-tag-purple font-mono text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights as "commits" */}
              <div className="space-y-2">
                {(isExpanded ? exp.highlights : exp.highlights.slice(0, 3)).map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-syntax-orange font-mono text-xs mt-1.5 flex-shrink-0">$</span>
                    <span className="text-syntax-white/70 text-sm leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {exp.highlights.length > 3 && (
                <button
                  onClick={() => onToggle(exp.company)}
                  className="flex items-center gap-1 text-sm mt-4 font-mono cursor-pointer transition-colors hover:opacity-80"
                  style={{ color: exp.color }}
                >
                  <span>
                    {isExpanded
                      ? '// collapse'
                      : `// +${exp.highlights.length - 3} more commits`
                    }
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function GitBranchExperience() {
  const [expandedCards, setExpandedCards] = useState({})

  const toggle = (company) => {
    setExpandedCards((prev) => ({ ...prev, [company]: !prev[company] }))
  }

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="syntax-tag font-mono text-xs mb-3 inline-block">
            {'<Experience />'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-syntax-pink">git </span>
            <span className="text-syntax-white">log </span>
            <span className="text-syntax-yellow">--oneline</span>
          </h2>
          <p className="text-syntax-grey mt-3 font-mono text-sm">
            // architectural pivots and production deployments
          </p>
        </motion.div>

        {/* Git branch timeline */}
        <div className="space-y-0">
          {experience.map((exp, index) => (
            <CommitNode
              key={exp.company}
              exp={exp}
              index={index}
              isExpanded={!!expandedCards[exp.company]}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
