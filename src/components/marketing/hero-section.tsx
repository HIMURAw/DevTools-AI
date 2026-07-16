"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRightIcon,
  SparklesIcon,
  TerminalIcon,
  CheckIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitHubIcon } from "@/components/common/icons"
import { siteConfig } from "@/config/site"

const terminalLines = [
  { prompt: "$", command: "devtools explain --file src/auth.ts", delay: 0 },
  { prompt: ">", command: "Analyzing 142 lines…", delay: 0.4, muted: true },
  {
    prompt: ">",
    command: "✓ JWT validation flow detected",
    delay: 0.7,
    success: true,
  },
  {
    prompt: ">",
    command: "✓ 3 potential edge cases found",
    delay: 1.0,
    success: true,
  },
]

const highlights = [
  "No vendor lock-in",
  "Bring your own key",
  "Open source & MIT",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid + glow background */}
      <div
        aria-hidden
        className="bg-glow bg-grid pointer-events-none absolute inset-0 -z-10"
      />

      {/* Floating orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="orb-1 absolute -top-32 left-1/4 h-80 w-80 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--brand-from) 60%, transparent) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="orb-2 absolute top-1/3 -right-20 h-96 w-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--brand-via) 60%, transparent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="orb-3 absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--brand-to) 60%, transparent) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-32 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="secondary"
            className="glass-panel h-7 gap-1.5 rounded-full border-white/10 px-3 text-xs"
          >
            <SparklesIcon className="size-3 text-violet-400" />
            <span className="text-muted-foreground">
              10 AI tools &middot; Open source &middot; Bring your own key
            </span>
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-7 text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          The AI toolkit{" "}
          <br className="hidden sm:block" />
          developers{" "}
          <span className="text-gradient-brand">actually reach for</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          {siteConfig.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <CheckIcon className="size-3.5 text-violet-400" />
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-11 gap-2 bg-gradient-brand px-7 font-semibold text-white hover:opacity-90"
            render={<Link href="/tools" />}
          >
            Explore the tools
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-panel h-11 gap-2 border-white/10 px-7 hover:border-white/20"
            render={
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <GitHubIcon className="size-4" />
            Star on GitHub
          </Button>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-white/8 bg-white/3 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-red-500/70" />
                <span className="size-3 rounded-full bg-yellow-500/70" />
                <span className="size-3 rounded-full bg-green-500/70" />
              </div>
              <div className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <TerminalIcon className="size-3" />
                <span className="font-mono">devtools-ai</span>
              </div>
            </div>
            {/* Terminal body */}
            <div className="space-y-2 p-5">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + line.delay }}
                  className="flex items-start gap-2 font-mono text-sm"
                >
                  <span
                    className={
                      line.prompt === "$"
                        ? "text-violet-400 shrink-0"
                        : "text-muted-foreground/50 shrink-0"
                    }
                  >
                    {line.prompt}
                  </span>
                  <span
                    className={
                      line.success
                        ? "text-emerald-400"
                        : line.muted
                          ? "text-muted-foreground"
                          : "text-foreground"
                    }
                  >
                    {line.command}
                  </span>
                </motion.div>
              ))}
              {/* blinking cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="flex items-center gap-2 font-mono text-sm"
              >
                <span className="text-violet-400">$</span>
                <span className="inline-block h-4 w-2 animate-pulse rounded-sm bg-violet-400/70" />
              </motion.div>
            </div>
          </div>
          {/* Glow below terminal */}
          <div
            aria-hidden
            className="pointer-events-none mx-auto mt-1 h-12 w-3/4 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse, color-mix(in oklch, var(--brand-via) 50%, transparent) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
