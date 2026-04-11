/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monokai-Obsidian backgrounds
        mono: {
          deep:      '#1a1a2e',
          primary:   '#16213e',
          secondary: '#0f3460',
          surface:   '#1e1e3a',
          overlay:   '#2a2a4a',
        },
        // Syntax-highlight colors
        syntax: {
          green:   '#a6e22e',
          purple:  '#ae81ff',
          orange:  '#fd971f',
          pink:    '#f92672',
          yellow:  '#e6db74',
          cyan:    '#66d9ef',
          white:   '#f8f8f2',
          grey:    '#75715e',
          dim:     '#49483e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite alternate',
        'typing':      'typing 3.5s steps(40, end)',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
        'slide-up':    'slideUp 0.5s ease-out',
        'fade-in':     'fadeIn 0.5s ease-out',
        'synapse-fire':'synapseFire 1s ease-out forwards',
        'node-pulse':  'nodePulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 20px rgba(166, 226, 46, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(166, 226, 46, 0.5)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blinkCaret: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#a6e22e' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        synapseFire: {
          '0%': { strokeDashoffset: '100%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { strokeDashoffset: '0%', opacity: '0' },
        },
        nodePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(166,226,46,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,226,46,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
