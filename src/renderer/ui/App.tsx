import React, { useEffect, useMemo, useState } from 'react'
import { PalettePanel } from './PalettePanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportPanel } from './ExportPanel'
import { A11yPanel } from './A11yPanel'
import { ProjectPanel } from './ProjectPanel'
import ErrorBoundary from './ErrorBoundary'
import { usePaletteStore } from '../store/paletteStore'
import { useUIStore } from '../store/uiStore'
import { hexToRgb } from '../core/palette'
import { simulateCvd } from '../utils/colorBlindness'
import { OnboardingOverlay } from './OnboardingOverlay'

type TabKey = 'palette' | 'preview' | 'export' | 'a11y' | 'project'

export const App: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('palette')
  const theme = usePaletteStore((s) => s.theme)
  const themeMode = usePaletteStore((s) => (s as any).themeMode)
  const setTheme = usePaletteStore((s) => s.setTheme)
  const setThemeMode = usePaletteStore((s) => (s as any).setThemeMode)
  const palette = usePaletteStore((s) => s.palette)
  const effectivePalette = usePaletteStore((s) => (s as any).effectivePalette?.())
  const sandboxActive = usePaletteStore(s => (s as any).sandboxActive)
  const setPalette = usePaletteStore((s) => s.setPalette)
  const palettes = usePaletteStore((s) => s.palettes)
  const undo = usePaletteStore((s) => s.undo)
  const redo = usePaletteStore((s) => s.redo)
  const focusMode = usePaletteStore(s => (s as any).focusMode)
  const setFocusMode = usePaletteStore(s => (s as any).setFocusMode)
  const cvdMode = usePaletteStore(s => (s as any).cvdMode)
  const onboardingVisible = useUIStore(s => s.onboardingVisible)
  const hydrateCompleted = useUIStore(s => s.hydrateCompleted)
  const showOnboarding = useUIStore(s => s.showOnboarding)
  // removed duplicate declarations (paletteVersion not needed locally for now)

  useMemo(() => {
    const cls = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(cls)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const active = effectivePalette || palette
    const setRgbVar = (key: string, hex?: string) => {
      let c = hex || '#000000'
      if (cvdMode && cvdMode !== 'none') {
        try { c = simulateCvd(c, cvdMode) } catch {}
      }
      const { r, g, b } = hexToRgb(c)
      root.style.setProperty(key, `${r} ${g} ${b}`)
    }
    setRgbVar('--color-primary', active.primary)
    setRgbVar('--color-secondary', active.secondary)
    setRgbVar('--color-accent', active.accent)
    setRgbVar('--color-background', active.background)
    setRgbVar('--color-surface', active.surface)
    setRgbVar('--color-foreground', active.text)
    setRgbVar('--color-border', active.border)
    setRgbVar('--color-success', active.success)
    setRgbVar('--color-danger', active.danger)
    setRgbVar('--color-warning', active.warning)
    setRgbVar('--color-info', active.info)
  }, [palette, effectivePalette, cvdMode])

  // Load palettes/theme from store on first mount and persist on change
  useEffect(() => {
    (async () => {
      const savedPalettes = await window.crimson.storeGet('palettes')
      const savedTheme = await window.crimson.storeGet('theme')
      const savedLegacy = await window.crimson.storeGet('palette')
      if (savedPalettes && savedPalettes.light && savedPalettes.dark) {
        // hydrate
        usePaletteStore.setState({ palettes: savedPalettes, theme: savedTheme || 'dark', palette: savedPalettes[savedTheme || 'dark'] })
      } else if (savedLegacy && typeof savedLegacy === 'object') {
        // migrate legacy single palette
        usePaletteStore.setState({ palettes: { light: savedLegacy, dark: savedLegacy }, theme: 'dark', palette: savedLegacy })
        await window.crimson.storeSet('palettes', { light: savedLegacy, dark: savedLegacy })
        await window.crimson.storeSet('theme', 'dark')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.crimson.storeSet('palettes', palettes)
  }, [palettes])
  useEffect(() => {
    window.crimson.storeSet('theme', theme)
    window.crimson.storeSet('themeMode', themeMode || 'dark')
  }, [theme, themeMode])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac')
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (!mod) return
      // Undo / Redo
      if (e.key.toLowerCase() === 'z' && !e.shiftKey && !e.altKey) {
        e.preventDefault(); undo(); return
      }
      if ((e.key.toLowerCase() === 'y') || (e.key.toLowerCase() === 'z' && e.shiftKey)) {
        e.preventDefault(); redo(); return
      }
      // Toggle theme (Ctrl+T)
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        return
      }
      // Focus mode toggle (Ctrl+K)
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setFocusMode?.(!focusMode)
        return
      }
      // Focus palette search (Ctrl+F)
      if (e.key.toLowerCase() === 'f') {
        const el = document.getElementById('palette-search') as HTMLInputElement | null
        if (el) { e.preventDefault(); el.focus(); el.select?.(); }
        return
      }
      // Export panel quick open (Ctrl+E) -> future item but safe noop if not prioritized yet
      if (e.key.toLowerCase() === 'e') {
        // Only switch if export panel not active
        if (tab !== 'export') { e.preventDefault(); setTab('export') }
        return
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo, theme, setTheme, tab])

  // Hydrate themeMode and subscribe to system theme changes
  useEffect(() => {
    (async () => {
      const savedMode = await window.crimson.storeGet('themeMode')
      const sys = await window.crimson.systemTheme?.()
      if (savedMode === 'auto') {
        setThemeMode?.('auto', sys)
      } else if (savedMode === 'light' || savedMode === 'dark') {
        setThemeMode?.(savedMode)
      }
      window.crimson.onSystemTheme?.((t) => {
        if ((usePaletteStore.getState() as any).themeMode === 'auto') {
          setThemeMode?.('auto', t)
        }
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    hydrateCompleted()
  }, [hydrateCompleted])

  // Listen for New Project command
  useEffect(() => {
    const base = '#990000'
    const buildBase = (hex: string) => {
      // derive a minimal default palette around base (simple tints/shades)
      const lighten = (h: string, a: number) => {
        const n = h.replace('#','')
        const r = parseInt(n.slice(0,2),16), g=parseInt(n.slice(2,4),16), b=parseInt(n.slice(4,6),16)
        const lr = Math.round(r + (255-r)*a), lg=Math.round(g + (255-g)*a), lb=Math.round(b + (255-b)*a)
        return '#' + [lr,lg,lb].map(v=>v.toString(16).padStart(2,'0')).join('')
      }
      const darken = (h: string, a: number) => {
        const n = h.replace('#','')
        const r = parseInt(n.slice(0,2),16), g=parseInt(n.slice(2,4),16), b=parseInt(n.slice(4,6),16)
        const dr = Math.round(r*(1-a)), dg=Math.round(g*(1-a)), db=Math.round(b*(1-a))
        return '#' + [dr,dg,db].map(v=>v.toString(16).padStart(2,'0')).join('')
      }
      const bg = '#0b0b0c'
      return {
        primary: hex,
        primaryHover: lighten(hex,0.08),
        primaryActive: darken(hex,0.15),
        primarySubtle: lighten(hex,0.9),
        primarySubtleHover: lighten(hex,0.82),
        primaryFg: '#ffffff',
        background: bg,
        surface: darken(hex,0.7),
        text: '#e5e7eb',
        border: '#374151',
        success: '#22c55e', successHover: '#16a34a', successActive: '#15803d', successSubtle: '#dcfce7', successSubtleHover:'#bbf7d0', successFg: '#052e16',
        danger: '#ef4444', dangerHover:'#dc2626', dangerActive:'#b91c1c', dangerSubtle:'#fee2e2', dangerSubtleHover:'#fecaca', dangerFg:'#450a0a',
        warning: '#f59e0b', warningHover:'#d97706', warningActive:'#b45309', warningSubtle:'#fef9c3', warningSubtleHover:'#fde68a', warningFg:'#442a03',
        info: '#3b82f6', infoHover:'#2563eb', infoActive:'#1d4ed8', infoSubtle:'#e0f2fe', infoSubtleHover:'#bae6fd', infoFg:'#082f49'
      }
    }
    window.crimson.onNewProject?.(async () => {
      await window.crimson.resetProject?.()
      const p = buildBase(base)
      // Reset both themes to same starting point (user can diverge later)
      usePaletteStore.setState(s => ({
        palettes: { light: p, dark: p },
        palette: p,
        theme: 'dark',
        history: [],
        future: [],
        sandbox: {},
        sandboxActive: false,
        paletteVersion: (s.paletteVersion||0)+1
      }))
      // Persist
      window.crimson.storeSet('palettes', { light: p, dark: p })
      window.crimson.storeSet('theme', 'dark')
      window.crimson.storeSet('themeMode', 'dark')
      setTab('palette')
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-default bg-surface/60 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-xl title-gradient flex items-center gap-2">
          <img src="/icon.png" alt="Crimson" className="w-6 h-6" />
          Crimson
        </h1>
        <div className="flex items-center gap-2">
          {sandboxActive && (
            <span className="text-xs px-2 py-1 rounded bg-warningSubtle text-warningFg border border-warning/40 animate-pulse" title="Sandbox actif – modifications non appliquées">Sandbox</span>
          )}
          <button className="btn" title="Aide / Revoir l'onboarding" onClick={()=>showOnboarding()}>?</button>
          <div className="inline-flex border border-default rounded overflow-hidden" role="group" aria-label="Choix du thème">
            <button
              className={`btn ${themeMode==='light'?'btn-primary':''}`}
              aria-pressed={themeMode==='light'}
              onClick={() => setThemeMode?.('light')}
            >Light</button>
            <button
              className={`btn ${themeMode==='dark'?'btn-primary':''}`}
              aria-pressed={themeMode==='dark'}
              onClick={() => setThemeMode?.('dark')}
            >Dark</button>
            <button
              className={`btn ${themeMode==='auto'?'btn-primary':''}`}
              aria-pressed={themeMode==='auto'}
              onClick={() => setThemeMode?.('auto')}
            >Auto</button>
          </div>
        </div>
      </header>
      {!focusMode && (
      <nav className="border-b border-default bg-surface/60 backdrop-blur-md px-2">
        <ul className="flex gap-1">
          <li><button className={`btn underline-animated ${tab==='palette'?'active':''}`} onClick={() => setTab('palette')}>Palette</button></li>
          <li><button className={`btn underline-animated ${tab==='preview'?'active':''}`} onClick={() => setTab('preview')}>Preview</button></li>
          <li><button className={`btn underline-animated ${tab==='export'?'active':''}`} onClick={() => setTab('export')}>Export</button></li>
          <li><button className={`btn underline-animated ${tab==='a11y'?'active':''}`} onClick={() => setTab('a11y')}>Accessibilité</button></li>
          <li><button className={`btn underline-animated ${tab==='project'?'active':''}`} onClick={() => setTab('project')}>Projet</button></li>
        </ul>
      </nav>
      )}
      <main className="flex-1 p-4 fade-in">
        <ErrorBoundary>
          {tab === 'palette' && <PalettePanel />}
          {tab === 'preview' && <PreviewPanel />}
          {tab === 'export' && <ExportPanel />}
          {tab === 'a11y' && <A11yPanel />}
          {tab === 'project' && <ProjectPanel />}
        </ErrorBoundary>
      </main>
      {onboardingVisible && (
        <>
          <div id="onboarding-root" />
          <OnboardingOverlay />
        </>
      )}
    </div>
  )
}
