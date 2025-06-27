"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Immediate mounting for faster LCP
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Photo - first in sequence, animated */}
        <div className={`mb-8 flex justify-center transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Edwin Ng - Full Stack Developer"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority={true}
                quality={80}
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              />
            </div>
            {/* Gradient Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-sm -z-10 scale-110"></div>
          </div>
        </div>

        {/* Text content - second in sequence, small delay for smooth flow */}
        <div className={`transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent pb-2">
            Edwin Ng
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
            Full-Stack Web Developer
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building modern web applications with clean code and thoughtful design
          </p>
        </div>

        {/* Buttons - third in sequence, animated with delay */}
        <div className={`transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex justify-center space-x-6 mb-12">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110 transition-all duration-300"
              onClick={() => window.open('https://github.com/notedwin-dev', '_blank')}
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110 transition-all duration-300"
              onClick={() => window.open('https://linkedin.com/in/edwin-ng2404', '_blank')}
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>

          <Button
            onClick={() => scrollToSection("experience")}
            variant="outline"
            className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            View My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
