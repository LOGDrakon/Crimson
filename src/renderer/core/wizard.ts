import { formatHex, parse, converter } from 'culori'
import { ensureContrast, mix, lighten, darken, luminance, contrastRatio, deltaE } from './palette'
import { pickAutoHarmony, adjustSeed as adjustSeedProfile, ensureSeparation, deriveHarmonySeeds, HarmonyKind } from './profileAdjust'

export interface GenerationParams {
  seeds: string[]
  mode: 'single' | 'dual' | 'triad' | 'mono'
  harmonyMode?: 'auto' | 'complementary' | 'triad' | 'analogous'
  lockedSeeds?: boolean[]
  saturation: number
  internalContrast: number
  neutralLevels: 5 | 7 | 9 | 12
  includeSemantic: boolean
  semanticsTokens?: string[]
  variantScope: string[]
  minContrast: number
  generateNeutrals: boolean
  enforceSemanticDistance: boolean
  distanceThreshold: number
  baseKeywords?: string
  profile?: string | null
  contrastPolicy?: 'wcagAA' | 'wcagAAA' | 'custom'
  foregroundHeuristic?: 'auto' | 'luminance' | 'deltaE'
  overlayOptions?: { enable: boolean; opacity: number; blend: string }
  backgroundLayers?: { id: string; role: string; color?: string }[]
  extraTokens?: string[]
}

export interface GeneratedResult {
  light: Record<string,string>
  dark: Record<string,string>
  meta: { warnings: string[], notes: string[], metrics?: Record<string, number>, chosenHarmony?: string }
}

const toHsl = converter('hsl') as any
const toRgb = converter('rgb') as any

const clamp01 = (n: number) => Math.min(1, Math.max(0,n))

function adjustSaturation(hex: string, sat: number) {
  const p = parse(hex)
  if (!p) return hex
  const h = toHsl(p)
  h.s = clamp01((h.s ?? 0) * sat)
  return formatHex(toRgb(h)) || hex
}

function rotate(hex: string, deg: number) {
  const p = parse(hex); if (!p) return hex
  const h = toHsl(p)
  h.h = (((h.h || 0) + deg) % 360 + 360) % 360
  return formatHex(toRgb(h)) || hex
}

function deriveSeeds(params: GenerationParams, notes: string[]): { seeds: string[]; chosenHarmony?: HarmonyKind } {
  const baseRaw = params.seeds[0] || '#990000'
  // Apply profile / keyword subtle adjustment to primary always
  const primary = adjustSeedProfile(baseRaw, { profile: params.profile, keywords: params.baseKeywords })
  const providedSecond = params.seeds[1]
  const providedThird = params.seeds[2]
  const locks = params.lockedSeeds || []
  let chosenHarmony: HarmonyKind | undefined
  const explicit = providedSecond || providedThird
  if (!explicit) {
    if (params.harmonyMode && params.harmonyMode !== 'auto') {
      chosenHarmony = params.harmonyMode
    } else {
      chosenHarmony = pickAutoHarmony({ base: primary, profile: params.profile, keywords: params.baseKeywords })
      notes.push(`[harmony:auto] choisi=${chosenHarmony}`)
    }
  }
  if (explicit) {
    // Adjust provided seeds softly only if user did not saturate (avoid large drift)
    const secondAdj = providedSecond ? (locks[1] ? providedSecond : adjustSeedProfile(providedSecond, { profile: params.profile, keywords: params.baseKeywords })) : undefined
    const thirdAdj = providedThird ? (locks[2] ? providedThird : adjustSeedProfile(providedThird, { profile: params.profile, keywords: params.baseKeywords })) : undefined
    return { seeds: [primary, secondAdj, thirdAdj].filter(Boolean) as string[] }
  }
  if (chosenHarmony) {
    let derived = deriveHarmonySeeds(primary, chosenHarmony)
    // Respect locks: if user locked index 1 or 2 but didn't supply a seed, keep gap (will be treated as absent)
    if (locks[1] && !providedSecond) derived[1] = undefined as any
    if (locks[2] && !providedThird) derived[2] = undefined as any
    return { seeds: derived.filter(Boolean) as string[], chosenHarmony }
  }
  // Fallback legacy based on mode
  switch (params.mode) {
    case 'dual': return { seeds: [primary, rotate(primary,180)] }
    case 'triad': return { seeds: [primary, rotate(primary,120), rotate(primary,-120)] }
    default: return { seeds: [primary] }
  }
}

// --- OKLab helpers (approximated from palette.ts deltas) ---
interface Lab { L: number; a: number; b: number }
function hexToRgbLocal(hex: string) {
  const v = /#?([0-9a-fA-F]{6})/.exec(hex)?.[1] || '000000'
  const n = parseInt(v,16)
  return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 }
}
function srgbToLinear(c:number){const x=c/255;return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4)}
function linearToSrgb(x:number){return x<=0.0031308?x*12.92:1.055*Math.pow(x,1/2.4)-0.055}
function toOklab(r:number,g:number,b:number):Lab{const l=0.4122214708*r+0.5363325363*g+0.0514459929*b,m=0.2119034982*r+0.6806995451*g+0.1073969566*b,s=0.0883024619*r+0.2817188376*g+0.6299787005*b,l_=Math.cbrt(l),m_=Math.cbrt(m),s_=Math.cbrt(s);return{L:0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,a:1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,b:0.0259040371*l_+0.7827717662*m_-0.8086757660*b}}
function fromOklab(L:number,a:number,b:number){const l_ = L + 0.3963377774*a + 0.2158037573*b; const m_ = L - 0.1055613458*a - 0.0638541728*b; const s_ = L - 0.0894841775*a - 1.2914855480*b; const l=l_*l_*l_; const m=m_*m_*m_; const s=s_*s_*s_; return { r: +4.0767416621*l -3.3077115913*m +0.2309699292*s, g: -1.2684380046*l +2.6097574011*m -0.3413193965*s, b: -0.0041960863*l -0.7034186147*m +1.7076147010*s }}
function rgbToHexLocal(r:number,g:number,b:number){const cl=(x:number)=>Math.min(255,Math.max(0,Math.round(x*255)));return '#'+[cl(r),cl(g),cl(b)].map(v=>v.toString(16).padStart(2,'0')).join('')} 
function mixOklab(aHex:string,bHex:string,t:number){const a=hexToRgbLocal(aHex),b=hexToRgbLocal(bHex);const la=toOklab(srgbToLinear(a.r),srgbToLinear(a.g),srgbToLinear(a.b));const lb=toOklab(srgbToLinear(b.r),srgbToLinear(b.g),srgbToLinear(b.b));const L=la.L+(lb.L-la.L)*t;const A=la.a+(lb.a-la.a)*t;const B=la.b+(lb.b-la.b)*t;const {r,g,b:bb}=fromOklab(L,A,B);return rgbToHexLocal(linearToSrgb(r),linearToSrgb(g),linearToSrgb(bb))}

function buildNeutralScale(levels: number, baseBg: string, baseFg: string) {
  const out: Record<string,string> = {}
  for (let i=0;i<levels;i++) {
    const t = i/(levels-1)
    out[`neutral${(i+1)*Math.round(1000/levels)/10}`] = mixOklab(baseBg, baseFg, t)
  }
  return out
}

function ensureFg(background: string, minContrast: number) {
  const white = ensureContrast('#ffffff', background, minContrast)
  const black = ensureContrast('#111111', background, minContrast)
  return contrastRatio(white, background) >= contrastRatio(black, background) ? white : black
}

function variantsFor(baseName: string, baseHex: string, bg: string, internalContrast: number) {
  const L = luminance(baseHex)
  // Scale ranges modulated by internalContrast (0..1)
  const baseLight = L > 0.75 ? 0.04 : L > 0.6 ? 0.06 : L > 0.4 ? 0.08 : L > 0.25 ? 0.10 : 0.12
  const baseDark = L < 0.15 ? 0.08 : L < 0.25 ? 0.10 : L < 0.4 ? 0.12 : L < 0.6 ? 0.14 : 0.16
  const scaleLight = baseLight + (0.06 * internalContrast)
  const scaleDark = baseDark + (0.06 * internalContrast)
  const subtleBase = 0.10 + 0.06 * internalContrast
  const subtleHover = subtleBase + 0.06
  return {
    [`${baseName}Hover`]: lighten(baseHex, scaleLight),
    [`${baseName}Active`]: darken(baseHex, scaleDark),
    [`${baseName}Subtle`]: mix(bg, baseHex, subtleBase),
    [`${baseName}SubtleHover`]: mix(bg, baseHex, subtleHover)
  }
}

export function generatePalette(params: GenerationParams): GeneratedResult {
  const warnings: string[] = []
  const notes: string[] = []
  const { seeds: seedsDerived, chosenHarmony } = deriveSeeds(params, notes)
  const seedsRaw = seedsDerived
  // Balance saturation: if auto generated secondary/accent and harmony triad/analogous, slightly reduce sat for harmony stability
  const seeds = seedsRaw.map((s,i) => {
    const satFactor = (i===0)? params.saturation : (params.harmonyMode==='triad' ? params.saturation*0.92 : params.harmonyMode==='analogous' ? params.saturation*0.95 : params.saturation)
    return adjustSaturation(s, satFactor)
  })
  const primary = seeds[0]
  // Luminance separation heuristic: ensure secondary slightly lighter and accent slightly darker than primary if auto-generated
  const autoSecondary = !seedsRaw[1]
  const autoAccent = !seedsRaw[2]
  let secondary = seeds[1]
  let accent = seeds[2]
  if (!secondary && primary) secondary = mix(primary, '#ffffff', 0.18)
  if (!accent) accent = (seeds[1] ? mix(seeds[1], '#000000', 0.18) : primary ? mix(primary, '#000000', 0.22) : primary)
  const primaryLum = luminance(primary)
  const adjustLum = (hex: string, targetDelta: number) => {
    const p = parse(hex); if (!p) return hex
    const hsl = toHsl(p)
    // Adjust lightness in HSL space modestly
    const baseL = hsl.l ?? 0.5
    hsl.l = clamp01(baseL + targetDelta)
    return formatHex(toRgb(hsl)) || hex
  }
  if (autoSecondary && secondary) {
    if (luminance(secondary) <= primaryLum) secondary = adjustLum(secondary, 0.06)
  }
  if (autoAccent && accent) {
    if (luminance(accent) >= primaryLum) accent = adjustLum(accent, -0.07)
  }
  // Ensure perceptual separation (ΔE) if auto generated
  if (autoSecondary && secondary) {
    const { b } = ensureSeparation(primary, secondary)
    secondary = b
  }
  if ((autoAccent || autoSecondary) && accent) {
    const { b } = ensureSeparation(secondary || primary, accent)
    accent = b
  }

  // Light theme anchors
  // Background layering (light)
  const lightBase = '#f7f8fa'
  let lightBg = lightBase
  if (params.backgroundLayers && params.backgroundLayers.length > 1) {
    // Simple mix layering: progressively darken/lighten using seed primary
    lightBg = params.backgroundLayers.reduce((acc,_l,i)=> i===0? acc : mix(acc, primary, 0.02 * i), lightBase)
  }
  const lightSurface = mix(lightBg, '#000000', 0.04)
  const lightText = ensureFg(lightBg, params.minContrast)
  const lightBorder = mix(lightBg, lightText, 0.18)

  // Dark theme anchors
  const darkBase = '#0b0b0c'
  let darkBg = darkBase
  if (params.backgroundLayers && params.backgroundLayers.length > 1) {
    darkBg = params.backgroundLayers.reduce((acc,_l,i)=> i===0? acc : mix(acc, primary, 0.03 * i), darkBase)
  }
  const darkSurface = mix(darkBg, '#ffffff', 0.06)
  const darkText = ensureFg(darkBg, params.minContrast)
  const darkBorder = mix(darkBg, darkText, 0.22)

  const baseLight: Record<string,string> = { primary, secondary, accent, background: lightBg, surface: lightSurface, text: lightText, border: lightBorder }
  const baseDark: Record<string,string>  = { primary, secondary, accent, background: darkBg, surface: darkSurface, text: darkText, border: darkBorder }

  if (params.includeSemantic) {
    const p = parse(primary)
    if (p) {
      const hsl = toHsl(p)
      const mk = (deg: number, satDelta=0, lDelta=0) => {
        const clone: any = { ...hsl }
        clone.h = (((clone.h||0)+deg)%360+360)%360
        clone.s = clamp01((clone.s||0)+satDelta)
        clone.l = clamp01((clone.l||0)+lDelta)
        return formatHex(toRgb(clone)) || primary
      }
      // Conservative semantic derivation: only rotate hue, do not push saturation/lightness aggressively
      const allSemantic: Record<string,string> = {
        success: mk(120, 0, 0),
        danger: mk(-60, 0, 0),
        warning: mk(45, 0, 0),
        info: mk(-120, 0, 0)
      }
      const allowed = (params.semanticsTokens && params.semanticsTokens.length)
        ? params.semanticsTokens
        : ['success','danger','warning','info']
      const semantic: Record<string,string> = {}
      allowed.forEach(k => { if (allSemantic[k]) semantic[k] = allSemantic[k] })
      Object.assign(baseLight, semantic)
      Object.assign(baseDark, semantic)
    }
  }

  if (params.generateNeutrals) {
    Object.assign(baseLight, buildNeutralScale(params.neutralLevels, lightBg, lightText))
    Object.assign(baseDark, buildNeutralScale(params.neutralLevels, darkBg, darkText))
  }

  // Foregrounds
  const applyFgs = (obj: Record<string,string>, bg: string) => {
    for (const k of Object.keys(obj)) {
      if (!/(background|surface|border)/.test(k)) {
        let mc = params.minContrast
        if (params.contrastPolicy === 'wcagAAA') mc = Math.max(mc, 7)
        else if (params.contrastPolicy === 'wcagAA') mc = Math.max(mc, 4.5)
        const fg = ensureFg(obj[k], mc)
        obj[`${k}Fg`] = fg
      }
    }
  }
  applyFgs(baseLight, lightBg)
  applyFgs(baseDark, darkBg)

  // Variants (respect internalContrast scaling)
  params.variantScope.forEach(tok => {
    const exists = !!(baseLight[tok] || baseDark[tok])
    if (!exists) {
      warnings.push(`[variant] Variant ignoré: token '${tok}' absent`) ; return
    }
    if (baseLight[tok]) Object.assign(baseLight, variantsFor(tok, baseLight[tok], lightBg, params.internalContrast))
    if (baseDark[tok]) Object.assign(baseDark, variantsFor(tok, baseDark[tok], darkBg, params.internalContrast))
  })

  // Overlay tokens placeholder
  if (params.overlayOptions?.enable) {
    const layer = (hex: string) => mix(hex, params.foregroundHeuristic === 'luminance' ? '#ffffff' : primary, params.overlayOptions!.opacity)
    baseLight.overlay = layer(lightBg)
    baseDark.overlay = layer(darkBg)
  }

  // Extra tokens (optional)
  if (params.extraTokens && params.extraTokens.length) {
    const wanted = new Set(params.extraTokens)
    const accent = baseLight.primary
    if (wanted.has('focusRing')) {
      // Focus ring: slightly lighter mix for light, darker for dark to ensure contrast
      baseLight.focusRing = ensureContrast(lighten(accent, 0.25), lightBg, Math.max(3, params.minContrast-1))
      baseDark.focusRing = ensureContrast(darken(accent, 0.25), darkBg, Math.max(3, params.minContrast-1))
    }
    if (wanted.has('selectionBg')) {
      baseLight.selectionBg = mix(lightBg, accent, 0.25)
      baseDark.selectionBg = mix(darkBg, accent, 0.35)
    }
    if (wanted.has('selectionFg')) {
      baseLight.selectionFg = ensureFg(baseLight.selectionBg || accent, params.minContrast)
      baseDark.selectionFg = ensureFg(baseDark.selectionBg || accent, params.minContrast)
    }
    if (wanted.has('selectionBg') && (baseLight.selectionBg || baseDark.selectionBg)) {
      baseLight.selectionBgHover = mix(baseLight.selectionBg || accent, accent, 0.25)
      baseDark.selectionBgHover = mix(baseDark.selectionBg || accent, accent, 0.25)
    }
  }

  // Semantic distance enforcement (warnings only for now)
  if (params.includeSemantic && params.enforceSemanticDistance) {
    const semas = ['success','danger','warning','info'] as const
    // Active adjustment: attempt to rotate hue of later token in pair until ΔE >= threshold or attempts exhausted
    const adjustHue = (hex: string, degrees: number) => {
      const p = parse(hex); if (!p) return hex
      const hsl = toHsl(p)
      hsl.h = (((hsl.h||0)+degrees)%360+360)%360
      return formatHex(toRgb(hsl)) || hex
    }
    for (let i=0;i<semas.length;i++) {
      for (let j=i+1;j<semas.length;j++) {
        const a = semas[i], b = semas[j]
        // Skip if one of them not generated (subset semantics)
        if (!baseLight[a] || !baseLight[b]) continue
        if (baseLight[a] && baseLight[b]) {
          let d = deltaE(baseLight[a], baseLight[b])
            , attempts = 0
          while (d < params.distanceThreshold && attempts < 12) {
            // Rotate hue of the second token by +10° * attempt (progressively spreads)
            const step = 10 + attempts * 5
            baseLight[b] = adjustHue(baseLight[b], step)
            baseDark[b] = baseLight[b] // keep themes aligned for semantics
            d = deltaE(baseLight[a], baseLight[b])
            attempts++
          }
          if (d < params.distanceThreshold) {
            warnings.push(`[distance] Distance sémantique encore faible (${a}/${b}) ΔE=${d.toFixed(2)} après ajustements`)
          } else if (attempts > 0) {
            notes.push(`Ajustement ${b} (${attempts} itérations) pour ΔE=${d.toFixed(2)}`)
          }
        }
      }
    }
  }

  if (!params.internalContrast) {
    notes.push('internalContrast=0 => variants proches de la couleur de base')
  }

  // Collision detection (ΔE <5 OR rgbDistance <24) among key semantic + primary
  const candidates = ['primary','success','danger','warning','info'].filter(k=> baseLight[k])
  for (let i=0;i<candidates.length;i++) {
    for (let j=i+1;j<candidates.length;j++) {
      const a = candidates[i], b = candidates[j]
      const dE = deltaE(baseLight[a], baseLight[b])
      const dist = deltaE(baseDark[a]||baseLight[a], baseDark[b]||baseLight[b])
      const rgbDist = (() => {
        // lightweight inline rgb distance without re-import to avoid cycle
        const hexTo = (h:string)=>{const m=/#?([0-9a-fA-F]{6})/.exec(h)?.[1]||'000000';const n=parseInt(m,16);return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
        const A=hexTo(baseLight[a]),B=hexTo(baseLight[b]);const dr=A.r-B.r,dg=A.g-B.g,db=A.b-B.b;return Math.sqrt(dr*dr+dg*dg+db*db)
      })()
      if (dE < 5 || rgbDist < 24) {
        warnings.push(`[collision] Collision chromatique ${a}/${b} ΔE=${dE.toFixed(2)} rgbDist=${Math.round(rgbDist)}`)
      }
    }
  }

  // Basic metrics (hue diversity approximation via ΔE average & average contrast of Fg tokens)
  const metric: Record<string, number> = {}
  const values = candidates.map(k => baseLight[k])
  let sumDE = 0, pairs = 0
  for (let i=0;i<values.length;i++) for (let j=i+1;j<values.length;j++){ sumDE += deltaE(values[i], values[j]); pairs++ }
  if (pairs) metric.semanticDiversity = sumDE / pairs
  // Average contrast text vs background
  const bg = baseLight.background
  const getL = (hex:string)=>{const v=/#?([0-9a-fA-F]{6})/.exec(hex)?.[1]||'000000';const n=parseInt(v,16);const r=(n>>16)&255,g=(n>>8)&255,b=n&255;const srgb=(c:number)=>{const x=c/255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)};const R=srgb(r),G=srgb(g),B=srgb(b);return 0.2126*R+0.7152*G+0.0722*B}
  const contrast = (a:string,b:string)=>{const L1=getL(a),L2=getL(b);const [hi,lo]=L1>L2?[L1,L2]:[L2,L1];return (hi+0.05)/(lo+0.05)}
  const fgTokens = Object.keys(baseLight).filter(k=>k.endsWith('Fg'))
  if (fgTokens.length){ metric.avgFgContrast = fgTokens.reduce((acc,k)=>acc+contrast(baseLight[k], bg),0)/fgTokens.length }
  // Simple score heuristic
  if (metric.semanticDiversity && metric.avgFgContrast) {
    metric.accessibilityScore = (metric.avgFgContrast/params.minContrast)*0.6 + Math.min(1, metric.semanticDiversity/20)*0.4
  }

  return { light: baseLight, dark: baseDark, meta: { warnings, notes, metrics: metric, chosenHarmony } }
}
