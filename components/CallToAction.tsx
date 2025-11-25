import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Check } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden bg-black">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="relative">
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-orange-500/10 rounded-[40px] blur-3xl" />
          
          {/* Main CTA card */}
          <div className="relative rounded-3xl bg-white/5 border border-white/10 p-12 md:p-20 text-center overflow-hidden">
              
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-10">
                <Rocket className="w-4 h-4 text-orange-400" />
                <span>Start building today</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
                Ready to build your<br />professional portfolio?
              </h2>
              
              <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-12 leading-relaxed">
                Join developers who&apos;ve already created their professional portfolio in minutes. 
                It&apos;s free, fast, and looks amazing.
              </p>

              {/* Feature bullets */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
                <div className="flex items-center gap-2.5 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">Free forever</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">Setup in 2 minutes</span>
                </div>
              </div>
              
              <Button 
                asChild 
                size="lg" 
                className="rounded-full h-14 px-10 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white border-0"
              >
                <Link href="/generator">
                  Create Portfolio Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}