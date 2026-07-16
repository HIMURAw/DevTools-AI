import type { Metadata } from "next"

import { SettingsForm } from "@/components/settings/settings-form"

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Configure your theme, AI model, temperature, and max tokens for DevTools AI.",
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          These preferences apply to every tool and are saved in this browser.
        </p>
      </div>

      <SettingsForm />
    </div>
  )
}
