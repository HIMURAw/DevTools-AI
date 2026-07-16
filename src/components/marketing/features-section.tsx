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

const features = [
  {
    title: "Bring your own model",
    description:
      "Switch between OpenRouter models per request — no vendor lock-in, no hidden defaults.",
    icon: Layers,
  },
  {
    title: "Streaming responses",
    description:
      "Output streams in as it's generated, so you're never staring at a blank loading state.",
    icon: Zap,
  },
  {
    title: "Full control",
    description:
      "Tune temperature and max tokens per tool, saved locally to your browser.",
    icon: SlidersHorizontal,
  },
  {
    title: "Your key, your data",
    description:
      "Requests are proxied server-side with your OpenRouter key — nothing is stored or logged.",
    icon: KeyRound,
  },
  {
    title: "Dark mode first",
    description:
      "Designed for long sessions at the terminal, with a light theme when you need it.",
    icon: Moon,
  },
  {
    title: "Open source, MIT licensed",
    description:
      "Audit the code, self-host it, or fork it into your own internal toolkit.",
    icon: ShieldCheck,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built like a real product
          </h2>
          <p className="mt-4 max-w-xl text-balance text-muted-foreground">
            Not a weekend script — a toolkit designed to hold up under daily
            use.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                className="rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading mt-4 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
