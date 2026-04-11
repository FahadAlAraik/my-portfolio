import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { skills, neuralNodes, neuralEdges } from '../data/portfolio'

// Map skill names to neural node IDs for connection visualization
const SKILL_TO_NODE = {
  "Python":            "python",
  "TypeScript":        "ts",
  "React":             "react",
  "API Development":   "api",
  "Backend Engineering":"api",
  "ML Algorithms":     "ml",
  "Model Training":    "ml",
  "Fine-tuning":       "finetune",
  "Feature Engineering":"feateng",
  "RAG Systems":       "rag",
  "AI Orchestration":  "agentic",
  "Agentic AI":        "agentic",
  "LLM Integration":   "llm",
  "Containerization":  "docker",
  "CI/CD Pipelines":   "docker",
  "Docker":            "docker",
  "Cloud Deployment":  "docker",
}

// Get connected edges for a skill's node
function getEdgesForNode(nodeId) {
  return neuralEdges.filter(e => e.from === nodeId || e.to === nodeId)
}

function SkillNode({ skill, categoryWeight, index, isHovered, onHover, onLeave }) {
  const nodeId = SKILL_TO_NODE[skill]
  const edges = useMemo(() => nodeId ? getEdgesForNode(nodeId) : [], [nodeId])
  const avgWeight = edges.length > 0
    ? edges.reduce((sum, e) => sum + e.weight, 0) / edges.length
    : 0.5

  // Connection thickness = weight * category weight
  const thickness = avgWeight * categoryWeight
  const barWidth = Math.max(thickness * 100, 20)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex items-center gap-3 py-2 cursor-default"
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
    >
      {/* Skill name */}
      <span className={`font-mono text-sm w-40 sm:w-48 text-right flex-shrink-0 transition-colors duration-200 ${
        isHovered ? 'text-syntax-green' : 'text-syntax-white/70'
      }`}>
        {skill}
      </span>

      {/* Weight bar (neural connection thickness) */}
      <div className="flex-1 h-3 rounded-full overflow-hidden relative" style={{ background: 'rgba(73,72,62,0.3)' }}>
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          whileInView={{ width: `${barWidth}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
          style={{
            background: isHovered
              ? `linear-gradient(90deg, #a6e22e, #66d9ef)`
              : `linear-gradient(90deg, #a6e22e80, #66d9ef60)`,
            boxShadow: isHovered ? '0 0 12px rgba(166,226,46,0.4)' : 'none',
            transition: 'box-shadow 0.3s, background 0.3s',
          }}
        >
          {/* Pulse effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(166,226,46,0.5), transparent)' }}
            />
          )}
        </motion.div>
      </div>

      {/* Weight value */}
      <span className={`font-mono text-[11px] w-10 text-right flex-shrink-0 transition-colors ${
        isHovered ? 'text-syntax-orange' : 'text-syntax-dim'
      }`}>
        {(thickness).toFixed(2)}
      </span>
    </motion.div>
  )
}

function CategoryBlock({ category, data, hoveredSkill, onHover, onLeave, index }) {
  const categoryColors = {
    "Programming & Development": { tag: 'syntax-tag-green', color: '#a6e22e' },
    "Machine Learning": { tag: 'syntax-tag-orange', color: '#fd971f' },
    "Generative AI": { tag: 'syntax-tag-purple', color: '#ae81ff' },
    "Deployment & Operations": { tag: 'syntax-tag', color: '#66d9ef' },
  }
  const style = categoryColors[category] || categoryColors["Deployment & Operations"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glow-border p-5 sm:p-6"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`${style.tag} font-mono text-[11px] px-2 py-0.5 rounded`}>
          {`function`}
        </span>
        <span className="text-syntax-orange font-mono text-sm">{`get${category.replace(/\s+&\s+/g, '').replace(/\s+/g, '')}()`}</span>
        <div className="flex-1 h-px" style={{ background: `${style.color}20` }} />
        <span className="text-syntax-dim font-mono text-[10px]">w={data.weight.toFixed(2)}</span>
      </div>

      {/* Skills list */}
      <div>
        {data.items.map((skill, i) => (
          <SkillNode
            key={skill}
            skill={skill}
            categoryWeight={data.weight}
            index={i}
            isHovered={hoveredSkill === skill}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function WeightMatrixSkills({ fireNodes }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const handleHover = (skill) => {
    setHoveredSkill(skill)
    // Fire the corresponding neural network node
    const nodeId = SKILL_TO_NODE[skill]
    if (nodeId && fireNodes?.current) {
      const connected = [nodeId]
      neuralEdges.forEach(e => {
        if (e.from === nodeId) connected.push(e.to)
        if (e.to === nodeId) connected.push(e.from)
      })
      fireNodes.current(connected)
    }
  }

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="syntax-tag-purple font-mono text-xs mb-3 inline-block px-2 py-0.5 rounded">
            {'<Skills />'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-syntax-cyan">model</span>
            <span className="text-syntax-white">.</span>
            <span className="text-syntax-orange">weights</span>
            <span className="text-syntax-white">()</span>
          </h2>
          <p className="text-syntax-grey mt-3 font-mono text-sm">
            // neural connection thickness = proficiency weight
          </p>
        </motion.div>

        {/* Weight matrix grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, data], index) => (
            <CategoryBlock
              key={category}
              category={category}
              data={data}
              hoveredSkill={hoveredSkill}
              onHover={handleHover}
              onLeave={() => setHoveredSkill(null)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
