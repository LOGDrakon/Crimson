import React from 'react'
import { usePaletteStore } from '../store/paletteStore'

export const ExportPanel: React.FC = () => {
  const exportJSON = usePaletteStore((s) => s.exportJSON)
  const exportCSS = usePaletteStore((s) => s.exportCSS)
  const exportSCSS = usePaletteStore((s) => s.exportSCSS)
  const exportXAML = usePaletteStore((s) => s.exportXAML)
  const exportGIMP = usePaletteStore((s) => s.exportGIMP)
  const exportSwiftUI = usePaletteStore((s) => s.exportSwiftUI)
  const exportAndroidXML = usePaletteStore((s) => s.exportAndroidXML)
  const exportASE = usePaletteStore((s) => s.exportASE)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({ css: true, json: true })

  const save = async (filename: string, content: string) => {
    await window.crimson.saveText({ defaultPath: filename, content })
  }

  const exportAll = async () => {
    const files: { name: string, content: string, encoding?: 'utf8' | 'base64' }[] = []
    if (selected.json) files.push({ name: 'palette.json', content: exportJSON() })
    if (selected.css) files.push({ name: 'palette.css', content: exportCSS() })
    if (selected.scss) files.push({ name: 'palette.scss', content: exportSCSS() })
    if (selected.tailwind) files.push({ name: 'tailwind.json', content: JSON.stringify(usePaletteStore.getState().tailwindConfig(), null, 2) })
    if (selected.xaml) files.push({ name: 'palette.xaml', content: exportXAML() })
    if (selected.gimp) files.push({ name: 'palette.gpl', content: exportGIMP() })
    if (selected.swiftui) files.push({ name: 'Palette.swift', content: exportSwiftUI() })
    if (selected.android) files.push({ name: 'colors.xml', content: exportAndroidXML() })
    if (selected.ase) files.push({ name: 'palette.ase', content: exportASE(), encoding: 'base64' })
    if (files.length === 0) return
    await window.crimson.exportMany(files)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Export</h2>
      <div className="card p-4">
      <div className="grid grid-cols-2 gap-2 max-w-xl">
        {[
          { key: 'xaml', label: 'XAML' },
          { key: 'css', label: 'CSS Variables' },
          { key: 'scss', label: 'SCSS' },
          { key: 'tailwind', label: 'Tailwind Config' },
          { key: 'json', label: 'JSON Tokens' },
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
      <div>
        <button className="btn btn-primary" onClick={exportAll}>Exporter la palette</button>
      </div>
    </div>
  )
}
