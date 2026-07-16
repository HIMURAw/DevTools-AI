"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon, ZapIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const stats = [
  { value: "10", label: "AI Tools" },
  { value: "1 min", label: "To get started" },
  { value: "MIT", label: "Licensed" },
  { value: "0", label: "Data stored" },
]

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card flex flex-col items-center gap-1 rounded-2xl border border-white/8 p-5 text-center"
            >
              <span className="text-gradient-brand text-3xl font-bold tracking-tight sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Glass base */}
          <div className="glass-card border border-white/10 px-6 py-16 text-center sm:px-12">
            {/* Background glow blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div
                className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklch, var(--brand-via) 70%, transparent) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklch, var(--brand-from) 70%, transparent) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
              <div
                className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklch, var(--brand-to) 70%, transparent) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
            </div>

            {/* Icon */}
            <div className="icon-gradient mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl text-white">
              <ZapIcon className="size-7" />
            </div>

            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to{" "}
              <span className="text-gradient-brand">ship faster?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-balance text-lg text-muted-foreground">
              Drop in your OpenRouter API key and start using all ten tools in
              under a minute. No sign-up required.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 bg-gradient-brand px-8 text-base font-semibold text-white hover:opacity-90"
                render={<Link href="/tools" />}
              >
                Get started free
                <ArrowRightIcon className="size-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-8 text-base text-muted-foreground hover:text-foreground"
                render={<Link href="/docs" />}
              >
                Read the docs
              </Button>
            </div>

            {/* Trust note */}
            <p className="mt-6 text-xs text-muted-foreground/60">
              Your API key is never stored. All requests are processed
              client-side.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
