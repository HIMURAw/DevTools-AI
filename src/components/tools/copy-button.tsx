"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  value: string
  className?: string
  disabled?: boolean
}

export function CopyButton({ value, className, disabled }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Couldn't copy — try selecting the text manually.")
    }
  }, [value])

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled || !value}
      onClick={handleCopy}
      className={cn("gap-1.5", className)}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}
