"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Zap, CalendarDays } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Define interfaces for plan details
interface BillingOption {
  price: string;
  frequency: string;
  description: string;
  billingNotice?: string | null;
  cta: string;
  ctaLink: string;
  isPopular: boolean; // For the "Best Value" badge
  icon?: React.ElementType;
}

interface Plan {
  id: string;
  title: string;
  features: Array<{ text: string; included: boolean }>;
  monthly: BillingOption;
  annually?: BillingOption; 
  baseDescription?: string; 
}

const pricingData: Plan[] = [
  {
    id: "free",
    title: "Free",
    baseDescription: "Get started with the basics, completely free.",
    features: [
      { text: "Up to 5 links", included: true },
      { text: "Basic analytics", included: true },
      { text: "Limited themes", included: true },
      { text: "Community support", included: true },
      { text: "Custom background image", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
      { text: "Remove Link1t branding", included: false },
    ],
    monthly: { 
      price: "$0",
      frequency: "/month",
      description: "Get started with the basics, completely free.",
      cta: "Get Started for Free",
      ctaLink: "/signup",
      isPopular: false,
      // No specific icon for free, or choose one like UserCircle
    },
  },
  {
    id: "pro",
    title: "Pro",
    features: [ 
      { text: "Unlimited links", included: true },
      { text: "Advanced analytics & insights", included: true },
      { text: "All themes & customization options", included: true },
      { text: "Priority email support", included: true },
      { text: "Custom background image/video", included: true },
      { text: "Remove Link1t branding", included: true },
      { text: "Early access to new features", included: true },
      { text: "Integrations (e.g., Mailchimp, Google Analytics)", included: true },
    ],
    monthly: {
      price: "$5",
      frequency: "/month",
      description: "Full power, month-to-month flexibility.",
      cta: "Go Pro Monthly",
      ctaLink: "/subscribe?plan=pro-monthly",
      isPopular: false, // Badge won't show for monthly
      icon: Zap, // Consistent Pro icon
    },
    annually: {
      price: "$4",
      frequency: "/month",
      description: "Best value! Save 20% with annual billing.",
      billingNotice: "Billed as $48/year",
      cta: "Go Pro Annual",
      ctaLink: "/subscribe?plan=pro-annual",
      isPopular: true, // This will show the "Best Value" badge
      icon: Zap, // Consistent Pro icon
    },
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually") 

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-28 md:pb-24">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing. Start for free, or unlock powerful Pro features.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingData.map((plan) => {
            const currentBillingOption = plan.id === 'pro' 
              ? (billingCycle === "annually" && plan.annually ? plan.annually : plan.monthly)
              : plan.monthly; 
            
            const IconComponent = currentBillingOption.icon; // This will now be Zap for Pro, regardless of cycle

            return (
              <Card
                key={plan.id}
                className={`flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-card/80 dark:bg-card/70 backdrop-blur-sm ${
                  // Badge is based on the specific billing option's popularity (e.g. annual is popular)
                  currentBillingOption.isPopular && plan.id === 'pro' ? "border-2 border-primary relative" : "border border-border"
                }`}
              >
                {currentBillingOption.isPopular && plan.id === 'pro' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full shadow-md">
                    Best Value
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardTitle className="text-3xl font-bold text-center">{plan.title}</CardTitle>
                  
                  {plan.id === 'pro' && plan.annually && (
                    <div className="flex items-center justify-center space-x-2 my-4">
                      <Label htmlFor={`billing-cycle-switch-${plan.id}`} className={billingCycle === 'monthly' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                        Monthly
                      </Label>
                      <Switch
                        id={`billing-cycle-switch-${plan.id}`}
                        checked={billingCycle === "annually"}
                        onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
                        aria-label="Toggle billing cycle"
                      />
                      <Label htmlFor={`billing-cycle-switch-${plan.id}`} className={billingCycle === 'annually' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                        Annually (Save 20%)
                      </Label>
                    </div>
                  )}

                  <div className="text-center mt-2">
                    <span className="text-4xl font-extrabold">{currentBillingOption.price}</span>
                    <span className="text-muted-foreground">{currentBillingOption.frequency}</span>
                  </div>
                  {currentBillingOption.billingNotice && (
                    <p className="text-xs text-muted-foreground text-center mt-1">{currentBillingOption.billingNotice}</p>
                  )}
                  <CardDescription className="text-center mt-2 min-h-[40px]">
                    {currentBillingOption.description || plan.baseDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 pt-4">
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground line-through" : ""}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6 pb-8">
                  <Button 
                    asChild 
                    size="lg" 
                    variant={plan.id === 'pro' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    <Link href={currentBillingOption.ctaLink}>
                      {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
                      {currentBillingOption.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <p className="text-muted-foreground">
            Questions? <Link href="/contact" className="text-primary hover:underline text-md">Contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}