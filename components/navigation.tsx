"use client"

import { useState, useEffect } from "react"
import { Download, Mail, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation({ onMenuClick }: { onMenuClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownloadCV = () => {
    window.open("/Edwin-Ng-Resume.pdf", "_blank");
  }

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Left side - Hamburger Menu (mobile and tablet) and Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 transition-colors xl:hidden"
              onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
            <div
              className="flex items-center space-x-2 text-lg sm:text-xl font-bold cursor-pointer"
              onClick={() => scrollToSection("hero")}>
              <Image
                src="/images/logo.png"
                alt="Edwin Ng Logo"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                priority
                quality={90}
              />
              <span>Edwin</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black text-xs sm:text-sm"
              onClick={handleDownloadCV}>
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black text-xs sm:text-sm px-3 sm:px-4"
              onClick={() => scrollToSection("contact")}>
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Get in Touch</span>
              <span className="xs:hidden">Contact</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
