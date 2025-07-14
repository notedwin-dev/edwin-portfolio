"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Github, Bot, Briefcase, Globe, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [projectImages, setProjectImages] = useState<Record<number, string | null>>({})
  const sectionRef = useRef<HTMLElement>(null)

  // Helper function to get GitHub social preview image
  const getGitHubImageUrl = (githubUrl: string) => {
    if (!githubUrl || githubUrl === "#") return null
    // Extract owner/repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!match) return null
    const [, owner, repo] = match
    return `https://opengraph.githubassets.com/1/${owner}/${repo}`
  }

  // Helper function to extract OpenGraph image from external URL
  const fetchOpenGraphImage = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(`/api/opengraph?url=${encodeURIComponent(url)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.imageUrl || null
    } catch (error) {
      console.error('Error fetching OpenGraph image:', error)
      return null
    }
  }

  // Fetch external project images on component mount
  useEffect(() => {
    const fetchExternalImages = async () => {
      const imagePromises = projects.map(async (project, index) => {
        // Skip if it has manual cover image or GitHub image
        if (project.coverImage || getGitHubImageUrl(project.links.github)) {
          return [index, null]
        }

        // Only fetch OpenGraph if no manual image and demo link exists
        if (project.links.demo !== "#") {
          const image = await fetchOpenGraphImage(project.links.demo)
          return [index, image]
        }

        return [index, null]
      })

      const results = await Promise.all(imagePromises)
      const imageMap = Object.fromEntries(results)
      setProjectImages(imageMap)
    }

    fetchExternalImages()
  }, [])

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

  const projects = [
    {
      title: "Miss Valentina Discord Bot",
      description:
        "A verified Discord bot with advanced features including Lovense API integration and AI-powered conversations using Gemini API. Designed for specialized community servers with comprehensive moderation and interactive features.",
      icon: <Bot className="h-8 w-8" />,
      technologies: ["Node.js", "Discord.js", "Gemini API", "Lovense API", "JavaScript"],
      highlights: [
        "Verified Discord bot status",
        "AI-powered conversation system",
        "Third-party API integrations",
        "Advanced command system",
      ],
      links: {
        demo: "https://discord.com/oauth2/authorize?client_id=854393285074354176&scope=bot",
        docs: "https://miss-valentina.gitbook.io/miss-valentina",
        github: "#",
      },
      isPrivate: true,
      coverImage: "https://miss-valentina.gitbook.io/miss-valentina/~gitbook/image?url=https%3A%2F%2F3779872590-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Ft9veC6wbTEqQ6pH2m0TE%252Fuploads%252FsdEBJdmYMrIZd2LmMPya%252Fresize.jpg%3Falt%3Dmedia%26token%3Dc4939388-2be6-45af-aba2-ae90f793fe61&width=1248&dpr=1&quality=100&sign=2d0efd5b&sv=2",
    },
    {
      title: "SuDu.AI",
      description:
        "AI-powered ERP solution that maximizes efficiency and minimizes costs through intelligent business process insights, task automation, and demand prediction capabilities.",
      icon: <Briefcase className="h-8 w-8" />,
      technologies: ["Vue.js", "TypeScript", "Express.js", "PostgreSQL", "AI Integration"],
      highlights: [
        "AI-driven business insights",
        "Automated task management",
        "Demand prediction algorithms",
        "Scalable ERP architecture",
      ],
      links: {
        demo: "https://sudu.ai",
        github: "#",
      },
      isPrivate: true,
      coverImage: "https://resources.wobbjobs.com/jobs-malaysia/companies/2f8a55d8-6151-40dd-bd27-32dcc4e12d27/company_images/original/381ce37b-d9e4-47b1-96d6-068c740a410f-company-malaysia-a-serious-company-1718008111581.jpeg",
    },
    {
      title: "ApSpace Discord Bot",
      description:
        "Discord integration for APU students to stay updated with their auto-scheduled timetables directly within their Discord servers, making academic planning more convenient.",
      icon: <Globe className="h-8 w-8" />,
      technologies: ["Node.js", "Discord.js", "API Integration", "Scheduling"],
      highlights: [
        "Real-time timetable updates",
        "APU system integration",
        "Automated notifications",
        "Student-focused features",
      ],
      links: {
        demo: "#",
        github: "https://github.com/notedwin-dev/ApSpace-Discord-Bot",
      },
      isPrivate: false,
      coverImage: null,
    },
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="text-center mb-16">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              View all GitHub projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              // Priority: Manual cover image > GitHub image > OpenGraph image
              const githubImageUrl = getGitHubImageUrl(project.links.github)
              const externalImageUrl = projectImages[index]
              const coverImageUrl = project.coverImage || githubImageUrl || externalImageUrl
              
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 group overflow-hidden cursor-pointer">
                      <CardContent className="p-0">
                        {/* Project Cover Image */}
                        {coverImageUrl && (
                          <div className="relative w-full h-48 overflow-hidden">
                            <Image
                              src={coverImageUrl}
                              alt={`${project.title} preview`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              quality={85}
                              onError={(e) => {
                                // Hide image on error
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="p-3 bg-gray-800 rounded-lg mr-4 group-hover:bg-gray-700 transition-colors">
                              {project.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                              {project.title}
                            </h3>
                          </div>

                          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies
                                .slice(0, 3)
                                .map((tech, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-700 text-gray-400 text-xs">
                                  +{project.technologies.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black">
                              <Info className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                            {!project.isPrivate && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.links.github, "_blank");
                                }}>
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            )}
                            {project.links.demo &&
                              project.links.demo !== "#" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.links.demo, "_blank");
                                  }}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Demo
                                </Button>
                              )}
                            {project.links.docs &&
                              project.links.docs !== "#" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.links.docs, "_blank");
                                  }}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Docs
                                </Button>
                              )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] flex flex-col p-0">
                    <DialogHeader className="flex-shrink-0 p-6 pb-0">
                      <DialogTitle className="flex items-center text-xl">
                        <div className="p-2 bg-gray-800 rounded-lg mr-3">
                          {project.icon}
                        </div>
                        {project.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 overflow-y-auto flex-1 px-6 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
                      {/* Project Cover Image in Dialog */}
                      {coverImageUrl && (
                        <div className="relative w-full h-64 overflow-hidden rounded-lg">
                          <Image
                            src={coverImageUrl}
                            alt={`${project.title} preview`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={90}
                            onError={(e) => {
                              // Hide image on error
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="text-gray-300 text-sm flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4 pb-2 px-6 flex-shrink-0 bg-gray-900 border-t border-gray-800">
                        {!project.isPrivate && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                            onClick={() =>
                              window.open(project.links.github, "_blank")
                            }>
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {project.links.demo && project.links.demo !== "#" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                            onClick={() =>
                              window.open(project.links.demo, "_blank")
                            }>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        )}
                        {project.links.docs && project.links.docs !== "#" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                            onClick={() =>
                              window.open(project.links.docs, "_blank")
                            }>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Docs
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
