// Color blindness simulation using simple linear transformations in sRGB
// Matrices adapted from commonly referenced simulation models (approximate)
// Values are heuristic and serve for preview purposes.

type Mode = 'protanopia' | 'deuteranopia' | 'tritanopia'

const matrices: Record<Mode, number[][]> = {
  protanopia: [
    [0.56667, 0.43333, 0],
    [0.55833, 0.44167, 0],
    [0, 0.24167, 0.75833],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.43333, 0.56667],
    [0, 0.475, 0.525],
  ],
}

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x))

function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  return [r, g, b]
}

function rgb01ToHex([r, g, b]: [number, number, number]) {
  const to = (n: number) => Math.round(clamp(n) * 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

export function simulateCvd(hex: string, mode: Mode): string {
  const m = matrices[mode]
  const [r, g, b] = hexToRgb01(hex)
  const R = clamp(m[0][0] * r + m[0][1] * g + m[0][2] * b)
  const G = clamp(m[1][0] * r + m[1][1] * g + m[1][2] * b)
  const B = clamp(m[2][0] * r + m[2][1] * g + m[2][2] * b)
  return rgb01ToHex([R, G, B])
}
