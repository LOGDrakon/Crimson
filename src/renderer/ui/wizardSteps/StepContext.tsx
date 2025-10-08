import React, { useMemo } from 'react'
import { generatePalette } from '../../core/wizard'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import Tooltip from '../components/Tooltip'
// Local fallback (import issue workaround)
const StepHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {subtitle && <p className="text-xs opacity-70 mt-1 leading-snug">{subtitle}</p>}
  </div>
)

export const StepContext: React.FC = () => {
  const w = useNewProjectWizard()
  // Compute effective params like regenerate does (simplified mirror for display only)
  const kw = w.keywords.toLowerCase().split(/[\s,]+/).filter(Boolean)
  let effSat = w.saturation
  let effIC = w.internalContrast
  let effMin = w.minContrast
  let effPolicy = w.contrastPolicy
  let effNeutrals = w.neutralLevels
  if (kw.includes('accessible') || kw.includes('highcontrast')) {
    effMin = Math.max(effMin, 7)
    effPolicy = 'wcagAAA'
    effIC = Math.min(1, effIC + 0.05)
  }
  if (w.profile === 'Monochrome') {
    effSat = Math.max(0, effSat - 0.5)
    if (effNeutrals < 9) effNeutrals = 9
  }
  // Dynamic preview palette (light theme slice) to show impact of style & profile
  const preview = useMemo(() => {
    try {
      const draft = generatePalette({
        seeds: w.seeds,
        mode: w.mode,
        harmonyMode: (w as any).harmonyMode,
        saturation: w.saturation,
        internalContrast: w.internalContrast,
        neutralLevels: 5, // lighter for preview
        includeSemantic: false,
        variantScope: ['primary','secondary','accent'],
        semanticsTokens: [],
        minContrast: w.minContrast,
        generateNeutrals: false,
        enforceSemanticDistance: false,
        distanceThreshold: w.distanceThreshold,
        baseKeywords: w.keywords,
        profile: w.profile,
        contrastPolicy: w.contrastPolicy,
        foregroundHeuristic: w.foregroundHeuristic,
        overlayOptions: undefined,
        backgroundLayers: w.backgroundLayers
      })
      const pick = (src: Record<string,string>, keys: string[]) => keys.filter(k=>src[k]).map(k=>({ name:k, color: src[k] }))
      return {
        light: pick(draft.light, ['primary','secondary','accent','primaryHover','primarySubtle']),
        dark: pick(draft.dark, ['primary','secondary','accent','primaryHover','primarySubtle'])
      }
    } catch {
      return { light: [], dark: [] }
    }
  }, [w.seeds, w.mode, w.harmonyMode, w.saturation, w.internalContrast, w.minContrast, w.keywords, w.profile, w.contrastPolicy, w.foregroundHeuristic, w.backgroundLayers])

  return (
    <div className="space-y-4">
      <StepHeader title={t('step_context')} subtitle={t('step_context_sub')} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] opacity-70 flex items-center gap-1">Aperçu dynamique (génération réelle lite) <Tooltip label="Utilise le moteur de génération avec un sous-ensemble de tokens (sans neutrals & semantics) pour cohérence."><span className="cursor-help text-neutral-400">?</span></Tooltip></div>
          <div className="flex gap-6 flex-wrap">
            <div>
              <div className="text-[10px] opacity-60 mb-1">Light</div>
              <div className="flex flex-wrap gap-2">
                {preview.light.map(p => (
                  <div key={'L-'+p.name} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded border border-neutral-300/40 bg-white/5" style={{ background:p.color }} />
                    <span className="text-[9px] opacity-70">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] opacity-60 mb-1">Dark</div>
              <div className="flex flex-wrap gap-2">
                {preview.dark.map(p => (
                  <div key={'D-'+p.name} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded border border-neutral-700 bg-black/20" style={{ background:p.color }} />
                    <span className="text-[9px] opacity-70">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <label className="text-xs flex flex-col gap-1">
          <span className="flex items-center gap-2">
            {t('label_keywords_simple')}
            <Tooltip label={t('help_keywords')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
          </span>
          <input value={w.keywords} onChange={e=>w.setKeywords(e.target.value)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs" placeholder="ex: vif, pastel, minimal, accessible" />
        </label>
        <label className="text-xs flex flex-col gap-1">
          <span className="flex items-center gap-2">{t('label_profile_simple')} <Tooltip label={t('help_profile')}><span className="cursor-help text-neutral-400">?</span></Tooltip></span>
          <select value={w.profile||''} onChange={e=>w.setProfile(e.target.value||null)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs">
            <option value="">(aucun)</option>
            {['Material','Fluent','Nord','Solarized','Pastel','Corporate','Vivid','Monochrome'].map(p=> <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-[11px] opacity-80">
          <input type="checkbox" checked={!!w.autosaveEnabled} onChange={e=>w.setAutosaveEnabled(e.target.checked)} /> Autosave wizard state
        </label>
        <label className="flex items-center gap-2 text-[11px] opacity-80">
          <input type="checkbox" checked={!!w.autoRegenerate} onChange={()=>w.toggleAutoRegenerate()} /> {t('label_autoreg')}
          <Tooltip label={t('help_autoreg')}><span className="cursor-help text-neutral-400">?</span></Tooltip>
        </label>
        {w.profile === 'Monochrome' && (
          <label className="flex flex-col gap-1 text-xs max-w-xs">
            <span>Stratégie Monochrome (semantics)</span>
            <select value={w.monochromeSemanticStrategy} onChange={e=>w.setMonochromeSemanticStrategy(e.target.value as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
              <option value="restrict">Restrict (success,danger)</option>
              <option value="remove">Remove (aucun)</option>
              <option value="keep">Keep (inchangé)</option>
            </select>
          </label>
        )}
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
        <div className="flex flex-col gap-1 text-xs">
          <div className="opacity-70">Presets utilisateur</div>
          <UserPresetsManager />
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <button
            onClick={async ()=>{
              try {
                const payload = JSON.stringify(w.userPresets||{}, null, 2)
                await (window as any)?.crimson?.saveText?.(payload, 'user-presets.json')
              } catch {}
            }}
            className="self-start px-2 py-0.5 rounded border border-neutral-700 hover:border-neutral-500"
          >Exporter presets (JSON)</button>
          <button
            onClick={async ()=>{
              try {
                const txt = await (window as any)?.crimson?.openText?.()
                if (!txt) return
                const res = w.importUserPresets?.(txt)
                if (!res) {
                  alert('Import échoué (format invalide)')
                } else {
                  alert(`Import: ${res.imported} ajoutés, ${res.skipped} ignorés (doublons), ${res.invalid} invalides`)
                }
              } catch (e) {
                alert('Erreur import presets')
              }
            }}
            className="mt-1 self-start px-2 py-0.5 rounded border border-neutral-700 hover:border-neutral-500"
          >Importer presets (JSON)</button>
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="opacity-70">Paramètres effectifs (après heuristiques)</div>
          <div className="flex flex-wrap gap-1">
            <Chip label={`sat ${w.saturation.toFixed(2)} → ${effSat.toFixed(2)}`} changed={effSat!==w.saturation} />
            <Chip label={`intC ${w.internalContrast.toFixed(2)} → ${effIC.toFixed(2)}`} changed={effIC!==w.internalContrast} />
            <Chip label={`minC ${w.minContrast.toFixed(2)} → ${effMin.toFixed(2)}`} changed={effMin!==w.minContrast} />
            <Chip label={`policy ${w.contrastPolicy} → ${effPolicy}`} changed={effPolicy!==w.contrastPolicy} />
            <Chip label={`neutrals ${w.neutralLevels} → ${effNeutrals}`} changed={effNeutrals!==w.neutralLevels} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Chip: React.FC<{ label: string; changed: boolean }> = ({ label, changed }) => (
  <span className={`px-2 py-0.5 rounded border text-[10px] ${changed? 'border-amber-500 text-amber-400':'border-neutral-700 opacity-70'}`}>{label}</span>
)

const UserPresetsManager: React.FC = () => {
  const w = useNewProjectWizard()
  const [name, setName] = React.useState('')
  const presets = w.userPresets || {}
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="nom" className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[11px] w-32" />
        <button onClick={()=>{ w.saveUserPreset(name); setName('') }} className="px-2 py-0.5 rounded border border-neutral-700 hover:border-neutral-500 text-[11px]">Save</button>
      </div>
      <div className="flex flex-wrap gap-1">
        {Object.keys(presets).length===0 && <span className="opacity-50 text-[10px]">(aucun)</span>}
        {Object.keys(presets).map(k => (
          <div key={k} className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-neutral-700 text-[10px]">
            <button onClick={()=>w.applyUserPreset(k)} className="underline decoration-dotted hover:text-amber-400">{k}</button>
            <button onClick={()=>w.deleteUserPreset(k)} className="text-red-400 hover:text-red-300">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepContext
