import { create } from 'zustand'
import { usePaletteStore } from './paletteStore'
import { safeHex } from '../core/palette'

export type WizardStep = 'context' | 'seeds' | 'options' | 'accessibility' | 'themes' | 'naming' | 'semantics' | 'components' | 'preview' | 'summary'

export interface DraftPalette {
  light: Record<string,string>
  dark: Record<string,string>
}

interface NewProjectWizardState {
  open: boolean
  step: WizardStep
  steps: WizardStep[]
  // Inputs
  profile: string | null
  keywords: string
  seeds: string[] // initial color seeds
  lockedSeeds?: boolean[] // parallel array to lock seed auto adjustments (primary, secondary, accent)
  mode: 'single' | 'dual' | 'triad' | 'mono'
  harmonyMode?: 'auto' | 'complementary' | 'triad' | 'analogous'
  saturation: number
  internalContrast: number
  neutralLevels: 5 | 7 | 9 | 12
  includeSemantic: boolean
  variantScope: string[]
  semanticsTokens: string[]
  extraTokens?: string[] // focusRing, selectionBg, selectionFg
  showGrayscaleSim?: boolean
  autoRegenerate?: boolean
  monochromeSemanticStrategy?: 'restrict' | 'remove' | 'keep'
  userPresets?: Record<string,{ seeds:string[]; profile:string|null; saturation:number; internalContrast:number; neutralLevels:5|7|9|12; includeSemantic:boolean; variantScope:string[] }>
  lastEffective?: { saturation:number; internalContrast:number; minContrast:number; contrastPolicy:string; neutralLevels:number }
  minContrast: number
  highContrastMode: boolean
  themes: { light: boolean; dark: boolean; auto: boolean }
  tokenPrefix: string
  mergeStrategy: 'replace' | 'merge' | 'mergeWithPrefix'
  prefixOnMerge: string
  generateNeutrals: boolean
  enforceSemanticDistance: boolean
  distanceThreshold: number
  // Extended (Vague 1 foundation)
  contrastPolicy?: 'wcagAA' | 'wcagAAA' | 'custom'
  foregroundHeuristic?: 'auto' | 'luminance' | 'deltaE'
  overlayOptions?: { enable: boolean; opacity: number; blend: 'multiply' | 'screen' | 'overlay' | 'soft-light' }
  backgroundLayers?: { id: string; role: string; color?: string }[]
  minimalMode?: boolean
  exportPresets?: { css: boolean; tailwind: boolean; json: boolean }
  tokenGroupSelections?: Record<string, boolean>
  cvdSimulations?: { protanopia: boolean; deuteranopia: boolean; tritanopia: boolean }
  autosaveEnabled?: boolean
  styleKeywordsMapping?: Record<string,{ sat: number; lum: number }>
  draft?: DraftPalette
  applying: boolean
  error?: string | null
  confirmReplace: boolean
  history: DraftPalette[]
  future: DraftPalette[]
  renameSuggestions?: { from: string; to: string; reason: string }[]

  // Actions
  openWizard: () => void
  closeWizard: () => void
  next: () => void
  prev: () => void
  go: (s: WizardStep) => void
  setSeeds: (v: string[]) => void
  setKeywords: (v: string) => void
  setProfile: (p: string | null) => void
  setMode: (m: NewProjectWizardState['mode']) => void
  setHarmonyMode: (m: NonNullable<NewProjectWizardState['harmonyMode']>) => void
  setSaturation: (n: number) => void
  setInternalContrast: (n: number) => void
  setNeutralLevels: (n: 5|7|9|12) => void
  toggleSemantic: () => void
  toggleVariant: (v: string) => void
  setMinContrast: (n: number) => void
  toggleSemanticToken: (t: string) => void
  toggleLockedSeed: (index: number) => void
  toggleExtraToken: (t: string) => void
  toggleThemeFlag: (k: keyof NewProjectWizardState['themes']) => void
  setTokenPrefix: (p: string) => void
  setMergeStrategy: (m: NewProjectWizardState['mergeStrategy']) => void
  setPrefixOnMerge: (p: string) => void
  setGenerateNeutrals: (on: boolean) => void
  setEnforceSemanticDistance: (on: boolean) => void
  setDistanceThreshold: (n: number) => void
  setDraft: (draft: DraftPalette) => void
  regenDraft: () => void
  undo: () => void
  redo: () => void
  apply: (toSandbox?: boolean) => Promise<void>
  resetConfirmation: () => void
  // Extended setters
  setContrastPolicy: (p: NonNullable<NewProjectWizardState['contrastPolicy']>) => void
  setForegroundHeuristic: (f: NonNullable<NewProjectWizardState['foregroundHeuristic']>) => void
  setOverlayOptions: (o: NonNullable<NewProjectWizardState['overlayOptions']>) => void
  addBackgroundLayer: (role?: string) => void
  updateBackgroundLayer: (id: string, patch: Partial<{ role: string; color: string }>) => void
  removeBackgroundLayer: (id: string) => void
  toggleMinimalMode: () => void
  toggleExportPreset: (k: keyof NonNullable<NewProjectWizardState['exportPresets']>) => void
  toggleTokenGroup: (group: string) => void
  toggleSimulation: (k: keyof NonNullable<NewProjectWizardState['cvdSimulations']>) => void
  setAutosaveEnabled: (on: boolean) => void
  hydrate: () => Promise<void>
  getAdjustedParams: () => { saturation: number; internalContrast: number }
  generateRenameSuggestions: () => void
  applyPreset: (name: string) => void
  toggleShowGrayscale: () => void
  toggleAutoRegenerate: () => void
  setMonochromeSemanticStrategy: (s: 'restrict' | 'remove' | 'keep') => void
  saveUserPreset: (name: string) => void
  applyUserPreset: (name: string) => void
  deleteUserPreset: (name: string) => void
  setLastEffective: (e: NonNullable<NewProjectWizardState['lastEffective']>) => void
  importUserPresets: (raw: string) => { imported: number; skipped: number; invalid: number } | null
}

const defaultSeeds = ['#990000']
const emptyDraft = (): DraftPalette => ({ light: {}, dark: {} })

export const useNewProjectWizard = create<NewProjectWizardState>((set, get) => ({
  open: false,
  step: 'seeds',
  // Ordered wizard steps (no duplicates). 'context' covers style/profile inputs.
  steps: ['seeds','context','options','accessibility','themes','naming','semantics','components','preview','summary'],
  profile: null,
  keywords: '',
  seeds: defaultSeeds,
  lockedSeeds: [false,false,false],
  mode: 'single',
  harmonyMode: 'auto',
  saturation: 0.85,
  internalContrast: 0.55,
  neutralLevels: 9,
  includeSemantic: true,
  variantScope: ['primary','secondary','accent','success','danger','warning','info'],
  semanticsTokens: ['success','danger','warning','info'],
  extraTokens: ['focusRing','selectionBg','selectionFg'],
  showGrayscaleSim: true,
  autoRegenerate: false,
  monochromeSemanticStrategy: 'restrict',
  userPresets: {},
  minContrast: 4.5,
  highContrastMode: false,
  themes: { light: true, dark: true, auto: false },
  tokenPrefix: '',
  mergeStrategy: 'replace',
  prefixOnMerge: 'new',
  generateNeutrals: true,
  enforceSemanticDistance: true,
  distanceThreshold: 5,
  contrastPolicy: 'wcagAA',
  foregroundHeuristic: 'auto',
  overlayOptions: { enable: false, opacity: 0.5, blend: 'overlay' },
  backgroundLayers: [ { id: 'base', role: 'base' } ],
  minimalMode: false,
  exportPresets: { css: true, tailwind: false, json: true },
  tokenGroupSelections: {},
  cvdSimulations: { protanopia: false, deuteranopia: false, tritanopia: false },
  autosaveEnabled: false,
  styleKeywordsMapping: {},
  draft: emptyDraft(),
  applying: false,
  error: null,
  confirmReplace: false,
  history: [],
  future: [],
  renameSuggestions: [],

  openWizard: () => set({ open: true }),
  closeWizard: () => set({ open: false }),
  next: () => set(s => { const i = s.steps.indexOf(s.step); return { step: s.steps[Math.min(s.steps.length-1, i+1)] } }),
  prev: () => set(s => { const i = s.steps.indexOf(s.step); return { step: s.steps[Math.max(0, i-1)] } }),
  go: (st: WizardStep) => set(s => s.steps.includes(st) ? { step: st } : {}),
  // Accept partial clearing: empty string means 'no seed' so auto-derivation can occur. Only sanitize non-empty values.
  setSeeds: (v) => set({ seeds: v.map(s => s ? safeHex(s) : '') }),
  setKeywords: (v) => set({ keywords: v }),
  setProfile: (p) => set({ profile: p }),
  setMode: (m) => set({ mode: m }),
  setHarmonyMode: (m) => set({ harmonyMode: m }),
  setSaturation: (n) => set({ saturation: Math.min(1, Math.max(0, n)) }),
  setInternalContrast: (n) => set({ internalContrast: Math.min(1, Math.max(0, n)) }),
  setNeutralLevels: (n) => set({ neutralLevels: n }),
  toggleSemantic: () => set(s => ({ includeSemantic: !s.includeSemantic })),
  toggleVariant: (v) => set(s => ({ variantScope: s.variantScope.includes(v) ? s.variantScope.filter(x=>x!==v) : [...s.variantScope, v] })),
  setMinContrast: (n) => set({ minContrast: Math.max(1, Math.min(21, n)) }),
  toggleSemanticToken: (t) => set(s => ({ semanticsTokens: s.semanticsTokens.includes(t) ? s.semanticsTokens.filter(x=>x!==t) : [...s.semanticsTokens, t] })),
  toggleLockedSeed: (index) => set(s => ({ lockedSeeds: (s.lockedSeeds||[]).map((v,i)=> i===index ? !v : v) })),
  toggleExtraToken: (t) => set(s => ({ extraTokens: s.extraTokens?.includes(t) ? s.extraTokens.filter(x=>x!==t) : [...(s.extraTokens||[]), t] })),
  toggleThemeFlag: (k) => set(s => ({ themes: { ...s.themes, [k]: !s.themes[k] } })),
  setTokenPrefix: (p) => set({ tokenPrefix: p }),
  setMergeStrategy: (m) => set({ mergeStrategy: m }),
  setPrefixOnMerge: (p) => set({ prefixOnMerge: p }),
  setGenerateNeutrals: (on) => set({ generateNeutrals: on }),
  setEnforceSemanticDistance: (on) => set({ enforceSemanticDistance: on }),
  setDistanceThreshold: (n) => set({ distanceThreshold: n }),
  setDraft: (draft) => set(s => {
    const prev = s.draft || emptyDraft()
    // Shallow structural equality: keys + values for light & dark
    const eq = (a: Record<string,string>, b: Record<string,string>) => {
      const ak = Object.keys(a); const bk = Object.keys(b)
      if (ak.length !== bk.length) return false
      for (const k of ak) if (a[k] !== b[k]) return false
      return true
    }
    if (eq(prev.light, draft.light) && eq(prev.dark, draft.dark)) return s
    const nextHistory = [...s.history, prev]
    const limited = nextHistory.length > 30 ? nextHistory.slice(nextHistory.length - 30) : nextHistory
    return { draft, history: limited, future: [] }
  }),
  regenDraft: () => {
    // Placeholder: generation logic will live in core/wizard.ts
    const base: DraftPalette = { light: {}, dark: {} }
    set(s => ({ draft: base, history: [...s.history, s.draft||emptyDraft()], future: [] }))
  },
  undo: () => set(s => {
    const prev = s.history[s.history.length-1]
    if (!prev) return s
    const history = s.history.slice(0,-1)
    const future = [s.draft!, ...s.future]
    return { draft: prev, history, future }
  }),
  redo: () => set(s => {
    const next = s.future[0]
    if (!next) return s
    const future = s.future.slice(1)
    const history = [...s.history, s.draft!]
    return { draft: next, history, future }
  }),
  apply: async (toSandbox) => {
    const { draft, mergeStrategy, tokenPrefix, prefixOnMerge, themes, confirmReplace } = get()
    if (!draft) return
    if (mergeStrategy === 'mergeWithPrefix' && !prefixOnMerge.trim()) {
      set({ error: 'Préfixe requis pour mergeWithPrefix' })
      return
    }
    if (mergeStrategy === 'replace' && !confirmReplace) {
      set({ error: 'Confirmation requise pour remplacement total (cliquer à nouveau Appliquer Direct)' , confirmReplace: true })
      return
    }
    const palStore = usePaletteStore.getState()
    const targetThemes = { light: themes.light ? draft.light : palStore.palettes.light, dark: themes.dark ? draft.dark : palStore.palettes.dark }
    // Merge logic
    const merge = (base: Record<string,string>, incoming: Record<string,string>) => {
      if (mergeStrategy === 'replace') return { ...incoming }
      if (mergeStrategy === 'merge') return { ...base, ...incoming }
      // mergeWithPrefix
      const withPrefix = Object.fromEntries(Object.entries(incoming).map(([k,v]) => [ `${prefixOnMerge}${k.charAt(0).toUpperCase()}${k.slice(1)}`, v ]))
      return { ...base, ...withPrefix }
    }
    const nextLight = merge(palStore.palettes.light, targetThemes.light)
    const nextDark = merge(palStore.palettes.dark, targetThemes.dark)
    if (toSandbox) {
      // sandbox apply: only apply to current theme palette tokens into sandbox map
      const active = palStore.theme === 'dark' ? nextDark : nextLight
      usePaletteStore.setState(s => ({ sandbox: active, sandboxActive: true }))
    } else {
      usePaletteStore.setState(s => ({ palettes: { light: nextLight, dark: nextDark }, palette: s.theme==='dark'?nextDark:nextLight, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion||0)+1 }))
    }
    set({ open: false, confirmReplace: false, error: null })
  },
  resetConfirmation: () => set({ confirmReplace: false, error: null })
  ,setContrastPolicy: (p) => set({ contrastPolicy: p })
  ,setForegroundHeuristic: (f) => set({ foregroundHeuristic: f })
  ,setOverlayOptions: (o) => set({ overlayOptions: o })
  ,addBackgroundLayer: (role) => set(s => ({ backgroundLayers: [...(s.backgroundLayers||[]), { id: 'layer_'+Date.now().toString(36), role: role||'bg' }] }))
  ,updateBackgroundLayer: (id, patch) => set(s => ({ backgroundLayers: (s.backgroundLayers||[]).map(l => l.id===id? { ...l, ...patch }: l) }))
  ,removeBackgroundLayer: (id) => set(s => ({ backgroundLayers: (s.backgroundLayers||[]).filter(l=>l.id!==id) }))
  ,toggleMinimalMode: () => set(s => ({ minimalMode: !s.minimalMode }))
  ,toggleExportPreset: (k) => set(s => ({ exportPresets: { css: s.exportPresets?.css ?? false, tailwind: s.exportPresets?.tailwind ?? false, json: s.exportPresets?.json ?? false, [k]: !s.exportPresets?.[k] } as NewProjectWizardState['exportPresets'] }))
  ,toggleTokenGroup: (group) => set(s => ({ tokenGroupSelections: { ...(s.tokenGroupSelections||{}), [group]: !s.tokenGroupSelections?.[group] } }))
  ,toggleSimulation: (k) => set(s => ({ cvdSimulations: { protanopia: s.cvdSimulations?.protanopia ?? false, deuteranopia: s.cvdSimulations?.deuteranopia ?? false, tritanopia: s.cvdSimulations?.tritanopia ?? false, [k]: !s.cvdSimulations?.[k] } as NewProjectWizardState['cvdSimulations'] }))
  ,setAutosaveEnabled: (on) => set({ autosaveEnabled: on })
  ,hydrate: async () => {
    try {
  const raw = await (window as any)?.crimson?.storeGet?.('newProjectWizardState')
      if (raw && typeof raw === 'object') {
  const allowed: (keyof NewProjectWizardState)[] = ['profile','keywords','seeds','mode','harmonyMode','lockedSeeds','saturation','internalContrast','neutralLevels','includeSemantic','variantScope','minContrast','highContrastMode','themes','tokenPrefix','mergeStrategy','prefixOnMerge','generateNeutrals','enforceSemanticDistance','distanceThreshold','contrastPolicy','foregroundHeuristic','overlayOptions','backgroundLayers','minimalMode','exportPresets','tokenGroupSelections','cvdSimulations','autosaveEnabled','userPresets']
        const patch: Partial<NewProjectWizardState> = {}
        for (const k of allowed) if (k in raw) (patch as any)[k] = raw[k]
        set(patch)
      }
    } catch (e) {
      // ignore hydration errors
    }
  }
  ,getAdjustedParams: () => {
    const s = get()
    let saturation = s.saturation
    let internalContrast = s.internalContrast
    const kw = s.keywords.toLowerCase().split(/[,\s]+/).filter(Boolean)
    const apply = (deltaSat: number, deltaContrast: number) => {
      saturation = Math.min(1, Math.max(0, saturation + deltaSat))
      internalContrast = Math.min(1, Math.max(0, internalContrast + deltaContrast))
    }
    // Basic keyword heuristics
    for (const k of kw) {
      if (['warm','chaleur','chaud'].includes(k)) apply(0.05, 0)
      if (['cool','froid','cold'].includes(k)) apply(-0.05, 0)
      if (['vivid','punchy','vif'].includes(k)) apply(0.1, 0.05)
      if (['pastel','soft','doux'].includes(k)) apply(-0.2, -0.05)
      if (['minimal','calm','sobre'].includes(k)) apply(-0.15, 0)
      if (['highcontrast','accessible'].includes(k)) apply(0, 0.15)
      if (['vibrant'].includes(k)) apply(0.12, 0.02)
    }
    // Profile adjustments
    switch (s.profile) {
      case 'Pastel': apply(-0.25, -0.05); break
      case 'Vivid': apply(0.1, 0.05); break
      case 'Monochrome': apply(-0.4, 0.1); break
      case 'Nord': apply(-0.15, -0.02); break
      case 'Solarized': apply(-0.05, 0); break
      case 'Corporate': apply(-0.1, 0.05); break
      case 'Material': apply(0.05, 0); break
      case 'Fluent': apply(-0.05, 0); break
    }
    return { saturation, internalContrast }
  }
  ,generateRenameSuggestions: () => {
    const s = get()
    const draft = s.draft
    if (!draft) return
    const light = draft.light
    const suggestions: { from: string; to: string; reason: string }[] = []
    const mapping: Record<string,string> = {
      primary: 'brand',
      secondary: 'accent',
      accent: 'highlight',
      success: 'positive',
      danger: 'negative',
      warning: 'caution',
      info: 'notice'
    }
    for (const [from,to] of Object.entries(mapping)) {
      if (light[from] && !light[to]) {
        suggestions.push({ from, to, reason: `Alias proposé pour ${from}` })
      }
    }
    // Detect tokens lacking Fg but maybe needing rename (heuristic placeholder)
    Object.keys(light).forEach(k => {
      if (/^primary[A-Z]/.test(k)) return
      if (/^brand/.test(k)) return
      if (k.startsWith('primary') && !light['brand']) {
        suggestions.push({ from: 'primary', to: 'brand', reason: 'Standardisation brand vs primary' })
      }
    })
    set({ renameSuggestions: suggestions })
  }
  ,applyPreset: (name: string) => {
    const presets: Record<string,{ seeds: string[]; profile?: string|null; saturation?: number; internalContrast?: number; variantScope?: string[]; semanticsTokens?: string[] }> = {
      Material: { seeds: ['#6750A4'], profile: 'Material', saturation: 0.9, internalContrast: 0.55, variantScope: ['primary','success','danger','warning','info'], semanticsTokens: ['success','danger','warning','info'] },
      Nord: { seeds: ['#88c0d0'], profile: 'Nord', saturation: 0.7, internalContrast: 0.5, semanticsTokens: ['success','danger','warning','info'] },
      Pastel: { seeds: ['#e6b8d6'], profile: 'Pastel', saturation: 0.6, internalContrast: 0.45 },
      Solarized: { seeds: ['#268bd2'], profile: 'Solarized', saturation: 0.75, internalContrast: 0.5 },
      Corporate: { seeds: ['#004e92'], profile: 'Corporate', saturation: 0.7, internalContrast: 0.6 }
    }
    const p = presets[name]
    if (!p) return
    set(s => {
      const userSeeds = s.seeds || []
      const defaultLike = userSeeds.length === 0 || (userSeeds.length === 1 && (userSeeds[0] === '#990000' || userSeeds[0] === p.seeds[0]))
      // Non-destructive: only replace seeds if user hasn’t meaningfully customized.
      const nextSeeds = defaultLike ? p.seeds : userSeeds
      return {
        seeds: nextSeeds,
        profile: p.profile ?? s.profile,
        saturation: p.saturation ?? s.saturation,
        internalContrast: p.internalContrast ?? s.internalContrast,
        variantScope: p.variantScope ?? s.variantScope,
        semanticsTokens: p.semanticsTokens ?? s.semanticsTokens
      }
    })
  }
  ,toggleShowGrayscale: () => set(s => ({ showGrayscaleSim: !s.showGrayscaleSim }))
  ,toggleAutoRegenerate: () => set(s => ({ autoRegenerate: !s.autoRegenerate }))
  ,setMonochromeSemanticStrategy: (ms) => set({ monochromeSemanticStrategy: ms })
  ,saveUserPreset: (name) => set(s => {
    if (!name.trim()) return s
    const preset = { seeds: s.seeds, profile: s.profile, saturation: s.saturation, internalContrast: s.internalContrast, neutralLevels: s.neutralLevels, includeSemantic: s.includeSemantic, variantScope: s.variantScope }
    return { userPresets: { ...(s.userPresets||{}), [name.trim()]: preset } }
  })
  ,applyUserPreset: (name) => set(s => {
    const p = s.userPresets?.[name]; if (!p) return s
    return { seeds: p.seeds, profile: p.profile, saturation: p.saturation, internalContrast: p.internalContrast, neutralLevels: p.neutralLevels, includeSemantic: p.includeSemantic, variantScope: p.variantScope }
  })
  ,deleteUserPreset: (name) => set(s => {
    if (!s.userPresets?.[name]) return s
    const next = { ...(s.userPresets) }; delete next[name]
    return { userPresets: next }
  })
  ,setLastEffective: (e) => set({ lastEffective: e })
  ,importUserPresets: (raw) => {
    try {
      const s = get()
      const existing = s.userPresets || {}
      let parsed: any = JSON.parse(raw)
      // Accept several shapes: direct mapping, {presets:{...}}, {userPresets:{...}}, array of {name,...}
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        if (parsed.presets && typeof parsed.presets === 'object') parsed = parsed.presets
        else if (parsed.userPresets && typeof parsed.userPresets === 'object') parsed = parsed.userPresets
      }
      let mapping: Record<string, any> = {}
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (!item || typeof item !== 'object') continue
            const { name, seeds, profile, saturation, internalContrast, neutralLevels, includeSemantic, variantScope } = item
            if (!name || !Array.isArray(seeds)) continue
            mapping[name] = { seeds, profile: profile ?? null, saturation, internalContrast, neutralLevels, includeSemantic, variantScope }
        }
      } else if (parsed && typeof parsed === 'object') {
        mapping = parsed
      }
      let imported = 0, skipped = 0, invalid = 0
      const next: Record<string, any> = { ...existing }
      for (const [name, preset] of Object.entries(mapping)) {
        if (!preset || typeof preset !== 'object') { invalid++; continue }
        const { seeds, saturation, internalContrast, neutralLevels, includeSemantic, variantScope, profile } = preset as any
        if (!Array.isArray(seeds) || seeds.length === 0) { invalid++; continue }
        // De-dupe: skip existing names (no overwrite for now)
        if (name in existing) { skipped++; continue }
        next[name] = {
          seeds: seeds.map(s=> safeHex(s)),
          profile: (typeof profile === 'string' || profile === null)? profile: null,
          saturation: typeof saturation === 'number'? saturation: s.saturation,
          internalContrast: typeof internalContrast === 'number'? internalContrast: s.internalContrast,
          neutralLevels: [5,7,9,12].includes(neutralLevels)? neutralLevels: s.neutralLevels,
          includeSemantic: typeof includeSemantic === 'boolean'? includeSemantic: s.includeSemantic,
          variantScope: Array.isArray(variantScope)? variantScope: s.variantScope
        }
        imported++
      }
      set({ userPresets: next })
      return { imported, skipped, invalid }
    } catch (e) {
      return null
    }
  }
}))

// Autosave side-effect (outside create to avoid closure issues)
let __wizard_unsub: (()=>void) | null = null
if (typeof window !== 'undefined') {
  const attemptBind = () => {
    const st = useNewProjectWizard.getState()
    if (!__wizard_unsub) {
      let timeout: any = null
      __wizard_unsub = useNewProjectWizard.subscribe((s, prev) => {
        if (!s.autosaveEnabled) return
  const keys: (keyof NewProjectWizardState)[] = ['profile','keywords','seeds','mode','harmonyMode','lockedSeeds','saturation','internalContrast','neutralLevels','includeSemantic','variantScope','minContrast','highContrastMode','themes','tokenPrefix','mergeStrategy','prefixOnMerge','generateNeutrals','enforceSemanticDistance','distanceThreshold','contrastPolicy','foregroundHeuristic','overlayOptions','backgroundLayers','minimalMode','exportPresets','tokenGroupSelections','cvdSimulations','autosaveEnabled','userPresets']
  const changed = keys.some(k => (s as any)[k] !== (prev as any)[k])
        if (!changed) return
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          try {
            const payload: Record<string, any> = {}
            for (const k of keys) (payload as any)[k] = (s as any)[k]
            (window as any)?.crimson?.storeSet?.('newProjectWizardState', payload)
          } catch {}
        }, 400)
      })
    }
    // Hydrate once
    st.hydrate?.()
  }
  // Delay binding to allow preload ready
  setTimeout(attemptBind, 1000)
}
