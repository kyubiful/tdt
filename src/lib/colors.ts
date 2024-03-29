type Color =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'

export function color(text: string, color: Color) {
  if (color === 'black') return `\x1b[30m${text}\x1b[0m`
  if (color === 'red') return `\x1b[31m${text}\x1b[0m`
  if (color === 'green') return `\x1b[32m${text}\x1b[0m`
  if (color === 'yellow') return `\x1b[33m${text}\x1b[0m`
  if (color === 'blue') return `\x1b[34m${text}\x1b[0m`
  if (color === 'magenta') return `\x1b[35m${text}\x1b[0m`
  if (color === 'cyan') return `\x1b[36m${text}\x1b[0m`
  if (color === 'white') return `\x1b[37m${text}\x1b[0m`
  return text
}
