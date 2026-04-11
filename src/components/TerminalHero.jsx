import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Linkedin } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

// ── Python code that defines "who Fahad is" ──
const codeLines = [
  { tokens: [{ text: 'import ', c: 'pink' }, { text: 'torch', c: 'white' }] },
  { tokens: [{ text: 'import ', c: 'pink' }, { text: 'torch.nn ', c: 'white' }, { text: 'as ', c: 'pink' }, { text: 'nn', c: 'white' }] },
  { blank: true },
  { comment: '# Fahad Alaraik — Senior Data Scientist @ HUMAIN' },
  { comment: '# BS Software Engineering, King Saud University (First-class honors, 4.83/5)' },
  { blank: true },
  { tokens: [{ text: 'class ', c: 'pink' }, { text: 'FahadNet', c: 'green' }, { text: '(nn.Module):', c: 'white' }] },
  { blank: true },
  { tokens: [{ text: '    def ', c: 'pink' }, { text: '__init__', c: 'orange' }, { text: '(self):', c: 'white' }] },
  { tokens: [{ text: '        super().__init__()', c: 'white' }] },
  { tokens: [{ text: '        self.', c: 'white' }, { text: 'stack', c: 'cyan' }, { text: ' = {', c: 'white' }] },
  { tokens: [{ text: '            ', c: 'white' }, { text: '"core"', c: 'yellow' }, { text: ':    ', c: 'white' }, { text: '["Generative AI", "RAG", "Agentic AI"]', c: 'yellow' }, { text: ',', c: 'white' }] },
  { tokens: [{ text: '            ', c: 'white' }, { text: '"lang"', c: 'yellow' }, { text: ':    ', c: 'white' }, { text: '["Python", "TypeScript"]', c: 'yellow' }, { text: ',', c: 'white' }] },
  { tokens: [{ text: '            ', c: 'white' }, { text: '"ml"', c: 'yellow' }, { text: ':      ', c: 'white' }, { text: '["PyTorch", "TensorFlow", "Scikit-learn"]', c: 'yellow' }, { text: ',', c: 'white' }] },
  { tokens: [{ text: '            ', c: 'white' }, { text: '"deploy"', c: 'yellow' }, { text: ':  ', c: 'white' }, { text: '["Docker", "CI/CD", "Microservices"]', c: 'yellow' }] },
  { tokens: [{ text: '        }', c: 'white' }] },
  { blank: true },
  { tokens: [{ text: '    def ', c: 'pink' }, { text: 'forward', c: 'orange' }, { text: '(self, problem):', c: 'white' }] },
  { tokens: [{ text: '        ', c: 'white' }, { text: 'return ', c: 'pink' }, { text: 'self.solve(problem)', c: 'white' }] },
  { blank: true },
  { comment: '# Currently building intelligent agents at HUMAIN' },
  { comment: '# Previously: Fraud Detection & Recommendation Engines @ Al Rajhi Bank' },
]

const COLOR_MAP = {
  pink: 'text-syntax-pink', green: 'text-syntax-green', orange: 'text-syntax-orange',
  purple: 'text-syntax-purple', cyan: 'text-syntax-cyan', yellow: 'text-syntax-yellow',
  white: 'text-syntax-white', grey: 'text-syntax-grey',
}

function CodeLine({ line, lineNum, visible }) {
  if (!visible) return null

  const render = () => {
    if (line.blank) return <span>&nbsp;</span>
    if (line.comment) return <span className={COLOR_MAP.grey}>{line.comment}</span>
    return line.tokens.map((t, i) => (
      <span key={i} className={COLOR_MAP[t.c] || COLOR_MAP.white}>{t.text}</span>
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.08 }}
      className="flex"
    >
      <span className="line-number text-[10px] leading-[22px]">{lineNum}</span>
      <span className="text-[12px] leading-[22px] whitespace-pre">{render()}</span>
    </motion.div>
  )
}

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)

  // Type out lines
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= codeLines.length) { clearInterval(timer); return prev }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Blink cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="relative z-10 w-full max-w-2xl">
        {/* Tag */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-5">
          <span className="syntax-tag font-mono text-xs">{'<Hero />'}</span>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="terminal"
        >
          {/* Chrome */}
          <div className="terminal-header">
            <div className="terminal-dot bg-[#ff5f56]" />
            <div className="terminal-dot bg-[#ffbd2e]" />
            <div className="terminal-dot bg-[#27c93f]" />
            <span className="ml-3 text-syntax-grey text-xs font-mono">fahad_net.py</span>
            <span className="ml-auto text-syntax-dim text-[10px] font-mono">Python 3.12</span>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 overflow-x-auto">
            {codeLines.map((line, i) => (
              <CodeLine key={i} line={line} lineNum={i + 1} visible={i < visibleLines} />
            ))}

            {/* Cursor */}
            {visibleLines >= codeLines.length && (
              <div className="flex mt-0.5">
                <span className="line-number text-[10px] leading-[22px]">{codeLines.length + 1}</span>
                <span className="inline-block w-[7px] h-[17px] mt-0.5"
                  style={{ backgroundColor: cursorOn ? '#a6e22e' : 'transparent', transition: 'background-color 0.08s' }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <p className="font-mono text-sm sm:text-base">
            <span className="text-syntax-pink">model</span>
            <span className="text-syntax-white">.</span>
            <span className="text-syntax-orange">predict</span>
            <span className="text-syntax-white">(</span>
            <span className="text-syntax-yellow">"next breakthrough"</span>
            <span className="text-syntax-white">)</span>
          </p>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex justify-center gap-3 mt-7"
        >
          {[
            { icon: Github, href: personalInfo.github, label: "GitHub" },
            { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label !== "Email" ? "_blank" : undefined}
              rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
              className="p-3 rounded-lg glass text-syntax-grey hover:text-syntax-green transition-all"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={item.label}
            >
              <item.icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="flex justify-center mt-14">
          <motion.div
            className="w-5 h-9 rounded-full border-2 border-syntax-dim/40 flex justify-center pt-2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 bg-syntax-green rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
