import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { InterviewCategories } from "@/components/sections/categories";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { AIFeedbackShowcase } from "@/components/sections/feedback-showcase";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CTA, Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <InterviewCategories />
        <HowItWorks />
        <Features />
        <AIFeedbackShowcase />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
