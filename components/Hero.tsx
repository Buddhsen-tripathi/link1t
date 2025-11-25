"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react"
import DarkVeil from "@/components/ui/DarkVeil"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => {
      elements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen overflow-hidden pt-12 md:pt-16 lg:pt-20"
    >
      {/* DarkVeil background */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil 
          hueShift={0.08}
          noiseIntensity={0.03}
          scanlineIntensity={0.04}
          speed={0.3}
          scanlineFrequency={120}
          warpAmount={0.02}
          resolutionScale={1}
        />
        {/* Fade overlay at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="container px-4 md:px-6 pt-32 pb-32 md:pt-40 md:pb-48 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI-Powered Portfolio Builder</span>
            </div>

            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]"
            >
              <span className="text-white">Developer</span>
              <br />
              <span className="text-white">Portfolio</span>{" "}
              <span className="text-orange-400">
                in Seconds
              </span>
            </h1>

            <p 
              className="text-lg md:text-xl text-white/70 max-w-[540px] leading-relaxed mx-auto lg:mx-0"
            >
              Create a stunning developer portfolio instantly. Upload your resume, let AI extract your experience, and get a shareable link to impress recruiters.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white border-0">
                <Link href="/generator">
                  {isLoaded && isSignedIn ? 'Edit Portfolio' : 'Create Your Portfolio'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div 
              className="flex flex-wrap items-center gap-8 justify-center lg:justify-start pt-2"
            >
              <div className="flex items-center gap-2.5 text-white/60">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">Setup in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">Live URL instantly</span>
              </div>
            </div>
          </div>
          
          {/* Portfolio Preview Card */}
          <div 
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-3xl blur-3xl opacity-40" />
              
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 z-20 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold">
                ✨ Live Preview
              </div>

              {/* Main card */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-black/60 backdrop-blur-xl">
                {/* Browser-like header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/10 rounded-lg px-4 py-1.5 text-xs text-white/60 text-center font-medium">
                      link1t.com/p/johndoe
                    </div>
                  </div>
                </div>

                {/* Portfolio content preview */}
                <div className="p-6 space-y-5">
                  {/* Profile section */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                      JD
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white">John Doe</h3>
                      <p className="text-sm text-white/60">Full Stack Developer</p>
                      <div className="flex gap-1.5 mt-2.5 flex-wrap">
                        <span className="text-xs px-2.5 py-1 bg-orange-500/20 text-orange-400 rounded-md font-medium">React</span>
                        <span className="text-xs px-2.5 py-1 bg-orange-500/20 text-orange-400 rounded-md font-medium">Node.js</span>
                        <span className="text-xs px-2.5 py-1 bg-orange-500/20 text-orange-400 rounded-md font-medium">TypeScript</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience preview */}
                  <div className="space-y-2.5">
                    <div className="flex items-center p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">G</div>
                        <div>
                          <p className="font-semibold text-sm text-white">Senior Engineer</p>
                          <p className="text-xs text-white/50">Google · 2021 - Present</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">M</div>
                        <div>
                          <p className="font-semibold text-sm text-white">Software Engineer</p>
                          <p className="text-xs text-white/50">Meta · 2019 - 2021</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects preview */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="aspect-[4/3] bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🚀</span>
                    </div>
                    <div className="aspect-[4/3] bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="text-sm">💡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}