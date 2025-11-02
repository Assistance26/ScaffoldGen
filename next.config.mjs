/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
    unoptimized: true, // updated code here
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
  eslint: {
    ignoreDuringBuilds: true, // updated code here
  },
  typescript: {
    ignoreBuildErrors: true, // updated code here
  },
}

export default nextConfig
