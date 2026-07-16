"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { docsNav } from "@/config/docs"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {docsNav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors",
              active && "bg-muted text-foreground font-medium"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
