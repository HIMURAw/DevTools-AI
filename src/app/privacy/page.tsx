import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DevTools AI handles data.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <Prose>
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p>
          Last updated 2026-07-17. This policy describes the default, unmodified
          behavior of the {siteConfig.name} open-source application.
        </p>

        <h2>No accounts, no database</h2>
        <p>
          {siteConfig.name} has no sign-up, no login, and no database. There is
          nothing to store about you as a user because no user records exist.
        </p>

        <h2>What happens to what you submit</h2>
        <p>
          Text you paste into a tool (code, a diff, JSON, a description) is sent
          from your browser to this app&rsquo;s server, which forwards it to{" "}
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenRouter
          </a>{" "}
          to generate a response, and streams that response back to you. This
          application does not log, store, or retain the content of your
          requests or responses after the response finishes streaming.
        </p>
        <p>
          OpenRouter and the underlying model provider process that content
          under their own terms. See{" "}
          <a
            href="https://openrouter.ai/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenRouter&rsquo;s Privacy Policy
          </a>{" "}
          for how they handle it.
        </p>

        <h2>API keys</h2>
        <p>
          Whoever deploys an instance of {siteConfig.name} configures an
          OpenRouter API key as a server-side environment variable. That key is
          used to process requests for that deployment and is never sent to the
          browser or exposed to visitors.
        </p>

        <h2>Local storage</h2>
        <p>
          Your theme, selected model, temperature, and max-token preferences are
          saved only in your browser&rsquo;s local storage. They stay on your
          device and are not transmitted anywhere except as part of the tool
          requests you explicitly submit.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This application does not set tracking cookies and does not run
          analytics or telemetry.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the update will be reflected on this page and
          noted in the <a href="/changelog">changelog</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent through the{" "}
          <a href="/contact">Contact</a> page.
        </p>
      </Prose>
    </div>
  )
}
