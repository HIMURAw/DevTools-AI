import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: ReactNode
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8",
        className
      )}
    >
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-4 max-w-xl text-balance">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
