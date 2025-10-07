import React from 'react'
import { usePaletteStore } from '../../store/paletteStore'
import { contrastRatio } from '../../core/palette'

function safeHex(val?: string) {
  if (!val || typeof val !== 'string') return '#000000'
  let v = val.trim()
  if (!v.startsWith('#')) v = '#' + v
  const short = /^#([0-9a-fA-F]{3})$/
  const long = /^#([0-9a-fA-F]{6})$/
  if (short.test(v)) {
    const m = v.slice(1)
    v = '#' + m.split('').map(c => c + c).join('')
  }
  if (!long.test(v)) return '#000000'
  return v.toLowerCase()
}

const safeContrast = (a: string, b: string) => {
  try { return contrastRatio(a, b) } catch { return 0 }
}

export const AccessibilityReport: React.FC = () => {
  const ep = usePaletteStore(s => (s as any).effectivePalette?.()) as any
  const p = ep || (usePaletteStore.getState() as any).palette || {}
  const text = safeHex(p.text)
  const background = safeHex(p.background)
  const surface = safeHex(p.surface)
  const primary = safeHex(p.primary)
  const success = safeHex(p.success)
  const danger = safeHex(p.danger)
  const warning = safeHex(p.warning)
  const info = safeHex(p.info)
  const primaryFg = safeHex(p.primaryFg || text)
  const successFg = safeHex(p.successFg || text)
  const dangerFg = safeHex(p.dangerFg || text)
  const warningFg = safeHex(p.warningFg || text)
  const infoFg = safeHex(p.infoFg || text)
  const pairs: { label: string; fg: string; bg: string }[] = [
    { label: 'Texte sur background', fg: text, bg: background },
    { label: 'Texte sur surface', fg: text, bg: surface },
    { label: 'Primary Fg', fg: primaryFg, bg: primary },
    { label: 'Success Fg', fg: successFg, bg: success },
    { label: 'Danger Fg', fg: dangerFg, bg: danger },
    { label: 'Warning Fg', fg: warningFg, bg: warning },
    { label: 'Info Fg', fg: infoFg, bg: info },
  ]
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
      {pairs.map(pr => {
        const cr = safeContrast(pr.fg, pr.bg)
        const badge = cr >= 7 ? 'AAA' : cr >= 4.5 ? 'AA' : cr >= 3 ? 'AA*' : '⛔'
        return (
          <div key={pr.label} className="rounded border border-default/50 p-2 text-[11px] space-y-1" style={{ background: pr.bg, color: pr.fg }}>
            <div className="flex items-center gap-2"><span className="font-medium">{pr.label}</span><span className="text-[9px] px-1 rounded bg-background/40" style={{ color: pr.fg }}>{badge}</span></div>
            <div className="opacity-80">Contraste: {cr.toFixed(2)}:1</div>
            <div className="opacity-60 break-all">FG {pr.fg} / BG {pr.bg}</div>
          </div>
        )
      })}
    </div>
  )
}
