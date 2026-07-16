interface LanguageSignal {
  pattern: RegExp
  weight: number
}

const LANGUAGE_SIGNALS: Record<string, LanguageSignal[]> = {
  TypeScript: [
    { pattern: /\binterface\s+\w+/, weight: 3 },
    { pattern: /:\s*(string|number|boolean|void|unknown|any)\b/, weight: 2 },
    { pattern: /\btype\s+\w+\s*=/, weight: 2 },
    { pattern: /\bimplements\s+\w+/, weight: 2 },
    { pattern: /<[A-Z]\w*>/, weight: 1 },
    { pattern: /\bexport\s+(default\s+)?(function|class|const)/, weight: 1 },
    { pattern: /\bas\s+const\b/, weight: 2 },
  ],
  JavaScript: [
    { pattern: /\bfunction\s*\w*\s*\(/, weight: 1 },
    { pattern: /\b(const|let|var)\s+\w+\s*=/, weight: 1 },
    { pattern: /=>/, weight: 1 },
    { pattern: /\bconsole\.(log|error|warn)\(/, weight: 2 },
    { pattern: /\brequire\(['"]/, weight: 2 },
    { pattern: /\bimport\s+.*\s+from\s+['"]/, weight: 1 },
  ],
  Python: [
    { pattern: /\bdef\s+\w+\s*\(.*\)\s*:/, weight: 3 },
    { pattern: /\bself\b/, weight: 2 },
    { pattern: /\bimport\s+\w+(\.\w+)*\s*$/m, weight: 1 },
    { pattern: /\bprint\(/, weight: 1 },
    { pattern: /\belif\b/, weight: 2 },
    { pattern: /__init__/, weight: 2 },
    { pattern: /:\s*$/m, weight: 1 },
  ],
  Java: [
    { pattern: /\bpublic\s+(static\s+)?(class|void)\b/, weight: 3 },
    { pattern: /\bSystem\.out\.println\(/, weight: 3 },
    { pattern: /\bimport\s+java\./, weight: 3 },
    { pattern: /\bpublic\s+static\s+void\s+main\(/, weight: 3 },
  ],
  "C#": [
    { pattern: /\busing\s+System(\.\w+)*;/, weight: 3 },
    { pattern: /\bConsole\.(WriteLine|ReadLine)\(/, weight: 3 },
    { pattern: /\bnamespace\s+\w+/, weight: 2 },
    { pattern: /\bpublic\s+class\s+\w+/, weight: 1 },
  ],
  "C++": [
    { pattern: /#include\s*<\w+>/, weight: 2 },
    { pattern: /\bstd::/, weight: 3 },
    { pattern: /\bcout\s*<</, weight: 3 },
    { pattern: /\bcin\s*>>/, weight: 2 },
  ],
  C: [
    { pattern: /#include\s*<\w+\.h>/, weight: 3 },
    { pattern: /\bprintf\(/, weight: 2 },
    { pattern: /\bint\s+main\(\s*(void|int argc)/, weight: 2 },
  ],
  Go: [
    { pattern: /\bpackage\s+main\b/, weight: 3 },
    { pattern: /\bfunc\s+main\(\)/, weight: 3 },
    { pattern: /\bfmt\.(Println|Printf|Sprintf)\(/, weight: 3 },
    { pattern: /:=/, weight: 1 },
  ],
  Rust: [
    { pattern: /\bfn\s+main\(\)/, weight: 3 },
    { pattern: /\blet\s+mut\s+/, weight: 3 },
    { pattern: /\bprintln!\(/, weight: 3 },
    { pattern: /\buse\s+std::/, weight: 2 },
  ],
  PHP: [
    { pattern: /<\?php/, weight: 4 },
    { pattern: /\$\w+\s*=/, weight: 2 },
    { pattern: /\becho\s+/, weight: 1 },
  ],
  Ruby: [
    { pattern: /\bdef\s+\w+.*\n[\s\S]*\bend\b/, weight: 3 },
    { pattern: /\bputs\s+/, weight: 2 },
    { pattern: /\brequire\s+['"]/, weight: 1 },
    { pattern: /@\w+\s*=/, weight: 1 },
  ],
  Swift: [
    { pattern: /\bfunc\s+\w+\(.*\)\s*(->\s*\w+)?\s*\{/, weight: 2 },
    { pattern: /\bvar\s+\w+\s*:\s*\w+/, weight: 2 },
    { pattern: /\blet\s+\w+\s*=/, weight: 1 },
    { pattern: /\bimport\s+(Swift|UIKit|Foundation)\b/, weight: 3 },
  ],
  Kotlin: [
    { pattern: /\bfun\s+main\(/, weight: 3 },
    { pattern: /\bval\s+\w+\s*=/, weight: 2 },
    { pattern: /\bprintln\(/, weight: 1 },
  ],
  SQL: [
    { pattern: /\bSELECT\b[\s\S]*\bFROM\b/i, weight: 4 },
    { pattern: /\bINSERT\s+INTO\b/i, weight: 3 },
    { pattern: /\bCREATE\s+TABLE\b/i, weight: 3 },
    { pattern: /\bWHERE\b/i, weight: 1 },
  ],
  HTML: [
    { pattern: /<!DOCTYPE html>/i, weight: 4 },
    { pattern: /<\/?(html|head|body|div|span)[\s>]/i, weight: 2 },
  ],
  CSS: [
    { pattern: /[.#]?[\w-]+\s*\{[^}]*:[^}]*;[^}]*\}/, weight: 2 },
    { pattern: /@media\s*\(/, weight: 3 },
  ],
  JSON: [{ pattern: /^\s*[[{][\s\S]*[\]}]\s*$/, weight: 1 }],
  YAML: [
    { pattern: /^---\s*$/m, weight: 3 },
    { pattern: /^[\w-]+:\s*.+$/m, weight: 1 },
  ],
  Bash: [
    { pattern: /^#!\/(usr\/bin\/env\s+)?(bash|sh)/, weight: 4 },
    { pattern: /\becho\s+["$]/, weight: 1 },
    { pattern: /\bif\s*\[.*\]\s*;\s*then\b/, weight: 2 },
  ],
}

export function detectLanguage(code: string): string | null {
  const trimmed = code.trim()
  if (trimmed.length < 8) return null

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed)
      return "JSON"
    } catch {
      // Not valid JSON — fall through to pattern matching.
    }
  }

  let bestLanguage: string | null = null
  let bestScore = 0

  for (const [language, signals] of Object.entries(LANGUAGE_SIGNALS)) {
    let score = 0
    for (const { pattern, weight } of signals) {
      if (pattern.test(trimmed)) score += weight
    }
    if (score > bestScore) {
      bestScore = score
      bestLanguage = language
    }
  }

  return bestScore >= 3 ? bestLanguage : null
}
