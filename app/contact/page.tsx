"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, User, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react"

const SUBMISSION_ENDPOINT = "https://openformstack.com/f/cmadexz19000113xp8lgvomo5";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setSubmissionMessage("");

    try {
      const response = await fetch(SUBMISSION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        // No need to set message here, will redirect
        router.push("/contact/success");
      } else {
        const errorData = await response.json().catch(() => ({ message: "An unexpected error occurred." }));
        setSubmissionStatus("error");
        setSubmissionMessage(errorData.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effect divs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Have a question, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </header>

        <div className="max-w-xl mx-auto bg-card/80 dark:bg-card/70 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="flex items-center mb-2">
                <User className="mr-2 h-4 w-4 text-muted-foreground" /> Full Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="bg-background/50 dark:bg-background/40"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center mb-2">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Email Address
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-background/50 dark:bg-background/40"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="flex items-center mb-2">
                <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" /> Subject
              </Label>
              <Input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Regarding..."
                required
                className="bg-background/50 dark:bg-background/40"
              />
            </div>
            <div>
              <Label htmlFor="message" className="flex items-center mb-2">
                <Send className="mr-2 h-4 w-4 text-muted-foreground" /> Your Message
              </Label>
              <Textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows={5}
                required
                className="bg-background/50 dark:bg-background/40"
              />
            </div>

            {submissionStatus === "error" && submissionMessage && (
              <div className="flex items-center p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md">
                <AlertCircle className="mr-2 h-5 w-5" />
                {submissionMessage}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}