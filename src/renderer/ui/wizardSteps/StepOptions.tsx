import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import { StepHeader } from './common'

export const StepOptions: React.FC = () => {
  const w = useNewProjectWizard()
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_options')} subtitle={t('step_options_sub')} />
      <div className="grid grid-cols-2 gap-4 text-xs">
        <label className="flex flex-col gap-1">{t('saturation')}
          <div className="flex items-center gap-2">
            <input aria-label="Saturation" type="range" min={0} max={1} step={0.01} value={w.saturation} onChange={e=>w.setSaturation(parseFloat(e.target.value))} aria-valuemin={0} aria-valuemax={1} aria-valuenow={w.saturation} />
            <input className="w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]" type="number" min={0} max={1} step={0.01} value={w.saturation} onChange={e=>w.setSaturation(parseFloat(e.target.value)||0)} />
          </div>
        </label>
        <label className="flex flex-col gap-1">{t('internal_contrast')}
          <div className="flex items-center gap-2">
            <input aria-label="Contraste interne" type="range" min={0} max={1} step={0.01} value={w.internalContrast} onChange={e=>w.setInternalContrast(parseFloat(e.target.value))} aria-valuemin={0} aria-valuemax={1} aria-valuenow={w.internalContrast} />
            <input className="w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]" type="number" min={0} max={1} step={0.01} value={w.internalContrast} onChange={e=>w.setInternalContrast(parseFloat(e.target.value)||0)} />
          </div>
        </label>
        <label className="flex flex-col gap-1 col-span-2">{t('neutral_levels')}
          <select value={w.neutralLevels} onChange={e=>w.setNeutralLevels(Number(e.target.value) as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
            {[5,7,9,12].map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={w.includeSemantic} onChange={()=>w.toggleSemantic()} /> {t('include_semantic')}
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={w.generateNeutrals} onChange={e=>w.setGenerateNeutrals(e.target.checked)} /> {t('generate_neutrals')}
        </label>
        <div className="col-span-2">
          <div className="mb-1">{t('variant_scope')}</div>
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
