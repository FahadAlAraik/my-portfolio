import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Code2, Brain } from 'lucide-react'
import { personalInfo, education } from '../data/portfolio'

const stats = [
  { icon: Briefcase, label: "Years", value: "3+",   color: "#a6e22e" },
  { icon: Code2,     label: "Projects", value: "10+", color: "#66d9ef" },
  { icon: Brain,     label: "AI Models", value: "5+",  color: "#ae81ff" },
  { icon: GraduationCap, label: "GPA", value: "4.83", color: "#fd971f" },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
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
            {'<About />'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-syntax-purple">def </span>
            <span className="text-syntax-orange">about_me</span>
            <span className="text-syntax-white">():</span>
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 sm:p-8 mb-12"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="line-number text-[11px] mt-0.5">1</span>
            <span className="text-syntax-grey font-mono text-sm">"""</span>
          </div>
          <div className="pl-10">
            <p className="text-syntax-yellow/90 font-mono text-sm sm:text-base leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>
          <div className="flex items-start gap-3 mt-4">
            <span className="line-number text-[11px] mt-0.5">2</span>
            <span className="text-syntax-grey font-mono text-sm">"""</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card glow-border p-5 text-center group"
            >
              <stat.icon className="mx-auto mb-2" size={24} style={{ color: stat.color }} />
              <div className="text-2xl sm:text-3xl font-bold font-mono mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-syntax-dim text-[11px] uppercase tracking-wider font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-card glow-border p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(253,151,31,0.12)' }}>
                <GraduationCap size={22} className="text-syntax-orange" />
              </div>
              <div>
                <span className="text-syntax-grey font-mono text-[11px]">// education</span>
                <h3 className="font-bold text-syntax-white text-lg mt-1">{education.institution}</h3>
                <p className="text-syntax-white/70 text-sm mt-0.5">{education.degree}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="syntax-tag-green font-mono text-[11px] px-2 py-0.5 rounded">
                    {education.honors}
                  </span>
                  <span className="text-syntax-orange font-mono text-xs">GPA: {education.gpa}</span>
                  <span className="text-syntax-dim font-mono text-[11px]">{education.period}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
