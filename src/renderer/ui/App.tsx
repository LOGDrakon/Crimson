import React, { useEffect, useMemo, useState } from 'react'
import { PalettePanel } from './PalettePanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportPanel } from './ExportPanel'
import { A11yPanel } from './A11yPanel'
import { ProjectPanel } from './ProjectPanel'
import { usePaletteStore } from '../store/paletteStore'
import { hexToRgb } from '../core/palette'

type TabKey = 'palette' | 'preview' | 'export' | 'a11y' | 'project'

export const App: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('palette')
  const theme = usePaletteStore((s) => s.theme)
  const setTheme = usePaletteStore((s) => s.setTheme)
  const palette = usePaletteStore((s) => s.palette)
  const setPalette = usePaletteStore((s) => s.setPalette)
  const palettes = usePaletteStore((s) => s.palettes)

  useMemo(() => {
    const cls = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(cls)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const setRgbVar = (key: string, hex?: string) => {
      const c = hex || '#000000'
      const { r, g, b } = hexToRgb(c)
      root.style.setProperty(key, `${r} ${g} ${b}`)
    }
    setRgbVar('--color-primary', palette.primary)
    setRgbVar('--color-secondary', palette.secondary)
    setRgbVar('--color-accent', palette.accent)
    setRgbVar('--color-background', palette.background)
    setRgbVar('--color-surface', palette.surface)
    setRgbVar('--color-foreground', palette.text)
    setRgbVar('--color-border', palette.border)
    setRgbVar('--color-success', palette.success)
    setRgbVar('--color-danger', palette.danger)
    setRgbVar('--color-warning', palette.warning)
    setRgbVar('--color-info', palette.info)
  }, [palette])

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
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-default bg-surface/60 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-xl title-gradient flex items-center gap-2">
          <img src="/icon.png" alt="Crimson" className="w-6 h-6" />
          Crimson
        </h1>
        <div className="flex items-center gap-2">
          <div className="inline-flex border border-default rounded overflow-hidden">
            <button className={`btn ${theme==='light'?'btn-primary':''}`} onClick={() => setTheme('light')}>Light</button>
            <button className={`btn ${theme==='dark'?'btn-primary':''}`} onClick={() => setTheme('dark')}>Dark</button>
          </div>
        </div>
      </header>
      <nav className="border-b border-default bg-surface/60 backdrop-blur-md px-2">
        <ul className="flex gap-1">
          <li><button className={`btn underline-animated ${tab==='palette'?'active':''}`} onClick={() => setTab('palette')}>Palette</button></li>
          <li><button className={`btn underline-animated ${tab==='preview'?'active':''}`} onClick={() => setTab('preview')}>Preview</button></li>
          <li><button className={`btn underline-animated ${tab==='export'?'active':''}`} onClick={() => setTab('export')}>Export</button></li>
          <li><button className={`btn underline-animated ${tab==='a11y'?'active':''}`} onClick={() => setTab('a11y')}>Accessibilité</button></li>
          <li><button className={`btn underline-animated ${tab==='project'?'active':''}`} onClick={() => setTab('project')}>Projet</button></li>
        </ul>
      </nav>
      <main className="flex-1 p-4 fade-in">
        {tab === 'palette' && <PalettePanel />}
        {tab === 'preview' && <PreviewPanel />}
        {tab === 'export' && <ExportPanel />}
        {tab === 'a11y' && <A11yPanel />}
        {tab === 'project' && <ProjectPanel />}
      </main>
    </div>
  )
}
