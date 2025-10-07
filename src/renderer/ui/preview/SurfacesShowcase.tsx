import React from 'react'
import { usePaletteStore } from '../../store/paletteStore'

export const SurfacesShowcase: React.FC<{ simulated?: Record<string,string> }> = ({ simulated }) => {
  const store = usePaletteStore(s => s.palette) as any
  const p = simulated || store
  const surfaces = [
    { name: 'Background', color: p.background },
    { name: 'Surface', color: p.surface },
    { name: 'Surface Alt', color: p.surfaceAlt || p.surface },
    { name: 'Surface Elevated', color: p.surfaceElevated || p.surface },
    { name: 'Surface Inverted', color: p.surfaceInverted || '#ffffff', fg: p.textInverted || '#0f172a' },
  ]
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))' }}>
      {surfaces.map(s => (
        <div key={s.name} className="rounded p-3 text-[10px] border border-default/50 space-y-1 shadow-inner" style={{ background: s.color, color: s.fg || p.text }}>
          <div className="font-semibold">{s.name}</div>
          <div className="opacity-70 break-all">{s.color}</div>
        </div>
      ))}
    </div>
  )
}
