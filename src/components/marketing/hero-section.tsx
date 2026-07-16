"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitHubIcon } from "@/components/common/icons"
import { siteConfig } from "@/config/site"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-glow bg-grid absolute inset-0 -z-10 opacity-70"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-20 text-center sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="secondary"
            className="glass-panel h-7 gap-1.5 rounded-full px-3 text-xs"
          >
            <SparklesIcon className="size-3" />
            10 AI tools &middot; Open source &middot; Bring your own key
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          The AI toolkit developers{" "}
          <span className="text-gradient-brand">actually reach for</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="h-11 px-6" render={<Link href="/tools" />}>
            Explore the tools
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 px-6"
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
      </div>
    </section>
  )
}
