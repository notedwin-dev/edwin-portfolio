"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, Users } from "lucide-react"

export function Education() {
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

  const education = [
    {
      degree: "Bachelor's Degree",
      field: "Computer Software Engineering",
      institution: "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      period: "Feb 2025 - 2027",
      status: "In Progress",
      grade: null,
      activities: ["Google Developer Group on Campus (GDGoC) APU", "APU Blockchain and Cryptocurrency Club (APUBCC)"],
    },
    {
      degree: "Diploma",
      field: "Information, Communication and Technology - Computer Software Engineering",
      institution: "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      period: "Jul 2022 - Jul 2024",
      status: "Completed",
      grade: "CGPA: 2.98",
      activities: ["APU Google Developers Club (GDC)", "APU Music Club"],
    },
  ]

  return (
    <section ref={sectionRef} id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Education
          </h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-4">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                          <p className="text-lg text-gray-300">{edu.field}</p>
                        </div>
                      </div>
                      <p className="text-xl text-gray-400 mb-4">{edu.institution}</p>
                    </div>

                    <div className="flex flex-col lg:items-end space-y-2">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {edu.period}
                      </div>
                      <Badge
                        variant={edu.status === "Completed" ? "secondary" : "outline"}
                        className={`${
                          edu.status === "Completed"
                            ? "bg-green-900/50 text-green-300 border-green-700"
                            : "bg-blue-900/50 text-blue-300 border-blue-700"
                        }`}
                      >
                        {edu.status}
                      </Badge>
                      {edu.grade && <div className="text-gray-400 text-sm">{edu.grade}</div>}
                    </div>
                  </div>

                  {edu.activities && edu.activities.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Activities & Societies
                      </h4>
                      <div className="space-y-2">
                        {edu.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="text-gray-500 mr-3 mt-2">•</span>
                            <span className="text-gray-300">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Educational Highlights */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Academic Focus</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Software Engineering",
                "Computer Science",
                "Information Technology",
                "Developer Communities",
                "Blockchain Technology",
                "Music & Arts",
              ].map((focus, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors py-2 px-4"
                >
                  {focus}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
