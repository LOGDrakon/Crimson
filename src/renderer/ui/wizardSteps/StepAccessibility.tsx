import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'

export const StepAccessibility: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_access')} subtitle={t('step_access_sub')} />
      <label className="flex flex-col gap-1 text-xs max-w-xs">{t('min_contrast')}
        <div className="flex items-center gap-2">
          <input aria-label="Contraste minimum" type="range" min={3} max={10} step={0.1} value={w.minContrast} onChange={e=>w.setMinContrast(parseFloat(e.target.value))} aria-valuemin={3} aria-valuemax={10} aria-valuenow={w.minContrast} />
          <input className="w-16 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]" type="number" min={3} max={10} step={0.1} value={w.minContrast} onChange={e=>w.setMinContrast(parseFloat(e.target.value)||3)} />
        </div>
        <div className="text-[10px] opacity-70">{w.minContrast.toFixed(2)}:1</div>
      </label>
      <div className="flex flex-col gap-2 text-xs max-w-xs">
        <label className="flex flex-col gap-1">Contrast policy
          <select value={w.contrastPolicy} onChange={e=>w.setContrastPolicy(e.target.value as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
            <option value="wcagAA">WCAG AA</option>
            <option value="wcagAAA">WCAG AAA</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">Foreground heuristic
          <select value={w.foregroundHeuristic} onChange={e=>w.setForegroundHeuristic(e.target.value as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
            <option value="auto">Auto</option>
            <option value="luminance">Luminance</option>
            <option value="deltaE">ΔE</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={w.highContrastMode} onChange={()=>useNewProjectWizard.setState(s=>({ highContrastMode: !s.highContrastMode }))} /> High contrast mode
        </label>
      </div>
      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" checked={w.enforceSemanticDistance} onChange={e=>w.setEnforceSemanticDistance(e.target.checked)} /> {t('enforce_semantic_distance', { threshold: w.distanceThreshold })}
      </label>
      <label className="flex flex-col gap-1 text-xs max-w-xs">ΔE Distance (semantic)
        <input type="range" min={2} max={20} step={1} value={w.distanceThreshold} onChange={e=>w.setDistanceThreshold(parseInt(e.target.value,10))} />
      </label>
    </div>
  )
}

export default StepAccessibility
