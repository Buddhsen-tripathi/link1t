import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: "Generator", href: "/generator" },
      { label: "Features", href: "/#features" },
      { label: "Examples", href: "/examples" },
      { label: "Pricing", href: "/pricing" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10">
      
      <div className="container px-4 md:px-6 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <Image 
                src="/favicon.ico" 
                alt="Link1t" 
                width={32} 
                height={32} 
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-white">Link1t</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Create stunning developer portfolios in seconds with AI-powered setup. The easiest way to showcase your work.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-orange-500/20 flex items-center justify-center text-white/60 hover:text-orange-400 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/60 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/60 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/60 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center md:text-left">
              © {currentYear} Link1t. All rights reserved.
            </p>
            <p className="text-sm text-white/50 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
              <a 
                href="https://github.com/Buddhsen-tripathi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline font-medium"
              >
                Buddhsen Tripathi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}