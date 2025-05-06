"use client"

import { useEffect, useRef } from "react"
import { Paintbrush, Smartphone, Gauge, Globe } from "lucide-react"

const features = [
  {
    icon: Paintbrush,
    title: "Full Customization",
    description: "Change colors, fonts, and layout to match your personal brand and stand out from the crowd."
  },
  {
    icon: Smartphone, 
    title: "Mobile Optimized",
    description: "Your Link1t page looks perfect on every device, from phones to tablets to desktops."
  },
  {
    icon: Gauge,
    title: "Lightning Fast",
    description: "Incredibly quick load times mean your visitors won't bounce before seeing your content."
  },
  {
    icon: Globe,
    title: "Analytics Included",
    description: "See who's visiting your page and which links are getting the most clicks."
  }
]

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )

    const elements = featuresRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => {
      elements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section
      id="features" 
      ref={featuresRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute inset-0 -z-10 opacity-[0.15] bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative blobs */}
      <div className="absolute -z-10 left-1/4 top-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -z-10 right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            Why Choose <span className="text-purple-600 dark:text-purple-400">Link1t</span>
          </h2>
          <p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ animationDelay: "0.2s" }}
          >
            The most powerful way to share all your content in one simple link
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group p-6 rounded-xl bg-background/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll opacity-0 translate-y-8 ease-out"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}