import { create } from 'zustand'
import { defaultPalette, type Palette, type TokenName, contrastRatio } from '../core/palette'
import { parse, formatHex, converter } from 'culori'

type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochrome'

type State = {
  palette: Palette
  history: Palette[]
  future: Palette[]
  setToken: (name: TokenName, hex: string) => void
  setPalette: (p: Palette) => void
  undo: () => void
  redo: () => void
  generateHarmony: (mode: HarmonyMode, base: string) => void
  exportCSS: () => string
  exportJSON: () => string
  tailwindConfig: () => any
  contrastToBackground: (hex: string) => number
}

const toHex = (c: any) => formatHex(c) || '#000000'

const rotateHue = (hex: string, deg: number) => {
  const c = parse(hex)
  if (!c) return hex
  const toHsl = converter('hsl')
  const fromHsl = converter('rgb')
  const hsl = toHsl(c) as any
  hsl.h = (((hsl.h || 0) + deg) % 360 + 360) % 360
  return toHex(fromHsl(hsl))
}

export const usePaletteStore = create<State>((set, get) => ({
  palette: defaultPalette,
  history: [],
  future: [],
  setToken: (name, hex) => set((s) => {
    const prev = s.palette
    const next = { ...prev, [name]: hex }
    return { palette: next, history: [...s.history, prev], future: [] }
  }),
  setPalette: (p) => set((s) => ({ palette: p, history: [...s.history, s.palette], future: [] })),
  undo: () => set((s) => {
    const prev = s.history[s.history.length - 1]
    if (!prev) return s
    const history = s.history.slice(0, -1)
    const future = [s.palette, ...s.future]
    return { palette: prev, history, future }
  }),
  redo: () => set((s) => {
    const next = s.future[0]
    if (!next) return s
    const future = s.future.slice(1)
    const history = [...s.history, s.palette]
    return { palette: next, history, future }
  }),
  generateHarmony: (mode, base) => {
    const p = { ...get().palette }
    switch (mode) {
      case 'complementary':
        p.secondary = rotateHue(base, 180)
        break
      case 'analogous':
        p.secondary = rotateHue(base, -30)
        p.accent = rotateHue(base, 30)
        break
      case 'triadic':
        p.secondary = rotateHue(base, 120)
        p.accent = rotateHue(base, -120)
        break
      case 'tetradic':
        p.secondary = rotateHue(base, 60)
        p.accent = rotateHue(base, 180)
        p.info = rotateHue(base, -120)
        break
      case 'monochrome':
        // simple lighten/darken variants
        p.secondary = rotateHue(base, 0)
        p.accent = rotateHue(base, 0)
        break
    }
    set((s) => ({ palette: p, history: [...s.history, s.palette], future: [] }))
  },
  exportCSS: () => {
    const p = get().palette
    const vars = {
      '--color-primary': p.primary,
      '--color-secondary': p.secondary,
      '--color-accent': p.accent,
      '--color-background': p.background,
      '--color-surface': p.surface,
      '--color-foreground': p.text,
      '--color-border': p.border,
      '--color-success': p.success,
      '--color-danger': p.danger,
      '--color-warning': p.warning,
      '--color-info': p.info,
    }
    const body = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')
    return `:root{\n${body}\n}`
  },
  exportJSON: () => JSON.stringify(get().palette, null, 2),
  tailwindConfig: () => {
    const p = get().palette
    return {
      theme: {
        extend: {
          colors: {
            primary: p.primary,
            secondary: p.secondary,
            accent: p.accent,
            background: p.background,
            surface: p.surface,
            foreground: p.text,
            border: p.border,
            success: p.success,
            danger: p.danger,
            warning: p.warning,
            info: p.info,
          }
        }
      }
    }
  },
  contrastToBackground: (hex: string) => contrastRatio(hex, get().palette.background)
}))
