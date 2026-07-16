import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { ContactForm } from "@/components/marketing/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about DevTools AI.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Found a bug, have an idea, or just want to say hi?"
      />
      <div className="mx-auto max-w-xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6">
          <ContactForm />
        </div>
      </div>
    </>
  )
}
