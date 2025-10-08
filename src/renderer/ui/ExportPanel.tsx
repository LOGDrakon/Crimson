import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import AnimatedLogo from './components/AnimatedLogo'

export const ExportPanel: React.FC = () => {
  const exportJSON = usePaletteStore((s) => s.exportJSON)
  const exportCSS = usePaletteStore((s) => s.exportCSS)
  const exportCSSThemes = usePaletteStore((s) => (s as any).exportCSSThemes)
  const exportSCSS = usePaletteStore((s) => s.exportSCSS)
  const exportXAML = usePaletteStore((s) => s.exportXAML)
  const exportGIMP = usePaletteStore((s) => s.exportGIMP)
  const exportSwiftUI = usePaletteStore((s) => s.exportSwiftUI)
  const exportAndroidXML = usePaletteStore((s) => s.exportAndroidXML)
  const exportASE = usePaletteStore((s) => s.exportASE)
  const exportStyleDictionary = usePaletteStore((s) => (s as any).exportStyleDictionary)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({ css: true, json: true })
  const [exporting, setExporting] = React.useState(false)
  const [exportResult, setExportResult] = React.useState<string | null>(null)

  const save = async (filename: string, content: string) => {
    await window.crimson.saveText({ defaultPath: filename, content })
  }

  const exportAll = async () => {
    const files: { name: string, content: string, encoding?: 'utf8' | 'base64' }[] = []
    if (selected.json) files.push({ name: 'palette.json', content: exportJSON() })
    if (selected.css) files.push({ name: 'palette.css', content: exportCSS() })
    if (selected.cssThemes) files.push({ name: 'palette.themes.css', content: exportCSSThemes() })
    if (selected.scss) files.push({ name: 'palette.scss', content: exportSCSS() })
    if (selected.tailwind) files.push({ name: 'tailwind.json', content: JSON.stringify(usePaletteStore.getState().tailwindConfig(), null, 2) })
    if (selected.xaml) files.push({ name: 'palette.xaml', content: exportXAML() })
    if (selected.gimp) files.push({ name: 'palette.gpl', content: exportGIMP() })
    if (selected.swiftui) files.push({ name: 'Palette.swift', content: exportSwiftUI() })
    if (selected.android) files.push({ name: 'colors.xml', content: exportAndroidXML() })
    if (selected.ase) files.push({ name: 'palette.ase', content: exportASE(), encoding: 'base64' })
    if (selected.styleDictionary) files.push({ name: 'style-dictionary.json', content: exportStyleDictionary() })
    if (files.length === 0) return

    setExporting(true)
    setExportResult(null)
    try {
      const dir = await window.crimson.exportMany(files)
      if (dir) setExportResult(dir)
    } finally {
      // micro delay for animation visibility if export is instantaneous
      setTimeout(() => setExporting(false), 350)
    }
  }

  return (
    <div className="space-y-4 relative">
      {exporting && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm bg-neutral-900/70 animate-[fadeIn_0.2s_ease_forwards]">
          <AnimatedLogo size={96} />
          <p className="mt-3 text-xs text-neutral-300">Export en cours…</p>
        </div>
      )}
      <h2 className="text-lg font-semibold">Export</h2>
      <div className="card p-4">
        <div className="grid grid-cols-2 gap-2 max-w-xl">
          {[ 
            { key: 'xaml', label: 'XAML' },
            { key: 'css', label: 'CSS Variables (actif)' },
            { key: 'cssThemes', label: 'CSS Multi-thèmes' },
            { key: 'scss', label: 'SCSS' },
            { key: 'tailwind', label: 'Tailwind Config' },
            { key: 'json', label: 'JSON Tokens' },
            { key: 'styleDictionary', label: 'Style Dictionary' },
            { key: 'ase', label: 'ASE (Adobe)' },
            { key: 'gimp', label: 'GIMP Palette' },
            { key: 'swiftui', label: 'SwiftUI' },
            { key: 'android', label: 'Android XML' },
          ].map(item => (
            <label key={item.key} className="flex items-center gap-2">
              <input type="checkbox" checked={!!selected[item.key]} onChange={e => setSelected(s => ({ ...s, [item.key]: e.target.checked }))} />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary" disabled={exporting} onClick={exportAll}>{exporting ? 'Export…' : 'Exporter la palette'}</button>
        {exportResult && !exporting && (
          <span className="text-xs text-neutral-400">Fichiers enregistrés dans: {exportResult}</span>
        )}
      </div>
    </div>
  )
}
