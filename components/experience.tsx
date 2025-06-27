"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Code, Zap } from "lucide-react"

export function Experience() {
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

  const experiences = [
    {
      title: "Full Stack Developer (Contract)",
      company: "A Serious Company",
      location: "Bandar Sri Petaling, Malaysia",
      period: "Apr 2024 – Jan 2025",
      description:
        "Led the development of SuDu.AI v2, an AI-powered ERP integrated with SQL Accounting Software. Collaborated with stakeholders, managed a dev team, and delivered scalable, production-ready features.",
      highlights: [
        "Led a team of developers, reviewed code, and mentored interns",
        "Refactored backend to TypeScript and improved frontend performance by 30%",
        "Built reusable Vue.js components and custom Express.js middleware",
        "Implemented secure user auth with RBAC and optimized PostgreSQL queries",
        "Set up CI/CD pipelines, improving deployment speed and reliability",
      ],
      technologies: ["Vue.js", "TypeScript", "Express.js", "Prisma ORM", "PostgreSQL", "Redis", "TailwindCSS"],
    },
    {
      title: "Community Hero & Developer",
      company: "Autocode.com",
      location: "Remote",
      period: "Aug 2021 – 2024",
      description:
        "Started as a self-taught developer building Discord bots, evolved into a community leader helping 200+ developers monthly. Created templates, apps, and provided technical support.",
      highlights: [
        "Helped over 200+ community members monthly with coding questions",
        "Created code snippets, templates, and fully-featured automation apps",
        "Assisted with community moderation and code review processes",
        "Built Discord bots and web services using Node.js and JavaScript",
        "Transitioned from contributor to recognized community leader",
      ],
      technologies: ["Node.js", "JavaScript", "Discord.js", "API Integrations", "Webhooks"],
    },
  ]

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Work Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-xl text-gray-300 mb-4">{exp.company}</p>
                    </div>
                    <div className="flex flex-col lg:items-end space-y-2">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="text-gray-500 mr-3">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
