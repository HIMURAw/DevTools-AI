import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import type { ToolDefinition } from "@/types/tool"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  analyze: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  generate: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  convert: "border-rose-500/30 text-rose-400 bg-rose-500/10",
}

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group glass-card relative flex h-full flex-col gap-4 rounded-2xl p-5",
        "border border-white/8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-violet-500/30",
        "hover:shadow-[0_0_30px_color-mix(in_oklch,var(--brand-via)_12%,transparent)]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="icon-gradient flex size-11 items-center justify-center rounded-xl text-white">
          <Icon className="size-5" />
        </span>
        <ArrowRightIcon
          className={cn(
            "text-muted-foreground size-4 -translate-x-1 opacity-0",
            "transition-all duration-200 group-hover:translate-x-0 group-hover:text-violet-400 group-hover:opacity-100"
          )}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-heading text-base leading-snug font-semibold">
          {tool.name}
        </h3>
        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      <div>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
            categoryColors[tool.category]
          )}
        >
          {tool.category}
        </span>
      </div>
    </Link>
  )
}
