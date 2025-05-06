import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 -left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 -right-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to create your unique <span className="text-purple-600 dark:text-purple-400">Link1t</span> page?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of creators, influencers, and professionals who've already made the switch.
        </p>
        <Button asChild variant="gradient" size="xl" className="rounded-full">
          <Link href="/signup">Get Started for Free</Link>
        </Button>
      </div>
    </section>
  )
}