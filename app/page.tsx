// "use client"

// import { useState, useEffect, useRef, Suspense, lazy } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { ChevronDown, Search, Github, Linkedin, MessageSquare, Quote } from "lucide-react"
// import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion"
// import { Canvas, useFrame } from "@react-three/fiber"
// import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei"
// import type * as THREE from "three"
// import Image from "next/image"

// const ParticleField = lazy(() => import("@/components/particle-field").then((mod) => ({ default: mod.ParticleField })))
// const InteractiveParticles = lazy(() =>
//   import("@/components/interactive-particles").then((mod) => ({ default: mod.InteractiveParticles })),
// )
// const FloatingShapes = lazy(() =>
//   import("@/components/floating-shapes").then((mod) => ({ default: mod.FloatingShapes })),
// )
// const OrganizationCard3D = lazy(() =>
//   import("@/components/organization-card-3d").then((mod) => ({ default: mod.OrganizationCard3D })),
// )
// const ContributorCard3D = lazy(() =>
//   import("@/components/contributor-card-3d").then((mod) => ({ default: mod.ContributorCard3D })),
// )
// const FAQTree = lazy(() => import("@/components/faq-tree").then((mod) => ({ default: mod.FAQTree })))

// function LoadingFallback() {
//   return (
//     <div className="flex items-center justify-center p-8">
//       <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//     </div>
//   )
// }

// function AnimatedSphere() {
//   const meshRef = useRef<THREE.Mesh>(null)

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
//       meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
//     }
//   })

//   return (
//     <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//       <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
//         <MeshDistortMaterial
//           color="#FF6B35"
//           attach="material"
//           distort={0.6}
//           speed={3}
//           roughness={0.1}
//           metalness={0.9}
//           emissive="#FF6B35"
//           emissiveIntensity={0.5}
//         />
//       </Sphere>
//       {/* Outer glow sphere */}
//       <Sphere args={[1, 32, 32]} scale={3}>
//         <meshBasicMaterial color="#FF6B35" transparent opacity={0.1} />
//       </Sphere>
//     </Float>
//   )
// }

// function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
//   const [count, setCount] = useState(0)
//   const ref = useRef<HTMLSpanElement>(null)
//   const isInView = useInView(ref, { once: true })

//   useEffect(() => {
//     if (!isInView) return

//     let startTime: number | null = null
//     const animate = (currentTime: number) => {
//       if (!startTime) startTime = currentTime
//       const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

//       setCount(Math.floor(progress * end))

//       if (progress < 1) {
//         requestAnimationFrame(animate)
//       }
//     }

//     requestAnimationFrame(animate)
//   }, [end, duration, isInView])

//   return <span ref={ref}>{count}</span>
// }

// export default function Home() {
//   const [openFaq, setOpenFaq] = useState<number | null>(null)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth) * 100
//       const y = (e.clientY / window.innerHeight) * 100
//       setMousePosition({ x, y })
//       mouseX.set(e.clientX)
//       mouseY.set(e.clientY)
//     }

//     window.addEventListener("mousemove", handleMouseMove, { passive: true })
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [mouseX, mouseY])

//   const { scrollYProgress } = useScroll()
//   const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
//   const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0])

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
//   const scaleSpring = useSpring(scaleProgress, springConfig)

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       <div
//         className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-300 will-change-transform"
//         style={{
//           background: `
//             radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 107, 53, 0.2) 0%, transparent 40%),
//             radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(255, 140, 90, 0.15) 0%, transparent 50%)
//           `,
//         }}
//       />

//       <div className="fixed inset-0 opacity-10 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: "50px 50px",
//             animation: "grid-move 20s linear infinite",
//           }}
//         />
//       </div>

//       {/* Header */}
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 100 }}
//         className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/80 backdrop-blur-md"
//       >
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <motion.div
//               className="flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               <Image
//                 src="/images/scaffoldgen-logo.png"
//                 alt="ScaffoldGen CLI"
//                 width={160}
//                 height={40}
//                 className="h-10 w-auto"
//                 priority
//               />
//             </motion.div>

//             <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
//               {["Downloads", "Releases"].map((item, i) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="text-sm text-foreground/80 hover:text-foreground transition-colors relative"
//                   whileHover={{ scale: 1.05 }}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   aria-label={`Navigate to ${item}`}
//                 >
//                   {item}
//                   <motion.div
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
//                     initial={{ scaleX: 0 }}
//                     whileHover={{ scaleX: 1 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                 </motion.a>
//               ))}
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="search"
//                   placeholder="Search..."
//                   aria-label="Search documentation"
//                   className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 transition-all focus:w-64"
//                 />
//               </div>
//               {["Docs", "Snippet Manager"].map((item, i) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(" ", "-")}`}
//                   className="text-sm text-foreground/80 hover:text-foreground transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: (i + 2) * 0.1 }}
//                   aria-label={`Navigate to ${item}`}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </motion.header>

//       {/* Hero Section */}
//       <section className="relative pt-24 pb-12 overflow-hidden min-h-screen flex items-center" id="hero">
//         <div className="absolute inset-0 z-0">
//           <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />}>
//             <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
//               <ambientLight intensity={0.3} />
//               <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF6B35" />
//               <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF8C5A" />
//               <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#FF6B35" />

//               <AnimatedSphere />
//               <Suspense fallback={null}>
//                 <ParticleField />
//                 <InteractiveParticles mousePosition={mousePosition} />
//                 <FloatingShapes />
//               </Suspense>
//               <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

//               <Environment preset="night" />
//               <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
//             </Canvas>
//           </Suspense>
//         </div>

//         {/* Hero Content - properly centered */}
//         <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
//           <motion.div
//             className="text-center max-w-4xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Title with character animation */}
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance leading-tight"
//             >
//               <motion.span
//                 className="text-primary inline-block"
//                 animate={{
//                   textShadow: [
//                     "0 0 20px rgba(255, 107, 53, 0.5)",
//                     "0 0 40px rgba(255, 107, 53, 0.8)",
//                     "0 0 60px rgba(255, 107, 53, 0.6)",
//                     "0 0 40px rgba(255, 107, 53, 0.8)",
//                     "0 0 20px rgba(255, 107, 53, 0.5)",
//                   ],
//                 }}
//                 transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 {"ScaffoldGen".split("").map((char, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
//                     className="inline-block"
//                     whileHover={{ scale: 1.2, color: "#FF8C5A" }}
//                   >
//                     {char}
//                   </motion.span>
//                 ))}
//               </motion.span>
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.8 }}
//               className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed"
//             >
//               A powerful command-line interface tool for developers, designed to streamline your workflow and boost your
//               productivity
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg relative overflow-hidden group shadow-lg shadow-primary/50"
//                   aria-label="Download ScaffoldGen for Linux"
//                 >
//                   <span className="relative z-10">Download for Linux</span>
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0"
//                     animate={{ x: ["-200%", "200%"] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   />
//                 </Button>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-transparent border-2"
//                   aria-label="Download ScaffoldGen for Windows"
//                 >
//                   Download for Windows
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           aria-hidden="true"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//             className="flex flex-col items-center gap-2"
//           >
//             <span className="text-xs text-muted-foreground">Scroll to explore</span>
//             <ChevronDown className="h-5 w-5 text-primary" />
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* About Section */}
//       <section className="py-20" id="about">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-4xl font-bold mb-6">About ScaffoldGen CLI</h2>
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 Our CLI tool is a powerful and versatile command-line interface that helps developers streamline their
//                 workflow and boost their productivity. With a wide range of features and customization options, it's the
//                 perfect tool for any developer looking to optimize their development process.
//               </p>
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
//                   Learn More
//                 </Button>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <Card className="p-8 bg-gradient-to-br from-secondary to-card border-border hover:border-primary/50 transition-all relative overflow-hidden group">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent h-20"
//                   animate={{ y: ["-100%", "300%"] }}
//                   transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                 />
//                 <div className="flex items-center gap-2 mb-4 relative z-10">
//                   <motion.div
//                     className="h-3 w-3 rounded-full bg-red-500"
//                     animate={{ opacity: [1, 0.5, 1] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                   ></motion.div>
//                   <motion.div
//                     className="h-3 w-3 rounded-full bg-yellow-500"
//                     animate={{ opacity: [1, 0.5, 1] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
//                   ></motion.div>
//                   <motion.div
//                     className="h-3 w-3 rounded-full bg-green-500"
//                     animate={{ opacity: [1, 0.5, 1] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
//                   ></motion.div>
//                   <span className="ml-auto text-xs text-muted-foreground">scaffoldgen</span>
//                 </div>
//                 <div className="bg-background/50 rounded-lg p-6 font-mono text-sm space-y-2 relative z-10">
//                   {[
//                     { text: "→ cd web_development", color: "text-green-400", delay: 0 },
//                     {
//                       text: "→ scaffoldgen new **my-awesome-app** --template next",
//                       color: "text-blue-400",
//                       delay: 0.5,
//                     },
//                     {
//                       text: "→ scaffoldgen generate **component** UserProfile --t",
//                       color: "text-purple-400",
//                       delay: 1,
//                     },
//                     {
//                       text: "→ scaffoldgen create **route** auth --handler **login",
//                       color: "text-yellow-400",
//                       delay: 1.5,
//                     },
//                     { text: "→ scaffoldgen config set **default-lang** python", color: "text-pink-400", delay: 2 },
//                   ].map((line, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.3, delay: line.delay }}
//                       className={line.color}
//                       whileHover={{ x: 5, scale: 1.02 }}
//                     >
//                       {line.text}
//                       <motion.span
//                         className="inline-block w-2 h-4 bg-current ml-1"
//                         animate={{ opacity: [1, 0] }}
//                         transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Latest Download & Release Section */}
//       <section className="py-20 bg-linear-gradient-to-b from-background to-secondary/30" id="downloads">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//             {[
//               {
//                 title: "Latest Download",
//                 desc: "The latest version of our CLI tool is now available for download on Linux. Get the latest features and improvements by downloading the latest release.",
//                 btn: "Download for Linux",
//                 delay: 0,
//               },
//               {
//                 title: "Latest Release",
//                 desc: "Check out the latest release of our CLI tool, packed with new features and improvements. See what's new and get the latest version.",
//                 btn: "View Latest Release",
//                 delay: 0.2,
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: item.delay }}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
//                 <p className="text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 relative overflow-hidden group">
//                     <span className="relative z-10">{item.btn}</span>
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                       initial={{ x: "-100%" }}
//                       whileHover={{ x: "100%" }}
//                       transition={{ duration: 0.5 }}
//                     />
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 relative overflow-hidden" id="features">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             whileInView={{ scale: 1, rotate: 0 }}
//             viewport={{ once: true }}
//             transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                 whileHover={{ scale: 1.2 }}
//                 className="h-24 w-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/50 relative"
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <motion.div
//                   className="absolute inset-0 rounded-2xl bg-primary opacity-50 blur-xl"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//                 <svg
//                   className="h-12 w-12 text-primary-foreground relative z-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6 2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
//                   />
//                 </svg>
//               </motion.div>
//               {[0, 90, 180, 270].map((angle) => (
//                 <motion.div
//                   key={angle}
//                   className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-primary/50 to-transparent origin-left"
//                   style={{ rotate: angle }}
//                   initial={{ scaleX: 0 }}
//                   whileInView={{ scaleX: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8, delay: 0.4 + angle * 0.001 }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Feature Cards */}
//           {[
//             {
//               icon: "code",
//               title: "Multi-Template & Multi-Language Support",
//               desc: "Enables developers to work across different technology stacks with a unified command interface.",
//               color: "primary",
//               delay: 0,
//             },
//             {
//               icon: "bulb",
//               title: "Interactive Configuration & Prompting",
//               desc: "Provides a user-friendly experience and minimizes errors from manual configuration.",
//               color: "blue",
//               delay: 0.1,
//             },
//             {
//               icon: "module",
//               title: "Component & Module Generation",
//               desc: "Significantly speeds up repetitive coding tasks and enforces best practices.",
//               color: "red",
//               delay: 0.2,
//             },
//             {
//               icon: "lightning",
//               title: "Extensible Post-Processing Pipeline",
//               desc: "Delivers a fully functional, ready-to-code project immediately after generation.",
//               color: "yellow",
//               delay: 0.3,
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: feature.delay }}
//               whileHover={{ y: -10, rotateX: 5, transition: { duration: 0.2 } }}
//               style={{ transformStyle: "preserve-3d" }}
//               className={i < 2 ? "md:translate-y-[-80px]" : "md:translate-y-[80px]"}
//             >
//               <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border hover:border-primary/50 transition-all duration-300 h-full group relative overflow-hidden">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500"
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                 />
//                 <motion.div
//                   whileHover={{ rotate: 360, scale: 1.1 }}
//                   transition={{ duration: 0.5 }}
//                   className={`h-14 w-14 rounded-xl ${
//                     feature.color === "primary"
//                       ? "bg-primary/20"
//                       : feature.color === "blue"
//                         ? "bg-blue-500/20"
//                         : feature.color === "red"
//                           ? "bg-red-500/20"
//                           : "bg-yellow-500/20"
//                   } flex items-center justify-center mb-4 relative z-10`}
//                 >
//                   {feature.icon === "code" && (
//                     <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
//                       />
//                     </svg>
//                   )}
//                   {feature.icon === "bulb" && (
//                     <svg className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                       />
//                     </svg>
//                   )}
//                   {feature.icon === "module" && (
//                     <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v2a1 1 0 01-2 0V5zM4 13a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1zm6-8a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm6 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
//                       />
//                     </svg>
//                   )}
//                   {feature.icon === "lightning" && (
//                     <svg className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                   )}
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.desc}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 relative overflow-hidden" id="testimonials">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <p className="text-sm text-primary mb-2">What Developers Say</p>
//             <h2 className="text-4xl md:text-5xl font-bold">Loved by Developers Worldwide</h2>
//           </motion.div>

//           <div className="relative max-w-7xl mx-auto" style={{ perspective: "2000px" }}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   name: "Sarah Chen",
//                   role: "Senior Full-Stack Developer",
//                   company: "TechCorp",
//                   avatar: "SC",
//                   quote:
//                     "ScaffoldGen has completely transformed my development workflow. What used to take hours now takes minutes. The multi-template support is a game-changer!",
//                   rating: 5,
//                   delay: 0,
//                 },
//                 {
//                   name: "Marcus Rodriguez",
//                   role: "Lead Software Engineer",
//                   company: "StartupHub",
//                   avatar: "MR",
//                   quote:
//                     "The best CLI tool I've ever used. The interactive prompts make configuration a breeze, and the code generation is spot-on every single time.",
//                   rating: 5,
//                   delay: 0.2,
//                 },
//                 {
//                   name: "Emily Watson",
//                   role: "DevOps Engineer",
//                   company: "CloudScale",
//                   avatar: "EW",
//                   quote:
//                     "I've recommended ScaffoldGen to my entire team. The extensible pipeline and best practices enforcement have improved our code quality significantly.",
//                   rating: 5,
//                   delay: 0.4,
//                 },
//               ].map((testimonial, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 50, rotateX: -20 }}
//                   whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: testimonial.delay, type: "spring" }}
//                   whileHover={{
//                     y: -15,
//                     rotateX: 5,
//                     rotateY: 5,
//                     scale: 1.02,
//                     transition: { duration: 0.3 },
//                   }}
//                   style={{ transformStyle: "preserve-3d" }}
//                 >
//                   <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden group">
//                     {/* Animated background gradient */}
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                       animate={{
//                         backgroundPosition: ["0% 0%", "100% 100%"],
//                       }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
//                     />

//                     {/* Quote icon */}
//                     <motion.div
//                       className="absolute top-4 right-4 opacity-10"
//                       animate={{ rotate: [0, 10, 0] }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Quote className="h-16 w-16 text-primary" />
//                     </motion.div>

//                     {/* Avatar and info */}
//                     <div className="flex items-center gap-4 mb-6 relative z-10">
//                       <motion.div
//                         className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-xl relative overflow-hidden"
//                         whileHover={{ scale: 1.1, rotate: 360 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         <motion.div
//                           className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         <span className="relative z-10">{testimonial.avatar}</span>
//                       </motion.div>
//                       <div>
//                         <h4 className="font-bold text-lg">{testimonial.name}</h4>
//                         <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                         <p className="text-xs text-primary">{testimonial.company}</p>
//                       </div>
//                     </div>

//                     {/* Quote text */}
//                     <p className="text-muted-foreground leading-relaxed mb-6 relative z-10 italic">
//                       "{testimonial.quote}"
//                     </p>

//                     {/* Star rating */}
//                     <div className="flex gap-1 relative z-10">
//                       {[...Array(testimonial.rating)].map((_, starIndex) => (
//                         <motion.div
//                           key={starIndex}
//                           initial={{ opacity: 0, scale: 0 }}
//                           whileInView={{ opacity: 1, scale: 1 }}
//                           viewport={{ once: true }}
//                           transition={{ delay: testimonial.delay + 0.6 + starIndex * 0.1 }}
//                           whileHover={{ scale: 1.3, rotate: 360 }}
//                         >
//                           <svg
//                             className="h-5 w-5 text-primary fill-current"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </motion.div>
//                       ))}
//                     </div>

//                     {/* Floating particles effect */}
//                     <motion.div
//                       className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-primary/50"
//                       animate={{
//                         y: [-10, 10, -10],
//                         x: [-5, 5, -5],
//                         scale: [1, 1.5, 1],
//                         opacity: [0.5, 1, 0.5],
//                       }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                     />
//                     <motion.div
//                       className="absolute top-1/2 left-4 h-1.5 w-1.5 rounded-full bg-primary/30"
//                       animate={{
//                         y: [10, -10, 10],
//                         x: [5, -5, 5],
//                         scale: [1, 1.3, 1],
//                         opacity: [0.3, 0.8, 0.3],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
//                     />
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Decorative 3D elements */}
//           <motion.div
//             className="absolute top-20 left-10 h-20 w-20 rounded-full bg-primary/10 blur-2xl"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0.3, 0.6, 0.3],
//             }}
//             transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//           />
//           <motion.div
//             className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
//             animate={{
//               scale: [1.5, 1, 1.5],
//               opacity: [0.2, 0.5, 0.2],
//             }}
//             transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//           />
//         </div>
//       </section>

//       {/* Major Contributors Section */}
//       <section
//         className="py-32 bg-gradient-to-b from-secondary/20 via-background to-secondary/30 relative overflow-hidden"
//         id="contributors"
//       >
//         {/* Animated background elements */}
//         <motion.div
//           className="absolute top-10 left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
//           animate={{
//             scale: [1, 1.4, 1],
//             opacity: [0.2, 0.4, 0.2],
//             x: [0, 30, 0],
//             y: [0, 50, 0],
//           }}
//           transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
//         />
//         <motion.div
//           className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.3, 0.5, 0.3],
//             x: [0, -40, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//         />

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <motion.p
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="text-sm text-primary mb-3 font-semibold tracking-wider uppercase"
//             >
//               Our Team
//             </motion.p>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
//             >
//               Major Contributors
//             </motion.h2>
//           </motion.div>

//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
//             style={{ perspective: "2000px" }}
//           >
//             <Suspense fallback={<LoadingFallback />}>
//               {[
//                 { name: "Alex Johnson", role: "Core Contributor" },
//                 { name: "Sarah Martinez", role: "Core Contributor" },
//                 { name: "Michael Chen", role: "Core Contributor" },
//                 { name: "Emily Davis", role: "Core Contributor" },
//               ].map((contributor, i) => (
//                 <ContributorCard3D key={i} name={contributor.name} role={contributor.role} index={i} />
//               ))}
//             </Suspense>
//           </div>

//           {/* Floating decorative elements */}
//           {[...Array(12)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute h-2 w-2 rounded-full bg-primary/20"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -40, 0],
//                 x: [0, Math.random() * 30 - 15, 0],
//                 opacity: [0, 0.8, 0],
//                 scale: [0, 2, 0],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: Math.random() * 3,
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Organizations Section */}
//       <section
//         className="py-32 bg-gradient-to-b from-secondary/20 via-background to-secondary/30 relative overflow-hidden"
//         id="organizations"
//       >
//         {/* Animated grid background */}
//         <div className="absolute inset-0 opacity-5">
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(255, 107, 53, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(255, 107, 53, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: "60px 60px",
//             }}
//             animate={{
//               backgroundPosition: ["0px 0px", "60px 60px"],
//             }}
//             transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//         </div>

//         {/* Floating orbs */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
//         />

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl mx-auto" style={{ perspective: "2000px" }}>
//             <Suspense fallback={<LoadingFallback />}>
//               <OrganizationCard3D />
//             </Suspense>
//           </div>

//           {/* Decorative floating particles */}
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute h-1.5 w-1.5 rounded-full bg-primary/30"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -50, 0],
//                 x: [0, Math.random() * 40 - 20, 0],
//                 opacity: [0, 1, 0],
//                 scale: [0, 2, 0],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: Math.random() * 4,
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section
//         className="py-32 bg-gradient-to-b from-secondary/30 via-background to-secondary/20 relative overflow-hidden"
//         id="faq"
//       >
//         {/* Animated background */}
//         <div className="absolute inset-0 opacity-5">
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(255, 107, 53, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(255, 107, 53, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: "80px 80px",
//             }}
//             animate={{
//               backgroundPosition: ["0px 0px", "80px 80px"],
//             }}
//             transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//         </div>

//         {/* Glowing orbs */}
//         <motion.div
//           className="absolute top-20 left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
//           animate={{
//             scale: [1, 1.4, 1],
//             opacity: [0.2, 0.5, 0.2],
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
//           animate={{
//             scale: [1.3, 1, 1.3],
//             opacity: [0.3, 0.6, 0.3],
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
//         />

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <motion.p
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="text-sm text-primary mb-3 font-semibold tracking-wider uppercase"
//             >
//               Got Questions?
//             </motion.p>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
//             >
//               Frequently Asked Questions
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="text-muted-foreground mt-4 max-w-2xl mx-auto"
//             >
//               Explore our knowledge tree to find answers to common questions about ScaffoldGen CLI
//             </motion.p>
//           </motion.div>

//           <Suspense fallback={<LoadingFallback />}>
//             <FAQTree />
//           </Suspense>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl font-bold text-center mb-12"
//           >
//             FAQ
//           </motion.h2>
//           <div className="max-w-4xl mx-auto space-y-4">
//             {[
//               {
//                 q: "What is the ScaffoldGen CLI Tool?",
//                 a: "ScaffoldGen CLI is a powerful command-line interface tool designed to help developers streamline their workflow and boost productivity through automated scaffolding and code generation.",
//               },
//               {
//                 q: "How do I install the ScaffoldGen CLI Tool?",
//                 a: "You can install ScaffoldGen CLI by downloading the latest release for your operating system from our downloads page and following the installation instructions.",
//               },
//               {
//                 q: "What features does the ScaffoldGen CLI Tool have?",
//                 a: "ScaffoldGen CLI offers multi-template support, interactive configuration, component generation, and an extensible post-processing pipeline to deliver production-ready code.",
//               },
//               {
//                 q: "How do I contribute to the Scaffolding CLI tool?",
//                 a: "We welcome contributions! Visit our GitHub repository to submit pull requests, report issues, or suggest new features.",
//               },
//               {
//                 q: "Is the ScaffoldGen CLI tool free to use?",
//                 a: "Yes, ScaffoldGen CLI is completely free and open-source under the MIT license.",
//               },
//               {
//                 q: "Where can I get support?",
//                 a: "You can get support through our Discord community, GitHub discussions, or by contacting our support team directly.",
//               },
//             ].map((faq, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: i * 0.1 }}
//               >
//                 <Card
//                   className="bg-gradient-to-br from-card to-secondary border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 relative group"
//                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                 >
//                   <motion.div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
//                   <motion.div className="p-6 flex items-center justify-between relative z-10" whileHover={{ x: 5 }}>
//                     <h3 className="font-semibold">{faq.q}</h3>
//                     <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                       <ChevronDown className="h-5 w-5 text-primary" />
//                     </motion.div>
//                   </motion.div>
//                   <motion.div
//                     initial={false}
//                     animate={{ height: openFaq === i ? "auto" : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="overflow-hidden"
//                   >
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: openFaq === i ? 1 : 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="px-6 pb-6 text-muted-foreground relative z-10"
//                     >
//                       {faq.a}
//                     </motion.div>
//                   </motion.div>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <motion.footer
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="border-t border-primary/20 py-12 bg-secondary/30"
//         role="contentinfo"
//       >
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
//             <div>
//               <div className="flex items-center gap-2 mb-6">
//                 <motion.div
//                   className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <span className="text-background font-bold text-lg">S</span>
//                 </motion.div>
//                 <span className="text-xl font-bold">ScaffoldGen</span>
//               </div>
//               <p className="text-sm text-muted-foreground">© 2025 ScaffoldGenCLI All rights reserved.</p>
//             </div>

//             <div>
//               <h3 className="font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 {["Downloads", "Releases", "Documentation", "Support"].map((item) => (
//                   <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
//                     <a href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors inline-block">
//                       {item}
//                     </a>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold mb-4">Connect with Us</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 {[
//                   { icon: Linkedin, label: "LinkedIn" },
//                   { icon: Github, label: "GitHub" },
//                   { icon: MessageSquare, label: "Discord" },
//                 ].map((item) => (
//                   <motion.li
//                     key={item.label}
//                     className="flex items-center gap-2"
//                     whileHover={{ x: 5 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
//                       <item.icon className="h-4 w-4" aria-hidden="true" />
//                     </motion.div>
//                     <a href="#" className="hover:text-foreground transition-colors">
//                       {item.label}
//                     </a>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </motion.footer>
//     </div>
//   )
// }




"use client"

import { useState, useEffect, useRef, Suspense, lazy } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, Search, Github, Linkedin, MessageSquare, Quote } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei"
import type * as THREE from "three"
import Image from "next/image"

const ParticleField = lazy(() => import("@/components/particle-field").then((mod) => ({ default: mod.ParticleField })))
const InteractiveParticles = lazy(() =>
  import("@/components/interactive-particles").then((mod) => ({ default: mod.InteractiveParticles })),
)
const FloatingShapes = lazy(() =>
  import("@/components/floating-shapes").then((mod) => ({ default: mod.FloatingShapes })),
)
const OrganizationCard3D = lazy(() =>
  import("@/components/organization-card-3d").then((mod) => ({ default: mod.OrganizationCard3D })),
)
const ContributorCard3D = lazy(() =>
  import("@/components/contributor-card-3d").then((mod) => ({ default: mod.ContributorCard3D })),
)
const FAQTree = lazy(() => import("@/components/faq-tree").then((mod) => ({ default: mod.FAQTree })))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#FF6B35"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#FF6B35"
          emissiveIntensity={0.5}
        />
      </Sphere>
      {/* Outer glow sphere */}
      <Sphere args={[1, 32, 32]} scale={3}>
        <meshBasicMaterial color="#FF6B35" transparent opacity={0.1} />
      </Sphere>
    </Float>
  )
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

// Predefined particle positions to avoid hydration issues
const backgroundParticlePositions = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: (i * 8.33) % 100,
  top: (i * 15) % 100,
  y: [0, -40 - (i % 20), 0],
  x: [0, (i % 30) - 15, 0],
  duration: 3 + (i % 2),
  delay: (i % 3),
}))

const organizationParticlePositions = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 5) % 100,
  top: (i * 7) % 100,
  y: [0, -50, 0],
  x: [0, (i % 40) - 20, 0],
  duration: 4 + (i % 3),
  delay: (i % 4),
}))

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const scaleSpring = useSpring(scaleProgress, springConfig)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-300 will-change-transform"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 107, 53, 0.2) 0%, transparent 40%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(255, 140, 90, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/images/scaffoldgen-logo.png"
                alt="ScaffoldGen CLI"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>

            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {["Downloads", "Releases"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors relative"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  aria-label={`Navigate to ${item}`}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search..."
                  aria-label="Search documentation"
                  className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 transition-all focus:w-64"
                />
              </div>
              {["Docs", "Snippet Manager"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 2) * 0.1 }}
                  aria-label={`Navigate to ${item}`}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden min-h-screen flex items-center" id="hero">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="absolute inset-0 bg-linear-gradient-to-b from-background to-secondary/30" />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF6B35" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF8C5A" />
              <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#FF6B35" />

              <AnimatedSphere />
              <Suspense fallback={null}>
                <ParticleField />
                <InteractiveParticles mousePosition={mousePosition} />
                <FloatingShapes />
              </Suspense>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </Suspense>
        </div>

        {/* Hero Content - properly centered */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title with character animation */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance leading-tight"
            >
              <motion.span
                className="text-primary inline-block"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 107, 53, 0.5)",
                    "0 0 40px rgba(255, 107, 53, 0.8)",
                    "0 0 60px rgba(255, 107, 53, 0.6)",
                    "0 0 40px rgba(255, 107, 53, 0.8)",
                    "0 0 20px rgba(255, 107, 53, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {"ScaffoldGen".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    className="inline-block"
                    whileHover={{ scale: 1.2, color: "#FF8C5A" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              A powerful command-line interface tool for developers, designed to streamline your workflow and boost your
              productivity
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg relative overflow-hidden group shadow-lg shadow-primary/50"
                  aria-label="Download ScaffoldGen for Linux"
                >
                  <span className="relative z-10">Download for Linux</span>
                  <motion.div
                    className="absolute inset-0 bg-linear-gradient-to-r from-primary/0 via-white/30 to-primary/0"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-transparent border-2"
                  aria-label="Download ScaffoldGen for Windows"
                >
                  Download for Windows
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">About ScaffoldGen CLI</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our CLI tool is a powerful and versatile command-line interface that helps developers streamline their
                workflow and boost their productivity. With a wide range of features and customization options, it's the
                perfect tool for any developer looking to optimize their development process.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-linear-gradient-to-br from-secondary to-card border-border hover:border-primary/50 transition-all relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-linear-gradient-to-br from-transparent via-primary/10 to-transparent h-20"
                  animate={{ y: ["-100%", "300%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>
                  <motion.div
                    className="h-3 w-3 rounded-full bg-yellow-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  ></motion.div>
                  <motion.div
                    className="h-3 w-3 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  ></motion.div>
                  <span className="ml-auto text-xs text-muted-foreground">scaffoldgen</span>
                </div>
                <div className="bg-background/50 rounded-lg p-6 font-mono text-sm space-y-2 relative z-10">
                  {[
                    { text: "→ cd web_development", color: "text-green-400", delay: 0 },
                    {
                      text: "→ scaffoldgen new **my-awesome-app** --template next",
                      color: "text-blue-400",
                      delay: 0.5,
                    },
                    {
                      text: "→ scaffoldgen generate **component** UserProfile --t",
                      color: "text-purple-400",
                      delay: 1,
                    },
                    {
                      text: "→ scaffoldgen create **route** auth --handler **login",
                      color: "text-yellow-400",
                      delay: 1.5,
                    },
                    { text: "→ scaffoldgen config set **default-lang** python", color: "text-pink-400", delay: 2 },
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: line.delay }}
                      className={line.color}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      {line.text}
                      <motion.span
                        className="inline-block w-2 h-4 bg-current ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Download & Release Section */}
      <section className="py-20 bg-linear-gradient-to-b from-background to-secondary/30" id="downloads">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Latest Download",
                desc: "The latest version of our CLI tool is now available for download on Linux. Get the latest features and improvements by downloading the latest release.",
                btn: "Download for Linux",
                delay: 0,
              },
              {
                title: "Latest Release",
                desc: "Check out the latest release of our CLI tool, packed with new features and improvements. See what's new and get the latest version.",
                btn: "View Latest Release",
                delay: 0.2,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 relative overflow-hidden group">
                    <span className="relative z-10">{item.btn}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden" id="features">
  <div className="container mx-auto px-4 lg:px-8">
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          whileHover={{ scale: 1.2 }}
          className="h-24 w-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/50 relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary opacity-50 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <svg
            className="h-12 w-12 text-primary-foreground relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6 2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </motion.div>
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-primary/50 to-transparent origin-left"
            style={{ rotate: angle }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + angle * 0.001 }}
          />
        ))}
      </div>
    </motion.div>

    {/* Feature Cards in 2x2 Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {[
        {
          icon: "code",
          title: "Multi-Template & Multi-Language Support",
          desc: "Enables developers to work across different technology stacks with a unified command interface.",
          color: "primary",
          delay: 0,
        },
        {
          icon: "bulb",
          title: "Interactive Configuration & Prompting",
          desc: "Provides a user-friendly experience and minimizes errors from manual configuration.",
          color: "blue",
          delay: 0.1,
        },
        {
          icon: "module",
          title: "Component & Module Generation",
          desc: "Significantly speeds up repetitive coding tasks and enforces best practices.",
          color: "red",
          delay: 0.2,
        },
        {
          icon: "lightning",
          title: "Extensible Post-Processing Pipeline",
          desc: "Delivers a fully functional, ready-to-code project immediately after generation.",
          color: "yellow",
          delay: 0.3,
        },
      ].map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: feature.delay }}
          whileHover={{ y: -10, rotateX: 5, transition: { duration: 0.2 } }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card className="p-8 bg-linear-gradient-to-br from-card to-secondary border-border hover:border-primary/50 transition-all duration-300 h-full group relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-linear-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`h-14 w-14 rounded-xl ${
                feature.color === "primary"
                  ? "bg-primary/20"
                  : feature.color === "blue"
                    ? "bg-blue-500/20"
                    : feature.color === "red"
                      ? "bg-red-500/20"
                      : "bg-yellow-500/20"
              } flex items-center justify-center mb-4 relative z-10`}
            >
              {feature.icon === "code" && (
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              )}
              {feature.icon === "bulb" && (
                <svg className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              )}
              {feature.icon === "module" && (
                <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v2a1 1 0 01-2 0V5zM4 13a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1zm6-8a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm6 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                  />
                </svg>
              )}
              {feature.icon === "lightning" && (
                <svg className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              )}
            </motion.div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.desc}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden" id="testimonials">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm text-primary mb-2">What Developers Say</p>
            <h2 className="text-4xl md:text-5xl font-bold">Loved by Developers Worldwide</h2>
          </motion.div>

          <div className="relative max-w-7xl mx-auto" style={{ perspective: "2000px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Senior Full-Stack Developer",
                  company: "TechCorp",
                  avatar: "SC",
                  quote:
                    "ScaffoldGen has completely transformed my development workflow. What used to take hours now takes minutes. The multi-template support is a game-changer!",
                  rating: 5,
                  delay: 0,
                },
                {
                  name: "Marcus Rodriguez",
                  role: "Lead Software Engineer",
                  company: "StartupHub",
                  avatar: "MR",
                  quote:
                    "The best CLI tool I've ever used. The interactive prompts make configuration a breeze, and the code generation is spot-on every single time.",
                  rating: 5,
                  delay: 0.2,
                },
                {
                  name: "Emily Watson",
                  role: "DevOps Engineer",
                  company: "CloudScale",
                  avatar: "EW",
                  quote:
                    "I've recommended ScaffoldGen to my entire team. The extensible pipeline and best practices enforcement have improved our code quality significantly.",
                  rating: 5,
                  delay: 0.4,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: testimonial.delay, type: "spring" }}
                  whileHover={{
                    y: -15,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="p-8 bg-linear-gradient-to-br from-card to-secondary border-border hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden group">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-linear-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />

                    {/* Quote icon */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-10"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Quote className="h-16 w-16 text-primary" />
                    </motion.div>

                    {/* Avatar and info */}
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <motion.div
                        className="h-16 w-16 rounded-full bg-linear-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-xl relative overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-linear-gradient-to-br from-white/20 to-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <span className="relative z-10">{testimonial.avatar}</span>
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-primary">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-muted-foreground leading-relaxed mb-6 relative z-10 italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Star rating */}
                    <div className="flex gap-1 relative z-10">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <motion.div
                          key={starIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: testimonial.delay + 0.6 + starIndex * 0.1 }}
                          whileHover={{ scale: 1.3, rotate: 360 }}
                        >
                          <svg
                            className="h-5 w-5 text-primary fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>

                    {/* Floating particles effect */}
                    <motion.div
                      className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-primary/50"
                      animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-4 h-1.5 w-1.5 rounded-full bg-primary/30"
                      animate={{
                        y: [10, -10, 10],
                        x: [5, -5, 5],
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative 3D elements */}
          <motion.div
            className="absolute top-20 left-10 h-20 w-20 rounded-full bg-primary/10 blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </section>

      {/* Major Contributors Section */}
      <section
        className="py-32 bg-linear-gradient-to-b from-secondary/20 via-background to-secondary/30 relative overflow-hidden"
        id="contributors"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-sm text-primary mb-3 font-semibold tracking-wider uppercase"
            >
              Our Team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Major Contributors
            </motion.h2>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            style={{ perspective: "2000px" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              {[
                { name: "Alex Johnson", role: "Core Contributor" },
                { name: "Sarah Martinez", role: "Core Contributor" },
                { name: "Michael Chen", role: "Core Contributor" },
                { name: "Emily Davis", role: "Core Contributor" },
              ].map((contributor, i) => (
                <ContributorCard3D key={i} name={contributor.name} role={contributor.role} index={i} />
              ))}
            </Suspense>
          </div>

          {/* Floating decorative elements - deterministic positions */}
          {isClient && backgroundParticlePositions.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-2 w-2 rounded-full bg-primary/20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: particle.y,
                x: particle.x,
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </section>

      {/* Organizations Section */}
      <section
        className="py-32 bg-gradient-to-b from-secondary/20 via-background to-secondary/30 relative overflow-hidden"
        id="organizations"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 53, 0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255, 107, 53, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: "60px 60px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto" style={{ perspective: "2000px" }}>
            <Suspense fallback={<LoadingFallback />}>
              <OrganizationCard3D />
            </Suspense>
          </div>

          {/* Decorative floating particles - deterministic positions */}
          {isClient && organizationParticlePositions.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-1.5 w-1.5 rounded-full bg-primary/30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: particle.y,
                x: particle.x,
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
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-32 bg-linear-gradient-to-b from-secondary/30 via-background to-secondary/20 relative overflow-hidden"
        id="faq"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 53, 0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255, 107, 53, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: "80px 80px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "80px 80px"],
            }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-20 left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-sm text-primary mb-3 font-semibold tracking-wider uppercase"
            >
              Got Questions?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              Explore our knowledge tree to find answers to common questions about ScaffoldGen CLI
            </motion.p>
          </motion.div>

          <Suspense fallback={<LoadingFallback />}>
            <FAQTree />
          </Suspense>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            FAQ
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "What is the ScaffoldGen CLI Tool?",
                a: "ScaffoldGen CLI is a powerful command-line interface tool designed to help developers streamline their workflow and boost productivity through automated scaffolding and code generation.",
              },
              {
                q: "How do I install the ScaffoldGen CLI Tool?",
                a: "You can install ScaffoldGen CLI by downloading the latest release for your operating system from our downloads page and following the installation instructions.",
              },
              {
                q: "What features does the ScaffoldGen CLI Tool have?",
                a: "ScaffoldGen CLI offers multi-template support, interactive configuration, component generation, and an extensible post-processing pipeline to deliver production-ready code.",
              },
              {
                q: "How do I contribute to the Scaffolding CLI tool?",
                a: "We welcome contributions! Visit our GitHub repository to submit pull requests, report issues, or suggest new features.",
              },
              {
                q: "Is the ScaffoldGen CLI tool free to use?",
                a: "Yes, ScaffoldGen CLI is completely free and open-source under the MIT license.",
              },
              {
                q: "Where can I get support?",
                a: "You can get support through our Discord community, GitHub discussions, or by contacting our support team directly.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  className="bg-gradient-to-br from-card to-secondary border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 relative group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <motion.div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
                  <motion.div className="p-6 flex items-center justify-between relative z-10" whileHover={{ x: 5 }}>
                    <h3 className="font-semibold">{faq.q}</h3>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-5 w-5 text-primary" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-muted-foreground relative z-10"
                    >
                      {faq.a}
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-primary/20 py-12 bg-secondary/30"
        role="contentinfo"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/images/scaffoldgen-logo.png"
                alt="ScaffoldGen CLI"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>
              </div>
              <p className="text-sm text-muted-foreground">© 2025 ScaffoldGenCLI All rights reserved.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Downloads", "Releases", "Documentation", "Support"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors inline-block">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect with Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Github, label: "GitHub" },
                  { icon: MessageSquare, label: "Discord" },
                ].map((item) => (
                  <motion.li
                    key={item.label}
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </motion.div>
                    <a href="#" className="hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}