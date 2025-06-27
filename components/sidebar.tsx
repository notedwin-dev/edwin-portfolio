"use client";

import { useState, useEffect } from "react";
import {
  X,
  Home,
  User,
  Code,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Mail,
  Pin,
  PinOff,
  Stars,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");  const scrollToSection = (id: string) => {
    // Immediately set the active section for responsive feedback
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      // Use getBoundingClientRect for more accurate positioning
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const elementTop = scrollPosition + rect.top;

      // Use consistent offset for all sections - minimal offset to show section padding
      const targetPosition = Math.max(0, elementTop - 20);

      // Use native smooth scrolling for simplicity and reliability
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      // Force a scroll detection update after a short delay
      setTimeout(() => {
        setActiveSection(id);
      }, 100);
    }

    onClose();
  };  // Detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.id);
      const windowHeight = window.innerHeight;
      
      let activeSection = sections[0];
      
      // Simple approach: find the section whose top is closest to the top of viewport
      // but still visible (not scrolled past)
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        
        // If section top is in the upper 60% of viewport and section is visible
        if (rect.top <= windowHeight * 0.6 && rect.bottom > 0) {
          activeSection = sectionId;
        }
      }
      
      setActiveSection(activeSection);
    };// Add a slight delay to handle rapid scrolling and navigation jumps
    let scrollTimeout: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const navigationItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "recommendations", label: "Recommendations", icon: Stars },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Featured Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {" "}
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500"
          onClick={onClose}
        />
      )}
      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-black/95 backdrop-blur-md border-r border-gray-800 transform transition-all duration-500 ease-out z-50 w-80 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Navigation</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Quick access to all sections
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-300 group text-left border border-transparent hover:border-gray-700/30"
                  style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex-shrink-0 p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-all duration-300">
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-base">{item.label}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {" "}
                      {item.id === "hero" && "Welcome section"}
                      {item.id === "about" && "Learn about me"}
                      {item.id === "skills" && "Technical expertise"}
                      {item.id === "education" && "Academic background"}
                      {item.id === "experience" && "Work history"}
                      {item.id === "recommendations" && "Client testimonials"}
                      {item.id === "projects" && "Featured work"}
                      {item.id === "contact" && "Get in touch"}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800/50">
            <div className="text-center text-sm text-gray-500">
              Tap anywhere outside to close
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Timeline Sidebar - Hidden on medium, visible on large screens */}
      <div className="fixed left-6 top-32 z-30 hidden xl:block">
        <div
          className={`group bg-black/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl transition-all duration-700 ease-out hover:shadow-3xl`}>
          <nav className="p-1">
            {" "}
            {/* Pin/Unpin Button - Integrated at top */}
            <div className="flex justify-start p-2 border-b border-gray-700/30 mb-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePin}
                className="w-6 h-6 bg-gray-800/50 hover:bg-gray-700 border border-gray-600/50 rounded text-gray-400 hover:text-white transition-all duration-200"
                title={isPinned ? "Unpin sidebar" : "Pin sidebar"}>
                {isPinned ? (
                  <PinOff className="h-3 w-3" />
                ) : (
                  <Pin className="h-3 w-3" />
                )}
              </Button>
            </div>
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <div
                  key={item.id}
                  className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`group/item my-1 relative flex items-center w-full h-12 rounded-lg transition-all duration-300 px-3 overflow-hidden ${
                      isActive
                        ? "text-white bg-gray-800/90 shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/80"
                    }`}>
                    {/* Icon container */}
                    <div className="flex-shrink-0 w-6 flex justify-center">
                      <item.icon
                        className={`h-5 w-5 transition-all duration-300 ${
                          isActive ? "scale-110" : "group-hover/item:scale-110"
                        }`}
                      />
                    </div>

                    {/* Expandable text label with staggered animation */}
                    <div
                      className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-out ${
                        isPinned
                          ? "ml-4 w-32 opacity-100"
                          : "ml-0 group-hover:ml-4 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 group-hover:delay-150"
                      }`}>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 rounded-r transition-all duration-300 ${
                        isActive
                          ? "h-8 bg-white"
                          : "h-0 bg-white group-hover/item:h-6"
                      }`}></div>
                  </button>

                  {/* Timeline connector line */}
                  {index < navigationItems.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-px h-3 transition-all duration-300 ${
                        isActive ? "bg-gray-600" : "bg-gray-700/50"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Expansion hint - only show when not pinned */}
          {!isPinned && (
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gray-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          )}
        </div>
      </div>
    </>
  );
}
