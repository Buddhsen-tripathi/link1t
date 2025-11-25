'use client'

import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PortfolioData, SocialLink, Experience, Project } from '@/types/portfolio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Save, ArrowRight, ArrowLeft, Check, Loader2, Calendar as CalendarIcon, X, User, Briefcase, FolderOpen, Sparkles } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface TagInputProps {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (index: number) => void
  placeholder?: string
}

const TagInput = ({ tags, onAdd, onRemove, placeholder }: TagInputProps) => {
  const [input, setInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) {
        onAdd(input.trim())
        setInput('')
      }
    }
  }

  return (
    <div className="space-y-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type and press Enter..."}
        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-muted text-foreground px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border border-border hover:border-primary/50 transition-colors group"
          >
            <span className="font-medium">{tag}</span>
            <button 
              onClick={() => onRemove(index)} 
              className="hover:text-destructive opacity-60 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ParsedResumeData {
  name?: string
  title?: string
  email?: string
  subtitle?: string[]
  bio?: string
  socialLinks?: { platform: string; url: string }[]
  experiences?: { company: string; role: string; location: string; period: string }[]
  projects?: { title: string; description: string; technologies: string[]; github?: string; demo?: string }[]
  skills?: string[]
}

interface PortfolioFormProps {
  username: string
  onComplete: (data: PortfolioData) => void
  isSubmitting?: boolean
  prefillData?: ParsedResumeData | PortfolioData | null
  isEditMode?: boolean
}

export default function PortfolioForm({ username, onComplete, isSubmitting = false, prefillData, isEditMode = false }: PortfolioFormProps) {
  const [activeTab, setActiveTab] = useState('hero')
  const [isUploading, setIsUploading] = useState(false)
  
  const buildInitialFormData = (): PortfolioData => {
    const defaultSocialLinks: SocialLink[] = [
      { platform: 'github', url: '', label: 'GitHub' },
      { platform: 'linkedin', url: '', label: 'LinkedIn' }
    ]

    if (!prefillData) {
      return {
        slug: username,
        hero: {
          name: '',
          title: '',
          email: '',
          subtitle: ['Full Stack Developer'],
          bio: '',
          profileImage: '',
          socialLinks: defaultSocialLinks
        },
        experiences: [],
        projects: []
      }
    }

    // Check if prefillData is already PortfolioData (edit mode)
    if ('hero' in prefillData && 'experiences' in prefillData) {
      return prefillData as PortfolioData
    }

    // Otherwise it's ParsedResumeData (new portfolio from resume)
    const parsedData = prefillData as ParsedResumeData

    const socialLinks: SocialLink[] = parsedData.socialLinks?.map(link => ({
      platform: link.platform as SocialLink['platform'],
      url: link.url,
      label: link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
    })) || defaultSocialLinks

    const experiences: Experience[] = parsedData.experiences?.map(exp => ({
      company: exp.company || '',
      role: exp.role || '',
      location: exp.location || '',
      period: exp.period || ''
    })) || []

    const projects: Project[] = parsedData.projects?.map(proj => ({
      title: proj.title || '',
      description: proj.description || '',
      image: '',
      technologies: proj.technologies || [],
      github: proj.github || '',
      demo: proj.demo || '',
      active: true
    })) || []

    return {
      slug: username,
      hero: {
        name: parsedData.name || '',
        title: parsedData.title || '',
        email: parsedData.email || '',
        subtitle: parsedData.subtitle || ['Full Stack Developer'],
        bio: parsedData.bio || '',
        profileImage: '',
        socialLinks: socialLinks.length > 0 ? socialLinks : defaultSocialLinks
      },
      experiences,
      projects
    }
  }

  const [formData, setFormData] = useState<PortfolioData>(buildInitialFormData())
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [experienceDates, setExperienceDates] = useState<{
    [key: number]: { start: string; end: string; isCurrent: boolean }
  }>({})

  // Update form data when prefillData changes (for edit mode)
  useEffect(() => {
    if (prefillData && 'hero' in prefillData && 'experiences' in prefillData) {
      // It's PortfolioData from edit mode
      setFormData(prefillData as PortfolioData)
    }
  }, [prefillData])

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.hero.name.trim()) {
      errors.push('Name is required')
    }

    if (!formData.hero.email?.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hero.email)) {
      errors.push('Please enter a valid email address')
    }

    formData.experiences.forEach((exp, index) => {
      if (!exp.company.trim() || !exp.role.trim()) {
        errors.push(`Experience ${index + 1}: Company and Role are required`)
      }
    })

    formData.projects.forEach((proj, index) => {
      const missing: string[] = []
      if (!proj.title.trim()) missing.push('Title')
      if (!proj.description.trim()) missing.push('Description')
      if (!proj.image.trim()) missing.push('Image')
      
      if (missing.length > 0) {
        errors.push(`Project "${proj.title || index + 1}": ${missing.join(', ')} required`)
      }
    })

    return errors
  }

  const handleFileUpload = async (file: File, maxSizeMB: number = 4.5) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB limit`)
      return null
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', username)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        return data.url
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload file')
      return null
    }
  }

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const url = await handleFileUpload(file)
    if (url) updateHero('profileImage', url)
    setIsUploading(false)
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const url = await handleFileUpload(file, 2)
    if (url) updateHero('resumeUrl', url)
    setIsUploading(false)
  }

  const handleExperienceLogoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const url = await handleFileUpload(file)
    if (url) updateExperience(index, 'logo', url)
    setIsUploading(false)
  }

  const handleProjectImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const url = await handleFileUpload(file)
    if (url) updateProject(index, 'image', url)
    setIsUploading(false)
  }

  const updateHero = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const addSubtitleTag = (tag: string) => {
    updateHero('subtitle', [...formData.hero.subtitle, tag])
  }

  const removeSubtitleTag = (index: number) => {
    const newSubtitles = formData.hero.subtitle.filter((_, i) => i !== index)
    updateHero('subtitle', newSubtitles)
  }

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...formData.hero.socialLinks]
    // @ts-ignore
    newLinks[index][field] = value
    updateHero('socialLinks', newLinks)
  }

  const addSocialLink = () => {
    updateHero('socialLinks', [...formData.hero.socialLinks, { platform: 'other', url: '', label: '' }])
  }

  const removeSocialLink = (index: number) => {
    const newLinks = formData.hero.socialLinks.filter((_, i) => i !== index)
    updateHero('socialLinks', newLinks)
  }

  const addExperience = () => {
    const newIndex = formData.experiences.length
    setExperienceDates(prev => ({
      ...prev,
      [newIndex]: { start: '', end: '', isCurrent: false }
    }))
    
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: '', role: '', location: '', period: '', companyUrl: '' }
      ]
    }))
  }

  const updateExperienceDate = (index: number, field: 'start' | 'end' | 'isCurrent', value: any) => {
    const currentDates = experienceDates[index] || { start: '', end: '', isCurrent: false }
    const newDates = { ...currentDates, [field]: value }
    
    setExperienceDates(prev => ({ ...prev, [index]: newDates }))
    
    let periodStr = ''
    if (newDates.start) {
      const startDate = new Date(newDates.start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      if (newDates.isCurrent) {
        periodStr = `${startDate} - Present`
      } else if (newDates.end) {
        const endDate = new Date(newDates.end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        periodStr = `${startDate} - ${endDate}`
      } else {
        periodStr = startDate
      }
    }
    
    updateExperience(index, 'period', periodStr)
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperiences = [...formData.experiences]
    newExperiences[index] = { ...newExperiences[index], [field]: value }
    setFormData(prev => ({ ...prev, experiences: newExperiences }))
  }

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', description: '', image: '', technologies: [], demo: '', github: '', active: true }
      ]
    }))
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...formData.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setFormData(prev => ({ ...prev, projects: newProjects }))
  }

  const updateProjectTech = (index: number, tech: string) => {
    const currentTechs = formData.projects[index].technologies
    updateProject(index, 'technologies', [...currentTechs, tech])
  }

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const getSocialPrefix = (platform: string) => {
    switch (platform) {
      case 'github': return 'github.com/';
      case 'linkedin': return 'linkedin.com/in/';
      case 'twitter': return 'x.com/';
      case 'leetcode': return 'leetcode.com/';
      case 'youtube': return 'youtube.com/@';
      default: return '';
    }
  }

  const handleSubmit = () => {
    const errors = validateForm()
    setValidationErrors(errors)
    
    if (errors.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    onComplete(formData)
  }

  const tabs = [
    { id: 'hero', label: 'Profile & Hero', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {isEditMode ? 'Edit' : 'Create'} Portfolio: <span className="text-primary">{username}</span>
          </h2>
          <p className="text-muted-foreground mt-1">{isEditMode ? 'Update your portfolio information' : 'Complete all sections to create your portfolio'}</p>
        </div>
        <Button 
          onClick={handleSubmit} 
          className="gap-2" 
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Save & Publish'}
        </Button>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-8 p-5 bg-destructive/10 border border-destructive/30 rounded-xl backdrop-blur-sm">
          <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
            <X className="w-5 h-5" />
            Please fix the following errors:
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-destructive/90">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-10 h-auto p-1.5 bg-muted/50 backdrop-blur-sm rounded-xl">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>This information will appear in the hero section of your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name" 
                    value={formData.hero.name} 
                    onChange={(e) => updateHero('name', e.target.value)} 
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Main Title</Label>
                  <Input 
                    id="title" 
                    value={formData.hero.title} 
                    onChange={(e) => updateHero('title', e.target.value)} 
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.hero.email || ''} 
                    onChange={(e) => updateHero('email', e.target.value)} 
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subtitles</Label>
                <TagInput 
                  tags={formData.hero.subtitle}
                  onAdd={addSubtitleTag}
                  onRemove={removeSubtitleTag}
                  placeholder="e.g. Full Stack Developer (Press Enter to add)"
                />
                <p className="text-xs text-muted-foreground">Add multiple subtitles to describe yourself.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={formData.hero.bio} 
                  onChange={(e) => updateHero('bio', e.target.value)} 
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <Input 
                      id="profileImage" 
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      disabled={isUploading}
                    />
                  </div>
                  {isUploading && <Loader2 className="animate-spin text-primary" />}
                </div>
                {formData.hero.profileImage && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                    <img src={formData.hero.profileImage} alt="Profile Preview" className="w-16 h-16 rounded-full object-cover border" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Upload an image (max 4.5MB).</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Downloadable Resume (PDF)</Label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <Input 
                      id="resume" 
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      disabled={isUploading}
                    />
                  </div>
                  {isUploading && <Loader2 className="animate-spin text-primary" />}
                </div>
                {formData.hero.resumeUrl && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <Check size={16} />
                    <span>Resume uploaded successfully</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">This PDF will be available for visitors to download.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.hero.socialLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4 last:border-0">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <select 
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter/X</option>
                      <option value="email">Email</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>{getSocialPrefix(link.platform) ? 'Username' : 'URL'}</Label>
                    <div className="flex items-center">
                      {getSocialPrefix(link.platform) && (
                        <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground">
                          {getSocialPrefix(link.platform)}
                        </span>
                      )}
                      <Input 
                        className={getSocialPrefix(link.platform) ? 'rounded-l-none' : ''}
                        value={link.url.replace('https://' + getSocialPrefix(link.platform), '')} 
                        onChange={(e) => {
                          const prefix = getSocialPrefix(link.platform);
                          const val = e.target.value;
                          if (prefix) {
                             updateSocialLink(index, 'url', `https://${prefix}${val}`)
                          } else {
                             updateSocialLink(index, 'url', val)
                          }
                        }} 
                        placeholder={getSocialPrefix(link.platform) ? 'username' : 'https://...'}
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSocialLink}>
                <Plus size={14} className="mr-1" /> Add Social Link
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={() => setActiveTab('experience')}>
              Next: Experience <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your professional experience here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experiences.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No experience added yet.
                </div>
              )}
              
              {formData.experiences.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name <span className="text-destructive">*</span></Label>
                      <Input 
                        value={exp.company} 
                        onChange={(e) => updateExperience(index, 'company', e.target.value)} 
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Logo</Label>
                      <div className="flex gap-2 items-center">
                        <Input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleExperienceLogoUpload(index, e)}
                          disabled={isUploading}
                        />
                        {exp.logo && (
                          <img src={exp.logo} alt="Logo" className="w-10 h-10 object-contain border rounded" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Role <span className="text-destructive">*</span></Label>
                      <Input 
                        value={exp.role} 
                        onChange={(e) => updateExperience(index, 'role', e.target.value)} 
                        placeholder="Senior Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input 
                        value={exp.location} 
                        onChange={(e) => updateExperience(index, 'location', e.target.value)} 
                        placeholder="New York, NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Period</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Start Date</Label>
                          <Input 
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={experienceDates[index]?.start || ''}
                            onChange={(e) => updateExperienceDate(index, 'start', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">End Date</Label>
                          <Input 
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={experienceDates[index]?.end || ''}
                            onChange={(e) => updateExperienceDate(index, 'end', e.target.value)}
                            disabled={experienceDates[index]?.isCurrent}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox 
                          id={`current-${index}`} 
                          checked={experienceDates[index]?.isCurrent || false}
                          onCheckedChange={(checked: boolean) => updateExperienceDate(index, 'isCurrent', checked)}
                        />
                        <Label htmlFor={`current-${index}`} className="text-sm font-normal cursor-pointer">
                          I currently work here
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Preview: {exp.period || 'Select dates'}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" onClick={addExperience} className="w-full">
                <Plus size={14} className="mr-1" /> Add Experience
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab('hero')}>
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <Button onClick={() => setActiveTab('projects')}>
              Next: Projects <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Showcase your best work.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No projects added yet.
                </div>
              )}

              {formData.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>

                  <div className="space-y-2">
                    <Label>Project Title <span className="text-destructive">*</span></Label>
                    <Input 
                      value={project.title} 
                      onChange={(e) => updateProject(index, 'title', e.target.value)} 
                      placeholder="My Awesome App"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description <span className="text-destructive">*</span></Label>
                    <Textarea 
                      value={project.description} 
                      onChange={(e) => updateProject(index, 'description', e.target.value)} 
                      placeholder="Describe what you built..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Image <span className="text-destructive">*</span></Label>
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProjectImageUpload(index, e)}
                        disabled={isUploading}
                      />
                      {project.image && (
                        <div className="mt-2">
                          <img src={project.image} alt="Project" className="w-full h-32 object-cover rounded border" />
                        </div>
                      )}
                      <Input 
                        value={project.image} 
                        onChange={(e) => updateProject(index, 'image', e.target.value)} 
                        placeholder="Or enter image URL..."
                        className="mt-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies</Label>
                      <TagInput 
                        tags={project.technologies} 
                        onAdd={(tag) => updateProjectTech(index, tag)} 
                        onRemove={(i) => {
                          const techs = [...project.technologies]
                          techs.splice(i, 1)
                          updateProject(index, 'technologies', techs)
                        }}
                        placeholder="React, Node.js, TypeScript"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Demo URL</Label>
                      <Input 
                        value={project.demo || ''} 
                        onChange={(e) => updateProject(index, 'demo', e.target.value)} 
                        placeholder="https://demo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input 
                        value={project.github || ''} 
                        onChange={(e) => updateProject(index, 'github', e.target.value)} 
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id={`active-${index}`}
                      checked={project.active}
                      onCheckedChange={(checked) => updateProject(index, 'active', !!checked)}
                    />
                    <Label htmlFor={`active-${index}`} className="text-sm font-normal cursor-pointer">
                      Active project (still being developed/maintained)
                    </Label>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addProject} className="w-full">
                <Plus size={14} className="mr-1" /> Add Project
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab('experience')} disabled={isSubmitting}>
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              <span className="ml-2">{isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Finish & Generate'}</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
