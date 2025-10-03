import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { extractTopColors } from '../utils/imagePalette'

export const PalettePanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const setToken = usePaletteStore((s) => s.setToken)
  const generate = usePaletteStore((s) => s.generateHarmony)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Génération & édition de palettes</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface p-4 rounded border border-default space-y-3">
          <div className="flex items-center gap-3">
            <label className="w-32">Primary</label>
            <input type="color" value={palette.primary} onChange={(e) => setToken('primary', e.target.value)} />
            <span className="text-muted">{palette.primary}</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-32">Secondary</label>
            <input type="color" value={palette.secondary} onChange={(e) => setToken('secondary', e.target.value)} />
            <span className="text-muted">{palette.secondary}</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-32">Accent</label>
            <input type="color" value={palette.accent} onChange={(e) => setToken('accent', e.target.value)} />
            <span className="text-muted">{palette.accent}</span>
          </div>
        </div>
        <div className="bg-surface p-4 rounded border border-default space-y-3">
          <div className="flex gap-2 flex-wrap">
            <button className="btn" onClick={() => generate('complementary', palette.primary)}>Complémentaire</button>
            <button className="btn" onClick={() => generate('analogous', palette.primary)}>Analogue</button>
            <button className="btn" onClick={() => generate('triadic', palette.primary)}>Triadique</button>
            <button className="btn" onClick={() => generate('tetradic', palette.primary)}>Tétradique</button>
            <button className="btn" onClick={() => generate('monochrome', palette.primary)}>Monochrome</button>
          </div>
          <p className="text-muted">Sélectionnez une harmonie pour générer les autres tokens à partir de la couleur primaire.</p>
          <div className="h-px bg-[rgb(var(--color-border))]" />
          <div className="space-y-2">
            <div className="font-medium">Extraction depuis image</div>
            <div className="flex gap-2">
              <button className="btn" onClick={async () => {
                const img = await window.crimson.openImage()
                if (!img) return
                const cols = await extractTopColors(img.dataUrl, 5)
                if (cols[0]) setToken('primary', cols[0])
                if (cols[1]) setToken('secondary', cols[1])
                if (cols[2]) setToken('accent', cols[2])
              }}>Ouvrir une image…</button>
              <button className="btn" onClick={async () => {
                const file = await window.crimson.openText()
                if (!file) return
                try {
                  const json = JSON.parse(file.content)
                  const allowed = ['primary','secondary','accent','background','surface','text','border','success','danger','warning','info']
                  const next: any = {}
                  for (const k of allowed) if (json[k]) next[k] = json[k]
                  if (Object.keys(next).length) {
                    for (const [k,v] of Object.entries(next)) setToken(k as any, v as string)
                  }
                } catch {}
              }}>Importer JSON…</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
