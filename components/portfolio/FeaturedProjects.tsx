'use client'

import Image from 'next/image'
import { ExternalLink, Github, Rocket, FolderGit2 } from 'lucide-react'
import { PortfolioData } from '@/types/portfolio'

interface FeaturedProjectsProps {
  projects: PortfolioData['projects']
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Filter out fun projects (those with path property are special/fun projects)
  const mainProjects = projects.filter(p => !p.path)

  if (!mainProjects || mainProjects.length === 0) return null

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Featured Projects
        </h2>
      </div>
      
      {/* Grid Layout for Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainProjects.map((project, index) => (
          <div 
            key={project.title} 
            className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30"
          >
            {/* Image with overlay */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Rocket className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Active/Inactive badge */}
              <div className="absolute top-4 right-4">
                {project.active ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-gray-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                    Archived
                  </span>
                )}
              </div>

              {/* Quick links on hover */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-muted border border-border text-foreground px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
