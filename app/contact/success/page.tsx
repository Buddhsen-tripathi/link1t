"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, MessageSquarePlus } from "lucide-react"

export default function ContactSuccessPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effect divs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
          Message Sent Successfully!
        </h1>
        <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8">
          Thank you for reaching out. We've received your message and will get back to you as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400"
          >
            <Link href="/contact">
              <MessageSquarePlus className="mr-2 h-4 w-4" /> Send Another Message
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}