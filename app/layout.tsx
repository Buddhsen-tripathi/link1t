import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Link1t",
  description:
    "Create a personalized link page with full customization, mobile optimization, lightning-fast load times, and built-in analytics."
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <ClerkProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <body>
            {children}
          </body>
          <Footer />
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
