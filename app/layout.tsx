import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Link1t - Instant Developer Portfolio Generator",
  description:
    "Create a stunning developer portfolio in seconds. Upload your resume, let AI do the work, and get a shareable link to impress recruiters.",
  keywords: ["portfolio", "developer", "resume", "AI", "generator", "career"],
  authors: [{ name: "Link1t Team" }],
  openGraph: {
    title: "Link1t - Instant Developer Portfolio Generator",
    description: "Create a stunning developer portfolio in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "4fac4de58213481d98a2e09057316c38"}'></script>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
