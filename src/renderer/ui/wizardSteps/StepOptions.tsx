import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import Tooltip from '../components/Tooltip'
import { lighten, darken, mix } from '../../core/palette'
import { StepHeader } from './common'

export const StepOptions: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_options')} subtitle={t('step_options_sub')} />
      <div className="grid grid-cols-2 gap-4 text-xs">
        <label className="flex flex-col gap-1">{t('label_saturation_simple')} <Tooltip label={t('help_saturation')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
          <div className="flex items-center gap-2">
            <input aria-label="Saturation" type="range" min={0} max={1} step={0.01} value={w.saturation} onChange={e=>w.setSaturation(parseFloat(e.target.value))} aria-valuemin={0} aria-valuemax={1} aria-valuenow={w.saturation} />
            <input className="w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]" type="number" min={0} max={1} step={0.01} value={w.saturation} onChange={e=>w.setSaturation(parseFloat(e.target.value)||0)} />
            <div className="flex items-center gap-1">
              {([0.5,0.85,1].map(v => (
                <span key={v} className="w-5 h-5 rounded border border-neutral-600" style={{ background: mix('#888888', w.seeds[0] || '#990000', v) }} title={`Prévisualisation ${v}`}></span>
              )))}
            </div>
          </div>
        </label>
        <label className="flex flex-col gap-1">{t('label_internal_contrast_simple')} <Tooltip label={t('help_internal_contrast')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
          <div className="flex items-center gap-2">
            <input aria-label="Contraste interne" type="range" min={0} max={1} step={0.01} value={w.internalContrast} onChange={e=>w.setInternalContrast(parseFloat(e.target.value))} aria-valuemin={0} aria-valuemax={1} aria-valuenow={w.internalContrast} />
            <input className="w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]" type="number" min={0} max={1} step={0.01} value={w.internalContrast} onChange={e=>w.setInternalContrast(parseFloat(e.target.value)||0)} />
            <div className="flex items-center gap-1">
              {(['Hover','Active','Subtle'].map(k => {
                const base = w.seeds[0] || '#990000'
                let color = base
                if (k==='Hover') color = lighten(base, 0.1 + 0.06*w.internalContrast)
                if (k==='Active') color = darken(base, 0.12 + 0.06*w.internalContrast)
                if (k==='Subtle') color = mix('#ffffff', base, 0.15 + 0.05*w.internalContrast)
                return <span key={k} className="w-5 h-5 rounded border border-neutral-600" style={{ background: color }} title={k}></span>
              }))}
            </div>
          </div>
        </label>
        <label className="flex flex-col gap-1 col-span-2">{t('label_neutral_levels_simple')} <Tooltip label={t('help_neutral_levels')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
          <select value={w.neutralLevels} onChange={e=>w.setNeutralLevels(Number(e.target.value) as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
            {[5,7,9,12].map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={w.includeSemantic} onChange={()=>w.toggleSemantic()} /> {t('label_semantics_include')}
          <Tooltip label={t('help_semantics_include')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={w.generateNeutrals} onChange={e=>w.setGenerateNeutrals(e.target.checked)} /> {t('generate_neutrals')}
        </label>
        <div className="col-span-2">
          <div className="mb-1 flex items-center gap-2">{t('label_variant_scope_simple')} <Tooltip label={t('help_variant_scope')}><span className="cursor-help text-neutral-400">?</span></Tooltip></div>
          <div className="flex flex-wrap gap-2">
            {['primary','success','danger','warning','info'].map(v => (
              <button key={v} onClick={()=>w.toggleVariant(v)} className={`px-2 py-0.5 rounded border text-[11px] ${w.variantScope.includes(v)?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{v}</button>
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-2 border-t border-neutral-800 pt-2">
          <div className="font-semibold text-[11px] opacity-80">Overlay</div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={!!w.overlayOptions?.enable} onChange={e=>w.setOverlayOptions({ ...(w.overlayOptions||{opacity:0.5, blend:'overlay'}), enable: e.target.checked })} /> Enable overlay token</label>
          {w.overlayOptions?.enable && (
            <div className="flex gap-3 flex-wrap">
              <label className="flex flex-col gap-1">Opacity
                <input type="range" min={0} max={1} step={0.01} value={w.overlayOptions.opacity} onChange={e=>w.setOverlayOptions({ ...w.overlayOptions!, opacity: parseFloat(e.target.value) })} />
              </label>
              <label className="flex flex-col gap-1">Blend
                <select value={w.overlayOptions.blend} onChange={e=>w.setOverlayOptions({ ...w.overlayOptions!, blend: e.target.value as any })} className="px-1 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[11px]">
                  {['overlay','multiply','screen','soft-light'].map(b=> <option key={b}>{b}</option>)}
                </select>
              </label>
            </div>
          )}
        </div>
        <div className="col-span-2 space-y-2 border-t border-neutral-800 pt-2">
          <div className="flex items-center gap-2 font-semibold text-[11px] opacity-80">Background layers <button onClick={()=>w.addBackgroundLayer('layer')} className="px-1.5 py-0.5 rounded border border-neutral-700 text-[10px]">+</button></div>
          <div className="flex flex-wrap gap-2">
            {(w.backgroundLayers||[]).map(l => (
              <div key={l.id} className="flex items-center gap-1 border border-neutral-700 rounded px-1.5 py-1">
                <input value={l.role} onChange={e=>w.updateBackgroundLayer(l.id,{ role: e.target.value })} className="w-16 bg-neutral-800 border border-neutral-700 rounded px-1 py-0.5 text-[10px]" />
                <button onClick={()=>w.removeBackgroundLayer(l.id)} className="text-red-400 text-[10px]">×</button>
              </div>
            ))}
          </div>
          <div className="text-[10px] opacity-50">Les couches modifient subtlement le background via mix primaire.</div>
        </div>
      </div>
    </div>
  )
}

export default StepOptions
