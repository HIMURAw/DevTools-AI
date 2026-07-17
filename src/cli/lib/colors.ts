const isColorEnabled = process.stdout.isTTY && !process.env.NO_COLOR

function wrap(code: string) {
  return (text: string) =>
    isColorEnabled ? `\x1b[${code}m${text}\x1b[0m` : text
}

export const colors = {
  dim: wrap("2"),
  bold: wrap("1"),
  cyan: wrap("36"),
  green: wrap("32"),
  red: wrap("31"),
  yellow: wrap("33"),
  magenta: wrap("35"),
}
