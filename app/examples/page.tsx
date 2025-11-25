"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Eye } from "lucide-react"

// Define a type for example data for better structure
type ExampleShowcase = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // URL for a preview image
  liveDemoUrl?: string; // Link to a live demo or a user's page
  tags: string[];
  featuresHighlighted: string[];
};

const exampleData: ExampleShowcase[] = [
  {
    id: "creator-portfolio",
    title: "Creator Portfolio",
    description: "A vibrant page showcasing a digital artist's work, commission info, and social media links. Perfect for illustrators, designers, and photographers.",
    imageUrl: "https://placehold.co/600x400/A9A9A9/FFFFFF?text=Artist+Portfolio", // Replace with actual image
    liveDemoUrl: "#", // Replace with actual link
    tags: ["Art", "Portfolio", "Social Media", "Freelancer"],
    featuresHighlighted: ["Custom Background Image", "Rounded Buttons", "Bio Section", "Image Gallery Link"],
  },
  {
    id: "musician-hub",
    title: "Musician's Hub",
    description: "A central hub for a musician to share new releases, tour dates, merch, and links to Spotify, Apple Music, and YouTube.",
    imageUrl: "https://placehold.co/600x400/D2B48C/FFFFFF?text=Musician+Hub", // Replace with actual image
    liveDemoUrl: "#",
    tags: ["Music", "Events", "Merchandise", "Band"],
    featuresHighlighted: ["Embedded Music Player (concept)", "Link to Ticket Sales", "Themed Colors", "Video Showcase"],
  },
  {
    id: "small-business",
    title: "Small Business Landing",
    description: "A simple yet effective page for a local bakery to list their menu, location, contact details, and online ordering link.",
    imageUrl: "https://placehold.co/600x400/FFC0CB/333333?text=Bakery+Page", // Replace with actual image
    liveDemoUrl: "#",
    tags: ["Business", "Local", "Food", "Services"],
    featuresHighlighted: ["Clear Call-to-Actions", "Contact Information", "Simple Design", "Map Link"],
  }
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Discover What's Possible
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how creators, businesses, and individuals are using Link1t to connect with their audience and showcase their world.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exampleData.map((example) => (
            <Card 
              key={example.id} 
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-transparent hover:border-primary/50 group bg-card/80 dark:bg-card/70 backdrop-blur-sm" // Added bg-card with opacity and backdrop-blur
            >
              {example.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={example.imageUrl}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{example.title}</CardTitle>
                <CardDescription className="text-sm pt-1"> 
                  {example.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="text-xs font-semibold mb-1.5 uppercase tracking-wider text-muted-foreground">Tags:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full group-hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold mb-1.5 uppercase tracking-wider text-muted-foreground">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {example.featuresHighlighted.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                {example.liveDemoUrl && example.liveDemoUrl !== "#" ? (
                  <Button asChild variant="default" className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={example.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" /> View Live Example
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    <Eye className="mr-2 h-4 w-4" /> Live Example (Soon)
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 md:mt-24 py-12 md:py-16 bg-card/70 dark:bg-card/60 backdrop-blur-sm rounded-xl shadow-inner text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-5 text-foreground">
            Ready to Create Yours?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-md md:text-lg">
            Join thousands of others and build your perfect link-in-bio page today. It's free, fun, and fast!
          </p>
          <Button asChild size="xl" className="rounded-full">
            <Link href="/signup">
              Get Started Now <ArrowRight className="ml-2.5 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}