import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { simulateCvd } from '../utils/colorBlindness'
import { Listbox } from './components/Listbox'
import { contrastRatio } from '../core/palette'
import { converter, parse, formatHex } from 'culori'

// This panel now centralizes accessibility + differentiation diagnostics:
// - Contrast ratios (existing table)
// - Conflicts (low contrast foreground & semantic similarity)
// - Redundances (ΔE < 2 near-duplicates) previously shown in PalettePanel

function badge(ok: boolean) {
  return <span className={`ml-2 text-xs px-2 py-0.5 rounded ${ok ? 'bg-green-600' : 'bg-red-600'}`}>{ok ? 'OK' : 'NOK'}</span>
}

export const A11yPanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const contrastToBg = usePaletteStore((s) => s.contrastToBackground)
  const setToken = usePaletteStore((s) => s.setToken)
  const detectConflicts = usePaletteStore(s => (s as any).detectConflicts)
  const redundancyReport = usePaletteStore(s => (s as any).redundancyReport)
  const alignTokenTo = usePaletteStore(s => (s as any).alignTokenTo)
  const differentiateToken = usePaletteStore(s => (s as any).differentiateToken)
  const applyAutoContrast = usePaletteStore(s => (s as any).applyAutoContrast)
  const storeCvd = usePaletteStore(s => (s as any).cvdMode)
  const setStoreCvd = usePaletteStore(s => (s as any).setCvdMode)
  const [cvd, setCvd] = React.useState<'none'|'protanopia'|'deuteranopia'|'tritanopia'>(storeCvd || 'none')
  const [showConflicts, setShowConflicts] = React.useState(true)
  const [showRedundancy, setShowRedundancy] = React.useState(true)

  const baseTokens = ['text','primary','secondary','accent','success','danger','warning','info']
  const items = baseTokens
    .filter(t => palette[t])
    .map(label => ({ label: label, color: palette[label], ratio: Number(contrastToBg(palette[label]).toFixed(2)) }))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accessibilité</h2>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span>Simulateur daltonisme:</span>
        <div className="min-w-[200px]">
          <Listbox
            options={[
              { value: 'none', label: 'Aucun' },
              { value: 'protanopia', label: 'Protanopie' },
              { value: 'deuteranopia', label: 'Deutéranopie' },
              { value: 'tritanopia', label: 'Tritanopie' },
            ]}
            value={cvd}
            onChange={(v) => { setCvd(v as any); setStoreCvd?.(v as any) }}
          />
        </div>
        <button className="btn" onClick={() => autoFixContrast(palette, setToken)}>Corriger contraste (table)</button>
        <button className="btn" onClick={() => applyAutoContrast?.('text')}>Auto texte</button>
        <div className="flex-1" />
        <button className="btn text-xs" onClick={()=>setShowConflicts(s=>!s)}>{showConflicts? '🧹 Masquer conflits':'⚠️ Voir conflits'}</button>
        <button className="btn text-xs" onClick={()=>setShowRedundancy(s=>!s)}>{showRedundancy? '🧹 Masquer redondances':'🧬 Voir redondances'}</button>
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
      <div className="space-y-4">
        {showConflicts && (
          <ConflictsSection detectConflicts={detectConflicts} palette={palette} onDifferentiate={(t, ref)=>differentiateToken?.(t, ref)} onFixContrast={(t)=>applyAutoContrast?.(t)} />
        )}
        {showRedundancy && (
          <RedundancySection report={redundancyReport?.()} onAlign={(a,b)=>alignTokenTo?.(a,b)} onDifferentiate={(a,b)=>differentiateToken?.(a,b)} />
        )}
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
  try {
    const toHsl = converter('hsl') as any
    const toRgb = converter('rgb') as any
    const c = parse(hex)
    const bg = parse(bgHex)
    if (!c || !bg) return hex
    const hsl = toHsl(c)
    const bgHsl = toHsl(bg)
    const dir = (bgHsl.l || 0.1) > 0.5 ? -1 : 1
    const next = { ...hsl, l: Math.max(0, Math.min(1, (hsl.l || 0.5) + dir * 0.02)) }
    return formatHex(toRgb(next)) || hex
  } catch {
    return hex
  }
}

// Extracted from PalettePanel (conflicts + redundancy panels) and simplified naming
const ConflictsSection: React.FC<{ palette: Record<string,string>, detectConflicts: any, onDifferentiate?: (token: string, reference: string) => void, onFixContrast?: (token: string) => void }> = ({ palette, detectConflicts, onDifferentiate, onFixContrast }) => {
  const issues = detectConflicts ? detectConflicts() : []
  if (!issues.length) return (
    <div className="p-3 rounded border border-default/60 bg-background/40 text-sm text-muted">Aucun conflit détecté ✅</div>
  )
  return (
    <div className="space-y-2">
      <div className="font-medium flex items-center gap-2">Conflits <span className="text-[10px] px-1 rounded bg-red-700 text-white">{issues.length}</span></div>
      <ul className="space-y-1 text-sm max-h-48 overflow-auto pr-1">
        {issues.map((c: any, i: number) => {
          const isContrast = c.ratio !== undefined
          const ref = c.b ? c.b : undefined
          return (
            <li key={i} className="flex items-center gap-2 px-2 py-1 rounded border border-default/50 bg-background/60">
              <span className="text-red-500">⚠️</span>
              <span className="font-mono text-xs bg-background/50 px-1 rounded">{c.token}</span>
              <span className="flex-1">{c.issue}{c.ratio ? ` (ratio ${c.ratio})` : ''}{c.deltaE !== undefined ? ` ΔE ${c.deltaE}` : ''}</span>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded border border-default" style={{ background: c.a }} />
                {c.b && <span className="w-4 h-4 rounded border border-default" style={{ background: c.b }} />}
              </div>
              {isContrast && (
                <button className="btn text-[10px] px-2" title="Corriger contraste" onClick={()=>onFixContrast?.(c.token)}>⚙️</button>
              )}
              {!isContrast && ref && (
                <button className="btn text-[10px] px-2" title="Différencier (ajuster teinte)" onClick={()=>onDifferentiate?.(c.token, c.token === ref ? ref : ref.replace(/(Hover|Active|Subtle|SubtleHover|Fg)$/,''))}>🎨</button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const RedundancySection: React.FC<{ report: { token: string, closest: string, deltaE: number }[] | undefined, onAlign?: (token: string, target: string) => void, onDifferentiate?: (token: string, reference: string) => void }> = ({ report, onAlign, onDifferentiate }) => {
  if (!report) return null
  if (!report.length) return (
    <div className="p-3 rounded border border-default/60 bg-background/40 text-sm text-muted">Aucune redondance ΔE &lt; 2 détectée ✅</div>
  )
  return (
    <div className="space-y-2">
      <div className="font-medium flex items-center gap-2">Redondances <span className="text-[10px] px-1 rounded bg-amber-600/70 text-black">{report.length}</span></div>
      <ul className="space-y-1 max-h-40 overflow-auto pr-1 text-sm">
        {report.map((r,i)=>(
          <li key={i} className="flex items-center gap-2 px-2 py-1 rounded border border-default/50 bg-background/60">
            <span className="font-mono text-xs bg-background/50 px-1 rounded">{r.token}</span>
            <span className="text-muted">≈</span>
            <span className="font-mono text-xs bg-background/50 px-1 rounded">{r.closest}</span>
            <span className="text-[10px] ml-auto px-1 rounded bg-amber-600/70 text-black">ΔE {r.deltaE}</span>
            <button className="btn text-[10px] px-2" title="Aligner (copier la couleur cible)" onClick={()=>onAlign?.(r.token, r.closest)}>⇄</button>
            <button className="btn text-[10px] px-2" title="Différencier (éloigner perceptuellement)" onClick={()=>onDifferentiate?.(r.token, r.closest)}>🎨</button>
          </li>
        ))}
      </ul>
      <div className="text-[10px] text-muted">Fusion ou différenciation recommandée pour épurer la palette.</div>
    </div>
  )
}
