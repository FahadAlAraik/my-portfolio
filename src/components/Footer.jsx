import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="container-custom max-w-4xl mx-auto px-4 text-center">
        {/* Divider */}
        <div className="w-20 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #a6e22e40, transparent)' }} />

        {/* Social icons */}
        <div className="flex justify-center gap-3 mb-6">
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
              className="p-2.5 rounded-lg glass text-syntax-dim hover:text-syntax-green transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={16} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-syntax-dim text-xs font-mono">
          <span className="text-syntax-grey">// </span>
          {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </footer>
  )
}
