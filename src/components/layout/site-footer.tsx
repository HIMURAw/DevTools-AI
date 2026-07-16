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
    <footer className="border-t border-white/8 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-2 flex items-center gap-1">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Released
            under the MIT License.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, shadcn/ui, and OpenRouter.
          </p>
        </div>
      </div>
    </footer>
  )
}
