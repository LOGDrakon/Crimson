import React from 'react'
import { usePaletteStore } from '../../store/paletteStore'

const variants: { key: string; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
]

export const ButtonsShowcase: React.FC<{ simulated?: Record<string,string> }> = ({ simulated }) => {
  const storePalette = usePaletteStore(s => s.palette) as any
  const palette = simulated || storePalette
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map(v => {
        const base = palette[v.key]
        const hover = palette[`${v.key}Hover`] || base
        const active = palette[`${v.key}Active`] || hover
        const fg = palette[`${v.key}Fg`] || palette.text
        return (
          <div key={v.key} className="flex flex-col gap-1 min-w-[130px]">
            <div className="text-[11px] font-medium tracking-wide uppercase text-muted">{v.label}</div>
            <button className="rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm"
              style={{ background: base, color: fg }}>Normal</button>
            <button className="rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm"
              style={{ background: hover, color: fg }}>Hover</button>
            <button className="rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm"
              style={{ background: active, color: fg }}>Active</button>
            <button className="rounded text-xs font-medium px-3 py-2 border border-dashed border-default/40 shadow-inner opacity-60"
              style={{ background: palette.disabled, color: palette.textMuted }}>Disabled</button>
          </div>
        )
      })}
    </div>
  )
}
