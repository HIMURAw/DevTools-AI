"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"

import { tools } from "@/config/tools.config"
import { Button } from "@/components/ui/button"

export function ToolsShowcase() {
  return (
    <section id="tools" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ten tools. One workflow.
          </h2>
          <p className="mt-4 max-w-xl text-balance text-muted-foreground">
            Every tool shares the same clean input-output interface, so
            switching between them never breaks your flow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group glass-panel relative flex h-full flex-col gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-brand flex size-10 items-center justify-center rounded-xl text-white">
                      <Icon className="size-5" />
                    </span>
                    <ArrowRightIcon className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {tool.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" render={<Link href="/tools" />}>
            View all tools
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
