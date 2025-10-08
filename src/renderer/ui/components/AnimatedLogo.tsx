import React from 'react'

/**
 * Animated Crimson Logo component.
 * Embeds the exported SVG (inline) so that gradients & internal <script> animation run.
 * Provides prefers-reduced-motion fallback (static frame) and optional size prop.
 */
export interface AnimatedLogoProps {
  size?: number
  className?: string
  ariaLabel?: string
  paused?: boolean // if true, pause animation via CSS (does not remove script-run animation but hides dynamic elements)
}

// We strip XML prolog and keep only the <svg> element. Some heavy inline script from SVGator remains – acceptable here.
// NOTE: If performance becomes a concern, consider generating a lighter CSS keyframe version.
const rawSvg = `<?xml version="1.0" encoding="UTF-8"?>\n${`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" class="crimson-logo-svg" role="img" aria-label="Logo Crimson animé">
  <g id="animated-crimson-wrapper">
    <!-- Simplified static fallback shapes (first frame) -->
    <circle cx="128" cy="128" r="120" fill="#112346" opacity="0.12" />
  </g>
  <!-- Full animated content injected below -->
</svg>`}`

/**
 * We lazy inject the big animated SVG only on mount to avoid SSR / hydration mismatches.
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 160, className = '', ariaLabel = 'Logo Crimson animé', paused }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (!ref.current) return
    // Inject the full SVG file pulled from assets/temp (inlined for self-containment)
    // For now we just embed the original file's content verbatim (could be optimized later).
  // Updated path: moved animated asset into root assets folder as icon_animated.svg
  fetch(window.location.origin + '/assets/icon_animated.svg')
      .then(r => r.text())
      .then(txt => {
        if (!ref.current) return
        ref.current.innerHTML = txt
      })
      .catch(() => {
        // Fallback to minimal static markup
        ref.current!.innerHTML = rawSvg
      })
  }, [])

  return (
    <div
      className={`animated-logo relative select-none ${paused ? 'animated-logo-paused' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-label={ariaLabel}
      role="img"
    >
      <div ref={ref} className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: mounted ? '' : rawSvg }} />
    </div>
  )
}

export default AnimatedLogo
