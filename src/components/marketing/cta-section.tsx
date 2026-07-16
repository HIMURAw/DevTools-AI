"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="bg-glow glass-panel relative flex flex-col items-center overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to ship faster?
          </h2>
          <p className="mt-4 max-w-lg text-balance text-muted-foreground">
            Drop in your OpenRouter API key and start using all ten tools in
            under a minute.
          </p>
          <Button size="lg" className="mt-8 h-11 px-6" render={<Link href="/tools" />}>
            Get started
            <ArrowRightIcon className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
