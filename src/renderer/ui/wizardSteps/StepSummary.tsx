import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { usePaletteStore } from '../../store/paletteStore'
import { t } from '../i18n'
import { StepHeader } from './common'
import { contrastRatio, deltaE } from '../../core/palette'

export const StepSummary: React.FC = () => {
  const w = useNewProjectWizard()
  const warnings = (w.draft as any)?.meta?.warnings || []
  const notes = (w.draft as any)?.meta?.notes || []
  const metrics: Record<string,number> | undefined = (w.draft as any)?.meta?.metrics
  const pal = usePaletteStore()
  const currentLight = pal.palettes.light
  const draftLight = w.draft?.light || {}
  const added: string[] = []
  const replaced: string[] = []
  const unchanged: string[] = []
  Object.entries(draftLight).forEach(([k,v]) => {
    if (!(k in currentLight)) added.push(k)
    else if (currentLight[k] !== v) replaced.push(k)
    else unchanged.push(k)
  })
  const [showDiff, setShowDiff] = React.useState(false)
  const [warningFilter, setWarningFilter] = React.useState<'all'|'collision'|'distance'|'variant'|'policy'|'accessible'>('all')
  const filteredWarnings = warnings.filter((m:string)=> {
    if (warningFilter==='all') return true
    return m.startsWith(`[${warningFilter}]`)
  })
  const bg = draftLight.background || '#ffffff'
  const tokensForNearest = Object.entries(draftLight).filter(([k])=>!k.endsWith('Fg')&&k!=='background')
  const nearestCache: Record<string,{key:string,dE:number}> = {}
  function nearest(name:string, value:string){
    if (nearestCache[name]) return nearestCache[name]
    let bestKey = '', best = Infinity
    for (const [k,v] of tokensForNearest) {
      if (k===name) continue
      const d = deltaE(value, v)
      if (d < best) { best = d; bestKey = k }
    }
    return (nearestCache[name] = { key: bestKey, dE: best })
  }
  const renderList = (arr:string[], labelKey:string, colorClass:string) => (
    <div>
      <div className={`font-semibold mb-1 ${colorClass}`}>{t(labelKey as any)}</div>
      <ul className="space-y-0.5">
        {arr.slice(0,60).map(k=>{
          const v = draftLight[k]
          if (!v) return null
          const cr = contrastRatio(v, bg).toFixed(2)
            , near = nearest(k, v)
          return (
            <li key={k} className="flex items-center gap-2 text-[10px] truncate">
              <span className="w-3 h-3 rounded border border-neutral-600" style={{ background: v }} />
              <span className="truncate" title={k}>{k}</span>
              <span className="font-mono opacity-70">{v}</span>
              <span className="opacity-60">CR {cr}</span>
              {near.key && <span className="opacity-50">ΔE {near.dE.toFixed(1)}→{near.key}</span>}
            </li>
          )
        })}
        {arr.length>60 && <li className="opacity-50">… {arr.length-60} autres</li>}
      </ul>
    </div>
  )
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_summary')} subtitle={t('step_summary_sub')} />
      <div className="text-xs opacity-80">{t('generated_tokens')}: {Object.keys(w.draft?.light||{}).length}</div>
      {w.profile==='Monochrome' && (
        <div className="flex gap-2 text-[10px]">
          <span className="px-2 py-0.5 rounded border border-neutral-700 bg-neutral-800/40">Monochrome: {w.monochromeSemanticStrategy}</span>
        </div>
      )}
      <div className="text-[11px] flex gap-2 flex-wrap">
        <button onClick={()=>setShowDiff(s=>!s)} className="px-2 py-0.5 rounded border border-neutral-700 bg-neutral-800 hover:border-neutral-500">{showDiff? t('hide_diff'): t('show_diff')}</button>
        {showDiff && (
          <span className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-green-700/30 border border-green-600/40">Ajoutés {added.length}</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-700/30 border border-amber-600/40">Remplacés {replaced.length}</span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-700/30 border border-neutral-600/40">Inchangés {unchanged.length}</span>
          </span>
        )}
      </div>
      {showDiff && (
        <div className="space-y-4 text-[10px] max-h-72 overflow-auto border border-neutral-800 rounded p-2 bg-neutral-900/40">
          {added.length>0 && renderList(added,'added','text-green-300')}
          {replaced.length>0 && renderList(replaced,'replaced','text-amber-300')}
          {unchanged.length>0 && renderList(unchanged,'unchanged','text-neutral-300')}
        </div>
      )}
      {(warnings.length>0 || notes.length>0) && (
        <div className="space-y-2 text-[11px]">
          {warnings.length>0 && <div className="border border-red-700/60 bg-red-900/20 rounded p-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-red-300">{t('warnings')}</div>
              <div className="flex flex-wrap gap-1 text-[10px]">
                {['all','collision','distance','variant','policy','accessible'].map(f => (
                  <button key={f} onClick={()=>setWarningFilter(f as any)} className={`px-1.5 py-0.5 rounded border ${warningFilter===f?'border-amber-500 text-amber-300':'border-neutral-600 hover:border-neutral-400'}`}>{f}</button>
                ))}
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-0.5">{filteredWarnings.map((m:string,i:number)=><li key={i}>{m}</li>)}</ul>
          </div>}
          {notes.length>0 && <div className="border border-amber-600/50 bg-amber-900/10 rounded p-2">
            <div className="font-semibold text-amber-300 mb-1">{t('notes')}</div>
            <ul className="list-disc pl-4 space-y-0.5">{notes.map((m:string,i:number)=><li key={i}>{m}</li>)}</ul>
          </div>}
          {metrics && <div className="border border-neutral-700/60 bg-neutral-800/30 rounded p-2">
            <div className="font-semibold text-neutral-200 mb-1">Metrics</div>
            <ul className="grid grid-cols-2 gap-1 text-[10px]">
              {Object.entries(metrics).map(([k,v]) => <li key={k} className="flex justify-between gap-2"><span className="opacity-70 truncate">{k}</span><span className="font-mono">{v.toFixed(2)}</span></li>)}
            </ul>
          </div>}
        </div>
      )}
      <div className="flex gap-2 flex-wrap text-[11px]">
        <div className="flex items-center gap-2 mr-4">
          <span className="opacity-70">Exports:</span>
          {(['css','tailwind','json'] as const).map(k => (
            <button key={k} onClick={()=>w.toggleExportPreset(k)} className={`px-2 py-0.5 rounded border ${w.exportPresets?.[k] ? 'border-amber-500 text-amber-400':'border-neutral-700'}`}>{k}</button>
          ))}
        </div>
        <button onClick={()=>w.apply(true)} className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 hover:border-neutral-500">{t('apply_sandbox')}</button>
        <button onClick={()=>w.apply(false)} className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white">{t('apply_direct')}</button>
        <button onClick={()=>w.regenDraft()} className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 hover:border-neutral-500">{t('regenerate')}</button>
      </div>
    </div>
  )
}

export default StepSummary
