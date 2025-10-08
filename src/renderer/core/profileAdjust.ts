import { parse, formatHex, converter } from 'culori'
import { deltaE } from './palette'

const toHsl = converter('hsl') as any
const toRgb = converter('rgb') as any

export type HarmonyKind = 'complementary' | 'triad' | 'analogous'

// Choose an automatic harmony based on keyword/profile intent and seed hue distribution.
export function pickAutoHarmony(opts: { base: string; profile?: string|null; keywords?: string }): HarmonyKind {
  const kw = (opts.keywords||'').toLowerCase()
  const p = parse(opts.base)
  if (!p) return 'triad'
  if (/pastel|minimal|mono|sobr|calm/.test(kw) || opts.profile === 'Monochrome') return 'analogous'
  if (/vivid|punchy|vibrant/.test(kw) || opts.profile === 'Vivid') return 'triad'
  if (/corporate|fluent|material|brand|trust/.test(kw) || opts.profile === 'Corporate') return 'complementary'
  return 'triad'
}

export function rotate(hex: string, deg: number) {
  const p = parse(hex); if (!p) return hex
  const h = toHsl(p)
  h.h = (((h.h||0)+deg)%360+360)%360
  return formatHex(toRgb(h)) || hex
}

// Adjust primary seed by profile/keywords without drastic hue shift.
export function adjustSeed(hex: string, opts: { profile?: string|null; keywords?: string }): string {
  const p = parse(hex); if (!p) return hex
  const h = toHsl(p)
  const kw = (opts.keywords||'').toLowerCase().split(/[\s,]+/).filter(Boolean)
  const sat = h.s || 0
  const l = h.l || 0.5
  // Gentle adjustments
  if (opts.profile === 'Pastel') {
    h.s = Math.max(0, sat * 0.65)
    h.l = Math.min(0.9, l + 0.05)
  } else if (opts.profile === 'Vivid') {
    h.s = Math.min(1, sat * 1.12 + 0.04)
  } else if (opts.profile === 'Monochrome') {
    h.s = sat * 0.15
  } else if (opts.profile === 'Nord') {
    h.s = sat * 0.75
    h.l = Math.min(0.85, l + 0.03)
  } else if (opts.profile === 'Solarized') {
    h.s = sat * 0.9
  } else if (opts.profile === 'Corporate') {
    h.s = sat * 0.8
  }
  if (kw.includes('pastel')) h.s = Math.min(h.s, 0.55)
  if (kw.includes('vif') || kw.includes('vivid') || kw.includes('punchy') || kw.includes('vibrant')) h.s = Math.min(1, h.s * 1.15 + 0.03)
  if (kw.includes('minimal') || kw.includes('sobre')) h.s = h.s * 0.7
  return formatHex(toRgb(h)) || hex
}

export function ensureSeparation(a: string, b: string): { a: string; b: string } {
  // If colors are too close (ΔE < 12) rotate b until separated or attempts exhausted
  let attempts = 0
  let currentB = b
  while (deltaE(a, currentB) < 12 && attempts < 18) {
    currentB = rotate(currentB, 15 + attempts)
    attempts++
  }
  return { a, b: currentB }
}

export function deriveHarmonySeeds(primary: string, mode: HarmonyKind): string[] {
  if (mode === 'complementary') return [primary, rotate(primary,180)]
  if (mode === 'triad') return [primary, rotate(primary,120), rotate(primary,-120)]
  // analogous
  return [primary, rotate(primary,30), rotate(primary,-30)]
}
