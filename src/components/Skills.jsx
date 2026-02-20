import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

const allSkills = Object.values(skills).flat()

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

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
            What I
            <br />
            <span className="gradient-text">know.</span>
          </h2>
        </motion.div>

        {/* Skills with staggered fade in */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } }
          }}
          className="flex flex-wrap justify-center gap-4 sm:gap-5"
        >
          {allSkills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.4 }}
              className="inline-block px-5 py-3 sm:px-6 sm:py-3.5 rounded-full glass text-sm sm:text-base text-theme-secondary cursor-default transition-colors duration-300 hover:bg-primary-500/10 hover:text-primary-400"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
