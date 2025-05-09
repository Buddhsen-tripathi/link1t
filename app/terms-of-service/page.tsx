"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function TermsOfServicePage() {
  const [currentDate, setCurrentDate] = useState("");
  
  const companyName = "Link1t";
  const contactEmail = "support@link1t.com"; 
  const websiteUrl = "https://link1t.com";

  useEffect(() => {
    const date = new Date();
    const utcDateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
    setCurrentDate(utcDateString);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effect divs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Last Updated: {currentDate || "Loading..."}
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-card/80 dark:bg-card/70 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl border border-border prose dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
          <p className="mb-4">
            Welcome to <span className="text-purple-500">{companyName}</span>. These Terms of Service ("Terms") govern your use of our website ({websiteUrl}), and the services provided by {companyName} (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p className="mb-4 mt-2">
            By creating an account or using the Service, you affirm that you are at least 18 years old or have reached the age of majority in your jurisdiction, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms, and to abide by and comply with these Terms.
          </p>

          <h2>2. Use of Our Service</h2>
          <p className="mb-4 mt-2">
            {companyName} grants you a limited, non-exclusive, non-transferable, and revocable license to use our Service for your personal or internal business purposes, subject to these Terms.
          </p>

          <p className="mb-4 mt-2">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
            <li>Violate or encourage others to violate the rights of third parties, including intellectual property rights.</li>
            <li>Post, upload, or distribute any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, hateful, or otherwise inappropriate.</li>
            <li>Interfere with security-related features of the Service.</li>
            <li>Interfere with the operation of the Service or any user’s enjoyment of it, including by uploading or otherwise disseminating viruses, adware, spyware, worms, or other malicious code.</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p className="mb-4 mt-2">
            To access certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. Content</h2>
          <p className="mb-4 mt-2">
            You retain ownership of any intellectual property rights that you hold in the content you submit to the Service. By submitting content, you grant {companyName} a worldwide, royalty-free license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content for the limited purpose of operating, promoting, and improving our Services, and to develop new ones.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p className="mb-4 mt-2">
            Impersonating as known influencers and using platform for phishing is prohibited.
          </p>
          <p className="mb-4 mt-2">
            We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.
          </p>
          
          <h2>6. Disclaimers</h2>
          <p className="mb-4 mt-2">
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. {companyName} does not warrant that the Service will be uninterrupted, secure, or error-free.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p className="mb-4 mt-2">
            To the fullest extent permitted by applicable law, in no event shall {companyName} be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the service; (b) any conduct or content of any third party on the service; or (c) unauthorized access, use, or alteration of your transmissions or content.
          </p>

          <h2>8. Indemnification</h2>
          <p className="mb-4 mt-2">
            You agree to defend, indemnify, and hold harmless {companyName} and its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service, or your violation of these Terms.
          </p>

          <h2>9. Governing Law</h2>
          <p className="mb-4 mt-2">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
          </p>

          <h2>10. Changes to Terms</h2>
          <p className="mb-4 mt-2">
            We reserve the right to modify these Terms at any time. We will provide notice of any significant changes by posting the new Terms on the Service and updating the "Last Updated" date. Your continued use of the Service after any such change constitutes your acceptance of the new Terms.
          </p>

          <h2>11. Contact Information</h2>
          <p className="mb-4 mt-2">
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>

          <p className="mb-4 mt-2">
            Please also review our <Link href="/privacy-policy" className="text-purple-500">Privacy Policy</Link> which describes how we collect and use your personal information.
          </p>
        </div>
      </div>
    </div>
  )
}
