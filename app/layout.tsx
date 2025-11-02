import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const _geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "ScaffoldGen CLI - Developer Productivity Tool",
  description:
    "A powerful command-line interface tool for developers, designed to streamline your workflow and boost your productivity with multi-template support, interactive configuration, and component generation.",
  keywords: ["CLI tool", "developer tools", "scaffolding", "code generation", "productivity", "command line"],
  authors: [{ name: "ScaffoldGen Team" }],
  creator: "ScaffoldGen",
  publisher: "ScaffoldGen",
  metadataBase: new URL("https://scaffoldgen.vercel.app"),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scaffoldgen.vercel.app",
    title: "ScaffoldGen CLI - Developer Productivity Tool",
    description:
      "A powerful command-line interface tool for developers, designed to streamline your workflow and boost your productivity",
    siteName: "ScaffoldGen CLI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScaffoldGen CLI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScaffoldGen CLI - Developer Productivity Tool",
    description: "A powerful command-line interface tool for developers",
    images: ["/og-image.png"],
    creator: "@scaffoldgen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
