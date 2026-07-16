"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNav, siteConfig } from "@/config/site"
import { Logo } from "@/components/common/logo"
import { GitHubIcon } from "@/components/common/icons"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="glass-nav sticky top-0 z-50 w-full border-b border-white/8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active && "text-foreground"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              />
            }
          >
            <GitHubIcon className="size-4" />
          </Button>
          <ThemeToggle />
          <Button
            size="sm"
            className="bg-gradient-brand font-semibold text-white hover:opacity-90"
            nativeButton={false}
            render={<Link href="/tools" />}
          >
            Open Tools
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <MenuIcon className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button
                  nativeButton={false}
                  render={<Link href="/tools" onClick={() => setOpen(false)} />}
                >
                  Open Tools
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
