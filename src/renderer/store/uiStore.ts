import { create } from 'zustand'

interface UIState {
  onboardingVisible: boolean
  onboardingStep: number
  totalSteps: number
  showOnboarding: () => void
  hideOnboarding: () => void
  nextStep: () => void
  prevStep: () => void
  gotoStep: (i: number) => void
  resetOnboarding: () => void
  markCompleted: () => Promise<void>
  completed: boolean
  hydrateCompleted: () => Promise<void>
}

// Steps mapping (index based) kept simple; texts in component.
export const useUIStore = create<UIState>((set, get) => ({
  onboardingVisible: false,
  onboardingStep: 0,
  totalSteps: 7, // welcome, palette, preview, a11y, sandbox, focus, fin
  completed: false,
  showOnboarding: () => set({ onboardingVisible: true, onboardingStep: 0 }),
  hideOnboarding: () => set({ onboardingVisible: false }),
  resetOnboarding: () => set({ onboardingVisible: true, onboardingStep: 0, completed: false }),
  nextStep: () => {
    set((s) => {
      const next = Math.min(s.totalSteps - 1, s.onboardingStep + 1)
      return { onboardingStep: next }
    })
  },
  prevStep: () => set((s) => ({ onboardingStep: Math.max(0, s.onboardingStep - 1) })),
  gotoStep: (i: number) => set((s) => ({ onboardingStep: Math.max(0, Math.min(s.totalSteps - 1, i)) })),
  markCompleted: async () => {
    set({ completed: true, onboardingVisible: false })
    try { await window.crimson.storeSet('onboardingCompleted', true) } catch {}
  },
  hydrateCompleted: async () => {
    try {
      const done = await window.crimson.storeGet('onboardingCompleted')
      if (done) set({ completed: true })
      else set({ onboardingVisible: true, onboardingStep: 0 })
    } catch {
      // fallback: show onboarding
      set({ onboardingVisible: true, onboardingStep: 0 })
    }
  }
}))
