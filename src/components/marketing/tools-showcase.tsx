"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"

import { tools } from "@/config/tools.config"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tools/tool-card"

export function ToolsShowcase() {
  return (
    <section id="tools" className="relative py-20 sm:py-28">
      {/* Side glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at left center, color-mix(in oklch, var(--brand-from) 80%, transparent) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <Badge
            variant="outline"
            className="text-muted-foreground mb-4 rounded-full border-white/10 bg-white/5 px-3 py-1 text-xs"
          >
            10 tools included
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ten tools.{" "}
            <span className="text-gradient-brand">One workflow.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-balance">
            Every tool shares the same clean input-output interface, so
            switching between them never breaks your flow.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Button
            variant="outline"
            className="glass-panel border-white/10 px-6 hover:border-white/20"
            nativeButton={false}
            render={<Link href="/tools" />}
          >
            View all tools
            <ArrowRightIcon className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
