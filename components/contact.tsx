"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import { submitContactForm } from "@/app/actions"
import { useActionState } from "react"
import { Turnstile } from "@marsidev/react-turnstile"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [state, action, isPending] = useActionState(submitContactForm, null)
  const [token, setToken] = useState<string>("")

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

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Work Together</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you're looking for a
                full-stack developer or need help with your next big idea, let's connect and discuss how we can work
                together.
              </p>

              <div className="space-y-6">
                <a className="flex items-center" href="mailto:hi@notedwin.dev" target="_blank" rel="noopener noreferrer">
                  <div className="p-3 bg-gray-800 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">hi@notedwin.dev</p>
                  </div>
                </a>

                <div className="flex items-center">
                  <div className="p-3 bg-gray-800 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-gray-400">Kuala Lumpur, Malaysia</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <a
                    href="https://github.com/notedwin-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                  >
                    <Github className="h-6 w-6 text-white group-hover:text-purple-400 transition-colors duration-300" />
                  </a>
                  <a
                    href="https://linkedin.com/in/edwin-ng2404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                  >
                    <Linkedin className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <form action={action} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                      onSuccess={(token) => setToken(token)}
                      options={{
                        theme: "dark",
                      }}
                    />
                    <input type="hidden" name="cf-turnstile-response" value={token} />
                    {/* Honeypot field */}
                    <div className="sr-only" aria-hidden="true">
                      <input
                        type="text"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !token}
                    className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    {isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {state && (
                    <div className={`text-center ${state.success ? "text-green-400" : "text-red-400"}`}>
                      {state.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
