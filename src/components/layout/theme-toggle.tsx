"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const subscribeNoop = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Theme is only known after client hydration; useSyncExternalStore lets us
  // read a "mounted" flag that's correct for SSR without setState-in-effect.
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  )
}
