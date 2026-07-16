import {
  Bug,
  Braces,
  Database,
  FileText,
  GitCommitHorizontal,
  Mail,
  Regex,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type ToolCategory = "generate" | "analyze" | "convert"

export interface ToolSummary {
  id: string
  slug: string
  name: string
  shortDescription: string
  category: ToolCategory
  icon: LucideIcon
}

export const tools: ToolSummary[] = [
  {
    id: "code-explainer",
    slug: "code-explainer",
    name: "AI Code Explainer",
    shortDescription:
      "Paste any snippet and get a clear, plain-English breakdown of what it does.",
    category: "analyze",
    icon: Sparkles,
  },
  {
    id: "bug-finder",
    slug: "bug-finder",
    name: "Bug Finder",
    shortDescription:
      "Scan code for logic errors, edge cases, and potential runtime bugs.",
    category: "analyze",
    icon: Bug,
  },
  {
    id: "commit-message-generator",
    slug: "commit-message-generator",
    name: "Commit Message Generator",
    shortDescription:
      "Turn a diff or description into a clean Conventional Commit message.",
    category: "generate",
    icon: GitCommitHorizontal,
  },
  {
    id: "readme-generator",
    slug: "readme-generator",
    name: "README Generator",
    shortDescription:
      "Generate a professional, structured README from your project details.",
    category: "generate",
    icon: FileText,
  },
  {
    id: "regex-generator",
    slug: "regex-generator",
    name: "Regex Generator",
    shortDescription:
      "Describe a pattern in plain language and get a working regular expression.",
    category: "generate",
    icon: Regex,
  },
  {
    id: "sql-generator",
    slug: "sql-generator",
    name: "SQL Generator",
    shortDescription:
      "Describe the data you need and get a ready-to-run SQL query.",
    category: "generate",
    icon: Database,
  },
  {
    id: "json-to-typescript",
    slug: "json-to-typescript",
    name: "JSON → TypeScript",
    shortDescription:
      "Convert raw JSON into precise, well-named TypeScript interfaces.",
    category: "convert",
    icon: Braces,
  },
  {
    id: "email-generator",
    slug: "email-generator",
    name: "Email Generator",
    shortDescription:
      "Draft professional emails for any developer or workplace scenario.",
    category: "generate",
    icon: Mail,
  },
  {
    id: "code-optimizer",
    slug: "code-optimizer",
    name: "Code Optimizer",
    shortDescription:
      "Get concrete suggestions to improve performance and readability.",
    category: "analyze",
    icon: Zap,
  },
  {
    id: "code-reviewer",
    slug: "code-reviewer",
    name: "Code Reviewer",
    shortDescription:
      "Receive a structured code review covering quality, style, and risk.",
    category: "analyze",
    icon: ShieldCheck,
  },
]

export function getToolBySlug(slug: string): ToolSummary | undefined {
  return tools.find((tool) => tool.slug === slug)
}
