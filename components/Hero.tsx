"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

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
      className="relative pt-20 md:pt-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container px-4 md:px-6 pt-10 pb-24 md:pt-14 md:pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "0.1s" }}
            >
              Your Link-in-Bio{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Reimagined
              </span>
            </h1>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-[600px] animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" 
              style={{ animationDelay: "0.3s" }}
            >
              Customize your page, share your links, stand out everywhere. The most flexible way to showcase everything you are in one place.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: "0.5s" }}
            >
              <Button asChild variant="gradient" size="xl" className="rounded-full">
                <Link href="/signup">Create Your Link1t</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full">
                <Link href="/examples">See Examples</Link>
              </Button>
            </div>
          </div>
          
          <div 
            className="relative order-1 md:order-2 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="relative mx-auto w-64 sm:w-72 md:w-80 aspect-[9/16] rounded-[2.5rem] border-[8px] border-gray-800 dark:border-gray-700 shadow-xl overflow-hidden rotate-6 hover:rotate-0 transition-all duration-300">
              {/* Mock phone screen with Link1t preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
                <div className="flex flex-col items-center pt-8 px-4 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 shadow-md"></div>
                  <h3 className="text-white font-medium">@username</h3>
                  <div className="w-full space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="w-full h-12 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-opacity-90 text-sm"
                      >
                        Link {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 rounded-full bg-purple-500/30 blur-3xl"></div>
            <div className="absolute -z-10 -top-5 -left-5 w-32 h-32 rounded-full bg-blue-500/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}