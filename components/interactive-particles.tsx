"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function InteractiveParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 500
  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 15
      pos[i + 1] = (Math.random() - 0.5) * 15
      pos[i + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  })

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]

        // Mouse interaction
        const mouseX = (mousePosition.x - 50) * 0.1
        const mouseY = (mousePosition.y - 50) * 0.1

        const dx = mouseX - x
        const dy = mouseY - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 3) {
          positions[i3] += dx * 0.02
          positions[i3 + 1] += dy * 0.02
        }

        // Return to original position
        positions[i3] += (Math.sin(state.clock.getElapsedTime() + i) * 0.01 - positions[i3]) * 0.01
        positions[i3 + 1] += (Math.cos(state.clock.getElapsedTime() + i) * 0.01 - positions[i3 + 1]) * 0.01
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#FF6B35" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}
