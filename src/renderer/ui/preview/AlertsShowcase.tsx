import React from 'react'
import { usePaletteStore } from '../../store/paletteStore'

const kinds = ['success','danger','warning','info'] as const

export const AlertsShowcase: React.FC<{ simulated?: Record<string,string> }> = ({ simulated }) => {
  const store = usePaletteStore(s => s.palette) as any
  const p = simulated || store
  return (
    <div className="space-y-2 w-full">
      {kinds.map(k => {
        const subtle = p[`${k}Subtle`] || p.surface
        const fg = p[`${k}Fg`] || p.text
        const border = p[k]
        return (
          <div key={k} className="rounded px-3 py-2 text-xs flex items-start gap-2 border" style={{ background: subtle, color: fg, borderColor: border }}>
            <span className="mt-0.5">⚑</span>
            <div className="flex-1">
              <div className="font-semibold capitalize">{k}</div>
              <p className="opacity-80 leading-snug">Message d'alerte de type {k}. Exemple de description multi-ligne.</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
