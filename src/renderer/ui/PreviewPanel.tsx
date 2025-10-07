import React from 'react'
import { contrastRatio } from '../core/palette'
import { simulateCvd } from '../utils/colorBlindness'
import { Section } from './preview/Section'
import { TokensBar } from './preview/TokensBar'
import { ButtonsShowcase } from './preview/ButtonsShowcase'
import { AlertsShowcase } from './preview/AlertsShowcase'
import { SurfacesShowcase } from './preview/SurfacesShowcase'
import { AccessibilityReport } from './preview/AccessibilityReport'
import { usePaletteStore as useStore } from '../store/paletteStore'

type Density = 'comfortable' | 'compact'

export const PreviewPanel: React.FC = () => {
  const palette = useStore(s => s.palette)
  const effective = useStore(s => (s as any).effectivePalette?.())
  const cvdMode = useStore(s => (s as any).cvdMode)
  const basePalette = effective || palette
  const simulated = React.useMemo(()=>{
    if (!cvdMode || cvdMode === 'none') return basePalette
    const out: Record<string,string> = {}
    for (const [k,v] of Object.entries(basePalette) as [string,string][]) out[k] = simulateSafe(v, cvdMode)
    return out
  }, [basePalette, cvdMode])
  const [density, setDensity] = React.useState<Density>('comfortable')
  const [showA11y, setShowA11y] = React.useState(true)
  const [showTokens, setShowTokens] = React.useState(true)
  const pad = density === 'compact' ? 'px-2 py-1 text-sm' : 'px-3 py-2'
  const baseBg = simulated.background || '#0b0b0c'
  const baseText = simulated.text || simulated.foreground || '#e5e7eb'
  const cr = contrastRatio(baseText, baseBg).toFixed(2)
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap gap-2">
        <h2 className="text-lg font-semibold">Prévisualisation</h2>
        <div className="h-6 w-px bg-border/60 mx-1" />
        <button className={`btn ${density==='compact'?'btn-primary':''}`} onClick={() => setDensity(density==='compact'?'comfortable':'compact')}>{density==='compact'? 'Densité large':'Densité compacte'}</button>
        <button className={`btn ${showA11y?'btn-primary':''}`} onClick={()=>setShowA11y(v=>!v)}>{showA11y?'Masquer a11y':'Voir a11y'}</button>
        <button className={`btn ${showTokens?'btn-primary':''}`} onClick={()=>setShowTokens(v=>!v)}>{showTokens?'Masquer tokens':'Tokens'}</button>
        <div className="ml-auto text-xs text-muted">Contraste texte/back: {cr}:1</div>
      </div>
      {showTokens && (<Section title="Tokens" description="Aperçu rapide des variables."><TokensBar simulated={simulated} /></Section>)}
      <Section title="Surfaces" description="Variantes clés de surfaces."><SurfacesShowcase simulated={simulated} /></Section>
      <Section title="Actions" description="États multi-variants."><ButtonsShowcase simulated={simulated} /></Section>
      <Section title="Alertes & Feedback" description="Statuts basés sur les tokens sémantiques."><AlertsShowcase simulated={simulated} /></Section>
      {showA11y && (<Section title="Accessibilité" description="Ratios de contraste."><AccessibilityReport /></Section>)}
      <Section title="Hero & Gradient" description="Démo gradient primary→secondary + accent."><GradientHero simulated={simulated} /></Section>
    </div>
  )
}

const GradientHero: React.FC<{ simulated?: Record<string,string> }> = ({ simulated }) => {
  const p = simulated || (useStore.getState().palette as any)
  const gradient = `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 50%, ${p.accent} 100%)`
  return (
    <div className="relative rounded-lg overflow-hidden border border-default/60 shadow-lg">
      <div className="absolute inset-0 opacity-90" style={{ background: gradient }} />
      <div className="relative p-10 space-y-4 backdrop-blur-[2px]">
        <h3 className="text-3xl font-black tracking-tight" style={{ color: p.textOnPrimary || '#fff' }}>Design Systems Instantanés</h3>
        <p className="max-w-lg text-sm leading-relaxed" style={{ color: p.textOnPrimary || '#fff' }}>Affinez la palette et observez en direct les surfaces, actions et alertes s'adapter.</p>
        <div className="flex gap-3">
          <button className="btn btn-primary">Commencer</button>
          <button className="btn" style={{ background: p.surfaceAlt, color: p.text }}>En savoir plus</button>
        </div>
      </div>
    </div>
  )
}

function simulateSafe(hex: string, mode: any) {
  try { return simulateCvd(hex, mode) } catch { return hex }
}
