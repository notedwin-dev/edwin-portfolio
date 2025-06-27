"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Recommendations } from "@/components/recommendations"
import { Footer } from "@/components/footer"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navigation onMenuClick={() => setSidebarOpen(true)} />
      <MainContent>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Recommendations />
        <Education />
        <Projects />
        <Contact />
      </MainContent>
      <Footer />
    </div>
  )
}
