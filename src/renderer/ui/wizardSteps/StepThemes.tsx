import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'

export const StepThemes: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_themes')} subtitle={t('step_themes_sub')} />
      <div className="flex gap-3 text-xs">
        {(['light','dark','auto'] as const).map(k => (
          <button key={k} onClick={()=>w.toggleThemeFlag(k)} className={`px-3 py-1 rounded border ${w.themes[k]? 'border-amber-500 text-amber-400':'border-neutral-700'}`}>{k}</button>
        ))}
      </div>
    </div>
  )
}

export default StepThemes
