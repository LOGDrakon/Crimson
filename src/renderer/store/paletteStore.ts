import { create } from 'zustand'
import { defaultPalette, type Palette, contrastRatio, hexToRgb } from '../core/palette'
import { parse, formatHex, converter } from 'culori'

type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochrome'

type State = {
  theme: 'light' | 'dark'
  palettes: { light: Palette, dark: Palette }
  palette: Palette
  groups: { id: string, name: string }[]
  tokenGroups: Record<string, string | null>
  imageDataUrl: string | null
  history: Palette[]
  future: Palette[]
  setTheme: (t: 'light' | 'dark') => void
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
  removeGroup: (id: string) => void
  assignTokenToGroup: (token: string, groupId: string | null) => void
  setImageDataUrl: (url: string | null) => void
  exportCSS: () => string
  exportJSON: () => string
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
const safeHex = (val?: string) => {
  if (!val) return '#000000'
  let v = val.trim()
  if (!v.startsWith('#')) v = '#' + v
  const short = /^#([0-9a-fA-F]{3})$/
  const long = /^#([0-9a-fA-F]{6})$/
  if (short.test(v)) {
    const m = v.slice(1)
    v = '#' + m.split('').map(ch => ch + ch).join('')
  }
  if (!long.test(v)) return '#000000'
  return v.toLowerCase()
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
  palettes: { light: defaultPalette, dark: defaultPalette },
  palette: defaultPalette,
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
  setTheme: (t) => set((s) => ({ theme: t, palette: s.palettes[t] })),
  setToken: (name, hex) => set((s) => {
    const prev = s.palette
    const next = { ...prev, [name]: safeHex(hex) }
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, history: [...s.history, prev], future: [] }
  }),
  addToken: (name, hex) => set((s) => {
    const key = name && !s.palette[name] ? name : uniqueName(Object.keys(s.palette))
    const next = { ...s.palette, [key]: safeHex(hex || '#888888') }
    const palettes = { ...s.palettes, [s.theme]: next }
    const tokenGroups = { ...s.tokenGroups, [key]: s.tokenGroups[key] ?? 'custom' }
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [] }
  }),
  removeToken: (name) => set((s) => {
    const next = { ...s.palette }
    delete next[name]
    const tg = { ...s.tokenGroups }
    delete tg[name]
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, tokenGroups: tg, history: [...s.history, s.palette], future: [] }
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
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [] }
  }),
  setPalette: (p) => set((s) => ({ palette: p, history: [...s.history, s.palette], future: [] })),
  undo: () => set((s) => {
    const prev = s.history[s.history.length - 1]
    if (!prev) return s
    const history = s.history.slice(0, -1)
    const future = [s.palette, ...s.future]
    const palettes = { ...s.palettes, [s.theme]: prev }
    return { palette: prev, palettes, history, future }
  }),
  redo: () => set((s) => {
    const next = s.future[0]
    if (!next) return s
    const future = s.future.slice(1)
    const history = [...s.history, s.palette]
    const palettes = { ...s.palettes, [s.theme]: next }
    return { palette: next, palettes, history, future }
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
    set((s) => ({ palette: p, palettes: { ...s.palettes, [s.theme]: p }, history: [...s.history, s.palette], future: [] }))
  },
  addGroup: (name) => {
    const id = uniqueName(get().groups.map(g => g.id), 'group')
    const g = { id, name: name || 'Groupe' }
    set((s) => ({ groups: [...s.groups, g] }))
    return id
  },
  renameGroup: (id, name) => set((s) => ({ groups: s.groups.map(g => g.id === id ? { ...g, name } : g) })),
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
  exportJSON: () => JSON.stringify(get().palette, null, 2),
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
  contrastToBackground: (hex: string) => contrastRatio(hex, get().palette.background),
  recommendFor: (token) => {
    const base = get().palette.primary || '#6366f1'
    const recs: { label: string, value: string }[] = []
    recs.push({ label: 'Complémentaire', value: rotateHue(base, 180) })
    recs.push({ label: 'Analogue -30°', value: rotateHue(base, -30) })
    recs.push({ label: 'Analogue +30°', value: rotateHue(base, 30) })
    recs.push({ label: 'Triadique +120°', value: rotateHue(base, 120) })
    recs.push({ label: 'Triadique -120°', value: rotateHue(base, -120) })
    recs.push({ label: 'Tétradique +180°', value: rotateHue(base, 180) })
    recs.push({ label: 'Monochrome', value: rotateHue(base, 0) })
    const uniq = new Map<string, string>()
    for (const r of recs) if (!uniq.has(r.value.toLowerCase())) uniq.set(r.value.toLowerCase(), r.label)
    return Array.from(uniq.entries()).map(([value, label]) => ({ label, value }))
  },
  applyRecommendation: (token, value) => {
    const options = get().recommendFor(token)
    const chosen = value || (options[0]?.value)
    if (chosen) get().setToken(token, chosen)
  }
}))
