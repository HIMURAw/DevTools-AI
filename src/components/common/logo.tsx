import Link from "next/link"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold tracking-tight",
        className
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-sm">
        <Sparkles className="size-3.5" />
      </span>
      <span>{siteConfig.shortName}</span>
    </Link>
  )
}
