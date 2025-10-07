import { useEffect } from 'react'

/**
 * Simple focus trap for a dialog container. Cycles TAB focus within the node.
 * Closes on Escape by calling onEscape callback.
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement>, active: boolean, onEscape?: () => void) {
  useEffect(() => {
    if (!active) return
    const root = ref.current
    if (!root) return

    const selector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    const getFocusable = (): HTMLElement[] => Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(el => !el.hasAttribute('disabled'))

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.()
      } else if (e.key === 'Tab') {
        const list = getFocusable()
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    // Focus first element when opening
    const list = getFocusable()
    if (list[0]) list[0].focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [active, onEscape])
}
