"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Quote,
  Linkedin,
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

export function Recommendations() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Truncate text helper
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Toggle expand/collapse for a specific card
  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + recommendations.length) % recommendations.length
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const recommendations = [
    {
      name: "Mohamed Ashraf",
      title: "Senior Software Engineer",
      company: "CompAsia",
      date: "March 5, 2025",
      relationship:
        "Mohamed was senior to Edwin but didn't manage Edwin directly",
      linkedinUrl: "https://www.linkedin.com/in/mohamed-ashraf-2155831aa",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQFLBzoCErzdhQ/profile-displayphoto-shrink_800_800/B56Zcb3Ma.GsAc-/0/1748519146005?e=1756339200&v=beta&t=7bmHkAwTxb1u2_yXcE5BhO8rN7h9J7yN6jJIUaVtJsE",
      content:
        "I had the pleasure of working alongside Edwin Ng in a professional capacity where I served as a senior colleague. Edwin consistently demonstrated exceptional intelligence and a remarkable ability to stay ahead of the curve with the latest technologies. His proactive approach to learning and applying cutting-edge solutions made him a valuable asset in our collaborative efforts. I highly recommend Edwin for any role that requires a forward-thinking and highly skilled professional.",
      highlights: [
        "Exceptional intelligence",
        "Stays ahead with latest technologies",
        "Proactive approach to learning",
        "Forward-thinking professional",
      ],
    },
    {
      name: "Alex Lolando",
      title: "Fiverr Client",
      company: "",
      date: "August 17, 2025",
      relationship: "Alex hired Edwin as a freelance developer on Fiverr",
      linkedinUrl: "https://www.linkedin.com/in/alexsl2174",
      profileImage:
        "https://media.licdn.com/dms/image/v2/C5103AQGkmdtnBc3TBA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516585988449?e=1759363200&v=beta&t=N00uKwk8SKcZny9rvH8pS1f0tJuhw5BF-lrGLsLGAms",
      content:
        "I would really recommend hiring Edwin if you are in any need of a developer. Personally he has helped me with a discord bot since November 2024 and I have never seen a more dedicated developer. He is really great at what he does and quick to bug fix if need be. I am really satisfied to have found them and I couldn't recommend them enough!",
      highlights: [
        "Dedicated developer",
        "Quick bug fixes",
        "Great communication",
        "Highly recommended",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="recommendations"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Recommendations
          </h2>

          {/* Slider Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 border-gray-700 text-white hover:bg-blue-600 hover:border-blue-500 backdrop-blur-sm transition-all duration-300"
                onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 border-gray-700 text-white hover:bg-blue-600 hover:border-blue-500 backdrop-blur-sm transition-all duration-300"
                onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {recommendations.map((rec, index) => {
                  const isExpanded = expandedCards[index];
                  const displayContent = isExpanded
                    ? rec.content
                    : truncateText(rec.content);

                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-2">
                      <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 relative overflow-hidden h-full">
                        <CardContent className="p-6 md:p-8">
                          {/* Quote Icon */}
                          <div className="absolute top-4 right-4 opacity-10">
                            <Quote className="h-12 w-12 md:h-16 md:w-16 text-white" />
                          </div>

                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                            <div className="flex items-start space-x-3 md:space-x-4">
                              <div className="relative">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-700">
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
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate">
                                  {rec.name}
                                </h3>
                                <p className="text-sm md:text-base text-gray-300 mb-1 truncate">
                                  {rec.title}
                                  {rec.company && ` at ${rec.company}`}
                                </p>
                                <p className="text-xs md:text-sm text-gray-400 mb-2 line-clamp-2">
                                  {rec.relationship}
                                </p>
                                <div className="flex items-center text-gray-400 text-xs md:text-sm">
                                  <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                  {rec.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4 sm:mt-0 relative z-10">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 text-xs"
                                onClick={() =>
                                  window.open(rec.linkedinUrl, "_blank")
                                }>
                                <Linkedin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                LinkedIn
                              </Button>
                            </div>
                          </div>

                          {/* Recommendation Content */}
                          <div className="relative mb-6">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            <div className="pl-4 md:pl-6">
                              <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                                "{displayContent}"
                              </p>
                              {rec.content.length > 120 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-400 hover:text-blue-300 p-0 h-auto mt-2 text-xs"
                                  onClick={() => toggleExpand(index)}>
                                  {isExpanded ? "Show less" : "Read more"}
                                  <MoreHorizontal className="h-3 w-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Key Highlights */}
                          {rec.highlights.length > 0 && (
                            <div>
                              <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                                Key Highlights
                              </h4>
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {rec.highlights
                                  .slice(
                                    0,
                                    isExpanded ? rec.highlights.length : 3
                                  )
                                  .map((highlight, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-gray-800 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs border border-gray-700">
                                      {highlight}
                                    </span>
                                  ))}
                                {!isExpanded && rec.highlights.length > 3 && (
                                  <span className="bg-gray-700 text-gray-400 px-2 md:px-3 py-1 rounded-full text-xs border border-gray-600">
                                    +{rec.highlights.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-500 scale-125"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center space-x-4 mt-6 md:hidden">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-900/80 border-gray-700 text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-900/80 border-gray-700 text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                onClick={nextSlide}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Want to work with Edwin or provide a recommendation?
            </p>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              <ExternalLink className="h-4 w-4 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
