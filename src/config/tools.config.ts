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
} from "lucide-react"

import * as codeExplainer from "@/lib/ai/prompts/code-explainer"
import * as bugFinder from "@/lib/ai/prompts/bug-finder"
import * as commitMessageGenerator from "@/lib/ai/prompts/commit-message-generator"
import * as readmeGenerator from "@/lib/ai/prompts/readme-generator"
import * as regexGenerator from "@/lib/ai/prompts/regex-generator"
import * as sqlGenerator from "@/lib/ai/prompts/sql-generator"
import * as jsonToTypescript from "@/lib/ai/prompts/json-to-typescript"
import * as emailGenerator from "@/lib/ai/prompts/email-generator"
import * as codeOptimizer from "@/lib/ai/prompts/code-optimizer"
import * as codeReviewer from "@/lib/ai/prompts/code-reviewer"
import type { ToolDefinition } from "@/types/tool"

const CODE_FIELDS_LANGUAGE = {
  id: "language",
  label: "Language",
  type: "text" as const,
  placeholder: "Auto-detected from your code — edit to override",
  required: false,
}

export const tools: ToolDefinition[] = [
  {
    id: "code-explainer",
    slug: "code-explainer",
    name: "AI Code Explainer",
    shortDescription:
      "Paste any snippet and get a clear, plain-English breakdown of what it does.",
    longDescription:
      "Paste a function, class, or snippet and get a structured explanation: a one-line summary, a step-by-step walkthrough, and any notable patterns or gotchas.",
    category: "analyze",
    icon: Sparkles,
    outputFormat: "markdown",
    fields: [
      {
        id: "input",
        label: "Code",
        type: "textarea",
        placeholder: "Paste the code you want explained…",
        required: true,
        rows: 12,
      },
      CODE_FIELDS_LANGUAGE,
    ],
    exampleInput: {
      input:
        "function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
      language: "JavaScript",
    },
    schema: codeExplainer.schema,
    buildPrompt: codeExplainer.buildPrompt,
    cliAlias: "explain",
  },
  {
    id: "bug-finder",
    slug: "bug-finder",
    name: "Bug Finder",
    shortDescription:
      "Scan code for logic errors, edge cases, and potential runtime bugs.",
    longDescription:
      "Scans a snippet for logic errors, unhandled edge cases, and risky assumptions, with a severity rating and suggested fix for each issue.",
    category: "analyze",
    icon: Bug,
    outputFormat: "markdown",
    fields: [
      {
        id: "input",
        label: "Code",
        type: "textarea",
        placeholder: "Paste the code you want scanned for bugs…",
        required: true,
        rows: 12,
      },
      CODE_FIELDS_LANGUAGE,
    ],
    exampleInput: {
      input: "function getLastItem(arr) {\n  return arr[arr.length];\n}",
      language: "JavaScript",
    },
    schema: bugFinder.schema,
    buildPrompt: bugFinder.buildPrompt,
    cliAlias: "bugs",
  },
  {
    id: "commit-message-generator",
    slug: "commit-message-generator",
    name: "Commit Message Generator",
    shortDescription:
      "Turn a diff or description into a clean Conventional Commit message.",
    longDescription:
      "Paste a git diff or describe your changes in plain language and get a ready-to-use Conventional Commit message.",
    category: "generate",
    icon: GitCommitHorizontal,
    outputFormat: "code",
    fields: [
      {
        id: "input",
        label: "Diff or description",
        type: "textarea",
        placeholder: "Paste a git diff, or describe what changed…",
        required: true,
        rows: 12,
      },
    ],
    exampleInput: {
      input:
        "Added input validation to the signup form and fixed a bug where the submit button stayed disabled after a failed request.",
    },
    schema: commitMessageGenerator.schema,
    buildPrompt: commitMessageGenerator.buildPrompt,
    cliAlias: "commit",
  },
  {
    id: "readme-generator",
    slug: "readme-generator",
    name: "README Generator",
    shortDescription:
      "Generate a professional, structured README from your project details.",
    longDescription:
      "Describe your project — name, purpose, tech stack, features — and get a structured README.md ready to drop into your repo.",
    category: "generate",
    icon: FileText,
    outputFormat: "markdown",
    fields: [
      {
        id: "input",
        label: "Project details",
        type: "textarea",
        placeholder:
          "Project name, what it does, tech stack, key features, how to install/run it…",
        required: true,
        rows: 12,
      },
    ],
    exampleInput: {
      input:
        'Project name: TaskFlow. A minimal CLI todo app written in Go. Features: add/remove/list tasks, due dates, tags. Install with `go install`. Run with `taskflow add "buy milk"`.',
    },
    schema: readmeGenerator.schema,
    buildPrompt: readmeGenerator.buildPrompt,
    cliAlias: "readme",
  },
  {
    id: "regex-generator",
    slug: "regex-generator",
    name: "Regex Generator",
    shortDescription:
      "Describe a pattern in plain language and get a working regular expression.",
    longDescription:
      "Describe what you want to match in plain English and get a working, explained regular expression for your chosen flavor.",
    category: "generate",
    icon: Regex,
    outputFormat: "code",
    fields: [
      {
        id: "input",
        label: "Pattern description",
        type: "textarea",
        placeholder: "e.g. Match a valid email address",
        required: true,
        rows: 6,
      },
      {
        id: "flavor",
        label: "Regex flavor",
        type: "select",
        required: false,
        options: [
          { label: "JavaScript", value: "JavaScript" },
          { label: "Python", value: "Python" },
          { label: "PCRE", value: "PCRE" },
          { label: "POSIX", value: "POSIX" },
        ],
      },
    ],
    exampleInput: {
      input: "Match a valid email address",
      flavor: "JavaScript",
    },
    schema: regexGenerator.schema,
    buildPrompt: regexGenerator.buildPrompt,
    cliAlias: "regex",
  },
  {
    id: "sql-generator",
    slug: "sql-generator",
    name: "SQL Generator",
    shortDescription:
      "Describe the data you need and get a ready-to-run SQL query.",
    longDescription:
      "Describe the data you need — optionally with your table schema — and get a ready-to-run, explained SQL query.",
    category: "generate",
    icon: Database,
    outputFormat: "code",
    fields: [
      {
        id: "input",
        label: "What do you need?",
        type: "textarea",
        placeholder: "e.g. All users who signed up in the last 30 days",
        required: true,
        rows: 6,
      },
      {
        id: "schemaInfo",
        label: "Table schema (optional)",
        type: "textarea",
        placeholder: "users(id, email, created_at) …",
        required: false,
        rows: 4,
      },
      {
        id: "dialect",
        label: "Dialect",
        type: "select",
        required: false,
        options: [
          { label: "PostgreSQL", value: "PostgreSQL" },
          { label: "MySQL", value: "MySQL" },
          { label: "SQLite", value: "SQLite" },
          { label: "SQL Server", value: "SQL Server" },
        ],
      },
    ],
    exampleInput: {
      input: "All users who signed up in the last 30 days, newest first",
      schemaInfo: "users(id, email, created_at)",
      dialect: "PostgreSQL",
    },
    schema: sqlGenerator.schema,
    buildPrompt: sqlGenerator.buildPrompt,
    cliAlias: "sql",
  },
  {
    id: "json-to-typescript",
    slug: "json-to-typescript",
    name: "JSON → TypeScript",
    shortDescription:
      "Convert raw JSON into precise, well-named TypeScript interfaces.",
    longDescription:
      "Paste raw JSON and get precise, well-named TypeScript interface declarations inferred from its structure.",
    category: "convert",
    icon: Braces,
    outputFormat: "code",
    fields: [
      {
        id: "input",
        label: "JSON",
        type: "textarea",
        placeholder: "Paste JSON here…",
        required: true,
        rows: 12,
      },
      {
        id: "rootName",
        label: "Root interface name",
        type: "text",
        placeholder: "Root (optional)",
        required: false,
      },
    ],
    exampleInput: {
      input:
        '{\n  "id": 1,\n  "name": "Ada Lovelace",\n  "isActive": true,\n  "roles": ["admin", "editor"]\n}',
      rootName: "User",
    },
    schema: jsonToTypescript.schema,
    buildPrompt: jsonToTypescript.buildPrompt,
    cliAlias: "json2ts",
  },
  {
    id: "email-generator",
    slug: "email-generator",
    name: "Email Generator",
    shortDescription:
      "Draft professional emails for any developer or workplace scenario.",
    longDescription:
      "Describe the situation and get a ready-to-send email with a subject line, in the tone you choose.",
    category: "generate",
    icon: Mail,
    outputFormat: "text",
    fields: [
      {
        id: "input",
        label: "Situation",
        type: "textarea",
        placeholder: "e.g. Ask a teammate for a code review before end of day",
        required: true,
        rows: 8,
      },
      {
        id: "tone",
        label: "Tone",
        type: "select",
        required: false,
        options: [
          { label: "Professional", value: "Professional" },
          { label: "Friendly", value: "Friendly" },
          { label: "Formal", value: "Formal" },
          { label: "Concise", value: "Concise" },
          { label: "Apologetic", value: "Apologetic" },
        ],
      },
    ],
    exampleInput: {
      input:
        "Let a client know their project will be delivered two days later than planned due to a scope change.",
      tone: "Professional",
    },
    schema: emailGenerator.schema,
    buildPrompt: emailGenerator.buildPrompt,
    cliAlias: "email",
  },
  {
    id: "code-optimizer",
    slug: "code-optimizer",
    name: "Code Optimizer",
    shortDescription:
      "Get concrete suggestions to improve performance and readability.",
    longDescription:
      "Get concrete, before/after suggestions to improve a snippet's performance, readability, and maintainability.",
    category: "analyze",
    icon: Zap,
    outputFormat: "markdown",
    fields: [
      {
        id: "input",
        label: "Code",
        type: "textarea",
        placeholder: "Paste the code you want optimized…",
        required: true,
        rows: 12,
      },
      CODE_FIELDS_LANGUAGE,
    ],
    exampleInput: {
      input:
        "function hasDuplicates(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length; j++) {\n      if (i !== j && arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}",
      language: "JavaScript",
    },
    schema: codeOptimizer.schema,
    buildPrompt: codeOptimizer.buildPrompt,
    cliAlias: "optimize",
  },
  {
    id: "code-reviewer",
    slug: "code-reviewer",
    name: "Code Reviewer",
    shortDescription:
      "Receive a structured code review covering quality, style, and risk.",
    longDescription:
      "Get a structured review covering correctness, style, security, and prioritized suggestions — like a thoughtful teammate's PR comments.",
    category: "analyze",
    icon: ShieldCheck,
    outputFormat: "markdown",
    fields: [
      {
        id: "input",
        label: "Code",
        type: "textarea",
        placeholder: "Paste the code you want reviewed…",
        required: true,
        rows: 12,
      },
      CODE_FIELDS_LANGUAGE,
    ],
    exampleInput: {
      input:
        "app.get('/users/:id', async (req, res) => {\n  const user = await db.query('SELECT * FROM users WHERE id = ' + req.params.id);\n  res.json(user);\n});",
      language: "JavaScript",
    },
    schema: codeReviewer.schema,
    buildPrompt: codeReviewer.buildPrompt,
    cliAlias: "review",
  },
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug)
}
