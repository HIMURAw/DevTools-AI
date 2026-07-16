import Link from "next/link"

import { siteConfig, footerNav } from "@/config/site"
import { Logo } from "@/components/common/logo"
import { GitHubIcon, XIcon } from "@/components/common/icons"

const footerColumns = [
  { title: "Product", links: footerNav.product },
  { title: "Resources", links: footerNav.resources },
  { title: "Legal", links: footerNav.legal },
]

export function SiteFooter() {
  return (
    <footer className="bg-background/60 border-t border-white/8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-muted-foreground max-w-xs text-sm">
              {siteConfig.description}
            </p>
            <div className="mt-2 flex items-center gap-1">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Released under
            the MIT License.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with Next.js, shadcn/ui, and OpenRouter.
          </p>
        </div>
      </div>
    </footer>
  )
}
