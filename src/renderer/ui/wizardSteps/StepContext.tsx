import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
// Local fallback (import issue workaround)
const StepHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {subtitle && <p className="text-xs opacity-70 mt-1 leading-snug">{subtitle}</p>}
  </div>
)

export const StepContext: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_context')} subtitle={t('step_context_sub')} />
      <div className="flex flex-col gap-3">
        <label className="text-xs flex flex-col gap-1" title="Les mots-clés ajustent saturation et contraste interne (heuristiques basiques).">
          <span className="flex items-center gap-2">{t('label_keywords')}</span>
          <input value={w.keywords} onChange={e=>w.setKeywords(e.target.value)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs" placeholder="ex: warm, fintech, minimal" />
        </label>
        <label className="text-xs flex flex-col gap-1" title="Le profil applique des deltas sur saturation & contraste (Pastel, Vivid, Nord…).">
          <span className="flex items-center gap-2">{t('label_profile')}</span>
          <select value={w.profile||''} onChange={e=>w.setProfile(e.target.value||null)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs">
            <option value="">(aucun)</option>
            {['Material','Fluent','Nord','Solarized','Pastel','Corporate','Vivid','Monochrome'].map(p=> <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-[11px] opacity-80">
          <input type="checkbox" checked={!!w.autosaveEnabled} onChange={e=>w.setAutosaveEnabled(e.target.checked)} /> Autosave wizard state
        </label>
        <div className="flex flex-col gap-1 text-xs">
          <div className="opacity-70">Presets rapides</div>
          <div className="flex flex-wrap gap-2">
            {['Material','Nord','Pastel','Solarized','Corporate'].map(p => (
              <button key={p} onClick={()=>w.applyPreset(p)} className="px-2 py-0.5 rounded border border-neutral-700 hover:border-neutral-500">
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepContext
