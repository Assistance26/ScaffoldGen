"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export function FloatingShapes() {
  return (
    <>
      <FloatingBox position={[-4, 2, -2]} color="#FF6B35" />
      <FloatingBox position={[4, -2, -3]} color="#FF8C5A" />
      <FloatingSphere position={[3, 3, -4]} color="#FF6B35" />
      <FloatingSphere position={[-3, -3, -2]} color="#FF8C5A" />
      <FloatingTorus position={[0, 4, -5]} color="#FF6B35" />
    </>
  )
}

function FloatingBox({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}
