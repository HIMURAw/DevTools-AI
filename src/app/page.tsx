import { HeroSection } from "@/components/marketing/hero-section"
import { ToolsShowcase } from "@/components/marketing/tools-showcase"
import { FeaturesSection } from "@/components/marketing/features-section"
import { CtaSection } from "@/components/marketing/cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ToolsShowcase />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
