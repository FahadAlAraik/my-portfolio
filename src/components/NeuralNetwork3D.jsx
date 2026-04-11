import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Ambient neural network — subtle, atmospheric, not distracting ──

const NODE_COUNT = 55
const CONNECTION_DIST = 3.2
const NODE_COLOR = new THREE.Color('#a6e22e')
const LINE_COLOR = new THREE.Color('#66d9ef')

function NeuralMesh({ mouse }) {
  const groupRef = useRef()
  const nodesRef = useRef()
  const glowRef = useRef()
  const linesRef = useRef()

  const { positions, nodeData } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3)
    const data = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 3.5
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      data.push({
        base: new THREE.Vector3(x, y, z),
        phaseOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatAmt: 0.1 + Math.random() * 0.15,
      })
    }
    return { positions: pos, nodeData: data }
  }, [])

  const { linePositions, pairs } = useMemo(() => {
    const lines = []
    const pairs = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodeData[i].base.distanceTo(nodeData[j].base)
        if (dist < CONNECTION_DIST) {
          lines.push(
            nodeData[i].base.x, nodeData[i].base.y, nodeData[i].base.z,
            nodeData[j].base.x, nodeData[j].base.y, nodeData[j].base.z,
          )
          pairs.push({ i, j })
        }
      }
    }
    return { linePositions: new Float32Array(lines), pairs }
  }, [nodeData])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Slow rotation + mouse influence
    if (groupRef.current) {
      const ty = t * 0.02 + mouse.current.x * 0.12
      const tx = Math.sin(t * 0.04) * 0.08 + mouse.current.y * 0.08
      groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.01
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.01
    }

    // Float nodes gently
    if (nodesRef.current) {
      const arr = nodesRef.current.geometry.attributes.position.array
      for (let i = 0; i < NODE_COUNT; i++) {
        const d = nodeData[i]
        arr[i * 3]     = d.base.x + Math.cos(t * d.floatSpeed * 0.7 + d.phaseOffset) * d.floatAmt * 0.5
        arr[i * 3 + 1] = d.base.y + Math.sin(t * d.floatSpeed + d.phaseOffset) * d.floatAmt
        arr[i * 3 + 2] = d.base.z
      }
      nodesRef.current.geometry.attributes.position.needsUpdate = true

      if (glowRef.current) {
        glowRef.current.geometry.attributes.position.array.set(arr)
        glowRef.current.geometry.attributes.position.needsUpdate = true
      }
    }

    // Update lines to follow nodes
    if (linesRef.current && nodesRef.current) {
      const nodePos = nodesRef.current.geometry.attributes.position.array
      const lineArr = linesRef.current.geometry.attributes.position.array
      for (let c = 0; c < pairs.length; c++) {
        const { i, j } = pairs[c]
        const bi = c * 6
        lineArr[bi]     = nodePos[i * 3]
        lineArr[bi + 1] = nodePos[i * 3 + 1]
        lineArr[bi + 2] = nodePos[i * 3 + 2]
        lineArr[bi + 3] = nodePos[j * 3]
        lineArr[bi + 4] = nodePos[j * 3 + 1]
        lineArr[bi + 5] = nodePos[j * 3 + 2]
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glow layer */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={positions.slice()} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.18} color="#a6e22e" sizeAttenuation transparent opacity={0.12} depthWrite={false} />
      </points>

      {/* Core nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#a6e22e" sizeAttenuation transparent opacity={0.6} />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={pairs.length * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#66d9ef" transparent opacity={0.07} />
      </lineSegments>
    </group>
  )
}

// Tiny slow-traveling signals for subtle life
function Signals({ count = 8 }) {
  const ref = useRef()
  const glowRef = useRef()

  const data = useMemo(() => {
    const d = []
    for (let i = 0; i < count; i++) {
      const makePoint = () => {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 3 + Math.random() * 3.5
        return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi))
      }
      d.push({ start: makePoint(), end: makePoint(), progress: Math.random(), speed: 0.02 + Math.random() * 0.04 })
    }
    return d
  }, [count])

  const positions = useMemo(() => new Float32Array(count * 3), [count])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < data.length; i++) {
      const s = data[i]
      s.progress += s.speed * 0.006
      if (s.progress > 1) {
        s.progress = 0
        s.start.copy(s.end)
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 3 + Math.random() * 3.5
        s.end.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi))
      }
      const p = new THREE.Vector3().lerpVectors(s.start, s.end, s.progress)
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y + Math.sin(s.progress * Math.PI) * 0.2
      arr[i * 3 + 2] = p.z
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    if (glowRef.current) {
      glowRef.current.geometry.attributes.position.array.set(arr)
      glowRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions.slice()} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.2} color="#66d9ef" sizeAttenuation transparent opacity={0.08} depthWrite={false} />
      </points>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#a6e22e" sizeAttenuation transparent opacity={0.45} />
      </points>
    </>
  )
}

// Sparse background dust
function Dust({ count = 30 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 22
      p[i * 3 + 1] = (Math.random() - 0.5) * 22
      p[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    return p
  }, [count])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ae81ff" sizeAttenuation transparent opacity={0.25} />
    </points>
  )
}

export default function NeuralNetwork3D() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }, [])

  return (
    <div className="fixed inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 11], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a6e22e" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#66d9ef" />
        <NeuralMesh mouse={mouse} />
        <Signals count={6} />
        <Dust count={25} />
      </Canvas>
    </div>
  )
}
