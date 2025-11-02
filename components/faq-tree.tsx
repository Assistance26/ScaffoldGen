// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Card } from "@/components/ui/card"
// import { ChevronDown, HelpCircle, Sparkles, Zap } from "lucide-react"
// import { motion, AnimatePresence, useMotionValue } from "framer-motion"

// interface FAQItem {
//   q: string
//   a: string
//   position: { x: number; y: number }
//   angle: number
//   icon: "sparkles" | "zap" | "help"
// }

// const faqData: FAQItem[] = [
//   {
//     q: "What is the ScaffoldGen CLI Tool?",
//     a: "ScaffoldGen CLI is a powerful command-line interface tool designed to help developers streamline their workflow and boost productivity through automated scaffolding and code generation.",
//     position: { x: -45, y: -35 },
//     angle: -50,
//     icon: "help",
//   },
//   {
//     q: "How do I install the ScaffoldGen CLI Tool?",
//     a: "You can install ScaffoldGen CLI by downloading the latest release for your operating system from our downloads page and following the installation instructions.",
//     position: { x: 45, y: -35 },
//     angle: 50,
//     icon: "sparkles",
//   },
//   {
//     q: "What features does the ScaffoldGen CLI Tool have?",
//     a: "ScaffoldGen CLI offers multi-template support, interactive configuration, component generation, and an extensible post-processing pipeline to deliver production-ready code.",
//     position: { x: -50, y: 10 },
//     angle: -140,
//     icon: "zap",
//   },
//   {
//     q: "How do I contribute to the Scaffolding CLI tool?",
//     a: "We welcome contributions! Visit our GitHub repository to submit pull requests, report issues, or suggest new features.",
//     position: { x: 50, y: 10 },
//     angle: 140,
//     icon: "help",
//   },
//   {
//     q: "Is the ScaffoldGen CLI tool free to use?",
//     a: "Yes, ScaffoldGen CLI is completely free and open-source under the MIT license.",
//     position: { x: -40, y: 55 },
//     angle: -110,
//     icon: "sparkles",
//   },
//   {
//     q: "Where can I get support?",
//     a: "You can get support through our Discord community, GitHub discussions, or by contacting our support team directly.",
//     position: { x: 40, y: 55 },
//     angle: 110,
//     icon: "zap",
//   },
// ]

// export function FAQTree() {
//   const [openFaq, setOpenFaq] = useState<number | null>(null)
//   const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return
//     const rect = containerRef.current.getBoundingClientRect()
//     mouseX.set(e.clientX - rect.left - rect.width / 2)
//     mouseY.set(e.clientY - rect.top - rect.height / 2)
//   }

//   return (
//     <div
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="relative w-full min-h-[1400px] md:min-h-[1000px]"
//       style={{ perspective: "2500px" }}
//     >
//       <motion.div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
//         initial={{ scale: 0, rotate: -360, opacity: 0 }}
//         whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ type: "spring", stiffness: 80, delay: 0.2, duration: 1.2 }}
//       >
//         <motion.div
//           className="relative"
//           animate={{
//             rotateY: 360,
//             rotateZ: [0, 5, 0, -5, 0],
//           }}
//           transition={{
//             rotateY: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
//             rotateZ: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
//           }}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           {/* Main central sphere */}
//           <motion.div
//             className="h-40 w-40 rounded-full bg-gradient-to-br from-primary via-orange-500 to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/60 relative overflow-hidden"
//             whileHover={{ scale: 1.3, rotateZ: 180 }}
//             transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             {/* Multiple animated glows */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-primary opacity-60 blur-3xl"
//               animate={{
//                 scale: [1, 1.8, 1.3, 1],
//                 opacity: [0.6, 0.9, 0.7, 0.6],
//               }}
//               transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//             />
//             <motion.div
//               className="absolute inset-0 rounded-full bg-orange-400 opacity-40 blur-2xl"
//               animate={{
//                 scale: [1.3, 1, 1.5, 1.3],
//                 opacity: [0.4, 0.7, 0.5, 0.4],
//               }}
//               transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
//             />

//             {/* Rotating gradient overlays */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-tl from-primary/30 via-transparent to-transparent"
//               animate={{ rotate: -360 }}
//               transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />

//             {/* Icon with pulse */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 10, -10, 0],
//               }}
//               transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//             >
//               <HelpCircle className="h-20 w-20 text-primary-foreground relative z-10" strokeWidth={2.5} />
//             </motion.div>

//             {/* Orbiting particles - more complex pattern */}
//             {[...Array(12)].map((_, i) => {
//               const angle = (i * Math.PI * 2) / 12
//               const radius = 100
//               return (
//                 <motion.div
//                   key={i}
//                   className="absolute h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"
//                   style={{
//                     top: "50%",
//                     left: "50%",
//                     marginTop: "-6px",
//                     marginLeft: "-6px",
//                   }}
//                   animate={{
//                     x: [0, Math.cos(angle) * radius, 0],
//                     y: [0, Math.sin(angle) * radius, 0],
//                     scale: [1, 0.3, 1],
//                     opacity: [1, 0.2, 1],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Number.POSITIVE_INFINITY,
//                     delay: i * 0.15,
//                     ease: "easeInOut",
//                   }}
//                 />
//               )
//             })}

//             {/* Inner rotating ring */}
//             <motion.div
//               className="absolute inset-8 rounded-full border-4 border-white/30 border-dashed"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />
//           </motion.div>

//           {/* Pulsing rings with different speeds */}
//           {[...Array(4)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40"
//               initial={{ width: 160, height: 160, opacity: 0 }}
//               animate={{
//                 width: [160, 250 + i * 60, 160],
//                 height: [160, 250 + i * 60, 160],
//                 opacity: [0, 0.6, 0],
//                 borderWidth: [2, 4, 2],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 0.7,
//                 ease: "easeOut",
//               }}
//             />
//           ))}

//           {/* Energy waves */}
//           {[...Array(3)].map((_, i) => (
//             <motion.div
//               key={`wave-${i}`}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10"
//               initial={{ width: 160, height: 160, opacity: 0 }}
//               animate={{
//                 width: [160, 400, 160],
//                 height: [160, 400, 160],
//                 opacity: [0, 0.3, 0],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 1.5,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </motion.div>
//       </motion.div>

//       {faqData.map((faq, i) => {
//         const isOpen = openFaq === i
//         const isHovered = hoveredFaq === i
//         const branchLength = Math.sqrt(Math.pow(faq.position.x * 10, 2) + Math.pow(faq.position.y * 10, 2))

//         return (
//           <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             {/* Enhanced Branch Line */}
//             <motion.div
//               className="absolute top-0 left-0 origin-left"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1, delay: 0.6 + i * 0.15, type: "spring", stiffness: 50 }}
//               style={{
//                 width: branchLength,
//                 transform: `rotate(${faq.angle}deg)`,
//                 transformOrigin: "left center",
//               }}
//             >
//               <motion.div
//                 className="h-2 relative"
//                 animate={{
//                   opacity: isHovered || isOpen ? 1 : 0.6,
//                   height: isHovered || isOpen ? 8 : 4,
//                 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {/* Gradient branch */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary/30 rounded-full" />

//                 {/* Animated flow effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
//                   animate={{ x: ["-100%", "200%"] }}
//                   transition={{
//                     duration: 2.5,
//                     repeat: Number.POSITIVE_INFINITY,
//                     ease: "linear",
//                   }}
//                 />

//                 {/* Energy pulses along branch */}
//                 {[...Array(5)].map((_, particleIndex) => (
//                   <motion.div
//                     key={particleIndex}
//                     className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"
//                     animate={{
//                       left: ["0%", "100%"],
//                       scale: [0, 2, 0],
//                       opacity: [0, 1, 0],
//                     }}
//                     transition={{
//                       duration: 2.5,
//                       repeat: Number.POSITIVE_INFINITY,
//                       delay: particleIndex * 0.5,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 ))}

//                 {/* Glowing trail */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent blur-sm rounded-full"
//                   animate={{
//                     opacity: isHovered || isOpen ? [0.5, 1, 0.5] : 0.3,
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//               </motion.div>
//             </motion.div>

//             {/* Enhanced FAQ Card */}
//             <motion.div
//               className="absolute"
//               style={{
//                 left: `${faq.position.x * 10}px`,
//                 top: `${faq.position.y * 10}px`,
//                 transformStyle: "preserve-3d",
//               }}
//               initial={{ opacity: 0, scale: 0, rotateX: -90, z: -100 }}
//               whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 type: "spring",
//                 stiffness: 80,
//                 delay: 0.8 + i * 0.2,
//                 duration: 0.8,
//               }}
//               whileHover={{
//                 scale: 1.08,
//                 rotateY: 12,
//                 rotateX: 8,
//                 z: 80,
//                 transition: { duration: 0.4, type: "spring", stiffness: 200 },
//               }}
//               onHoverStart={() => setHoveredFaq(i)}
//               onHoverEnd={() => setHoveredFaq(null)}
//             >
//               <Card
//                 className="w-80 bg-gradient-to-br from-card via-secondary to-card border-2 cursor-pointer overflow-hidden relative group"
//                 onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                 style={{
//                   boxShadow:
//                     isOpen || isHovered
//                       ? "0 25px 80px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.3)"
//                       : "0 15px 40px rgba(0,0,0,0.4)",
//                   borderColor: isOpen || isHovered ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 107, 53, 0.3)",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 {/* Animated background gradients */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/20 to-orange-500/10"
//                   animate={{
//                     opacity: isOpen || isHovered ? 1 : 0,
//                     backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
//                   }}
//                   transition={{
//                     opacity: { duration: 0.4 },
//                     backgroundPosition: { duration: 5, repeat: Number.POSITIVE_INFINITY },
//                   }}
//                 />

//                 {/* Shimmer effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
//                   animate={{
//                     x: isHovered ? ["-100%", "200%"] : "-100%",
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
//                     ease: "easeInOut",
//                   }}
//                 />

//                 {/* Floating particles */}
//                 {(isOpen || isHovered) &&
//                   [...Array(8)].map((_, particleIndex) => (
//                     <motion.div
//                       key={particleIndex}
//                       className="absolute rounded-full bg-primary/60"
//                       style={{
//                         width: Math.random() * 4 + 2,
//                         height: Math.random() * 4 + 2,
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                       }}
//                       animate={{
//                         y: [-30, 30],
//                         x: [-15, 15],
//                         opacity: [0, 1, 0],
//                         scale: [0, 2, 0],
//                       }}
//                       transition={{
//                         duration: 2 + Math.random(),
//                         repeat: Number.POSITIVE_INFINITY,
//                         delay: particleIndex * 0.2,
//                       }}
//                     />
//                   ))}

//                 {/* Question Header */}
//                 <motion.div
//                   className="p-6 flex items-start justify-between gap-4 relative z-10"
//                   animate={{ x: isHovered ? 8 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="flex items-start gap-3 flex-1">
//                     {/* Icon */}
//                     <motion.div
//                       className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center"
//                       animate={{
//                         rotate: isHovered ? 360 : 0,
//                         scale: isHovered ? 1.1 : 1,
//                       }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {faq.icon === "sparkles" && <Sparkles className="h-5 w-5 text-primary" />}
//                       {faq.icon === "zap" && <Zap className="h-5 w-5 text-primary" />}
//                       {faq.icon === "help" && <HelpCircle className="h-5 w-5 text-primary" />}
//                     </motion.div>

//                     <h3 className="font-bold text-base leading-tight flex-1">{faq.q}</h3>
//                   </div>

//                   <motion.div
//                     animate={{ rotate: isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
//                     className="flex-shrink-0"
//                   >
//                     <ChevronDown className="h-6 w-6 text-primary" />
//                   </motion.div>
//                 </motion.div>

//                 {/* Answer Content */}
//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.4, ease: "easeInOut" }}
//                       className="overflow-hidden"
//                     >
//                       <motion.div
//                         initial={{ y: -20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: -20, opacity: 0 }}
//                         transition={{ duration: 0.3, delay: 0.1 }}
//                         className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed relative z-10"
//                       >
//                         {faq.a}
//                       </motion.div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Corner accents */}
//                 <motion.div
//                   className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent"
//                   style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
//                   animate={{ opacity: isHovered ? 1 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <motion.div
//                   className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-transparent"
//                   style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
//                   animate={{ opacity: isHovered ? 1 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 />

//                 {/* Border glow */}
//                 <motion.div
//                   className="absolute inset-0 rounded-lg"
//                   style={{
//                     background: "linear-gradient(45deg, transparent, rgba(255, 107, 53, 0.3), transparent)",
//                     opacity: 0,
//                   }}
//                   animate={{
//                     opacity: isHovered || isOpen ? [0, 0.5, 0] : 0,
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//               </Card>

//               {/* 3D shadow effect */}
//               <motion.div
//                 className="absolute inset-0 bg-black/30 blur-2xl -z-10 rounded-lg"
//                 animate={{
//                   scale: isHovered ? 1.15 : 1,
//                   opacity: isHovered ? 0.6 : 0.3,
//                 }}
//                 transition={{ duration: 0.4 }}
//                 style={{ transform: "translateZ(-30px)" }}
//               />
//             </motion.div>
//           </div>
//         )
//       })}

//       {[...Array(40)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full"
//           style={{
//             width: Math.random() * 3 + 1,
//             height: Math.random() * 3 + 1,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             background:
//               i % 3 === 0
//                 ? "rgba(255, 107, 53, 0.3)"
//                 : i % 3 === 1
//                   ? "rgba(255, 140, 90, 0.3)"
//                   : "rgba(255, 180, 120, 0.3)",
//           }}
//           animate={{
//             y: [0, -60, 0],
//             x: [0, Math.random() * 40 - 20, 0],
//             opacity: [0, 0.9, 0],
//             scale: [0, 2.5, 0],
//           }}
//           transition={{
//             duration: 5 + Math.random() * 4,
//             repeat: Number.POSITIVE_INFINITY,
//             delay: Math.random() * 6,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       <svg className="absolute inset-0 pointer-events-none opacity-20">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="rgba(255, 107, 53, 0.5)" />
//             <stop offset="100%" stopColor="rgba(255, 107, 53, 0)" />
//           </linearGradient>
//         </defs>
//         {faqData.map((_, i) => {
//           if (i < faqData.length - 1) {
//             return (
//               <motion.line
//                 key={i}
//                 x1="50%"
//                 y1="50%"
//                 x2={`${50 + faqData[i].position.x}%`}
//                 y2={`${50 + faqData[i].position.y}%`}
//                 stroke="url(#lineGradient)"
//                 strokeWidth="1"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 whileInView={{ pathLength: 1, opacity: 0.3 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
//               />
//             )
//           }
//           return null
//         })}
//       </svg>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, HelpCircle, Sparkles, Zap } from "lucide-react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"

interface FAQItem {
  q: string
  a: string
  position: { x: number; y: number }
  angle: number
  icon: "sparkles" | "zap" | "help"
}

const faqData: FAQItem[] = [
  {
    q: "What is the ScaffoldGen CLI Tool?",
    a: "ScaffoldGen CLI is a powerful command-line interface tool designed to help developers streamline their workflow and boost productivity through automated scaffolding and code generation.",
    position: { x: -45, y: -35 },
    angle: -50,
    icon: "help",
  },
  {
    q: "How do I install the ScaffoldGen CLI Tool?",
    a: "You can install ScaffoldGen CLI by downloading the latest release for your operating system from our downloads page and following the installation instructions.",
    position: { x: 45, y: -35 },
    angle: 50,
    icon: "sparkles",
  },
  {
    q: "What features does the ScaffoldGen CLI Tool have?",
    a: "ScaffoldGen CLI offers multi-template support, interactive configuration, component generation, and an extensible post-processing pipeline to deliver production-ready code.",
    position: { x: -50, y: 10 },
    angle: -140,
    icon: "zap",
  },
  {
    q: "How do I contribute to the Scaffolding CLI tool?",
    a: "We welcome contributions! Visit our GitHub repository to submit pull requests, report issues, or suggest new features.",
    position: { x: 50, y: 10 },
    angle: 140,
    icon: "help",
  },
  {
    q: "Is the ScaffoldGen CLI tool free to use?",
    a: "Yes, ScaffoldGen CLI is completely free and open-source under the MIT license.",
    position: { x: -40, y: 55 },
    angle: -110,
    icon: "sparkles",
  },
  {
    q: "Where can I get support?",
    a: "You can get support through our Discord community, GitHub discussions, or by contacting our support team directly.",
    position: { x: 40, y: 55 },
    angle: 110,
    icon: "zap",
  },
]

// Predefined particle positions to avoid hydration issues
const backgroundParticlePositions = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: (i * 2.5) % 100, // Deterministic positioning
  top: (i * 7) % 100, // Deterministic positioning
  size: (i % 3) + 1,
  colorIndex: i % 3,
  duration: 5 + (i % 4),
  delay: (i % 6),
  y: [0, -60 - (i % 20), 0],
  x: [0, (i % 40) - 20, 0],
}))

const floatingParticlePositions = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: (i * 12.5) % 100,
  top: (i * 15) % 100,
  size: (i % 4) + 2,
  duration: 2 + (i % 3),
  delay: i * 0.2,
}))

export function FAQTree() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[1400px] md:min-h-[1000px]"
      style={{ perspective: "2500px" }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, rotate: -360, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, delay: 0.2, duration: 1.2 }}
      >
        <motion.div
          className="relative"
          animate={{
            rotateY: 360,
            rotateZ: [0, 5, 0, -5, 0],
          }}
          transition={{
            rotateY: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            rotateZ: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main central sphere */}
          <motion.div
            className="h-40 w-40 rounded-full bg-gradient-to-br from-primary via-orange-500 to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/60 relative overflow-hidden"
            whileHover={{ scale: 1.3, rotateZ: 180 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Multiple animated glows */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-60 blur-3xl"
              animate={{
                scale: [1, 1.8, 1.3, 1],
                opacity: [0.6, 0.9, 0.7, 0.6],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-400 opacity-40 blur-2xl"
              animate={{
                scale: [1.3, 1, 1.5, 1.3],
                opacity: [0.4, 0.7, 0.5, 0.4],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />

            {/* Rotating gradient overlays */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tl from-primary/30 via-transparent to-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Icon with pulse */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <HelpCircle className="h-20 w-20 text-primary-foreground relative z-10" strokeWidth={2.5} />
            </motion.div>

            {/* Orbiting particles - deterministic pattern */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12
              const radius = 100
              return (
                <motion.div
                  key={i}
                  className="absolute h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-6px",
                    marginLeft: "-6px",
                  }}
                  animate={{
                    x: [0, Math.cos(angle) * radius, 0],
                    y: [0, Math.sin(angle) * radius, 0],
                    scale: [1, 0.3, 1],
                    opacity: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              )
            })}

            {/* Inner rotating ring */}
            <motion.div
              className="absolute inset-8 rounded-full border-4 border-white/30 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          {/* Pulsing rings with different speeds */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40"
              initial={{ width: 160, height: 160, opacity: 0 }}
              animate={{
                width: [160, 250 + i * 60, 160],
                height: [160, 250 + i * 60, 160],
                opacity: [0, 0.6, 0],
                borderWidth: [2, 4, 2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.7,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Energy waves */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10"
              initial={{ width: 160, height: 160, opacity: 0 }}
              animate={{
                width: [160, 400, 160],
                height: [160, 400, 160],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {faqData.map((faq, i) => {
        const isOpen = openFaq === i
        const isHovered = hoveredFaq === i
        const branchLength = Math.sqrt(Math.pow(faq.position.x * 10, 2) + Math.pow(faq.position.y * 10, 2))

        return (
          <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Enhanced Branch Line */}
            <motion.div
              className="absolute top-0 left-0 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 + i * 0.15, type: "spring", stiffness: 50 }}
              style={{
                width: branchLength,
                transform: `rotate(${faq.angle}deg)`,
                transformOrigin: "left center",
              }}
            >
              <motion.div
                className="h-2 relative"
                animate={{
                  opacity: isHovered || isOpen ? 1 : 0.6,
                  height: isHovered || isOpen ? 8 : 4,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Gradient branch */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary/30 rounded-full" />

                {/* Animated flow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                {/* Energy pulses along branch */}
                {[...Array(5)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"
                    animate={{
                      left: ["0%", "100%"],
                      scale: [0, 2, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: particleIndex * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Glowing trail */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent blur-sm rounded-full"
                  animate={{
                    opacity: isHovered || isOpen ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced FAQ Card */}
            <motion.div
              className="absolute"
              style={{
                left: `${faq.position.x * 10}px`,
                top: `${faq.position.y * 10}px`,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0, rotateX: -90, z: -100 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                delay: 0.8 + i * 0.2,
                duration: 0.8,
              }}
              whileHover={{
                scale: 1.08,
                rotateY: 12,
                rotateX: 8,
                z: 80,
                transition: { duration: 0.4, type: "spring", stiffness: 200 },
              }}
              onHoverStart={() => setHoveredFaq(i)}
              onHoverEnd={() => setHoveredFaq(null)}
            >
              <Card
                className="w-80 bg-gradient-to-br from-card via-secondary to-card border-2 cursor-pointer overflow-hidden relative group"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  boxShadow:
                    isOpen || isHovered
                      ? "0 25px 80px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.3)"
                      : "0 15px 40px rgba(0,0,0,0.4)",
                  borderColor: isOpen || isHovered ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 107, 53, 0.3)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated background gradients */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/20 to-orange-500/10"
                  animate={{
                    opacity: isOpen || isHovered ? 1 : 0,
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    opacity: { duration: 0.4 },
                    backgroundPosition: { duration: 5, repeat: Number.POSITIVE_INFINITY },
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: isHovered ? ["-100%", "200%"] : "-100%",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating particles - deterministic positions */}
                {(isOpen || isHovered) && isClient && floatingParticlePositions.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/60"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    animate={{
                      y: [-30, 30],
                      x: [-15, 15],
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0],
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: particle.delay,
                    }}
                  />
                ))}

                {/* Question Header */}
                <motion.div
                  className="p-6 flex items-start justify-between gap-4 relative z-10"
                  animate={{ x: isHovered ? 8 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3 flex-1">
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center"
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {faq.icon === "sparkles" && <Sparkles className="h-5 w-5 text-primary" />}
                      {faq.icon === "zap" && <Zap className="h-5 w-5 text-primary" />}
                      {faq.icon === "help" && <HelpCircle className="h-5 w-5 text-primary" />}
                    </motion.div>

                    <h3 className="font-bold text-base leading-tight flex-1">{faq.q}</h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-6 w-6 text-primary" />
                  </motion.div>
                </motion.div>

                {/* Answer Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed relative z-10"
                      >
                        {faq.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Corner accents */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-transparent"
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Border glow */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255, 107, 53, 0.3), transparent)",
                    opacity: 0,
                  }}
                  animate={{
                    opacity: isHovered || isOpen ? [0, 0.5, 0] : 0,
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </Card>

              {/* 3D shadow effect */}
              <motion.div
                className="absolute inset-0 bg-black/30 blur-2xl -z-10 rounded-lg"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  opacity: isHovered ? 0.6 : 0.3,
                }}
                transition={{ duration: 0.4 }}
                style={{ transform: "translateZ(-30px)" }}
              />
            </motion.div>
          </div>
        )
      })}

      {/* Background particles - deterministic positions */}
      {backgroundParticlePositions.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background:
              particle.colorIndex === 0
                ? "rgba(255, 107, 53, 0.3)"
                : particle.colorIndex === 1
                  ? "rgba(255, 140, 90, 0.3)"
                  : "rgba(255, 180, 120, 0.3)",
          }}
          animate={{
            y: particle.y,
            x: particle.x,
            opacity: [0, 0.9, 0],
            scale: [0, 2.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <svg className="absolute inset-0 pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0)" />
          </linearGradient>
        </defs>
        {faqData.map((_, i) => {
          if (i < faqData.length - 1) {
            return (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + faqData[i].position.x}%`}
                y2={`${50 + faqData[i].position.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
              />
            )
          }
          return null
        })}
      </svg>
    </div>
  )
}