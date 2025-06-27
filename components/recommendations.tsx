"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Linkedin, ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"

export function Recommendations() {
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
    }    return () => observer.disconnect()
  }, [])

  const recommendations = [
    {
      name: "Mohamed Ashraf",
      title: "Senior Software Engineer",
      company: "CompAsia",
      date: "March 5, 2025",
      relationship: "Mohamed was senior to Edwin but didn't manage Edwin directly",
      linkedinUrl: "https://www.linkedin.com/in/mohamed-ashraf-2155831aa",
      profileImage: "https://media.licdn.com/dms/image/v2/D5603AQFLBzoCErzdhQ/profile-displayphoto-shrink_800_800/B56Zcb3Ma.GsAc-/0/1748519146005?e=1756339200&v=beta&t=7bmHkAwTxb1u2_yXcE5BhO8rN7h9J7yN6jJIUaVtJsE",
      content:
        "I had the pleasure of working alongside Edwin Ng in a professional capacity where I served as a senior colleague. Edwin consistently demonstrated exceptional intelligence and a remarkable ability to stay ahead of the curve with the latest technologies. His proactive approach to learning and applying cutting-edge solutions made him a valuable asset in our collaborative efforts. I highly recommend Edwin for any role that requires a forward-thinking and highly skilled professional.",
      highlights: [
        "Exceptional intelligence",
        "Stays ahead with latest technologies",
        "Proactive approach to learning",
        "Forward-thinking professional",
      ],
    },
  ]

  return (
    <section ref={sectionRef} id="recommendations" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Recommendations
          </h2>

          <div className="space-y-8">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 relative overflow-hidden"
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="h-16 w-16 text-white" />
                  </div>

                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700">
                          <Image
                            src={rec.profileImage || "/placeholder.svg"}
                            alt={`${rec.name} - ${rec.title}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            quality={85}
                          />
                        </div>
                        {/* Small gradient ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-sm -z-10 scale-110"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{rec.name}</h3>
                        <p className="text-lg text-gray-300 mb-1">
                          {rec.title} at {rec.company}
                        </p>
                        <p className="text-sm text-gray-400 mb-2">{rec.relationship}</p>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {rec.date}
                        </div>
                      </div>
                    </div>                    <div className="flex space-x-3 mt-4 lg:mt-0 relative z-10">
                      <Button
                        variant="outline"
                        size={"sm"}
                        className="bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                        onClick={() => window.open(rec.linkedinUrl, "_blank")}
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  {/* Recommendation Content */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="pl-6">
                      <p className="text-gray-300 leading-relaxed text-lg italic mb-6">"{rec.content}"</p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Key Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Want to work with Edwin or provide a recommendation?</p>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
