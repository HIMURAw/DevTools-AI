import type { Metadata } from "next"
import { SparklesIcon } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in DevTools AI.",
}

interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

const entries: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2026-07-17",
    changes: [
      "Ten AI-powered tools: Code Explainer, Bug Finder, Commit Message Generator, README Generator, Regex Generator, SQL Generator, JSON → TypeScript, Email Generator, Code Optimizer, and Code Reviewer.",
      "Streaming responses via OpenRouter, with a curated list of free models and Qwen3 Coder as the default.",
      "Automatic programming-language detection for code inputs, with manual override.",
      "Settings page for theme, model, temperature, and max tokens, persisted locally in the browser.",
      "Dark-mode-first, glassmorphism-styled landing page, tools directory, and per-tool pages.",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        title="Changelog"
        description="Notable changes to DevTools AI, in the order they shipped."
      />
      <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {entries.map((entry) => (
            <div key={entry.version} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-brand gap-1.5 text-white">
                  <SparklesIcon className="size-3" />v{entry.version}
                </Badge>
                <time
                  dateTime={entry.date}
                  className="text-muted-foreground text-sm"
                >
                  {entry.date}
                </time>
              </div>
              <ul className="border-border/60 ml-1 flex flex-col gap-2 border-l pl-5">
                {entry.changes.map((change) => (
                  <li
                    key={change}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
