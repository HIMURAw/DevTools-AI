import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { CtaSection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Bring your own OpenRouter model, stream responses, tune temperature and max tokens, and keep your key server-side only.",
}

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Everything you need, nothing you don't"
        description="Ten focused tools sharing one clean interface — no dashboards, no accounts, no lock-in."
      />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
