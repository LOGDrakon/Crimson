import React, { useEffect, useMemo, useState } from 'react'
import { PalettePanel } from './PalettePanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportPanel } from './ExportPanel'
import { A11yPanel } from './A11yPanel'
import { ProjectPanel } from './ProjectPanel'
import { usePaletteStore } from '../store/paletteStore'

type TabKey = 'palette' | 'preview' | 'export' | 'a11y' | 'project'

export const App: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('palette')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const palette = usePaletteStore((s) => s.palette)
  const setPalette = usePaletteStore((s) => s.setPalette)

  useMemo(() => {
    const cls = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(cls)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', palette.primary)
    root.style.setProperty('--color-secondary', palette.secondary)
    root.style.setProperty('--color-accent', palette.accent)
    root.style.setProperty('--color-background', palette.background)
    root.style.setProperty('--color-surface', palette.surface)
    root.style.setProperty('--color-foreground', palette.text)
    root.style.setProperty('--color-border', palette.border)
    root.style.setProperty('--color-success', palette.success)
    root.style.setProperty('--color-danger', palette.danger)
    root.style.setProperty('--color-warning', palette.warning)
    root.style.setProperty('--color-info', palette.info)
  }, [palette])

  // Load palette from store on first mount and persist on change
  useEffect(() => {
    (async () => {
      const saved = await window.crimson.storeGet('palette')
      if (saved && typeof saved === 'object') {
        setPalette(saved as any)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.crimson.storeSet('palette', palette)
  }, [palette])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-default bg-surface px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold">Crimson</h1>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </button>
        </div>
      </header>
      <nav className="border-b border-default bg-surface px-2">
        <ul className="flex gap-2">
          <li><button className={`btn ${tab==='palette'?'btn-primary':''}`} onClick={() => setTab('palette')}>Palette</button></li>
          <li><button className={`btn ${tab==='preview'?'btn-primary':''}`} onClick={() => setTab('preview')}>Preview</button></li>
          <li><button className={`btn ${tab==='export'?'btn-primary':''}`} onClick={() => setTab('export')}>Export</button></li>
          <li><button className={`btn ${tab==='a11y'?'btn-primary':''}`} onClick={() => setTab('a11y')}>Accessibilité</button></li>
          <li><button className={`btn ${tab==='project'?'btn-primary':''}`} onClick={() => setTab('project')}>Projet</button></li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        {tab === 'palette' && <PalettePanel />}
        {tab === 'preview' && <PreviewPanel />}
        {tab === 'export' && <ExportPanel />}
        {tab === 'a11y' && <A11yPanel />}
        {tab === 'project' && <ProjectPanel />}
      </main>
    </div>
  )
}
