"use client"

import { motion } from "framer-motion"
import {
  KeyRound,
  Layers,
  Moon,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

const features = [
  {
    title: "Bring your own model",
    description:
      "Switch between OpenRouter models per request — no vendor lock-in, no hidden defaults.",
    icon: Layers,
    color: "from-violet-500 to-purple-600",
    glow: "oklch(0.62 0.24 290)",
  },
  {
    title: "Streaming responses",
    description:
      "Output streams in as it's generated, so you're never staring at a blank loading state.",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    glow: "oklch(0.7 0.2 200)",
  },
  {
    title: "Full control",
    description:
      "Tune temperature and max tokens per tool, saved locally to your browser.",
    icon: SlidersHorizontal,
    color: "from-fuchsia-500 to-pink-500",
    glow: "oklch(0.62 0.24 320)",
  },
  {
    title: "Your key, your data",
    description:
      "Requests are proxied server-side with your OpenRouter key — nothing is stored or logged.",
    icon: KeyRound,
    color: "from-emerald-500 to-teal-500",
    glow: "oklch(0.7 0.2 160)",
  },
  {
    title: "Dark mode first",
    description:
      "Designed for long sessions at the terminal, with a light theme when you need it.",
    icon: Moon,
    color: "from-indigo-500 to-violet-500",
    glow: "oklch(0.62 0.22 265)",
  },
  {
    title: "Open source, MIT licensed",
    description:
      "Audit the code, self-host it, or fork it into your own internal toolkit.",
    icon: ShieldCheck,
    color: "from-rose-500 to-orange-500",
    glow: "oklch(0.65 0.22 30)",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      {/* Right-side glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at right center, color-mix(in oklch, var(--brand-to) 80%, transparent) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built like a{" "}
            <span className="text-gradient-brand">real product</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-balance">
            Not a weekend script — a toolkit designed to hold up under daily
            use.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className={cn(
                  "glass-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6",
                  "border border-white/8 transition-all duration-300",
                  "hover:-translate-y-1"
                )}
                style={
                  {
                    "--feature-glow": feature.glow,
                  } as React.CSSProperties
                }
              >
                {/* Hover corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, color-mix(in oklch, var(--feature-glow) 50%, transparent) 0%, transparent 70%)`,
                    filter: "blur(16px)",
                  }}
                />

                {/* Icon */}
                <span
                  className={cn(
                    "relative flex size-11 shrink-0 items-center justify-center rounded-xl text-white",
                    "bg-gradient-to-br",
                    feature.color
                  )}
                  style={{
                    boxShadow: `0 0 20px color-mix(in oklch, var(--feature-glow) 35%, transparent)`,
                  }}
                >
                  <Icon className="size-5" />
                </span>

                {/* Text */}
                <div>
                  <h3 className="font-heading text-base leading-snug font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
