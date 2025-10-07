import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'

export const StepPreview: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_preview')} subtitle={t('step_preview_sub')} />
      <div className="grid grid-cols-3 gap-3 text-[10px]">
        {Object.entries(w.draft?.light||{}).slice(0,30).map(([k,v])=> (
          <div key={k} className="flex flex-col gap-1 p-2 rounded border border-neutral-700">
            <div className="h-6 rounded border border-neutral-600" style={{ background: v }} />
            <div className="truncate" title={k}>{k}</div>
            <div className="font-mono text-neutral-400 truncate">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepPreview
