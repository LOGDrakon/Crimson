import React from 'react'
import { usePaletteStore } from '../../store/paletteStore'

export const TokensBar: React.FC<{ simulated?: Record<string,string> }> = ({ simulated }) => {
  const paletteStore = usePaletteStore(s => s.palette)
  const palette = simulated || paletteStore
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(palette).slice(0, 60).map(([k,v]) => (
        <div key={k} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border border-default/40 bg-background/40">
          <span className="w-4 h-4 rounded" style={{ background: v }} />
          <span>{k}</span>
        </div>
      ))}
    </div>
  )
}
