"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Globe, Server, Bot } from "lucide-react"

interface Skill {
  name: string
  category: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  color: string
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories: SkillCategory[] = [
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Node.js", category: "backend" },
        { name: "TypeScript", category: "backend" },
        { name: "Express.js", category: "backend" },
        { name: "JavaScript", category: "backend" },
        { name: "REST APIs", category: "backend" },
      ],
    },
    {
      title: "Frontend Development",
      icon: <Globe className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Next.js", category: "frontend" },
        { name: "Vue.js", category: "frontend" },
        { name: "React", category: "frontend" },
        { name: "HTML/CSS", category: "frontend" },
        { name: "TailwindCSS", category: "frontend" },
      ],
    },
    {
      title: "Database & Tools",
      icon: <Database className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "PostgreSQL", category: "database" },
        { name: "Prisma ORM", category: "database" },
        { name: "Redis", category: "database" },
        { name: "Git", category: "tools" },
        { name: "CI/CD", category: "tools" },
      ],
    },
    {
      title: "Automation & Bots",
      icon: <Bot className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Discord.js", category: "automation" },
        { name: "API Integration", category: "automation" },
        { name: "Webhooks", category: "automation" },
        { name: "AI Integration", category: "automation" },
        { name: "Process Automation", category: "automation" },
      ],
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={categoryIndex}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 bg-gradient-to-r ${category.color} rounded-lg mr-4`}>{category.icon}</div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-sm py-2 px-3"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Skills Summary */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Full-Stack Development",
                "Team Leadership",
                "Code Review",
                "Mentoring",
                "API Design",
                "Performance Optimization",
                "Community Building",
                "Technical Writing",
              ].map((competency, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors py-2 px-4"
                >
                  {competency}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
