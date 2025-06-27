import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edwin Ng - Full Stack Developer",
  description:
    "Full Stack Developer with 4 years of experience in Node.js, TypeScript, Next.js, Vue.js, and modern web technologies.",
  generator: "Next.js",
  applicationName: "Edwin Ng Portfolio",
  keywords: [
    "Edwin Ng",
    "Full Stack Developer",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "Web Applications",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Web Development",
    "Software Development",
    "Programming",
    "Tech Portfolio",
    "Developer Portfolio",
    "Edwin Ng Portfolio",
  ],
  authors: [
    {
      name: "Edwin Ng",
      url: "https://notedwin.dev",
    },
  ],
  creator: "Edwin Ng",
  icons: {
    icon: "/images/icon.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/images/profile.jpg" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
