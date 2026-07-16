"use client"

import { motion } from "framer-motion"
import { KeyRoundIcon, MousePointerClickIcon, SparklesIcon } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Add your OpenRouter key",
    description:
      "Drop your key into .env.local (self-hosted) or your deployment's environment variables. It never leaves your server.",
    icon: KeyRoundIcon,
  },
  {
    number: "02",
    title: "Pick a tool and paste your input",
    description:
      "Code, a diff, a JSON blob, a project description — whatever the tool expects. Load an example if you want to try it first.",
    icon: MousePointerClickIcon,
  },
  {
    number: "03",
    title: "Get a streamed result",
    description:
      "The response streams in as it's generated. Copy it, tweak the model or temperature in Settings, and run it again.",
    icon: SparklesIcon,
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-balance">
            No accounts, no onboarding flow — three steps and you&rsquo;re
            running real completions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card relative flex flex-col gap-3 rounded-2xl p-6"
              >
                <span className="text-muted-foreground/40 font-heading text-4xl font-bold">
                  {step.number}
                </span>
                <span className="icon-gradient flex size-10 items-center justify-center rounded-xl text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
