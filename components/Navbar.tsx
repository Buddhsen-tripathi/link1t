"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link as LinkIcon, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const { isLoaded, isSignedIn } = useUser()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const AuthButton = () => {
        if (!isLoaded) return null
        return isSignedIn ? (
            <UserButton
                appearance={{
                    elements: { userButtonAvatarBox: "h-6 w-6" }
                }}
            />
        ) : (
            <SignInButton mode="modal">
                <Button variant="ghost">Log in</Button>
            </SignInButton>
        )
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/90 shadow-sm backdrop-blur-md"
                    : "bg-transparent"
            )}
        >
            <nav className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center space-x-2">
                    <LinkIcon className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Link1t</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <AuthButton />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="mr-2"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center space-x-2">
                    <AuthButton />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="mr-2"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </nav>
        </header>
    )
}