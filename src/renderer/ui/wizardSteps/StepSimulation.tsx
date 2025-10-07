import React from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { StepHeader } from './common'
import { t } from '../i18n'
import { simulateCvd } from '../../utils/colorBlindness'

export const StepSimulation: React.FC = () => {
  const w = useNewProjectWizard()
  const modes: { key: keyof NonNullable<typeof w.cvdSimulations>; label: string }[] = [
    { key: 'protanopia', label: 'Protanopia' },
    { key: 'deuteranopia', label: 'Deuteranopia' },
    { key: 'tritanopia', label: 'Tritanopia' },
    // grayscale simulated inline (not stored in cvdSimulations; quick add via local mapping below)
  ]
  const light = w.draft?.light || {}
  const sampleKeys = Object.keys(light).filter(k => !k.endsWith('Fg')).slice(0, 24)
  const showGray = !!w.showGrayscaleSim
  return (
    <div className="space-y-4">
      <StepHeader title={t('step_preview')} subtitle={t('step_preview_sub')} />
      <div className="flex gap-3 flex-wrap text-xs">
        {modes.map(m => (
          <button key={m.key} onClick={()=>w.toggleSimulation(m.key)} className={`px-2 py-1 rounded border ${w.cvdSimulations?.[m.key] ? 'border-amber-500 text-amber-400':'border-neutral-700'}`}>{m.label}</button>
        ))}
        <button onClick={()=>w.toggleShowGrayscale()} className={`px-2 py-1 rounded border ${showGray?'border-amber-500 text-amber-400':'border-neutral-700'}`}>Grayscale</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 text-[10px]">
        {modes.filter(m=>w.cvdSimulations?.[m.key]).map(m => (
          <div key={m.key} className="space-y-2">
            <div className="font-semibold text-neutral-300">{m.label}</div>
            <div className="grid grid-cols-3 gap-2">
              {sampleKeys.map(k => {
                const orig = light[k]
                const sim = simulateCvd(orig, m.key as any)
                return (
                  <div key={k+ m.key} className="flex flex-col gap-1 p-1 rounded border border-neutral-700">
                    <div className="h-6 rounded" style={{ background: sim }} />
                    <div className="truncate" title={k}>{k}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {showGray && (
          <div className="space-y-2">
            <div className="font-semibold text-neutral-300">Grayscale</div>
            <div className="grid grid-cols-3 gap-2">
              {sampleKeys.map(k => {
                const orig = light[k]
                // quick relative luminance mapping to grayscale
                const m = /#?([0-9a-fA-F]{6})/.exec(orig)?.[1]||'000000'
                const n = parseInt(m,16); const r=(n>>16)&255,g=(n>>8)&255,b=n&255
                const L = Math.round((0.2126*r+0.7152*g+0.0722*b))
                const gray = `#${[L,L,L].map(v=>v.toString(16).padStart(2,'0')).join('')}`
                return (
                  <div key={k+'gray'} className="flex flex-col gap-1 p-1 rounded border border-neutral-700">
                    <div className="h-6 rounded" style={{ background: gray }} />
                    <div className="truncate" title={k}>{k}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      {!modes.some(m=>w.cvdSimulations?.[m.key]) && (
        <div className="text-[11px] opacity-60">Sélectionnez au moins un mode pour voir la simulation.</div>
      )}
    </div>
  )
}

export default StepSimulation
