"use client"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function DeviceMockup3D() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Phone frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[1.8, 3.6, 0.01]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#FF6B35" emissiveIntensity={0.1} />
      </mesh>
      {/* Notch */}
      <mesh position={[0, 1.7, 0.11]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

export function StatCard3D({ position, value, label, growth }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.5, 1, 0.05]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.9}
        metalness={0.1}
        roughness={0.3}
        emissive="#FF6B35"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}
