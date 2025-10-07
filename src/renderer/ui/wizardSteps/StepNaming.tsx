import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'
import { usePaletteStore } from '../../store/paletteStore'

export const StepNaming: React.FC = () => {
  const w = useNewProjectWizard()
  const pal = usePaletteStore()
  const hasSuggestions = (w.renameSuggestions||[]).length>0
  const applySuggestion = (from:string,to:string) => {
    if (!w.draft) return
    const light = { ...w.draft.light }
    const dark = { ...w.draft.dark }
    if (light[from] && !light[to]) light[to] = light[from]
    if (dark[from] && !dark[to]) dark[to] = dark[from]
    w.setDraft({ light, dark })
  }
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_naming')} subtitle={t('step_naming_sub')} />
      <label className="flex flex-col gap-1 text-xs max-w-xs">{t('token_prefix')}
        <input value={w.tokenPrefix} onChange={e=>w.setTokenPrefix(e.target.value)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700" />
      </label>
      <div className="flex gap-2 text-xs">
        {(['replace','merge','mergeWithPrefix'] as const).map(m => (
          <button key={m} onClick={()=>w.setMergeStrategy(m)} className={`px-2 py-1 rounded border ${w.mergeStrategy===m?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{m}</button>
        ))}
      </div>
      {w.mergeStrategy==='mergeWithPrefix' && (
        <label className="flex flex-col gap-1 text-xs max-w-xs">{t('prefix_merge')}
          <input value={w.prefixOnMerge} onChange={e=>w.setPrefixOnMerge(e.target.value)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700" />
        </label>
      )}
      <div className="mt-4 flex items-center gap-2 text-xs">
        <button onClick={()=>w.generateRenameSuggestions()} className="px-2 py-1 rounded border border-neutral-700 bg-neutral-800 hover:border-neutral-500">Générer suggestions</button>
        {hasSuggestions && <span className="opacity-60">{w.renameSuggestions!.length} suggestion(s)</span>}
      </div>
      {hasSuggestions && (
        <div className="mt-2 space-y-1 max-h-40 overflow-auto text-[11px] border border-neutral-800 rounded p-2 bg-neutral-900/40">
          {w.renameSuggestions!.map(sug => (
            <div key={sug.from+'=>'+sug.to} className="flex items-center gap-2">
              <span className="font-mono">{sug.from} → {sug.to}</span>
              <span className="opacity-50 truncate">{sug.reason}</span>
              <button onClick={()=>applySuggestion(sug.from, sug.to)} className="ml-auto px-1.5 py-0.5 rounded border border-neutral-700 hover:border-neutral-500">Appliquer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StepNaming
