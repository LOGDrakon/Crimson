import React from 'react'
import { lighten, mix } from '../../core/palette'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { StepHeader } from './common'
import { t } from '../i18n'

function get(p: Record<string,string>, key: string, fallback: string){
  return p[key] || fallback
}

export const StepComponentsPreview: React.FC = () => {
  const w = useNewProjectWizard()
  const pal = w.draft?.light || {}
  const bg = get(pal,'background','#f7f7f7')
  const surface = get(pal,'surface', bg)
  const text = get(pal,'text','#111111')
  const primary = get(pal,'primary','#3366ff')
  const primaryFg = get(pal,'primaryFg','#ffffff')
  const success = get(pal,'success','#22c55e')
  const danger = get(pal,'danger','#ef4444')
  const border = get(pal,'border','#cccccc')
  const info = get(pal,'info','#3b82f6')
  const radius = 4
  const focusRing = get(pal,'focusRing', lighten(primary,0.2)||primary)
  const selectionBg = get(pal,'selectionBg', mix(bg, primary, 0.2))
  const selectionFg = get(pal,'selectionFg', get(pal,'text','#111111'))
  const selectionBgHover = get(pal,'selectionBgHover', mix(selectionBg, primary, 0.2))

  const cardStyle: React.CSSProperties = { background: surface, border: `1px solid ${border}`, borderRadius: radius, padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }

  return (
    <div className="space-y-4">
      <StepHeader title="Components" subtitle="Aperçu micro UI avec tokens actuels (light)." />
      <div className="grid md:grid-cols-2 gap-4" style={{ background: bg, padding: 12, borderRadius: 8 }}>
        <div style={cardStyle}>
          <div className="text-xs font-semibold opacity-70">Boutons</div>
          <div className="flex gap-2 flex-wrap">
            <button style={{ background: primary, color: primaryFg, borderRadius: radius, padding: '6px 12px', fontSize: 12, border: 'none' }}>Primary</button>
            <button style={{ background: success, color: get(pal,'successFg','#052e16'), borderRadius: radius, padding: '6px 12px', fontSize: 12, border: 'none' }}>Success</button>
            <button style={{ background: danger, color: get(pal,'dangerFg','#450a0a'), borderRadius: radius, padding: '6px 12px', fontSize: 12, border: 'none' }}>Danger</button>
            <button style={{ background: 'transparent', color: primary, border: `1px solid ${primary}`, borderRadius: radius, padding: '6px 12px', fontSize: 12 }}>Outline</button>
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs font-semibold opacity-70">Alertes</div>
          <div className="flex flex-col gap-2 text-[11px]">
            <div style={{ background: get(pal,'successSubtle','#dcfce7'), color: get(pal,'successFg','#052e16'), border: `1px solid ${success}`, borderRadius: radius, padding: '6px 8px' }}>Succès: opération complétée.</div>
            <div style={{ background: get(pal,'dangerSubtle','#fee2e2'), color: get(pal,'dangerFg','#450a0a'), border: `1px solid ${danger}`, borderRadius: radius, padding: '6px 8px' }}>Erreur: action échouée.</div>
            <div style={{ background: get(pal,'warningSubtle','#fef9c3'), color: get(pal,'warningFg','#442a03'), border: `1px solid ${get(pal,'warning','#f59e0b')}`, borderRadius: radius, padding: '6px 8px' }}>Avertissement: vérifiez vos paramètres.</div>
            <div style={{ background: get(pal,'infoSubtle','#e0f2fe'), color: get(pal,'infoFg','#082f49'), border: `1px solid ${info}`, borderRadius: radius, padding: '6px 8px' }}>Info: aperçu informatif.</div>
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs font-semibold opacity-70">Badges</div>
          <div className="flex gap-2 flex-wrap text-[10px]">
            <span style={{ background: primary, color: primaryFg, padding: '3px 8px', borderRadius: 999 }}>Primary</span>
            <span style={{ background: success, color: get(pal,'successFg','#052e16'), padding: '3px 8px', borderRadius: 999 }}>Success</span>
            <span style={{ background: danger, color: get(pal,'dangerFg','#450a0a'), padding: '3px 8px', borderRadius: 999 }}>Danger</span>
            <span style={{ background: info, color: get(pal,'infoFg','#082f49'), padding: '3px 8px', borderRadius: 999 }}>Info</span>
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs font-semibold opacity-70">Formulaire</div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
            <span style={{ opacity: 0.7 }}>Label</span>
            <input placeholder="Saisir…" style={{ background: surface, color: text, border: `1px solid ${border}`, padding: '6px 8px', borderRadius: radius, fontSize: 12 }} />
          </label>
        </div>
        <div style={cardStyle}>
          <div className="text-xs font-semibold opacity-70">Focus & Sélection</div>
          <button
            style={{
              position: 'relative',
              background: primary,
              color: primaryFg,
              border: 'none',
              padding: '6px 12px',
              fontSize: 12,
              borderRadius: radius,
              boxShadow: `0 0 0 2px ${bg}, 0 0 0 4px ${focusRing}`
            }}
          >Bouton focus</button>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', fontSize:11 }}>
            <div style={{ background: selectionBg, color: selectionFg, padding: '4px 8px', borderRadius: radius }}>Selection</div>
            <div style={{ background: selectionBgHover, color: selectionFg, padding: '4px 8px', borderRadius: radius }}>Selection Hover</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepComponentsPreview
