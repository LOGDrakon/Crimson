import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { simulateCvd } from '../utils/colorBlindness'
import { Listbox } from './components/Listbox'
import { contrastRatio } from '../core/palette'

function badge(ok: boolean) {
  return <span className={`ml-2 text-xs px-2 py-0.5 rounded ${ok ? 'bg-green-600' : 'bg-red-600'}`}>{ok ? 'OK' : 'NOK'}</span>
}

export const A11yPanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const contrastToBg = usePaletteStore((s) => s.contrastToBackground)
  const setToken = usePaletteStore((s) => s.setToken)
  const [cvd, setCvd] = React.useState<'none'|'protanopia'|'deuteranopia'|'tritanopia'>('none')

  const items = [
    { label: 'Texte', color: palette.text },
    { label: 'Primaire', color: palette.primary },
    { label: 'Secondaire', color: palette.secondary },
    { label: 'Accent', color: palette.accent },
  ].map(x => ({ ...x, ratio: Number(contrastToBg(x.color).toFixed(2)) }))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accessibilité</h2>
      <div className="flex items-center gap-2 mb-3">
        <span>Simulateur daltonisme:</span>
        <div className="min-w-[220px]">
          <Listbox
            options={[
              { value: 'none', label: 'Aucun' },
              { value: 'protanopia', label: 'Protanopie' },
              { value: 'deuteranopia', label: 'Deutéranopie' },
              { value: 'tritanopia', label: 'Tritanopie' },
            ]}
            value={cvd}
            onChange={(v) => setCvd(v as any)}
          />
        </div>
        <button className="btn" onClick={() => autoFixContrast(palette, setToken)}>Corriger automatiquement les contrastes</button>
      </div>
      <div className="card p-4">
      <table className="min-w-[400px] w-full">
        <thead>
          <tr className="text-left"><th>Token</th><th>Couleur</th><th>Ratio</th><th>AA</th><th>AAA</th></tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const AA = it.ratio >= 4.5
            const AAA = it.ratio >= 7
            const sim = cvd === 'none' ? it.color : simulateCvd(it.color, cvd)
            return (
              <tr key={it.label}>
                <td className="py-2">{it.label}</td>
                <td><span className="inline-block w-6 h-6 rounded" style={{ background: sim }} /></td>
                <td>{it.ratio}:1</td>
                <td>{badge(AA)}</td>
                <td>{badge(AAA)}</td>
              </tr>
            )
          })}
        </tbody>
  </table>
  </div>
    </div>
  )
}

function autoFixContrast(palette: Record<string,string>, setToken: (name: string, hex: string) => void) {
  // Adjust text and primary minimally to reach AA (>=4.5) against background
  const bg = palette.background || '#0b0b0c'
  const targets = ['text', 'primary'] as const
  for (const key of targets) {
    const start = palette[key] || '#ffffff'
    let c = start
    let tries = 0
    while (contrastRatio(c, bg) < 4.5 && tries < 50) {
      // Nudge brightness depending on current contrast: if too low, push away from bg luminance
      c = nudgeBrightness(c, bg)
      tries++
    }
    setToken(key, c)
  }
}

function nudgeBrightness(hex: string, bgHex: string): string {
  // Simple approach in HSL: increase or decrease lightness depending on background
  const toHsl = (window as any).culoriHsl || require('culori').converter('hsl')
  const fromRgb = (window as any).culoriRgb || require('culori').converter('rgb')
  const c = require('culori').parse(hex)
  const bg = require('culori').parse(bgHex)
  const hsl = toHsl(c)
  const bgHsl = toHsl(bg)
  const dir = (bgHsl.l || 0.1) > 0.5 ? -1 : 1
  const next = { ...hsl, l: Math.max(0, Math.min(1, (hsl.l || 0.5) + dir * 0.02)) }
  return require('culori').formatHex(fromRgb(next)) || hex
}
