import { CallToAction } from "@/components/CallToAction";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <CallToAction />
    </main>
  );
}
