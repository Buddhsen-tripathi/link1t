'use client'

import Image from 'next/image'
import { Download, Github, Linkedin, Twitter, Mail, Youtube, Link as LinkIcon, MapPin, Calendar } from 'lucide-react'
import { PortfolioData } from '@/types/portfolio'

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  email: Mail,
  other: LinkIcon,
}

interface HeroProps {
  heroData: PortfolioData['hero']
}

export default function Hero({ heroData }: HeroProps) {
  const email = heroData.email || heroData.socialLinks.find(l => l.platform === 'email')?.url.replace('mailto:', '')

  return (
    <section className="relative py-8 md:py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Profile Image */}
        <div className="relative group flex-shrink-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-border shadow-lg">
            {heroData.profileImage ? (
              <Image
                src={heroData.profileImage}
                alt={heroData.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-primary-foreground">
                  {heroData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center lg:items-start space-y-5 flex-1 text-center lg:text-left">
          {/* Name and title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              {heroData.name}
            </h1>
            
            {/* Subtitles as tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3">
              {heroData.subtitle.map((item, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-muted border border-border text-sm font-medium text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          {heroData.bio && (
            <p 
              className="max-w-2xl text-muted-foreground leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: heroData.bio }}
            />
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 font-medium"
              >
                <Mail size={18} />
                Get in Touch
              </a>
            )}
            {heroData.resumeUrl && (
              <a
                href={heroData.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-all duration-300 font-medium border border-border"
              >
                <Download size={18} />
                Download Resume
              </a>
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
            {heroData.socialLinks.filter(l => l.platform !== 'email' && l.url).map(({ url, platform, label }) => {
              const Icon = iconMap[platform] || LinkIcon
              return (
                <a
                  key={label || url}
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-300 border border-border"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
