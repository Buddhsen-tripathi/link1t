'use client'

import Image from 'next/image'
import { Briefcase, ExternalLink, MapPin } from 'lucide-react'
import { PortfolioData } from '@/types/portfolio'

interface ExperienceProps {
  experiences: PortfolioData['experiences']
}

export default function Experience({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) return null

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
          <Briefcase className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Work Experience
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="group relative flex gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-card hover:bg-accent/50 border border-border transition-all duration-300 hover:shadow-md"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%-1.5rem)] w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

              {/* Logo / Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center border border-border overflow-hidden shadow-sm">
                  {exp.logo ? (
                    <Image 
                      src={exp.logo} 
                      alt={`${exp.company} logo`}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {exp.company[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="space-y-1">
                    {exp.companyUrl ? (
                      <a 
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-lg text-foreground hover:text-primary transition-colors group/link"
                      >
                        {exp.company}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <h3 className="font-semibold text-lg text-foreground">
                        {exp.company}
                      </h3>
                    )}
                    <p className="text-primary font-medium">
                      {exp.role}
                    </p>
                    {exp.location && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/50 text-sm font-medium text-muted-foreground tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
