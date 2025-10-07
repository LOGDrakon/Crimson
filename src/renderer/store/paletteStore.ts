import { create } from 'zustand'
import { defaultPalette, type Palette, contrastRatio, hexToRgb, lighten, darken, mix, ensureContrast, rgbDistance, deltaE, luminance, safeHex } from '../core/palette'
import { parse, formatHex, converter } from 'culori'

type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochrome'

type State = {
  theme: 'light' | 'dark'
  themeMode?: 'light' | 'dark' | 'auto'
  palettes: { light: Palette, dark: Palette }
  palette: Palette
  /** Monotonic counter incremented whenever active palette context changes (used for memo invalidation) */
  paletteVersion?: number
  groups: { id: string, name: string }[]
  tokenGroups: Record<string, string | null>
  imageDataUrl: string | null
  history: Palette[]
  future: Palette[]
  setTheme: (t: 'light' | 'dark') => void
  setThemeMode?: (m: 'light' | 'dark' | 'auto', systemTheme?: 'light' | 'dark') => void
  setToken: (name: string, hex: string) => void
  addToken: (name?: string, hex?: string) => void
  removeToken: (name: string) => void
  renameToken: (oldName: string, newName: string) => void
  setPalette: (p: Palette) => void
  undo: () => void
  redo: () => void
  generateHarmony: (mode: HarmonyMode, base: string) => void
  addGroup: (name?: string) => string
  renameGroup: (id: string, name: string) => void
  reorderGroups?: (ids: string[]) => void
  removeGroup: (id: string) => void
  assignTokenToGroup: (token: string, groupId: string | null) => void
  setImageDataUrl: (url: string | null) => void
  exportCSS: () => string
  exportCSSThemes: () => string
  exportJSON: () => string
  exportStyleDictionary: () => string
  tailwindConfig: () => any
  exportSCSS: () => string
  exportXAML: () => string
  exportGIMP: () => string
  exportSwiftUI: () => string
  exportAndroidXML: () => string
  exportASE: () => string
  contrastToBackground: (hex: string) => number
  recommendFor: (token: string) => { label: string, value: string }[]
  applyRecommendation: (token: string, value?: string) => void
  applyAutoContrast?: (token: string) => void
  generateSemanticPack?: (pivot?: string) => void
  redundancyReport?: () => { token: string, closest: string, deltaE: number }[]
  alignTokenTo?: (source: string, target: string) => void
  differentiateToken?: (token: string, reference: string) => void
  generateVariantsFor: (base: string) => void
  generateAllVariants: () => void
  detectConflicts: () => { token: string, issue: string, a: string, b?: string, ratio?: number, deltaE?: number }[]
  evaluationTarget: 'background' | 'surface' | 'base'
  targetContrast: number
  setEvaluationTarget: (t: 'background' | 'surface' | 'base') => void
  setTargetContrast: (v: number) => void
  // Focus mode (UI minimal editing for a specific group)
  focusMode?: boolean
  focusGroupId?: string | null
  setFocusMode?: (on: boolean) => void
  setFocusGroup?: (id: string | null) => void
  cvdMode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  setCvdMode?: (m: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia') => void
  // Sandbox (what-if) editing
  sandboxActive?: boolean
  sandbox?: Record<string,string>
  setSandboxToken?: (name: string, hex: string) => void
  setSandboxActive?: (on: boolean) => void
  applySandbox?: () => void
  discardSandbox?: () => void
  effectivePalette?: () => Palette
  applySnapshot?: (p: Palette) => void
  newProject?: () => void
}

const toHex = (c: any) => formatHex(c) || '#000000'
const uniqueName = (existing: string[], base: string = 'custom') => {
  let i = 1
  let name = base
  while (existing.includes(name)) {
    name = `${base}${i++}`
  }
  return name
}

const rotateHue = (hex: string, deg: number) => {
  const c = parse(hex)
  if (!c) return hex
  const toHsl = converter('hsl')
  const fromHsl = converter('rgb')
  const hsl = toHsl(c) as any
  hsl.h = (((hsl.h || 0) + deg) % 360 + 360) % 360
  return toHex(fromHsl(hsl))
}

const sanitizeSwiftName = (s: string) => {
  const cleaned = s.replace(/[^A-Za-z0-9_]/g, '_')
  return /[A-Za-z_]/.test(cleaned[0]) ? cleaned : `c_${cleaned}`
}
const sanitizeXmlName = (s: string) => {
  let cleaned = s.toLowerCase().replace(/[^a-z0-9_]/g, '_')
  if (!/[a-z_]/.test(cleaned[0])) cleaned = `c_${cleaned}`
  return cleaned
}

export const usePaletteStore = create<State>((set, get) => ({
  theme: 'dark',
  themeMode: 'dark',
  palettes: { light: defaultPalette, dark: defaultPalette },
  palette: defaultPalette,
  paletteVersion: 0,
  groups: [
    { id: 'core', name: 'Système' },
    { id: 'brand', name: 'Marque' },
    { id: 'semantic', name: 'Sémantique' },
    { id: 'neutrals', name: 'Neutres' },
    { id: 'custom', name: 'Personnalisé' },
  ],
  tokenGroups: {
    background: 'core', surface: 'core', text: 'core', border: 'core',
    primary: 'brand', secondary: 'brand', accent: 'brand', tertiary: 'brand', link: 'brand',
    success: 'semantic', danger: 'semantic', warning: 'semantic', info: 'semantic',
    muted: 'neutrals'
  },
  imageDataUrl: null,
  history: [],
  future: [],
  setTheme: (t) => set((s) => ({ theme: t, palette: s.palettes[t], paletteVersion: (s.paletteVersion||0)+1 })),
  setThemeMode: (m, systemTheme) => {
    if (m === 'auto') {
      const sys = systemTheme || (typeof window !== 'undefined' ? (document.documentElement.classList.contains('dark') ? 'dark' : 'light') : 'dark')
      set((s) => ({ themeMode: 'auto', theme: sys, palette: s.palettes[sys], paletteVersion: (s.paletteVersion||0)+1 }))
    } else {
      set((s) => ({ themeMode: m, theme: m, palette: s.palettes[m], paletteVersion: (s.paletteVersion||0)+1 }))
    }
  },
  setToken: (name, hex) => set((s) => {
    const prev = s.palette
    const next = { ...prev, [name]: safeHex(hex) }
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, history: [...s.history, prev], future: [], paletteVersion: (s.paletteVersion||0)+1 }
  }),
  addToken: (name, hex) => set((s) => {
    const key = name && !s.palette[name] ? name : uniqueName(Object.keys(s.palette))
    const next = { ...s.palette, [key]: safeHex(hex || '#888888') }
    const palettes = { ...s.palettes, [s.theme]: next }
    const tokenGroups = { ...s.tokenGroups, [key]: s.tokenGroups[key] ?? 'custom' }
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 }
  }),
  removeToken: (name) => set((s) => {
    const next = { ...s.palette }
    delete next[name]
    const tg = { ...s.tokenGroups }
    delete tg[name]
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, tokenGroups: tg, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 }
  }),
  renameToken: (oldName, newName) => set((s) => {
    const trimmed = (newName || '').trim()
    if (!trimmed || trimmed === oldName || s.palette[trimmed]) return s
    const next: Palette = {}
    for (const [k,v] of Object.entries(s.palette)) next[k === oldName ? trimmed : k] = v as string
    const palettes = { ...s.palettes, [s.theme]: next }
    const tokenGroups = { ...s.tokenGroups }
    if (tokenGroups[oldName] !== undefined) {
      tokenGroups[trimmed] = tokenGroups[oldName] || null
      delete tokenGroups[oldName]
    }
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 }
  }),
  setPalette: (p) => set((s) => ({ palette: p, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 })),
  undo: () => set((s) => {
    const prev = s.history[s.history.length - 1]
    if (!prev) return s
    const history = s.history.slice(0, -1)
    const future = [s.palette, ...s.future]
    const palettes = { ...s.palettes, [s.theme]: prev }
    return { palette: prev, palettes, history, future, paletteVersion: (s.paletteVersion||0)+1 }
  }),
  redo: () => set((s) => {
    const next = s.future[0]
    if (!next) return s
    const future = s.future.slice(1)
    const history = [...s.history, s.palette]
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, history, future, paletteVersion: (s.paletteVersion||0)+1 }
  }),
  generateHarmony: (mode, base) => {
    const p = { ...get().palette }
    switch (mode) {
      case 'complementary':
        p.secondary = rotateHue(base, 180)
        p.accent = rotateHue(base, 0)
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
    set((s) => ({ palette: p, palettes: { ...s.palettes, [s.theme]: p }, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 }))
  },
  addGroup: (name) => {
    const id = uniqueName(get().groups.map(g => g.id), 'group')
    const g = { id, name: name || 'Groupe' }
    set((s) => ({ groups: [...s.groups, g] }))
    return id
  },
  renameGroup: (id, name) => set((s) => ({ groups: s.groups.map(g => g.id === id ? { ...g, name } : g) })),
  reorderGroups: (ids: string[]) => set((s) => {
    const existing = new Map(s.groups.map(g => [g.id, g]))
    const ordered = ids.map(id => existing.get(id)).filter(Boolean) as {id:string,name:string}[]
    // Append any missing (safety) to avoid accidental loss
    s.groups.forEach(g => { if (!ids.includes(g.id)) ordered.push(g) })
    return { groups: ordered }
  }),
  removeGroup: (id) => set((s) => {
    const groups = s.groups.filter(g => g.id !== id)
    const tokenGroups = Object.fromEntries(
      Object.entries(s.tokenGroups).map(([t, gid]) => [t, gid === id ? null : gid])
    ) as Record<string, string | null>
    return { groups, tokenGroups }
  }),
  assignTokenToGroup: (token, groupId) => set((s) => ({ tokenGroups: { ...s.tokenGroups, [token]: groupId } })),
  setImageDataUrl: (url) => set(() => ({ imageDataUrl: url })),
  exportCSS: () => {
    const p = get().palette
    const body = Object.entries(p).map(([k, v]) => `  --color-${k}: ${v};`).join('\n')
    return `:root{\n${body}\n}`
  },
  exportCSSThemes: () => {
    const { palettes } = get()
    const formatBlock = (selector: string, pal: Palette) => {
      const lines = Object.entries(pal).map(([k,v]) => `  --color-${k}: ${v};`).join('\n')
      return `${selector} {\n${lines}\n}`
    }
    const light = formatBlock(':root', palettes.light)
    const dark = formatBlock('.dark', palettes.dark)
    return `${light}\n\n${dark}\n`
  },
  exportJSON: () => JSON.stringify(get().palette, null, 2),
  exportStyleDictionary: () => {
    const { palettes } = get()
    const wrap = (pal: Palette) => Object.fromEntries(Object.entries(pal).map(([k,v]) => [k, { value: v }]))
    const out = {
      color: {
        light: wrap(palettes.light),
        dark: wrap(palettes.dark)
      }
    }
    return JSON.stringify(out, null, 2)
  },
  tailwindConfig: () => {
    const p = get().palette
    return {
      theme: {
        extend: {
          colors: Object.fromEntries(Object.entries(p))
        }
      }
    }
  },
  exportSCSS: () => {
    const p = get().palette
    const lines = Object.entries(p).map(([k, v]) => `$${k}: ${v};`)
    const map = `\n$colors: (\n${Object.entries(p).map(([k,v])=>`  ${k}: ${v}`).join(',\n')}\n);`
    return lines.join('\n') + map + '\n'
  },
  exportXAML: () => {
    const p = get().palette
    const toARGB = (hex: string) => {
      const h = hex.replace('#','')
      const r = h.substring(0,2), g = h.substring(2,4), b = h.substring(4,6)
      return `#FF${r}${g}${b}`
    }
    const entries = Object.entries(p).map(([k,v]) => `  <SolidColorBrush x:Key=\"${k}\" Color=\"${toARGB(v)}\" />`).join('\n')
    return `<ResourceDictionary xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"\n  xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\">\n${entries}\n</ResourceDictionary>\n`
  },
  exportGIMP: () => {
    const p = get().palette
    const header = `GIMP Palette\nName: Crimson\nColumns: 4\n#\n`
    const toLine = (name: string, hex: string) => {
      const { r, g, b } = hexToRgb(hex)
      return `${r} ${g} ${b}\t${name}`
    }
    const body = Object.entries(p).map(([k,v]) => toLine(k, v)).join('\n')
    return header + body + '\n'
  },
  exportSwiftUI: () => {
    const p = get().palette
    const lines = Object.entries(p).map(([k, v]) => `    static let ${sanitizeSwiftName(k)} = Color(hex: "${v}")`)
    return `import SwiftUI\n\nextension Color {\n${lines.join('\n')}\n}\n\n// Hex init helper\nextension Color {\n    init(hex: String) {\n        var hex = hex\n        if hex.hasPrefix("#") { hex.removeFirst() }\n        var int: UInt64 = 0\n        Scanner(string: hex).scanHexInt64(&int)\n        let r = Double((int >> 16) & 0xff) / 255.0\n        let g = Double((int >> 8) & 0xff) / 255.0\n        let b = Double(int & 0xff) / 255.0\n        self = Color(red: r, green: g, blue: b)\n    }\n}\n`
  },
  exportAndroidXML: () => {
    const p = get().palette
    const items = Object.entries(p).map(([k,v]) => `    <color name=\"${sanitizeXmlName(k)}\">${v}</color>`).join('\n')
    return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n${items}\n</resources>\n`
  },
  exportASE: () => {
    const p = get().palette
    const entries = Object.entries(p)

    const chunks: Uint8Array[] = []
    const concat = (parts: Uint8Array[]) => {
      const len = parts.reduce((a, b) => a + b.length, 0)
      const out = new Uint8Array(len)
      let o = 0
      for (const part of parts) { out.set(part, o); o += part.length }
      return out
    }
    const u16be = (n: number) => new Uint8Array([ (n >> 8) & 0xff, n & 0xff ])
    const u32be = (n: number) => new Uint8Array([ (n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff ])
    const ascii = (s: string) => new TextEncoder().encode(s)
    const utf16be = (s: string) => {
      const out = new Uint8Array(s.length * 2)
      for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i)
        out[i*2] = (code >> 8) & 0xff
        out[i*2 + 1] = code & 0xff
      }
      return out
    }
    const f32be = (x: number) => {
      const buf = new ArrayBuffer(4)
      new DataView(buf).setFloat32(0, x, false)
      return new Uint8Array(buf)
    }
    // Header 'ASEF' + version 1.0 + block count
    chunks.push(ascii('ASEF'))
    chunks.push(u16be(1))
    chunks.push(u16be(0))
    chunks.push(u32be(entries.length))

    for (const [name, hex] of entries) {
      // Block type 0x0001
      chunks.push(u16be(0x0001))

      const bodyParts: Uint8Array[] = []
      // Name length (16-bit code units incl. null)
      bodyParts.push(u16be(name.length + 1))
      bodyParts.push(utf16be(name))
      bodyParts.push(u16be(0)) // null terminator
      // Color model 'RGB '
      bodyParts.push(ascii('RGB '))
      const { r, g, b } = hexToRgb(hex)
      bodyParts.push(f32be(r / 255))
      bodyParts.push(f32be(g / 255))
      bodyParts.push(f32be(b / 255))
      // Color type 0 (global)
      bodyParts.push(u16be(0))

      const body = concat(bodyParts)
      chunks.push(u32be(body.length))
      chunks.push(body)
    }

    const aseBytes = concat(chunks)
    // Convert to base64
    let bin = ''
    for (let i = 0; i < aseBytes.length; i++) bin += String.fromCharCode(aseBytes[i])
    // btoa exists in renderer
    const b64 = btoa(bin)
    return b64
  },
  // Contrast helper now respects sandbox effective palette if active
  contrastToBackground: (hex: string) => {
    const ep = (get() as any).effectivePalette ? (get() as any).effectivePalette() : get().palette
    return contrastRatio(hex, ep.background)
  },
  generateVariantsFor: (base) => {
    const s = get()
    const p = { ...s.palette }
    const color = p[base]
    if (!color) return
    const ensure = (name: string, val: string) => { if (!p[name]) p[name] = val }
    const bg = p.background || '#0b0b0c'
    // Adaptive lighten/darken: scale amount based on luminance to keep perceptual step
    const L = luminance(color)
    const scaleLight = L > 0.75 ? 0.04 : L > 0.6 ? 0.06 : L > 0.4 ? 0.08 : L > 0.25 ? 0.1 : 0.12
    const scaleDark = L < 0.15 ? 0.08 : L < 0.25 ? 0.1 : L < 0.4 ? 0.12 : L < 0.6 ? 0.14 : 0.16
    const hover = lighten(color, scaleLight)
    const active = darken(color, scaleDark)
    // Perceptual LCH mix for subtle variants (fallback to sRGB mix if parsing fails)
    const toLch = converter('lch')
    const toRgb = converter('rgb')
    const lchMix = (a: string, b: string, ratio: number) => {
      const ca: any = parse(a) && toLch(parse(a)!)
      const cb: any = parse(b) && toLch(parse(b)!)
      if (!ca || !cb) return mix(a,b,ratio)
      const r = Math.max(0, Math.min(1, ratio))
      let h1 = ca.h ?? 0, h2 = cb.h ?? h1, dh = h2 - h1
      if (dh > 180) dh -= 360
      if (dh < -180) dh += 360
      const out: any = { mode:'lch', l: ca.l + (cb.l - ca.l)*r, c: ca.c + (cb.c - ca.c)*r, h: (h1 + dh * r + 360) % 360 }
      const rgb = toRgb(out)
      return formatHex(rgb) || mix(a,b,ratio)
    }
    const subtle = lchMix(bg, color, 0.12)
    const subtleHover = lchMix(bg, color, 0.18)
    const fgWhite = ensureContrast('#ffffff', color, 4.5)
    const fgBlack = ensureContrast('#111111', color, 4.5)
    const fg = contrastRatio(fgWhite, color) >= contrastRatio(fgBlack, color) ? fgWhite : fgBlack
    const prefix = base.charAt(0).toUpperCase() + base.slice(1)
    ensure(`${base}Hover`, hover)
    ensure(`${base}Active`, active)
    ensure(`${base}Subtle`, subtle)
    ensure(`${base}SubtleHover`, subtleHover)
    ensure(`${base}Fg`, fg)
    set((st) => ({ palette: p, palettes: { ...st.palettes, [st.theme]: p }, history: [...st.history, st.palette], future: [], paletteVersion: (st.paletteVersion||0)+1 }))
  },
  generateAllVariants: () => {
    const bases = ['primary','success','danger','warning','info']
    bases.forEach(b => get().generateVariantsFor(b))
  },
  detectConflicts: () => {
    const p = (get() as any).effectivePalette ? (get() as any).effectivePalette() : get().palette
    const entries = Object.entries(p) as [string,string][]
    const out: { token: string, issue: string, a: string, b?: string, ratio?: number, deltaE?: number }[] = []
    // Low contrast foreground tokens
  for (const [name, hex] of entries) {
      if (/Fg$/.test(name)) {
        const base = name.replace(/Fg$/, '')
        const baseHex = p[base]
        if (baseHex) {
          const ratio = contrastRatio(hex, baseHex)
          if (ratio < 4.5) out.push({ token: name, issue: 'Contraste insuffisant', a: hex, b: baseHex, ratio: Math.round(ratio*100)/100 })
        }
      }
    }
    // Near duplicates among semantic bases
  const semantic = entries.filter(([n]) => /^(primary|success|danger|warning|info)$/.test(n)) as [string,string][]
    for (let i = 0; i < semantic.length; i++) {
      for (let j = i+1; j < semantic.length; j++) {
  const [ni, hi] = semantic[i]
  const [nj, hj] = semantic[j]
        const dist = rgbDistance(hi, hj)
        const dE = deltaE(hi, hj)
        // thresholds: raw RGB <24 OR perceptual deltaE < 5 (very close)
        if (dist < 24 || dE < 5) out.push({ token: ni, issue: `Très proche de ${nj}`, a: hi, b: hj, deltaE: Math.round(dE*100)/100 })
      }
    }
    return out
  },
  evaluationTarget: 'background',
  targetContrast: 4.5,
  setEvaluationTarget: (t) => set({ evaluationTarget: t }),
  setTargetContrast: (v) => set({ targetContrast: Math.max(1, Math.min(21, v)) }),
  focusMode: false,
  focusGroupId: null,
  setFocusMode: (on) => set({ focusMode: on }),
  setFocusGroup: (id) => set({ focusGroupId: id }),
  cvdMode: 'none',
  setCvdMode: (m) => set({ cvdMode: m }),
  sandboxActive: false,
  sandbox: {},
  setSandboxActive: (on) => set({ sandboxActive: on }),
  setSandboxToken: (name, hex) => set((s) => {
    if (!s.sandboxActive) return s // ignore if sandbox not active
    const next = { ...(s.sandbox||{}) , [name]: safeHex(hex) }
    return { sandbox: next, paletteVersion: (s.paletteVersion||0)+1 }
  }),
  applySandbox: () => set((s) => {
    if (!s.sandboxActive || !s.sandbox || Object.keys(s.sandbox).length === 0) return s
    const prev = s.palette
    const merged: Palette = { ...s.palette, ...s.sandbox }
    const palettes = { ...s.palettes, [s.theme]: merged }
    return { palette: merged, palettes, history: [...s.history, prev], future: [], sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion||0)+1 }
  }),
  discardSandbox: () => set((s) => ({ sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion||0)+1 })),
  effectivePalette: () => {
    const s = get() as any
    if (!s.sandboxActive) return s.palette
    return { ...s.palette, ...s.sandbox }
  },
  applySnapshot: (p) => set((s) => {
    // push current into history, clear future, replace palette & theme palette, reset sandbox
    const prev = s.palette
    const palettes = { ...s.palettes, [s.theme]: p }
    return { palette: p, palettes, history: [...s.history, prev], future: [], sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion||0)+1 }
  }),
  // Reset project to a fresh Crimson base palette derived from #990000
  newProject: () => {
    const crimsonBase = '#990000'
    const base = { ...defaultPalette }
    // Override primary family
    base.primary = crimsonBase
    // Derive variants similarly to generateVariantsFor logic (avoid importing mix/ensureContrast again – already imported)
    const L = luminance(crimsonBase)
    const scaleLight = L > 0.75 ? 0.04 : L > 0.6 ? 0.06 : L > 0.4 ? 0.08 : L > 0.25 ? 0.1 : 0.12
    const scaleDark = L < 0.15 ? 0.08 : L < 0.25 ? 0.1 : L < 0.4 ? 0.12 : L < 0.6 ? 0.14 : 0.16
    base.primaryHover = lighten(crimsonBase, scaleLight)
    base.primaryActive = darken(crimsonBase, scaleDark)
    const bg = base.background || '#0b0b0c'
    base.primarySubtle = mix(bg, crimsonBase, 0.12)
    base.primarySubtleHover = mix(bg, crimsonBase, 0.18)
    // Pick readable foreground
    const fgWhite = ensureContrast('#ffffff', crimsonBase, 4.5)
    const fgBlack = ensureContrast('#111111', crimsonBase, 4.5)
    base.primaryFg = contrastRatio(fgWhite, crimsonBase) >= contrastRatio(fgBlack, crimsonBase) ? fgWhite : fgBlack
    // Clear history/future and sandbox, keep current themeMode/theme selection
    set((s) => ({
      palettes: { light: base, dark: base },
      palette: base,
      history: [],
      future: [],
      sandbox: {},
      sandboxActive: false,
      paletteVersion: (s.paletteVersion||0)+1
    }))
  },
  recommendFor: (token) => {
    // Simple memoization cache keyed by token + paletteVersion.
    // Stored on closure (module) scope via (usePaletteStore as any)._recCache
    const storeAny = usePaletteStore as any
    if (!storeAny._recCache) storeAny._recCache = new Map<string, any>()
    const version = (get().paletteVersion||0)
    const cacheKey = token + '|' + version + '|' + get().evaluationTarget + '|' + get().targetContrast
    if (storeAny._recCache.has(cacheKey)) {
      return storeAny._recCache.get(cacheKey)
    }
  const palette = (get() as any).effectivePalette ? (get() as any).effectivePalette() : get().palette
    const bg = palette.background || '#0b0b0c'
    const primary = palette.primary || '#6366f1'
    const surface = palette.surface || '#1f2937'
    const evaluationTarget = (get() as any).evaluationTarget as 'background' | 'surface' | 'base'
    const targetContrast = (get() as any).targetContrast as number

    // Perceptual LCH mix helper (culori based)
    const toLch = converter('lch')
    const toRgb = converter('rgb')
    const lchMix = (a: string, b: string, ratio: number) => {
      const ca: any = toLch(parse(a)!)
      const cb: any = toLch(parse(b)!)
      if (!ca || !cb) return mix(a, b, ratio) // fallback sRGB mix if parsing fails
      const ra = Math.max(0, Math.min(1, ratio))
      let h1 = ca.h ?? 0
      let h2 = cb.h ?? h1
      let dh = h2 - h1
      if (dh > 180) dh -= 360
      if (dh < -180) dh += 360
      const out = {
        mode: 'lch',
        l: ca.l + (cb.l - ca.l) * ra,
        c: ca.c + (cb.c - ca.c) * ra,
        h: (h1 + dh * ra + 360) % 360
      } as any
      const rgb = toRgb(out)
      return formatHex(rgb) || mix(a,b,ratio)
    }

  type Rec = { label: string, value: string, score: number, variant: string, reason: string, metrics: any }
    const out: Rec[] = []

    const push = (label: string, value: string, score: number, variantLabel: string, reason: string, metrics: any) => {
      if (!value) return
      const v = value.toLowerCase()
      if (out.find(r => r.value.toLowerCase() === v)) return
      out.push({ label, value, score, variant: variantLabel, reason, metrics })
    }

    const tokenLower = token.toLowerCase()
    const baseMatch = tokenLower.match(/^(primary|success|danger|warning|info)/)
    const variantMatch = tokenLower.match(/(hover|active|subtlehover|subtle|fg)$/)
    const baseToken = baseMatch ? baseMatch[1] : 'primary'
    const variant = variantMatch ? variantMatch[1] : 'base'
    const baseColor = palette[baseToken] || primary

    // Helpers for variant generation
    const gen = {
      hover: (c: string) => {
        const L = luminance(c)
        const scaleLight = L > 0.75 ? 0.04 : L > 0.6 ? 0.06 : L > 0.4 ? 0.08 : L > 0.25 ? 0.1 : 0.12
        return lighten(c, scaleLight)
      },
      active: (c: string) => {
        const L = luminance(c)
        const scaleDark = L < 0.15 ? 0.08 : L < 0.25 ? 0.1 : L < 0.4 ? 0.12 : L < 0.6 ? 0.14 : 0.16
        return darken(c, scaleDark)
      },
      subtle: (c: string) => mix(bg, c, 0.12),
      subtlehover: (c: string) => mix(bg, c, 0.18),
      fg: (c: string) => {
        // pick white or near-black ensuring contrast
        const white = ensureContrast('#ffffff', c, 4.5)
        const black = ensureContrast('#111111', c, 4.5)
        // prefer higher contrast
        return contrastRatio(white, c) >= contrastRatio(black, c) ? white : black
      }
    }

    const semanticBases: Record<string,string[]> = {
      success: ['#22c55e', '#16a34a', '#15803d'],
      danger: ['#ef4444', '#dc2626', '#b91c1c'],
      warning: ['#f59e0b', '#d97706', '#b45309'],
      info: ['#3b82f6', '#2563eb', '#1d4ed8'],
      primary: [baseColor, lighten(baseColor, 0.1), darken(baseColor, 0.15)]
    }

    const candidates: string[] = []
    const bases = semanticBases[baseToken] || [baseColor]
    for (const b of bases) {
      if (variant === 'base') candidates.push(b)
      else if (variant === 'hover') candidates.push(gen.hover(b))
      else if (variant === 'active') candidates.push(gen.active(b))
      else if (variant === 'subtle') {
        const standard = gen.subtle(b)
        const perceptual = lchMix(bg, b, 0.12)
        candidates.push(standard)
        if (perceptual.toLowerCase() !== standard.toLowerCase()) candidates.push(perceptual)
      }
      else if (variant === 'subtlehover') {
        const baseSubtle = gen.subtle(b)
        const standard = gen.subtlehover(baseSubtle)
        const perceptual = lchMix(bg, b, 0.18)
        candidates.push(standard)
        if (perceptual.toLowerCase() !== standard.toLowerCase()) candidates.push(perceptual)
      }
      else if (variant === 'fg') candidates.push(gen.fg(b))
    }

    // Additional context-aware suggestions
    if (variant === 'base') {
      // Provide accessible alt shades & harmonies
      const altLight = lighten(baseColor, 0.15)
      const altDark = darken(baseColor, 0.2)
      candidates.push(altLight, altDark)
    }

    // Scoring: balance contrast (where relevant) + distinctness
    const needHighContrast = /text|fg$|on/.test(tokenLower)
    const evalBg = evaluationTarget === 'background' ? bg : evaluationTarget === 'surface' ? surface : baseColor

    for (const c of candidates) {
      const contrastBg = contrastRatio(c, bg)
      const contrastSurface = contrastRatio(c, surface)
      const contrastBase = contrastRatio(c, baseColor)
      const contrastEval = contrastRatio(c, evalBg)
      const ideal = needHighContrast ? targetContrast : 2.5
      const contrastScore = 1 - Math.min(1, Math.abs(ideal - contrastEval) / ideal)
      // Max OKLab deltaE between two sRGB colors is roughly ~0.4-0.6 for extremal differences; normalize using 0.5 window
      const dE = deltaE(c, baseColor)
      const distinctScore = Math.min(1, dE / 0.5)
      const balance = needHighContrast ? (contrastScore * 0.7 + distinctScore * 0.3) : (contrastScore * 0.5 + distinctScore * 0.5)
      const reason = needHighContrast
        ? `Optimisé contraste ${contrastEval.toFixed(2)} vs ${evaluationTarget}`
        : `Contraste ${contrastEval.toFixed(2)} / ΔE ${dE.toFixed(2)}`
      const metrics = { contrastBg, contrastSurface, contrastBase, contrastEval, target: ideal, deltaE: Number(dE.toFixed(3)) }
      push(c === baseColor ? 'Base' : c, c, balance, variant, reason, metrics)
    }

    // Fallback to original logic if nothing produced
    if (!out.length) {
      const simple = [
        { label: 'Base', value: baseColor },
        { label: 'Lighten', value: lighten(baseColor, 0.15) },
        { label: 'Darken', value: darken(baseColor, 0.2) },
        { label: 'Subtle', value: mix(bg, baseColor, 0.12) }
      ]
      return simple
    }

    // Sort by score descending
    out.sort((a,b) => b.score - a.score)
    // Map presentation labels
    const labeled = out.map(r => ({
      label: r.label,
      value: r.value,
      variant: r.variant,
      reason: r.reason,
      metrics: r.metrics,
      score: Number(r.score.toFixed(3))
    }))
    const result = labeled.slice(0, 8)
    storeAny._recCache.set(cacheKey, result)
    return result
  },
  applyRecommendation: (token, value) => {
    const options = get().recommendFor(token)
    const chosen = value || (options[0]?.value)
    if (chosen) get().setToken(token, chosen)
  },
  applyAutoContrast: (token) => {
    const s = get()
    const p = s.palette
    const target = s.targetContrast || 4.5
    const value = p[token]
    if (!value) return
    let baseBg = p.background || '#0b0b0c'
    // If token is a foreground variant (ends with Fg) use its base color as background for correction
    if (/Fg$/.test(token)) {
      const base = token.replace(/Fg$/,'')
      if (p[base]) baseBg = p[base]
    }
    const corrected = ensureContrast(value, baseBg, target)
    if (corrected.toLowerCase() !== value.toLowerCase()) {
      s.setToken(token, corrected)
    }
  },
  generateSemanticPack: (pivot) => {
    const s = get()
    const base = pivot && s.palette[pivot] ? s.palette[pivot] : s.palette.primary || '#6366f1'
    // Derive hues by rotating in HSL space using existing helper rotateHue-like logic (reuse parse+converter here)
    const toHsl = converter('hsl')
    const toRgb = converter('rgb')
    const src = parse(base)
    if (!src) return
    const hsl: any = toHsl(src)
    const mk = (deg: number, satDelta = 0, lightDelta = 0) => {
      const clone: any = { ...hsl }
      clone.h = (((clone.h || 0) + deg) % 360 + 360) % 360
      clone.s = Math.min(1, Math.max(0, (clone.s || 0) + satDelta))
      clone.l = Math.min(1, Math.max(0, (clone.l || 0) + lightDelta))
      return formatHex(toRgb(clone)) || base
    }
    const next = { ...s.palette }
    // Basic assignments (avoid overwriting if user manually changed variants)
    const assign = (k: string, v: string) => { if (!next[k]) next[k] = v }
    assign('success', mk(120, 0, 0))
    assign('danger', mk(300, 0, -0.05))
    assign('warning', mk(45, 0.05, 0.05))
    assign('info', mk(-60, 0, 0))
    // Push palette
    usePaletteStore.setState(st => ({
      palette: next,
      palettes: { ...st.palettes, [st.theme]: next },
      history: [...st.history, st.palette],
      future: [],
      paletteVersion: (st.paletteVersion||0)+1
    }))
  },
  // Redundancy report (palette similarity) uses effective palette
  redundancyReport: () => {
    const p = (get() as any).effectivePalette ? (get() as any).effectivePalette() : get().palette
    const entries = Object.entries(p) as [string,string][]
    const bases = entries.filter(([n]) => !/(Hover|Active|Subtle|SubtleHover|Fg)$/.test(n)) as [string,string][]
    const out: { token: string, closest: string, deltaE: number }[] = []
    for (let i = 0; i < bases.length; i++) {
      let best: { name: string, d: number } | null = null
      for (let j = 0; j < bases.length; j++) {
        if (i === j) continue
  const d = deltaE(bases[i][1], bases[j][1])
        if (!best || d < best.d) best = { name: bases[j][0], d }
      }
      if (best && best.d < 2) out.push({ token: bases[i][0], closest: best.name, deltaE: Number(best.d.toFixed(3)) })
    }
    return out.sort((a,b)=>a.deltaE-b.deltaE)
  },
  // Align one token exactly to another (copy value)
  alignTokenTo: (source, target) => {
    const s = get()
    const p = (get() as any).effectivePalette ? (get() as any).effectivePalette() : s.palette
    if (!p[source] || !p[target]) return
    if (p[source].toLowerCase() === p[target].toLowerCase()) return
    s.setToken(source, p[target])
  },
  // Differentiate token from reference by adjusting hue/lightness until ΔE >= ~5
  differentiateToken: (token, reference) => {
    const s = get()
    const p = (get() as any).effectivePalette ? (get() as any).effectivePalette() : s.palette
    const base = p[token]
    const ref = p[reference]
    if (!base || !ref) return
    if (deltaE(base, ref) >= 5) return
    const parsed = parse(base)
    if (!parsed) return
    const toHsl = converter('hsl')
    const toRgb = converter('rgb')
    const hsl: any = toHsl(parsed)
    let hash = 0; for (let i=0;i<token.length;i++) hash = (hash*31 + token.charCodeAt(i)) & 0xffffffff
    const jitter = (hash % 11) - 5
    hsl.h = (((hsl.h || 0) + 15 + jitter) % 360 + 360) % 360
    const refParsed = parse(ref)
    if (refParsed) {
      const refHsl: any = toHsl(refParsed)
      if (refHsl && typeof refHsl.l === 'number' && typeof hsl.l === 'number') {
        if (refHsl.l >= hsl.l) hsl.l = Math.max(0, hsl.l - 0.12)
        else hsl.l = Math.min(1, hsl.l + 0.12)
      }
    }
    let candidate = formatHex(toRgb(hsl)) || base
    if (deltaE(candidate, ref) < 5) {
      candidate = luminance(candidate) > 0.5 ? darken(candidate, 0.2) : lighten(candidate, 0.2)
    }
    s.setToken(token, candidate)
  }
}))
