import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getToolBySlug, tools } from "@/config/tools.config"
import { ToolShell } from "@/components/tools/tool-shell"

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) return {}

  return {
    title: tool.name,
    description: tool.shortDescription,
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) notFound()

  const Icon = tool.icon

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start gap-3">
        <span className="icon-gradient flex size-12 shrink-0 items-center justify-center rounded-2xl text-white">
          <Icon className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {tool.longDescription}
          </p>
        </div>
      </div>

      <ToolShell slug={tool.slug} />
    </div>
  )
}
