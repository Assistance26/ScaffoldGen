// "use client"

// import type React from "react"

// import { useRef } from "react"
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
// import { Card } from "@/components/ui/card"

// export function OrganizationCard3D() {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
//     stiffness: 300,
//     damping: 30,
//   })
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
//     stiffness: 300,
//     damping: 30,
//   })

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!cardRef.current) return
//     const rect = cardRef.current.getBoundingClientRect()
//     const centerX = rect.left + rect.width / 2
//     const centerY = rect.top + rect.height / 2
//     mouseX.set((e.clientX - centerX) / rect.width)
//     mouseY.set((e.clientY - centerY) / rect.height)
//   }

//   const handleMouseLeave = () => {
//     mouseX.set(0)
//     mouseY.set(0)
//   }

//   return (
//     <motion.div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         rotateX,
//         rotateY,
//         transformStyle: "preserve-3d",
//       }}
//       whileHover={{ scale: 1.05, z: 100 }}
//       transition={{ duration: 0.3 }}
//       className="relative"
//     >
//       <Card className="p-12 bg-linear-gradient-to-br from-card via-secondary to-card border-border text-center hover:border-primary/50 transition-all relative overflow-hidden group">
//         {/* Animated gradient background */}
//         <motion.div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{
//             background: "radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
//           }}
//           animate={{
//             scale: [1, 1.2, 1],
//           }}
//           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//         />

//         {/* Floating particles */}
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-primary/40"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -20, 0],
//               x: [0, Math.random() * 10 - 5, 0],
//               opacity: [0, 1, 0],
//               scale: [0, 1.5, 0],
//             }}
//             transition={{
//               duration: 2 + Math.random() * 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}

//         {/* Scan line effect */}
//         <motion.div
//           className="absolute inset-x-0 h-px bg-linear-gradient-to-r from-transparent via-primary to-transparent"
//           animate={{ y: [0, 300] }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//         />

//         {/* Icon with 3D effect */}
//         <motion.div
//           className="relative mx-auto mb-6"
//           style={{ transformStyle: "preserve-3d" }}
//           whileHover={{ rotateY: 360 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div
//             className="h-24 w-24 rounded-2xl bg-linear-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center relative overflow-hidden"
//             style={{ transform: "translateZ(50px)" }}
//           >
//             {/* Rotating gradient overlay */}
//             <motion.div
//               className="absolute inset-0 bg-linear-gradient-to-br from-white/30 via-transparent to-transparent"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />

//             {/* Glow effect */}
//             <motion.div
//               className="absolute inset-0 rounded-2xl bg-primary blur-xl opacity-50"
//               animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
//               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//             />

//             <svg className="h-12 w-12 text-primary-foreground relative z-10" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//             </svg>
//           </motion.div>

//           {/* Orbiting particles */}
//           {[0, 120, 240].map((angle) => (
//             <motion.div
//               key={angle}
//               className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-primary/60"
//               style={{
//                 transformOrigin: "0 0",
//               }}
//               animate={{
//                 rotate: [angle, angle + 360],
//                 x: [0, 60 * Math.cos((angle * Math.PI) / 180)],
//                 y: [0, 60 * Math.sin((angle * Math.PI) / 180)],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "linear",
//               }}
//             />
//           ))}
//         </motion.div>

//         {/* Text with 3D effect */}
//         <motion.h3
//           className="text-2xl font-bold relative z-10 bg-linear-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
//           style={{ transform: "translateZ(30px)" }}
//         >
//           Resourcio Community
//         </motion.h3>

//         {/* Subtitle */}
//         <motion.p
//           className="text-sm text-muted-foreground mt-2 relative z-10"
//           style={{ transform: "translateZ(20px)" }}
//         >
//           Official Partner Organization
//         </motion.p>

//         {/* Stats */}
//         <motion.div className="flex justify-center gap-6 mt-6 relative z-10" style={{ transform: "translateZ(25px)" }}>
//           {[
//             { label: "Members", value: "2.5K" },
//             { label: "Projects", value: "150+" },
//           ].map((stat, i) => (
//             <motion.div key={i} className="text-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//               <div className="text-xl font-bold text-primary">{stat.value}</div>
//               <div className="text-xs text-muted-foreground">{stat.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </Card>
//     </motion.div>
//   )
// }


"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"

export function OrganizationCard3D() {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Predefined positions for particles to avoid hydration issues
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 25, top: 80 },
    { left: 40, top: 15 },
    { left: 55, top: 90 },
    { left: 70, top: 30 },
    { left: 85, top: 70 },
    { left: 15, top: 45 },
    { left: 35, top: 60 },
    { left: 65, top: 10 },
    { left: 90, top: 40 },
    { left: 20, top: 85 },
    { left: 50, top: 25 },
    { left: 75, top: 55 },
    { left: 30, top: 35 },
    { left: 60, top: 75 },
  ]

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, z: 100 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="p-12 bg-linear-gradient-to-br from-card via-secondary to-card border-border text-center hover:border-primary/50 transition-all relative overflow-hidden group">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Floating particles - Fixed positions to avoid hydration issues */}
        {isClient && particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, (Math.random() * 10 - 5), 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-x-0 h-px bg-linear-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ y: [0, 300] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Icon with 3D effect */}
        <motion.div
          className="relative mx-auto mb-6"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: 360 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="h-24 w-24 rounded-2xl bg-linear-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center relative overflow-hidden"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* Rotating gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-linear-gradient-to-br from-white/30 via-transparent to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary blur-xl opacity-50"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            <svg className="h-12 w-12 text-primary-foreground relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </motion.div>

          {/* Orbiting particles */}
          {[0, 120, 240].map((angle) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-primary/60"
              style={{
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [angle, angle + 360],
                x: [0, 60 * Math.cos((angle * Math.PI) / 180)],
                y: [0, 60 * Math.sin((angle * Math.PI) / 180)],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Text with 3D effect */}
        <motion.h3
          className="text-2xl font-bold relative z-10 bg-linear-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          style={{ transform: "translateZ(30px)" }}
        >
          Resourcio Community
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-muted-foreground mt-2 relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          Official Partner Organization
        </motion.p>

        {/* Stats */}
        <motion.div className="flex justify-center gap-6 mt-6 relative z-10" style={{ transform: "translateZ(25px)" }}>
          {[
            { label: "Members", value: "2.5K" },
            { label: "Projects", value: "150+" },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <div className="text-xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  )
}