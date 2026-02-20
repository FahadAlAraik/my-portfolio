import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function NetworkBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const animationRef = useRef(null)
  const lastFrameTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3
    }
    resize()
    window.addEventListener('resize', resize)

    // Fewer nodes for better performance
    const nodeCount = 35
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 2 + Math.random() * 1.5,
      })
    }

    const connectionDistance = 180
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate)

      // Throttle to target FPS
      const elapsed = currentTime - lastFrameTime.current
      if (elapsed < frameInterval) return
      lastFrameTime.current = currentTime - (elapsed % frameInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodeColor = isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.6)'
      const lineColor = isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.12)'

      // Update and draw
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Move nodes
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections (only check nodes ahead to avoid duplicates)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = other.x - node.x
          const dy = other.y - node.y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistance * connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

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
      style={{ opacity: 0.35 }}
    />
  )
}
