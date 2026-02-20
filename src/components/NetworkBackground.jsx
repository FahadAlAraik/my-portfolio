import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function NetworkBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const animationRef = useRef(null)
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Cover scrollable area
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const nodeCount = 60
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }
    nodesRef.current = nodes

    const connectionDistance = 150

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodeColor = isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.7)'
      const lineColor = isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.15)'
      const glowColor = isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)'

      const time = Date.now() * 0.001

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Pulse effect
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 1

        // Draw connections
        nodes.forEach((other, j) => {
          if (i >= j) return
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = lineColor.replace('0.1', opacity * 0.15).replace('0.15', opacity * 0.2)
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = glowColor
        ctx.fill()

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}
