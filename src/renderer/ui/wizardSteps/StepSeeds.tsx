import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'

export const StepSeeds: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_seeds')} subtitle={t('step_seeds_sub')} />
      <div className="flex flex-wrap gap-3 items-center">
        {w.seeds.map((s,i)=>(
          <div key={i} className="flex flex-col items-center gap-1">
            <input type="color" value={s} onChange={e=>{ const arr=[...w.seeds]; arr[i]=e.target.value; w.setSeeds(arr) }} className="w-12 h-12 p-0 bg-transparent border border-neutral-700 rounded" />
            <input value={s} onChange={e=>{ const arr=[...w.seeds]; arr[i]=e.target.value; w.setSeeds(arr) }} className="w-20 px-1 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono" />
          </div>
        ))}
        <button onClick={()=> w.setSeeds([...w.seeds, '#3366ff'])} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs">{t('add_seed')}</button>
        {w.seeds.length>1 && <button onClick={()=> w.setSeeds(w.seeds.slice(0,-1))} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs">{t('remove_seed')}</button>}
      </div>
      <div className="flex gap-3 text-xs">
        {(['single','dual','triad','mono'] as const).map(m => (
          <button key={m} onClick={()=>w.setMode(m)} className={`px-2 py-1 rounded border text-xs ${w.mode===m?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{m}</button>
        ))}
      </div>
    </div>
  )
}

export default StepSeeds
