"use client"

import { useEffect, useRef } from "react"
import { Sparkles, Smartphone, Zap, Globe, Palette, Shield, Code, Share2 } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Setup",
    description: "Upload your resume and let AI extract your experience, skills, and projects automatically. Save hours of manual work.",
  },
  {
    icon: Zap,
    title: "Instant Publishing",
    description: "Get a live, shareable URL in seconds. No hosting, no domains, no technical hassle required.",
  },
  {
    icon: Smartphone, 
    title: "Mobile Optimized",
    description: "Your portfolio looks stunning on every device. Responsive design that adapts beautifully from phones to desktops.",
  },
  {
    icon: Globe,
    title: "Recruiter Ready",
    description: "Professional design that showcases your work and impresses hiring managers. Stand out from the competition.",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description: "Express your personality with beautiful themes. Light, dark, and custom color options available.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. Control what you share and who can see your portfolio.",
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
      className="py-28 md:py-40 relative overflow-hidden bg-black"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Code className="w-4 h-4 text-orange-400" />
            <span>Powerful Features</span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white"
          >
            Why Choose{" "}
            <span className="text-orange-400">
              Link1t
            </span>
          </h2>
          <p 
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            The fastest and most elegant way to create a professional developer portfolio that gets you hired
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                {/* Icon with background */}
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2.5 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-24 md:mt-32 py-12 px-8 rounded-3xl bg-white/5 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                2<span className="text-orange-400">min</span>
              </div>
              <p className="text-white/50 text-sm">Average setup time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                100<span className="text-orange-400">%</span>
              </div>
              <p className="text-white/50 text-sm">Free to use</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                ∞
              </div>
              <p className="text-white/50 text-sm">Unlimited views</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                24<span className="text-orange-400">/7</span>
              </div>
              <p className="text-white/50 text-sm">Always online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}