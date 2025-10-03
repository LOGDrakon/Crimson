export type TokenName =
  | 'primary' | 'secondary' | 'accent'
  | 'background' | 'surface' | 'text' | 'border'
  | 'success' | 'danger' | 'warning' | 'info'

export type Palette = Record<TokenName, string> // hex string like #RRGGBB

export const defaultPalette: Palette = {
  primary: '#6366f1',
  secondary: '#ec4899',
  accent: '#22c55e',
  background: '#0b0b0c',
  surface: '#1f2937',
  text: '#e5e7eb',
  border: '#374151',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
}

export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const n = hex.replace('#','')
  const bigint = parseInt(n, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

export function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const [R, G, B] = [r, g, b].map(v => {
    const x = v/255
    return x <= 0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4)
  })
  return 0.2126*R + 0.7152*G + 0.0722*B
}

export function contrastRatio(hex1: string, hex2: string) {
  const L1 = luminance(hex1)
  const L2 = luminance(hex2)
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}
