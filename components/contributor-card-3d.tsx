// "use client"

// import type React from "react"

// import { useRef } from "react"
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
// import { Card } from "@/components/ui/card"

// interface ContributorCard3DProps {
//   name: string
//   role: string
//   index: number
// }

// export function ContributorCard3D({ name, role, index }: ContributorCard3DProps) {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
//     stiffness: 300,
//     damping: 30,
//   })
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
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
//       initial={{ opacity: 0, y: 50, rotateX: -20 }}
//       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
//       style={{
//         rotateX,
//         rotateY,
//         transformStyle: "preserve-3d",
//       }}
//       whileHover={{ y: -15, scale: 1.05 }}
//     >
//       <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border text-center hover:border-primary/50 transition-all duration-300 relative overflow-hidden group h-full">
//         {/* Animated gradient background */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           animate={{
//             background: [
//               "radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
//               "radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
//               "radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
//             ],
//           }}
//           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//         />

//         {/* Floating particles around avatar */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-primary/50"
//             style={{
//               left: "50%",
//               top: "30%",
//             }}
//             animate={{
//               x: [0, 40 * Math.cos((i * Math.PI) / 4)],
//               y: [0, 40 * Math.sin((i * Math.PI) / 4)],
//               opacity: [0, 1, 0],
//               scale: [0, 1.5, 0],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 0.2,
//             }}
//           />
//         ))}

//         {/* Avatar with 3D effect */}
//         <motion.div
//           className="relative mx-auto mb-6"
//           style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
//         >
//           <motion.div
//             className="h-24 w-24 rounded-full bg-gradient-to-br from-secondary to-card mx-auto flex items-center justify-center relative overflow-hidden border-2 border-primary/20"
//             whileHover={{ scale: 1.15, rotate: 360 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Rotating gradient overlay */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary/20"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />

//             {/* Pulsing glow */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
//               animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* User icon */}
//             <svg className="h-12 w-12 text-muted-foreground relative z-10" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>

//             {/* Orbiting dot */}
//             <motion.div
//               className="absolute h-2 w-2 rounded-full bg-primary"
//               animate={{
//                 rotate: 360,
//               }}
//               transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               style={{
//                 top: "10%",
//                 left: "50%",
//                 transformOrigin: "0 40px",
//               }}
//             />
//           </motion.div>

//           {/* Ring effect */}
//           <motion.div
//             className="absolute inset-0 rounded-full border-2 border-primary/30"
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.5, 0, 0.5],
//             }}
//             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//           />
//         </motion.div>

//         {/* Name with 3D effect */}
//         <motion.h3
//           className="font-bold text-lg mb-2 relative z-10 group-hover:text-primary transition-colors"
//           style={{ transform: "translateZ(30px)" }}
//         >
//           {name}
//         </motion.h3>

//         {/* Role */}
//         <motion.p className="text-sm text-muted-foreground relative z-10" style={{ transform: "translateZ(20px)" }}>
//           {role}
//         </motion.p>

//         {/* Stats bar */}
//         <motion.div className="mt-6 space-y-2 relative z-10" style={{ transform: "translateZ(25px)" }}>
//           {[
//             { label: "Commits", value: 85, color: "bg-primary" },
//             { label: "PRs", value: 65, color: "bg-blue-500" },
//           ].map((stat, i) => (
//             <div key={i} className="text-left">
//               <div className="flex justify-between text-xs mb-1">
//                 <span className="text-muted-foreground">{stat.label}</span>
//                 <span className="font-semibold">{stat.value}%</span>
//               </div>
//               <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
//                 <motion.div
//                   className={`h-full ${stat.color} rounded-full`}
//                   initial={{ width: 0 }}
//                   whileInView={{ width: `${stat.value}%` }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 1, delay: index * 0.1 + i * 0.2 }}
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Shine effect on hover */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
//           style={{ transform: "translateZ(10px)" }}
//         />
//       </Card>
//     </motion.div>
//   )
// }






"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"

interface ContributorCard3DProps {
  name: string
  role: string
  index: number
}

export function ContributorCard3D({ name, role, index }: ContributorCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
      style={{
        rotateX: isMounted ? rotateX : 0,
        rotateY: isMounted ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -15, scale: 1.05 }}
    >
      <Card className="p-8 bg-linear-gradient-to-br from-card to-secondary border-border text-center hover:border-primary/50 transition-all duration-300 relative overflow-hidden group h-full">
        {/* Animated gradient background */}
        {isMounted && (
          <motion.div
            className="absolute inset-0 bg-linear-gradient-to-br from-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        {/* Floating particles around avatar */}
        {isMounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/50"
            style={{
              left: "50%",
              top: "30%",
            }}
            animate={{
              x: [0, 40 * Math.cos((i * Math.PI) / 4)],
              y: [0, 40 * Math.sin((i * Math.PI) / 4)],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Avatar with 3D effect */}
        <motion.div
          className="relative mx-auto mb-6"
          style={{ transformStyle: "preserve-3d", transform: isMounted ? "translateZ(40px)" : "none" }}
        >
          <motion.div
            className="h-24 w-24 rounded-full bg-linear-gradient-to-br from-secondary to-card mx-auto flex items-center justify-center relative overflow-hidden border-2 border-primary/20"
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {/* Rotating gradient overlay */}
            {isMounted && (
              <motion.div
                className="absolute inset-0 bg-linear-gradient-to-br from-primary/30 via-transparent to-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            )}

            {/* Pulsing glow */}
            {isMounted && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            {/* User icon */}
            <svg className="h-12 w-12 text-muted-foreground relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>

            {/* Orbiting dot */}
            {isMounted && (
              <motion.div
                className="absolute h-2 w-2 rounded-full bg-primary"
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{
                  top: "10%",
                  left: "50%",
                  transformOrigin: "0 40px",
                }}
              />
            )}
          </motion.div>

          {/* Ring effect */}
          {isMounted && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>

        {/* Name with 3D effect */}
        <motion.h3
          className="font-bold text-lg mb-2 relative z-10 group-hover:text-primary transition-colors"
          style={{ transform: isMounted ? "translateZ(30px)" : "none" }}
        >
          {name}
        </motion.h3>

        {/* Role */}
        <motion.p className="text-sm text-muted-foreground relative z-10" style={{ transform: isMounted ? "translateZ(20px)" : "none" }}>
          {role}
        </motion.p>

        {/* Stats bar */}
        <motion.div className="mt-6 space-y-2 relative z-10" style={{ transform: isMounted ? "translateZ(25px)" : "none" }}>
          {[
            { label: "Commits", value: 85, color: "bg-primary" },
            { label: "PRs", value: 65, color: "bg-blue-500" },
          ].map((stat, i) => (
            <div key={i} className="text-left">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="font-semibold">{stat.value}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                {isMounted ? (
                  <motion.div
                    className={`h-full ${stat.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + i * 0.2 }}
                  />
                ) : (
                  <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.value}%` }} />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Shine effect on hover */}
        {isMounted && (
          <motion.div
            className="absolute inset-0 bg-linear-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{ transform: "translateZ(10px)" }}
          />
        )}
      </Card>
    </motion.div>
  )
}