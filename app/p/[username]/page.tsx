import { notFound } from 'next/navigation'
import Hero from '@/components/portfolio/HeroSection'
import Experience from '@/components/portfolio/Experience'
import FeaturedProjects from '@/components/portfolio/FeaturedProjects'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabaseServer'
import { PortfolioData } from '@/types/portfolio'
import Link from 'next/link'
import { Link as LinkIcon } from 'lucide-react'

interface Props {
  params: Promise<{
    username: string
  }>
}

async function getPortfolioData(username: string): Promise<PortfolioData | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolios')
    .select('data')
    .eq('slug', username)
    .single()

  if (error || !data) {
    return null
  }

  return data.data as PortfolioData
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const data = await getPortfolioData(username)
  
  if (!data) {
    return {
      title: 'User Not Found',
    }
  }

  return {
    title: `${data.hero.name} - Portfolio`,
    description: data.hero.bio || `${data.hero.name}'s professional portfolio`,
    openGraph: {
      title: `${data.hero.name} - Portfolio`,
      description: data.hero.bio || `${data.hero.name}'s professional portfolio`,
      type: 'profile',
    },
  }
}

export default async function PortfolioPage({ params }: Props) {
  const { username } = await params
  const data = await getPortfolioData(username)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <section className="space-y-12 md:space-y-16">
          <Hero heroData={data.hero} />
          <Experience experiences={data.experiences} />
          <FeaturedProjects projects={data.projects} />
        </section>
        
        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {data.hero.name}. All rights reserved.
            </p>
            <Link 
              href="https://link1t.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="bg-primary p-1 rounded">
                <LinkIcon className="w-3 h-3 text-primary-foreground" />
              </div>
              Built with Link1t
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
