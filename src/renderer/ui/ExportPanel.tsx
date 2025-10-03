import React from 'react'
import { usePaletteStore } from '../store/paletteStore'

export const ExportPanel: React.FC = () => {
  const exportJSON = usePaletteStore((s) => s.exportJSON)
  const exportCSS = usePaletteStore((s) => s.exportCSS)

  const save = async (filename: string, content: string) => {
    await window.crimson.saveText({ defaultPath: filename, content })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Export</h2>
      <div className="flex gap-2 flex-wrap">
        <button className="btn" onClick={() => save('palette.json', exportJSON())}>Exporter JSON</button>
        <button className="btn" onClick={() => save('palette.css', exportCSS())}>Exporter CSS</button>
        <button className="btn">Exporter Tailwind</button>
        <button className="btn">Exporter XAML</button>
      </div>
    </div>
  )
}
