export const siteConfig = {
  name: "DevTools AI",
  shortName: "DevTools AI",
  tagline: "The AI toolkit developers actually reach for",
  description:
    "An AI-powered developer toolkit for code explanations, bug finding, commit messages, README generation, and more — all in one place, powered by OpenRouter.",
  url: "https://devtools-ai.dev",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/HIMURAw/devtools-ai",
    twitter: "https://twitter.com",
  },
  creator: "HIMURA",
} as const

export const mainNav = [
  { title: "Tools", href: "/tools" },
  { title: "Features", href: "/features" },
  { title: "Docs", href: "/docs" },
  { title: "Changelog", href: "/changelog" },
  { title: "About", href: "/about" },
] as const

export const footerNav = {
  product: [
    { title: "Tools", href: "/tools" },
    { title: "Features", href: "/features" },
    { title: "Changelog", href: "/changelog" },
    { title: "Settings", href: "/settings" },
  ],
  resources: [
    { title: "Documentation", href: "/docs" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
} as const
