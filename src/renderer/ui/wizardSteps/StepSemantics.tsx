import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { StepHeader } from './common'
import { t } from '../i18n'

export const StepSemantics: React.FC = () => {
  const w = useNewProjectWizard()
  const base = ['success','danger','warning','info']
  const extras = ['focusRing','selectionBg','selectionFg']
  return (
    <div className="space-y-4">
  <StepHeader title={'Semantics'} subtitle={'Configurer les tokens sémantiques et distance.'} />
      <div className="text-xs space-y-2">
        <div className="flex flex-wrap gap-2">
          {base.map(tok => (
            <button key={tok} onClick={()=>w.toggleSemanticToken(tok)} className={`px-2 py-1 rounded border text-[11px] ${w.semanticsTokens.includes(tok)?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{tok}</button>
          ))}
        </div>
        <div className="mt-2 text-[11px] font-semibold opacity-80">Extra tokens</div>
        <div className="flex flex-wrap gap-2">
          {extras.map(tok => (
            <button key={tok} onClick={()=>w.toggleExtraToken(tok)} className={`px-2 py-1 rounded border text-[11px] ${w.extraTokens?.includes(tok)?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{tok}</button>
          ))}
        </div>
        <label className="flex flex-col gap-1 max-w-[220px]">
          <span className="text-[11px]">ΔE Distance minimale: {w.distanceThreshold}</span>
          <input type="range" min={2} max={20} step={1} value={w.distanceThreshold} onChange={e=>w.setDistanceThreshold(parseInt(e.target.value,10))} />
        </label>
        {!w.enforceSemanticDistance && (
          <div className="text-[10px] opacity-60">Ajustements désactivés (cocher dans Accessibilité).</div>
        )}
      </div>
    </div>
  )
}

export default StepSemantics