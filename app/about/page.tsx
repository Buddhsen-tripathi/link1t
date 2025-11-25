"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Target, BookOpen, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            About Link1t
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting your world, one link at a time.<br/> Discover who we are and what drives us.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
          <section id="mission">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Target className="h-10 w-10 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-center md:text-left">
              At Link1t, our mission is to empower creators, businesses, and individuals to consolidate their online presence into a single, elegant, and powerful link. We believe in simplicity, efficiency, and the power of connection. We strive to provide a platform that is not only easy to use but also beautiful and highly customizable, allowing your unique brand to shine.
            </p>
          </section>

          <section id="story">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <BookOpen className="h-10 w-10 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-semibold">Our Story</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-center md:text-left">
              Born from the need to simplify the ever-expanding digital landscape, Link1t was created by a small team of passionate developers and designers. We saw the clutter of multiple social media handles, website links, and portfolio pages, and envisioned a streamlined solution. What started as a side project quickly grew into a dedicated effort to build the best "link-in-bio" tool on the market, focusing on user experience and powerful features.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-center md:text-left">
              We are constantly innovating, listening to our users, and adding new features to make Link1t the ultimate tool for anyone looking to make a strong first impression online.
            </p>
          </section>

          <section id="values">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Sparkles className="h-10 w-10 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-semibold">Our Values</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground text-center md:text-left">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2.5 flex-shrink-0 mt-1" />
                <span><strong>User-Centricity:</strong> Our users are at the heart of everything we do. We build for you.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2.5 flex-shrink-0 mt-1" />
                <span><strong>Simplicity:</strong> We believe powerful tools don't need to be complicated.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2.5 flex-shrink-0 mt-1" />
                <span><strong>Innovation:</strong> We are always exploring new ways to enhance your experience.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2.5 flex-shrink-0 mt-1" />
                <span><strong>Transparency:</strong> We believe in open communication and clear practices.</span>
              </li>
            </ul>
          </section>

          <section id="join-us" className="text-center pt-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Simplify Your Links?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Join thousands of creators and businesses who trust Link1t to make their online presence shine.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}

// Helper component (can be in the same file or imported)
const CheckCircle2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);