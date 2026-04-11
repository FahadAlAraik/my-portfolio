import { motion } from 'framer-motion'
import { ExternalLink, Github, Award, ArrowUpRight, Cpu, Database, Zap } from 'lucide-react'
import { projects, education, neuralEdges } from '../data/portfolio'

const CATEGORY_STYLES = {
  'model-deployment': { icon: Cpu,      label: 'Model Deployment',    tagClass: 'syntax-tag-orange' },
  'agentic-ai':       { icon: Zap,      label: 'Agentic System',      tagClass: 'syntax-tag-purple' },
  'data-extraction':  { icon: Database,  label: 'Data Extraction',     tagClass: 'syntax-tag-green'  },
  'tool':             { icon: Cpu,      label: 'Dev Tool',            tagClass: 'syntax-tag'        },
}

// Map skill names to node IDs for firing
const SKILL_TO_NODE = {
  "Python": "python", "TensorFlow": "ml", "CNN": "ml", "Flask": "python",
  "React": "react", "TypeScript": "ts", "Claude API": "llm",
  "Redis": "api", "Multi-Agent AI": "agentic", "Web Scraping": "python",
  "Data Engineering": "feateng", "OpenCV": "ml", "Stockfish": "ml",
  "Discord.py": "python", "Tkinter": "python",
}

function ProjectCard({ project, index, fireNodes }) {
  const category = CATEGORY_STYLES[project.category] || CATEGORY_STYLES['tool']
  const CategoryIcon = category.icon

  const handleClick = () => {
    if (!fireNodes?.current) return
    // Collect all related node IDs from the project's tech stack
    const nodeIds = new Set()
    project.tech.forEach(t => {
      const nodeId = SKILL_TO_NODE[t]
      if (nodeId) {
        nodeIds.add(nodeId)
        // Also fire connected nodes
        neuralEdges.forEach(e => {
          if (e.from === nodeId) nodeIds.add(e.to)
          if (e.to === nodeId) nodeIds.add(e.from)
        })
      }
    })
    if (project.relatedNodes) {
      project.relatedNodes.forEach(n => {
        const mapped = SKILL_TO_NODE[n]
        if (mapped) nodeIds.add(mapped)
      })
    }
    fireNodes.current([...nodeIds])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="glass-card glow-border h-full p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
        {/* Hover fire glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(253,151,31,0.08) 0%, transparent 60%)' }}
        />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${category.tagClass} font-mono text-[10px] px-2 py-0.5 rounded flex items-center gap-1`}>
                <CategoryIcon size={10} />
                {category.label}
              </span>
              {project.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded font-mono"
                  style={{ background: 'rgba(230,219,116,0.12)', color: '#e6db74', border: '1px solid rgba(230,219,116,0.2)' }}
                >
                  <Award size={10} />
                  {project.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded text-syntax-dim hover:text-syntax-white transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <Github size={16} />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded text-syntax-dim hover:text-syntax-orange transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-syntax-white mb-2 group-hover:text-syntax-green transition-colors flex items-center gap-2">
            {project.title}
            <ArrowUpRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-all text-syntax-orange"
            />
          </h3>

          {/* Description */}
          <p className="text-syntax-grey text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[11px] rounded font-mono text-syntax-cyan/70"
                style={{ background: 'rgba(102,217,239,0.07)', border: '1px solid rgba(102,217,239,0.1)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* "Click to fire" hint */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-syntax-dim font-mono text-[10px] flex items-center gap-1">
              <Zap size={10} className="text-syntax-orange" />
              click to fire neural network
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ fireNodes }) {
  const allProjects = [
    ...projects.filter(p => p.featured),
    ...education.projects.map(p => ({
      ...p,
      title: p.name,
      featured: true,
      category: 'tool',
      relatedNodes: [],
    }))
  ]

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container-custom max-w-5xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="syntax-tag-orange font-mono text-xs mb-3 inline-block px-2 py-0.5 rounded">
            {'// training_data'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-syntax-orange">deploy</span>
            <span className="text-syntax-white">(</span>
            <span className="text-syntax-yellow">"projects"</span>
            <span className="text-syntax-white">)</span>
          </h2>
          <p className="text-syntax-grey mt-3 font-mono text-sm">
            // click a project to fire the neural network inference
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              fireNodes={fireNodes}
            />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/FahadAlAraik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-syntax-grey hover:text-syntax-green transition-colors group font-mono text-sm"
          >
            <span>git remote -v</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
