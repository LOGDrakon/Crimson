import React from 'react'
import { useNewProjectWizard } from '../store/newProjectWizardStore'
import { generatePalette } from '../core/wizard'
import { useFocusTrap } from './hooks/useFocusTrap'
import { t } from './i18n'
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
    // High contrast mode adjustments (light runtime adaptation)
    const baseMinContrast = wizard.highContrastMode ? Math.max(7, wizard.minContrast) : wizard.minContrast
    const ic = wizard.highContrastMode ? Math.min(1, adj.internalContrast + 0.1) : adj.internalContrast
    const draft = generatePalette({
      seeds: wizard.seeds,
      mode: wizard.mode,
      saturation: adj.saturation,
      internalContrast: ic,
      neutralLevels: wizard.neutralLevels,
      includeSemantic: wizard.includeSemantic,
      semanticsTokens: wizard.semanticsTokens,
  extraTokens: wizard.extraTokens,
      variantScope: wizard.variantScope,
      minContrast: baseMinContrast,
      generateNeutrals: wizard.generateNeutrals,
      enforceSemanticDistance: wizard.enforceSemanticDistance,
      distanceThreshold: wizard.distanceThreshold,
      baseKeywords: wizard.keywords,
      profile: wizard.profile,
      contrastPolicy: wizard.contrastPolicy,
      foregroundHeuristic: wizard.foregroundHeuristic,
      overlayOptions: wizard.overlayOptions,
      backgroundLayers: wizard.backgroundLayers
    })
    wizard.setDraft(draft)
  }

  // Initial seed (one‑shot). No dependency array values on purpose.
  React.useEffect(() => {
    if (!wizard.draft || Object.keys(wizard.draft.light).length === 0) regenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  useFocusTrap(dialogRef, wizard.open, () => wizard.closeWizard())

  const warnings: string[] = (wizard.draft as any)?.meta?.warnings || []
  const categorize = (w: string) => {
    if (/collision/i.test(w)) return 'semantics'
    if (/Distance sémantique|Distance sémantique encore faible/i.test(w)) return 'semantics'
    if (/contrast|contraste/i.test(w)) return 'accessibility'
    return 'other'
  }
  const warningCountFor = (stepName: string) => {
    if (stepName === 'summary') return warnings.length
    if (stepName === 'semantics') return warnings.filter(w=>categorize(w)==='semantics').length
    if (stepName === 'accessibility') return warnings.filter(w=>categorize(w)==='accessibility').length
    return 0
  }

  return wizard.open ? (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={t('wizard_title')} aria-describedby="wizard-steps">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => wizard.closeWizard()} />
      <div ref={dialogRef} className="relative w-[880px] max-w-full mx-auto my-8 bg-neutral-950/90 border border-neutral-800 rounded-lg shadow-xl flex flex-col overflow-hidden" tabIndex={-1}>
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3">
          <h1 className="font-semibold text-sm">{t('wizard_title')}</h1>
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
          <div className="ml-auto flex gap-1">
            <button onClick={() => wizard.toggleMinimalMode()} className="px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500">
              {wizard.minimalMode ? 'Mode Complet' : 'Mode Minimal'}
            </button>
            <button onClick={() => regenerate()} className="px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500">{t('regenerate')}</button>
            <button onClick={() => wizard.closeWizard()} className="px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500">{t('close')}</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-6 text-neutral-200 text-sm">{stepRender[step]}</div>
        <div className="px-4 py-3 border-t border-neutral-800 flex items-center gap-2 text-xs bg-neutral-900/60">
          <div className="flex gap-2">
            <button onClick={() => wizard.prev()} disabled={wizard.step === visibleSteps[0]} className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-40">{t('previous')}</button>
            <button onClick={() => wizard.next()} disabled={wizard.step === visibleSteps[visibleSteps.length - 1]} className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-40">{t('next')}</button>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => wizard.undo()} disabled={!wizard.history.length} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-30">{t('undo')}</button>
            <button onClick={() => wizard.redo()} disabled={!wizard.future.length} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-30">{t('redo')}</button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default NewProjectWizard
