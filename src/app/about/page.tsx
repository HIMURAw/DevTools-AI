import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/common/icons"

export const metadata: Metadata = {
  title: "About",
  description: "Why DevTools AI exists and how it's built.",
}

const stack = [
  "Next.js 16 (App Router)",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Zustand",
  "React Hook Form + Zod",
  "Framer Motion",
  "OpenRouter",
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About DevTools AI"
        description="A small, focused toolkit — not a platform."
      />

      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Why it exists</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Most AI coding assistants live inside an editor or a chat window
            that doesn&rsquo;t fit every task. DevTools AI is the opposite: ten
            single-purpose tools — explain, review, optimize, generate — each
            with exactly the input and output it needs, and nothing else in the
            way.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            It&rsquo;s built on OpenRouter so it isn&rsquo;t tied to one model
            provider, and it&rsquo;s open source so you can read exactly what
            happens to your code before you paste anything into it.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">How it handles your data</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            There are no user accounts and no database. Your OpenRouter API key
            lives in server-side environment variables and is never sent to the
            browser. Requests are proxied straight through to OpenRouter and are
            not logged or stored by this app. Your model, temperature, and
            max-token preferences are saved only in your browser&rsquo;s local
            storage.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="border-border/60 bg-card/50 text-muted-foreground rounded-full border px-3 py-1 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="glass-card flex flex-col items-start gap-3 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Open source</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            DevTools AI is released under the MIT License by{" "}
            {siteConfig.creator}. Issues, pull requests, and forks are welcome.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              nativeButton={false}
              render={
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GitHubIcon className="size-3.5" />
              View on GitHub
            </Button>
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link href="/tools" />}
            >
              Try the tools
              <ArrowRightIcon className="size-3.5" />
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
