export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'leetcode' | 'youtube' | 'email' | 'other';
  url: string;
  label?: string;
}

export interface Experience {
  company: string;
  logo?: string;
  companyUrl?: string;
  role: string;
  location: string;
  period: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
  github?: string;
  demo?: string;
  technologies: string[];
  active?: boolean;
  path?: string;
}

export interface PortfolioData {
  slug: string;
  hero: {
    name: string;
    title: string;
    subtitle: string[];
    bio: string;
    email?: string;
    profileImage: string;
    resumeUrl?: string;
    socialLinks: SocialLink[];
  };
  experiences: Experience[];
  projects: Project[];
}
