"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function PrivacyPolicyPage() {
  const [currentDate, setCurrentDate] = useState("");
  
  const companyName = "Link1t"; 
  const contactEmail = "privacy@link1t.com"; 
  const websiteUrl = "https://link1t.com";
  const serviceName = "Link1t";

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
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Last Updated: {currentDate || "Loading..."}
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-card/80 dark:bg-card/70 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl border border-border prose prose-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
          <p className="mb-4">
            Welcome to <span className="text-purple-500">{companyName}</span> ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
          <p className="mb-6">
            This Privacy Policy governs the privacy policies and practices of our website, {websiteUrl}, and our {serviceName} (collectively, the "Service"). Please read this Privacy Policy carefully. By using our Service, you agree to the terms of this Privacy Policy.
          </p>

          <h2 className="mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, information we collect automatically when you use our Service, and information we collect from other sources.</p>
          
          <h3 className="mb-3">a. Information You Provide to Us</h3>
          <p className="mb-4">
            This includes information you provide when you create an account, use the Service, fill out a form, request customer support, or otherwise communicate with us. This information may include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Account Information:</strong> Such as your name, email address, password, username, and profile information (e.g., display name, bio, avatar URL).</li>
            <li><strong>Payment Information:</strong> If you make a purchase, we may collect payment information through our third-party payment processors. We do not store your full credit card information.</li>
            <li><strong>User Content:</strong> Information you provide for your public-facing page, such as links, text, images, and theme settings.</li>
            <li><strong>Communications:</strong> When you contact us, we may collect information about your communication and any information you choose to provide.</li>
          </ul>

          <h3 className="mb-3">b. Information We Collect Automatically</h3>
          <p className="mb-4">When you use our Service, we may automatically collect certain information, including:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Log and Usage Data:</strong> Such as your IP address, browser type, operating system, referral URLs, device information, pages visited, links clicked, and the dates and times of your access.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</li>
            {/* Be specific about types of cookies: e.g., session, persistent, analytics, advertising */}
          </ul>
          
          <h3 className="mb-3">c. Information We Collect from Other Sources</h3>
          <p className="mb-6">
            We may obtain information from other sources, such as third-party services and organizations. For example, if you access our Services through a third-party application, such as an app store or a social networking service, we may collect information about you from that third-party application that you have made public via your privacy settings.
          </p>

          <h2 className="mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, operate, and maintain our Service.</li>
            <li>Improve, personalize, and expand our Service.</li>
            <li>Understand and analyze how you use our Service.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes (with your consent, where required by law).</li>
            <li>Process your transactions.</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
            <li>Find and prevent fraud.</li>
            <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights, or as may be required by applicable laws and regulations or requested by any judicial process or governmental agency.</li>
          </ul>

          <h2 className="mb-4">3. How We Share Your Information</h2>
          <p className="mb-4">We may share the information we collect in various ways, including the following:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., payment processing, data analysis, email delivery, hosting services, customer service).</li>
            <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
            <li><strong>For Legal Reasons:</strong> We may disclose your information if we are required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency). This includes to meet national security or law enforcement requirements.</li>
            <li><strong>To Protect Rights:</strong> We may disclose information where we believe it necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Service, or as evidence in litigation in which we are involved.</li>
            <li><strong>Publicly Shared Information:</strong> Information you make public through the Service (e.g., your Link1t page content) will be accessible to others.</li>
          </ul>

          <h2 className="mb-4">4. Data Security</h2>
          <p className="mb-6">
            We use reasonable administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="mb-4">5. Data Retention</h2>
          <p className="mb-6">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
          </p>

          <h2 className="mb-4">6. Your Data Protection Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information. These may include the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access, update, or delete the information we have on you.</li>
            <li>Rectify information that is inaccurate or incomplete.</li>
            <li>Object to our processing of your personal information.</li>
            <li>Request that we restrict the processing of your personal information.</li>
            <li>Request a copy of your personal information in a portable format.</li>
            <li>Withdraw your consent at any time where we relied on your consent to process your personal information.</li>
            <li>Complain to a data protection authority about our collection and use of your personal information.</li>
          </ul>
          <p className="mb-6">To exercise these rights, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. We will respond to your request in accordanceance with applicable law.</p>
          {/* Add specific details for GDPR, CCPA if applicable */}

          <h2 className="mb-4">7. Children's Privacy</h2>
          <p className="mb-6">
            Our Service is not intended for use by children under the age of 13 (or a higher age threshold where applicable by local law). We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>

          <h2 className="mb-4">8. International Data Transfers</h2>
          <p className="mb-6">
            Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside [Your Company's Country/Region] and choose to provide information to us, please note that we transfer the data, including personal data, to [Your Company's Country/Region] and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>
          {/* Be specific about transfer mechanisms if applicable, e.g., Standard Contractual Clauses */}

          <h2 className="mb-4">9. Links to Other Websites</h2>
          <p className="mb-6">
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2 className="mb-4">10. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          <p className="mb-6">
            For significant changes, we may also notify you through other means, such as by email or through a notice on our Service.
          </p>

          <h2 className="mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>By email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
            {/* Add other contact methods if available, e.g., mailing address */}
          </ul>
          <p>
            Please also review our <Link href="/terms-of-service" className="text-purple-500">Terms of Service</Link> which governs your use of our Service.
          </p>
        </div>
      </div>
    </div>
  )
}