import React from 'react'
import { useNewProjectWizard } from '../store/newProjectWizardStore'
import { generatePalette } from '../core/wizard'
import { useFocusTrap } from './hooks/useFocusTrap'
import { t } from './i18n'
import { comparePalettes } from '../core/diff'
import { usePaletteStore } from '../store/paletteStore'
// Step components (kept simple: no dynamic import needed yet)
import { StepContext } from './wizardSteps/StepContext'
import { StepSeeds } from './wizardSteps/StepSeeds'
import { StepOptions } from './wizardSteps/StepOptions'
import { StepAccessibility } from './wizardSteps/StepAccessibility'
import { StepThemes } from './wizardSteps/StepThemes'
import { StepNaming } from './wizardSteps/StepNaming'
import { StepPreview } from './wizardSteps/StepPreview'
import { StepSummary } from './wizardSteps/StepSummary'
import { StepSimulation } from './wizardSteps/StepSimulation'
import { StepComponentsPreview } from './wizardSteps/StepComponentsPreview'
import { StepSemantics } from './wizardSteps/StepSemantics'
import AnimatedLogo from './components/AnimatedLogo'

/**
 * NewProjectWizard
 * Guided, multi‑step palette creation flow. Each step edits values in the wizard
 * store; this wrapper only coordinates navigation, regeneration and chrome.
 * - Regeneration is user triggered (except on initial mount)
 * - Minimal mode hides advanced / validation related steps
 * - Undo / redo surface palette draft history from the store
 */

export const NewProjectWizard: React.FC = () => {
  const wizard = useNewProjectWizard()
  const { step } = wizard

  // Build a draft palette from current params (with transient adjustments if any)
  const regenerate = () => {
    const adj = wizard.getAdjustedParams
      ? wizard.getAdjustedParams()
      : { saturation: wizard.saturation, internalContrast: wizard.internalContrast }

    const kw = wizard.keywords.toLowerCase().split(/[\s,]+/).filter(Boolean)
    let saturation = adj.saturation
    let internalContrast = adj.internalContrast
    let minContrast = wizard.highContrastMode ? Math.max(7, wizard.minContrast) : wizard.minContrast
    let contrastPolicy = wizard.contrastPolicy
    let includeSemantic = wizard.includeSemantic
    let semanticsTokens = [...wizard.semanticsTokens]
    let neutralLevels = wizard.neutralLevels
    const extraNotes: string[] = []

    // Accessible keyword: force AAA if present
    if (kw.includes('accessible') || kw.includes('highcontrast')) {
      const originalPolicy = contrastPolicy
      minContrast = Math.max(minContrast, 7)
      contrastPolicy = 'wcagAAA'
      internalContrast = Math.min(1, internalContrast + 0.05)
      extraNotes.push('[accessible] minContrast>=7 & AAA')
      if (originalPolicy !== contrastPolicy) extraNotes.push('[policy] contrastPolicy forcé -> wcagAAA')
    }

    // Profile-based overrides
    if (wizard.profile === 'Monochrome') {
      saturation = Math.max(0, saturation - 0.5)
      neutralLevels = neutralLevels < 9 ? 9 : neutralLevels
      switch (wizard.monochromeSemanticStrategy) {
        case 'restrict':
          includeSemantic = true
          semanticsTokens = semanticsTokens.filter(t => ['success','danger'].includes(t))
          extraNotes.push('[profile] Monochrome restrict: success/danger uniquement')
          break
        case 'remove':
          includeSemantic = false
          semanticsTokens = []
          extraNotes.push('[profile] Monochrome remove: semantics désactivés')
          break
        case 'keep':
          extraNotes.push('[profile] Monochrome keep: semantics conservés')
          break
      }
    }

    // High contrast mode already increases internalContrast slightly; keep original logic
    if (wizard.highContrastMode) {
      internalContrast = Math.min(1, internalContrast + 0.1)
      extraNotes.push('[mode] HighContrast: internalContrast +0.1')
    }

    const draft = generatePalette({
      seeds: wizard.seeds,
      mode: wizard.mode,
      harmonyMode: (wizard as any).harmonyMode,
      lockedSeeds: (wizard as any).lockedSeeds,
      saturation,
      internalContrast,
      neutralLevels,
      includeSemantic,
      semanticsTokens,
      extraTokens: wizard.extraTokens,
      variantScope: wizard.variantScope,
      minContrast,
      generateNeutrals: wizard.generateNeutrals,
      enforceSemanticDistance: wizard.enforceSemanticDistance,
      distanceThreshold: wizard.distanceThreshold,
      baseKeywords: wizard.keywords,
      profile: wizard.profile,
      contrastPolicy,
      foregroundHeuristic: wizard.foregroundHeuristic,
      overlayOptions: wizard.overlayOptions,
      backgroundLayers: wizard.backgroundLayers
    })
    // Inject extra notes (non destructif)
    if ((draft as any).meta) {
      (draft as any).meta.notes = [ ...(draft as any).meta.notes, ...extraNotes ]
    }
    wizard.setDraft(draft)
  }

  // Initial seed (one‑shot). No dependency array values on purpose.
  React.useEffect(() => {
    if (!wizard.draft || Object.keys(wizard.draft.light).length === 0) regenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-regenerate debounced (basic) when core inputs change
  React.useEffect(() => {
    if (!wizard.autoRegenerate) return
    const handle = setTimeout(() => regenerate(), 220)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wizard.seeds.join(','), wizard.mode, wizard.saturation, wizard.internalContrast, wizard.neutralLevels, wizard.includeSemantic, wizard.variantScope.join(','), wizard.minContrast, wizard.distanceThreshold, wizard.keywords, wizard.profile, wizard.contrastPolicy, wizard.foregroundHeuristic, wizard.highContrastMode, wizard.monochromeSemanticStrategy])

  const stepRender: Record<string, JSX.Element> = {
    context: <StepContext />,
    seeds: <StepSeeds />,
    options: <StepOptions />,
    accessibility: <StepAccessibility />,
    themes: <StepThemes />,
    naming: <StepNaming />,
  semantics: <StepSemantics />,
    simulation: <StepSimulation />,
    components: <StepComponentsPreview />,
    preview: <StepPreview />,
    summary: <StepSummary />
  }
  const minimalHidden = new Set(['accessibility', 'simulation', 'semantics'])
  const visibleSteps = wizard.minimalMode ? wizard.steps.filter(s => !minimalHidden.has(s)) : wizard.steps

  const dialogRef = React.useRef<HTMLDivElement>(null)
  const closeWizard = React.useCallback(() => wizard.closeWizard(), [wizard])
  useFocusTrap(dialogRef, wizard.open, closeWizard)
  const appTheme = usePaletteStore(s => s.theme)

  const warnings: string[] = (wizard.draft as any)?.meta?.warnings || []
  // Diff summary between current active palette and draft (active theme only for quick signal)
  const palStore = usePaletteStore.getState()
  const activeCurrent = palStore.theme === 'dark' ? palStore.palettes.dark : palStore.palettes.light
  const activeDraft = wizard.draft ? (palStore.theme === 'dark' ? wizard.draft.dark : wizard.draft.light) : null
  const diff = React.useMemo(() => {
    if (!activeDraft) return null
    return comparePalettes(activeCurrent, activeDraft)
  }, [activeDraft, activeCurrent])
  const [showDiff, setShowDiff] = React.useState(false)
  const [includeNeutrals, setIncludeNeutrals] = React.useState(false)
  const diffData = React.useMemo(() => {
    if (!diff || !activeDraft) return null
    const filter = (k: string) => {
      if (includeNeutrals) return true
      return !/^neutral|^background$|^surface$|^border$/.test(k)
    }
    const added = diff.added.filter(filter)
    const removed = diff.removed.filter(filter)
    const changed = diff.changed.filter(filter)
    const rows: { type: 'added'|'removed'|'changed'; token: string; old?: string; new?: string }[] = []
    added.forEach(t => rows.push({ type: 'added', token: t, new: activeDraft[t] }))
    removed.forEach(t => rows.push({ type: 'removed', token: t, old: activeCurrent[t] }))
    changed.forEach(t => rows.push({ type: 'changed', token: t, old: activeCurrent[t], new: activeDraft[t] }))
    rows.sort((a,b)=> a.token.localeCompare(b.token))
    return { added, removed, changed, rows }
  }, [diff, includeNeutrals, activeDraft, activeCurrent])
  const categorize = (w: string) => {
    if (w.startsWith('[collision]')) return 'semantics'
    if (w.startsWith('[distance]')) return 'semantics'
    if (w.startsWith('[variant]')) return 'semantics'
    if (w.startsWith('[contrast]')) return 'accessibility'
    if (w.startsWith('[accessible]')) return 'accessibility'
    if (w.startsWith('[policy]')) return 'accessibility'
    return 'other'
  }
  const warningCountFor = (stepName: string) => {
    if (stepName === 'summary') return warnings.length
    if (stepName === 'semantics') return warnings.filter(w=>categorize(w)==='semantics').length
    if (stepName === 'accessibility') return warnings.filter(w=>categorize(w)==='accessibility').length
    return 0
  }

  const showHero = step === 'context'

  return wizard.open ? (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={t('wizard_title')} aria-describedby="wizard-steps" data-theme={appTheme}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeWizard} />
      <div ref={dialogRef} tabIndex={-1} className={`relative w-[880px] max-w-full mx-auto my-8 border rounded-lg shadow-xl flex flex-col overflow-hidden transition-colors
        ${appTheme==='light' ? 'bg-white/90 border-neutral-300 text-neutral-800' : 'bg-neutral-950/90 border-neutral-800 text-neutral-200'}` }>
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3">
          <h1 className="font-semibold text-sm flex items-center gap-3">
            {t('wizard_title')}
          </h1>
          <div id="wizard-steps" className="flex gap-1 flex-wrap text-[10px]">
            {visibleSteps.map(s => {
              const current = wizard.step === s
              let badge: string | null = null
              const wc = warningCountFor(s)
              if (wc) badge = String(wc)
              return (
                <button
                  key={s}
                  aria-current={current ? 'step' : undefined}
                  onClick={() => wizard.go(s)}
                  className={`relative px-2 py-1 rounded border ${current ? 'border-amber-500 text-amber-400' : 'border-neutral-700 hover:border-neutral-500'}`}
                >
                  {s}
                  {badge && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] leading-none px-1 py-[2px] rounded-full text-white">
                      {badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <div className="ml-auto flex items-center gap-3">
            {diff && (
              <button onClick={()=>setShowDiff(true)} className="text-[10px] font-mono px-2 py-1 rounded border border-neutral-700 flex items-center gap-2 hover:border-neutral-500" title={`Cliquez pour détails diff\nAjoutés: ${diff.added.length}\nModifiés: ${diff.changed.length}\nSupprimés: ${diff.removed.length}`}>
                <span className="text-emerald-400">+{diff.added.length}</span>
                <span className="text-amber-400">~{diff.changed.length}</span>
                <span className="text-red-400">-{diff.removed.length}</span>
              </button>
            )}
            <div className="flex gap-1">
            <button onClick={() => wizard.toggleMinimalMode()} className="px-2 py-1 rounded text-[11px] bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 hover:border-neutral-500">
              {wizard.minimalMode ? 'Mode Complet' : 'Mode Minimal'}
            </button>
            <button onClick={() => regenerate()} className="px-2 py-1 rounded text-[11px] bg-primarySubtle text-primaryFg border border-primary/40 hover:border-primary">
              {t('regenerate')}
            </button>
            <button onClick={closeWizard} className="px-2 py-1 rounded text-[11px] bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 hover:border-neutral-500">
              {t('close')}
            </button>
            </div>
          </div>
        </div>
  <div className="flex-1 overflow-auto p-6 space-y-6 text-sm">
          {showHero && (
            <div className="flex flex-col items-center text-center gap-4 mb-4">
              <AnimatedLogo size={140} />
              <p className="text-xs text-neutral-400 max-w-md">Générez une base de palette à partir de vos graines et ajustez les paramètres. L’animation du logo n’apparaît que sur cette première étape pour limiter la distraction.</p>
            </div>
          )}
          {stepRender[step]}
        </div>
  <div className={`px-4 py-3 border-t flex items-center gap-2 text-xs ${appTheme==='light' ? 'border-neutral-200 bg-neutral-50/70' : 'border-neutral-800 bg-neutral-900/60'}`}>
          <div className="flex gap-2">
            <button onClick={() => wizard.prev()} disabled={wizard.step === visibleSteps[0]} className="px-3 py-1 rounded bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 disabled:opacity-40">{t('previous')}</button>
            <button onClick={() => wizard.next()} disabled={wizard.step === visibleSteps[visibleSteps.length - 1]} className="px-3 py-1 rounded bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 disabled:opacity-40">{t('next')}</button>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => wizard.undo()} disabled={!wizard.history.length} className="px-2 py-1 rounded bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 disabled:opacity-30">{t('undo')}</button>
            <button onClick={() => wizard.redo()} disabled={!wizard.future.length} className="px-2 py-1 rounded bg-neutral-800/40 dark:bg-neutral-800 border border-neutral-700 disabled:opacity-30">{t('redo')}</button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

// Diff Modal overlay
export const DiffModal: React.FC<{ onClose: () => void; data: ReturnType<typeof comparePalettes>|null; rows: any[]|null; includeNeutrals: boolean; setIncludeNeutrals: (v:boolean)=>void; current: Record<string,string>; draft: Record<string,string> }> = ({ onClose, data, rows, includeNeutrals, setIncludeNeutrals, current, draft }) => {
  if (!data || !rows) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[760px] max-h-[80vh] overflow-hidden rounded-lg border border-neutral-700 bg-neutral-950 text-neutral-200 shadow-xl flex flex-col">
        <div className="px-4 py-3 border-b border-neutral-700 flex items-center gap-3 text-sm">
          <span className="font-semibold">Changements palette</span>
          <span className="text-[11px] opacity-70">(+{data.added.length} ~{data.changed.length} -{data.removed.length})</span>
          <label className="ml-auto text-[11px] flex items-center gap-1 cursor-pointer select-none">
            <input type="checkbox" checked={includeNeutrals} onChange={e=>setIncludeNeutrals(e.target.checked)} /> Inclure neutrals / surfaces
          </label>
          <button onClick={onClose} className="px-2 py-1 rounded border border-neutral-600 text-[11px] hover:border-neutral-400">Fermer</button>
        </div>
        <div className="overflow-auto p-3 text-[11px] leading-tight">
          <table className="w-full border-separate border-spacing-y-1">
            <thead>
              <tr className="text-neutral-400">
                <th className="text-left font-normal">Token</th>
                <th className="text-left font-normal w-20">Type</th>
                <th className="text-left font-normal w-32">Ancien</th>
                <th className="text-left font-normal w-32">Nouveau</th>
                <th className="text-left font-normal">Aperçu</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => {
                const colorCell = (hex?: string) => hex ? <div className="w-6 h-6 rounded border border-neutral-600" style={{ background: hex }} /> : <span className="opacity-40">—</span>
                const typeColor = r.type==='added' ? 'text-emerald-400' : r.type==='removed' ? 'text-red-400' : 'text-amber-400'
                return (
                  <tr key={r.type + r.token} className="align-middle">
                    <td className="pr-2 whitespace-nowrap font-mono">{r.token}</td>
                    <td className={`pr-2 uppercase ${typeColor}`}>{r.type}</td>
                    <td className="pr-2 font-mono">{r.old || '—'}</td>
                    <td className="pr-2 font-mono">{r.new || '—'}</td>
                    <td className="flex items-center gap-2 py-1">
                      {colorCell(r.old)}
                      {colorCell(r.new)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length===0 && <div className="text-center py-6 opacity-50">Aucun changement dans ce filtre.</div>}
        </div>
      </div>
    </div>
  )
}

// Wrap original export with diff modal injection
const OriginalWizard = NewProjectWizard
export const NewProjectWizardWithDiff: React.FC = () => {
  return <OriginalWizard />
}

export default NewProjectWizard
