"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Users, Lightbulb, Heart } from "lucide-react"

export function About() {
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

  const highlights = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Self-Taught Journey",
      description:
        "Started coding in August 2021 with Discord bots, evolved into full-stack development through continuous learning and passion for technology.",
      iconColor: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Leader",
      description:
        "Helped over 200+ developers monthly as Community Hero at Autocode.com, creating templates and providing technical guidance.",
      iconColor: "from-green-500 to-emerald-500",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Problem Solver",
      description:
        "Led development teams, mentored junior developers, and delivered scalable solutions that improved performance by 30%.",
      iconColor: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Helping",
      description:
        "Driven by the desire to help others succeed, whether through code reviews, mentoring, or building tools that make developers' lives easier.",
      iconColor: "from-pink-500 to-red-500",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">My Story</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My coding journey began in August 2021 when I discovered Discord bot development through Autocode.com.
                  What started as curiosity about building Discord bots quickly evolved into a passion for full-stack
                  development.
                </p>
                <p>
                  Through self-learning and hands-on experience, I progressed from creating simple automation scripts to
                  leading development teams and building complex ERP systems. My experience helping over 200+ developers
                  monthly taught me the importance of clean code, clear communication, and collaborative
                  problem-solving.
                </p>
                <p>
                  Today, I specialize in building scalable web applications and automation tools, with a focus on
                  performance optimization and user experience. I believe in continuous learning and sharing knowledge
                  with the developer community.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-2 bg-gradient-to-r ${highlight.iconColor} rounded-lg mr-3`}>
                        {highlight.icon}
                      </div>
                      <h4 className="font-semibold text-white text-sm">{highlight.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
