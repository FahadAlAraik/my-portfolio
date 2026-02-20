import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16 relative">
      <div className="container-custom max-w-4xl mx-auto px-4 text-center">
        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mx-auto mb-10" />

        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass text-theme-subtle hover:text-theme-primary hover:bg-white/10 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass text-theme-subtle hover:text-theme-primary hover:bg-white/10 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-full glass text-theme-subtle hover:text-primary-400 hover:bg-primary-500/10 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
          </motion.a>
        </div>

        {/* Copyright */}
        <p className="text-theme-subtle text-xs">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </footer>
  )
}
