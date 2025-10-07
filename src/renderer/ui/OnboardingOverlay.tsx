import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useUIStore } from '../store/uiStore'

interface StepDef { title: string; body: string; highlight?: string }

const steps: StepDef[] = [
  { title: 'Bienvenue dans Crimson', body: 'Affinez et auditez vos palettes en temps réel. Cette mini visite vous montre les zones clés.' },
  { title: 'Éditeur de Palette', body: 'Ajoutez, modifiez, regroupez des tokens. Génération d’harmonies et variantes perceptuelles.' , highlight: '#palette-root'},
  { title: 'Prévisualisation UI', body: 'Composants et surfaces reflètent instantanément la palette (et la simulation daltonisme).', highlight: '#preview-root'},
  { title: 'Accessibilité', body: 'Mesures de contraste, conflits et redondances. Ajustez avant export.', highlight: '#a11y-root'},
  { title: 'Sandbox What‑If', body: 'Testez des modifications sans les engager. Appliquez ou annulez quand prêt.', highlight: '#palette-root'},
  { title: 'Mode Focus', body: 'Isole un groupe de tokens pour réduire le bruit visuel et éditer plus vite.', highlight: '#palette-root'},
  { title: 'C’est tout !', body: 'Vous pouvez relancer cette visite via le bouton Aide (?). Bonne création ✨' }
]

export const OnboardingOverlay: React.FC = () => {
  const { onboardingVisible, onboardingStep, totalSteps, nextStep, prevStep, hideOnboarding, markCompleted } = useUIStore(s => ({
    onboardingVisible: s.onboardingVisible,
    onboardingStep: s.onboardingStep,
    totalSteps: s.totalSteps,
    nextStep: s.nextStep,
    prevStep: s.prevStep,
    hideOnboarding: s.hideOnboarding,
    markCompleted: s.markCompleted
  }))

  const step = steps[onboardingStep] || steps[0]
  if (!onboardingVisible) return null

  // Portal target (created in App)
  const root = document.getElementById('onboarding-root')
  if (!root) return null

  const isLast = onboardingStep === totalSteps - 1

  const content = (
    <div className="fixed inset-0 z-[200] pointer-events-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={hideOnboarding} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[480px] max-w-[90%] bg-surface border border-default rounded-lg shadow-xl p-5 space-y-4 animate-[fadeIn_0.25s_ease]">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted whitespace-pre-line leading-relaxed">{step.body}</p>
              </div>
              <button className="btn" title="Fermer" onClick={hideOnboarding}>✕</button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {steps.map((_,i)=>(
                  <span key={i} className={`h-1 rounded flex-1 ${i===onboardingStep?'bg-primary':'bg-default/40'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                {onboardingStep>0 && <button className="btn" onClick={prevStep}>◀</button>}
                {!isLast && <button className="btn btn-primary" onClick={nextStep}>Suivant ▶</button>}
                {isLast && <button className="btn btn-primary" onClick={async ()=>{ await markCompleted(); }}>Terminer ✓</button>}
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-muted">
              <button className="underline" onClick={async ()=>{ await markCompleted(); }}>Ignorer (marquer comme vu)</button>
              <span>Étape {onboardingStep+1}/{totalSteps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return createPortal(content, root)
}
