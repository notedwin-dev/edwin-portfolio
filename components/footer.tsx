"use client"

import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Download,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Edwin Ng
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Self-taught full-stack developer passionate about building
              scalable web applications and helping the developer community
              grow.
            </p>{" "}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:scale-110 transition-all duration-300 group">
                <Github className="h-5 w-5 group-hover:text-purple-400 transition-colors duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:scale-110 transition-all duration-300 group">
                <Linkedin className="h-5 w-5 group-hover:text-blue-400 transition-colors duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:scale-110 transition-all duration-300 group">
                <Mail className="h-5 w-5 group-hover:text-green-400 transition-colors duration-300" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block text-gray-400 hover:text-white transition-colors">
                About Me
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("skills")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block text-gray-400 hover:text-white transition-colors">
                Skills
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block text-gray-400 hover:text-white transition-colors">
                Experience
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block text-gray-400 hover:text-white transition-colors">
                Projects
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>📧 hi@notedwin.dev</p>
              <p>📍 Kuala Lumpur, Malaysia</p>
              <p>💼 Available for freelance work</p>
            </div>{" "}
            <div className="flex justify-between space-x-2">
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:border-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 mb-3">
                <Handshake className="h-4 w-4 mr-2" />
                Let's Work Together
              </Button>
              <Button
                onClick={() => window.open("/Edwin-Ng-Resume.pdf", "_blank")}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-105 transition-all duration-300 w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 sm:mb-0">
            <span>© {currentYear} Edwin Ng. Made with</span>
            <Heart
              className="h-4 w-4 text-red-500"
              fill="currentColor"
            />
            <span>using Next.js & TailwindCSS</span>
          </div>{" "}
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center space-x-2 group">
            <ArrowUp className="h-4 w-4 group-hover:text-cyan-400 transition-colors duration-300" />
            <span className="group-hover:text-cyan-400 transition-colors duration-300">
              Back to Top
            </span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
