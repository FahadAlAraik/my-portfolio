import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralNetwork({ nodeCount = 70, connectionDistance = 2.8, mouse }) {
  const groupRef = useRef()
  const nodesRef = useRef()
  const glowRef = useRef()
  const linesRef = useRef()

  // Generate node positions in a sphere distribution
  const { positions, nodeData } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3)
    const nodeData = []

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 4

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      nodeData.push({
        position: new THREE.Vector3(x, y, z),
        basePosition: new THREE.Vector3(x, y, z),
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmount: 0.15 + Math.random() * 0.25
      })
    }

    return { positions, nodeData }
  }, [nodeCount])

  // Node sizes for pulsing effect
  const nodeSizes = useMemo(() => {
    return new Float32Array(nodeCount).fill(1)
  }, [nodeCount])

  // Generate connections between nearby nodes
  const { linePositions, lineCount, connectionPairs } = useMemo(() => {
    const lines = []
    const pairs = []

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodeData[i].position.distanceTo(nodeData[j].position)
        if (dist < connectionDistance) {
          lines.push(
            nodeData[i].position.x, nodeData[i].position.y, nodeData[i].position.z,
            nodeData[j].position.x, nodeData[j].position.y, nodeData[j].position.z
          )
          pairs.push({ i, j, dist })
        }
      }
    }

    return {
      linePositions: new Float32Array(lines),
      lineCount: lines.length / 6,
      connectionPairs: pairs
    }
  }, [nodeData, connectionDistance, nodeCount])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Mouse-reactive rotation
    if (groupRef.current) {
      const targetRotationY = time * 0.03 + (mouse.current.x * 0.3)
      const targetRotationX = Math.sin(time * 0.1) * 0.1 + (mouse.current.y * 0.2)

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.02
    }

    // Animate node positions and pulse sizes
    if (nodesRef.current) {
      const posArray = nodesRef.current.geometry.attributes.position.array

      for (let i = 0; i < nodeCount; i++) {
        const node = nodeData[i]
        const floatY = Math.sin(time * node.floatSpeed + node.pulseOffset) * node.floatAmount
        const floatX = Math.cos(time * node.floatSpeed * 0.7 + node.pulseOffset) * node.floatAmount * 0.5

        posArray[i * 3] = node.basePosition.x + floatX
        posArray[i * 3 + 1] = node.basePosition.y + floatY
        posArray[i * 3 + 2] = node.basePosition.z
      }
      nodesRef.current.geometry.attributes.position.needsUpdate = true

      // Sync glow layer
      if (glowRef.current) {
        glowRef.current.geometry.attributes.position.array.set(posArray)
        glowRef.current.geometry.attributes.position.needsUpdate = true
      }
    }

    // Update line positions to follow nodes
    if (linesRef.current && nodesRef.current) {
      const nodePositions = nodesRef.current.geometry.attributes.position.array
      const lineArray = linesRef.current.geometry.attributes.position.array

      for (let c = 0; c < connectionPairs.length; c++) {
        const { i, j } = connectionPairs[c]
        const baseIdx = c * 6

        lineArray[baseIdx] = nodePositions[i * 3]
        lineArray[baseIdx + 1] = nodePositions[i * 3 + 1]
        lineArray[baseIdx + 2] = nodePositions[i * 3 + 2]
        lineArray[baseIdx + 3] = nodePositions[j * 3]
        lineArray[baseIdx + 4] = nodePositions[j * 3 + 1]
        lineArray[baseIdx + 5] = nodePositions[j * 3 + 2]
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glow layer */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions.slice()}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#10b981"
          sizeAttenuation
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </points>

      {/* Core nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#34d399"
          sizeAttenuation
          transparent
          opacity={1}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
        />
      </lineSegments>
    </group>
  )
}

// Subtle traveling signals along connections
function TravelingSignals({ count = 12, mouse }) {
  const signalsRef = useRef()
  const glowRef = useRef()

  const signalData = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.acos(2 * Math.random() - 1)
      const r1 = 3 + Math.random() * 4

      const theta2 = Math.random() * Math.PI * 2
      const phi2 = Math.acos(2 * Math.random() - 1)
      const r2 = 3 + Math.random() * 4

      data.push({
        start: new THREE.Vector3(
          r1 * Math.sin(phi1) * Math.cos(theta1),
          r1 * Math.sin(phi1) * Math.sin(theta1),
          r1 * Math.cos(phi1)
        ),
        end: new THREE.Vector3(
          r2 * Math.sin(phi2) * Math.cos(theta2),
          r2 * Math.sin(phi2) * Math.sin(theta2),
          r2 * Math.cos(phi2)
        ),
        progress: Math.random(),
        speed: 0.05 + Math.random() * 0.1, // Much slower
      })
    }
    return data
  }, [count])

  const positions = useMemo(() => new Float32Array(count * 3), [count])

  useFrame(() => {
    if (signalsRef.current) {
      const posArray = signalsRef.current.geometry.attributes.position.array

      for (let i = 0; i < signalData.length; i++) {
        const signal = signalData[i]

        signal.progress += signal.speed * 0.008
        if (signal.progress > 1) {
          signal.progress = 0
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          const r = 3 + Math.random() * 4
          signal.start.copy(signal.end)
          signal.end.set(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          )
        }

        const pos = new THREE.Vector3().lerpVectors(signal.start, signal.end, signal.progress)
        pos.y += Math.sin(signal.progress * Math.PI) * 0.3

        posArray[i * 3] = pos.x
        posArray[i * 3 + 1] = pos.y
        posArray[i * 3 + 2] = pos.z
      }

      signalsRef.current.geometry.attributes.position.needsUpdate = true

      if (glowRef.current) {
        glowRef.current.geometry.attributes.position.array.set(posArray)
        glowRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <>
      {/* Signal glow - subtle */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions.slice()}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color="#22d3ee"
          sizeAttenuation
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </points>

      {/* Signal core - smaller */}
      <points ref={signalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#67e8f9"
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </points>
    </>
  )
}

// Ambient floating particles for depth
function AmbientParticles({ count = 50 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#10b981"
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 0, 8]} intensity={0.3} color="#22d3ee" />
      <NeuralNetwork nodeCount={70} connectionDistance={2.5} mouse={mouse} />
      <TravelingSignals count={8} mouse={mouse} />
      <AmbientParticles count={30} />
    </>
  )
}

export default function Scene3D() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  return (
    <div
      className="absolute inset-0 -z-10"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
