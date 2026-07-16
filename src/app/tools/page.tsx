import type { Metadata } from "next"

import { tools } from "@/config/tools.config"
import { ToolCard } from "@/components/tools/tool-card"

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Ten AI-powered developer tools in one place — code explanation, bug finding, commit messages, README generation, and more.",
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All tools
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-balance">
          Pick a tool below. Every tool shares the same input, output, and
          settings, so switching between them is instant.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
