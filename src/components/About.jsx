import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Code2, Brain } from 'lucide-react'
import { personalInfo, education } from '../data/portfolio'

const stats = [
  { icon: Briefcase, label: "Years", value: "3+" },
  { icon: Code2, label: "Projects", value: "10+" },
  { icon: Brain, label: "AI Models", value: "5+" },
  { icon: GraduationCap, label: "GPA", value: "4.83" }
]

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      <div className="container-custom max-w-5xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary">
            Building with
            <br />
            <span className="gradient-text">purpose.</span>
          </h2>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-24"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-theme-muted text-center leading-relaxed font-light">
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glow-border p-6 sm:p-8 text-center group"
            >
              <stat.icon className="text-primary-400 mx-auto mb-3" size={28} />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-theme-subtle uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card glow-border p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-500/10 shrink-0">
                <GraduationCap className="text-primary-400" size={24} />
              </div>
              <div>
                <p className="text-primary-400 text-xs font-mono mb-1">// education</p>
                <h3 className="font-semibold text-theme-primary text-lg sm:text-xl">{education.institution}</h3>
                <p className="text-theme-muted text-sm mt-1">{education.degree}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium">
                    {education.honors}
                  </span>
                  <span className="text-theme-subtle text-xs">GPA: {education.gpa}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
