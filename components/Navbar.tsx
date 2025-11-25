"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Sparkles } from "lucide-react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isLoaded, isSignedIn } = useUser()
    const pathname = usePathname()
    const isHome = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false)
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const AuthButton = () => {
        if (!isLoaded) return <div className="w-8 h-8 bg-muted/50 rounded-full animate-pulse" />
        return isSignedIn ? (
            <UserButton
                appearance={{
                    elements: { 
                        userButtonAvatarBox: "h-8 w-8 ring-2 ring-purple-500/20" 
                    }
                }}
            />
        ) : (
            <SignInButton mode="modal">
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Log in
                </button>
            </SignInButton>
        )
    }

    const navLinks = [
        { href: "/generator", label: "Generator", icon: Sparkles },
        { href: "/examples", label: "Examples" },
        { href: "/pricing", label: "Pricing" },
    ]

    return (
        <>
            <header 
                className={cn(
                    "fixed top-4 md:top-6 left-0 right-0 z-50 mx-auto max-w-4xl transition-all duration-500 px-4",
                    scrolled ? "top-3 md:top-4" : "",
                    isHome && "dark"
                )}
            >
                <div className={cn(
                    "flex h-14 items-center justify-between rounded-full border px-4 md:px-6 backdrop-blur-xl transition-all duration-500",
                    isHome 
                        ? (scrolled 
                            ? "border-white/10 bg-black/60 shadow-lg" 
                            : "border-transparent bg-black/30")
                        : (scrolled 
                            ? "border-border bg-background/80 shadow-sm" 
                            : "border-transparent bg-background/40")
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image 
                            src="/favicon.ico" 
                            alt="Link1t" 
                            width={28} 
                            height={28} 
                            className="rounded-lg"
                        />
                        <span className={cn(
                            "text-lg font-bold tracking-tight",
                            isHome ? "text-white" : "text-foreground"
                        )}>
                            Link1t
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className={cn(
                                    "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full",
                                    isHome 
                                        ? "text-white/70 hover:text-white hover:bg-white/10" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                )}
                            >
                                <span className="flex items-center gap-1.5">
                                    {link.icon && <link.icon className="w-3.5 h-3.5" />}
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Auth button - desktop */}
                        <div className="hidden md:block">
                            <AuthButton />
                        </div>
                        
                        <Link 
                            href="/generator" 
                            className="hidden md:inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-primary/90"
                        >
                            Create Portfolio
                        </Link>

                        {/* Mobile buttons */}
                        <div className="md:hidden flex items-center gap-2">
                            <AuthButton />
                            <button
                                className={cn(
                                    "p-2 transition-colors",
                                    isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Floating card below navbar */}
                <div 
                    className={cn(
                        "absolute top-16 left-4 right-4 rounded-2xl border backdrop-blur-xl p-4 shadow-2xl md:hidden transition-all duration-300 origin-top",
                        isHome 
                            ? "border-white/10 bg-black/90" 
                            : "border-border/50 bg-background/95",
                        mobileMenuOpen 
                            ? "opacity-100 scale-100 translate-y-0" 
                            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                    )}
                >
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all",
                                    isHome 
                                        ? "text-white/70 hover:text-white hover:bg-white/10" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                )}
                            >
                                {link.icon && <link.icon className="w-4 h-4" />}
                                {link.label}
                            </Link>
                        ))}
                        <div className={cn(
                            "pt-3 mt-2 border-t",
                            isHome ? "border-white/10" : "border-border/50"
                        )}>
                            <Link 
                                href="/generator"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold w-full hover:bg-primary/90 transition-all"
                            >
                                Create Portfolio
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Backdrop for mobile menu */}
            <div 
                className={cn(
                    "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300",
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />
        </>
    )
}