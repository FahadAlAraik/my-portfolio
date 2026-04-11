// Monokai-Obsidian Palette
// Inspired by Monokai syntax highlighting mapped to UI elements
export const monokai = {
  // Background layers
  bg: {
    deep:      '#1a1a2e',   // Deepest background (body)
    primary:   '#16213e',   // Primary panels
    secondary: '#0f3460',   // Secondary surfaces
    surface:   '#1a1a2e',   // Card surfaces
    overlay:   'rgba(26, 26, 46, 0.85)', // Glass overlay
  },

  // Syntax-highlight inspired UI colors
  syntax: {
    green:     '#a6e22e',   // Strings  → labels, highlights, active states
    purple:    '#ae81ff',   // Keywords → section headers, tags
    orange:    '#fd971f',   // Functions → CTAs, links, interactive elements
    pink:      '#f92672',   // Operators → accents, badges, alerts
    yellow:    '#e6db74',   // Strings alt → secondary highlights
    cyan:      '#66d9ef',   // Types    → info, metadata, subtle accents
    white:     '#f8f8f2',   // Foreground text
    grey:      '#75715e',   // Comments → muted text, placeholders
    dimGrey:   '#49483e',   // Line numbers, subtle borders
  },

  // Semantic mappings
  text: {
    primary:   '#f8f8f2',
    secondary: '#cfcfc2',
    muted:     '#a0a0a0',
    subtle:    '#75715e',
  },

  // Glass morphism
  glass: {
    bg:        'rgba(22, 33, 62, 0.6)',
    border:    'rgba(166, 226, 46, 0.15)',
    highlight: 'rgba(166, 226, 46, 0.08)',
  },

  // Neural network
  neural: {
    node:      '#a6e22e',
    synapse:   '#66d9ef',
    pulse:     '#fd971f',
    fire:      '#f92672',
  },

  // Glow effects
  glow: {
    green:     '0 0 20px rgba(166, 226, 46, 0.4)',
    purple:    '0 0 20px rgba(174, 129, 255, 0.4)',
    orange:    '0 0 20px rgba(253, 151, 31, 0.4)',
    cyan:      '0 0 20px rgba(102, 217, 239, 0.4)',
    pink:      '0 0 20px rgba(249, 38, 114, 0.4)',
  }
}
