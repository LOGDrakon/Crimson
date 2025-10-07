export type TokenName =
  | 'primary' | 'secondary' | 'accent'
  | 'background' | 'surface' | 'text' | 'border'
  | 'success' | 'danger' | 'warning' | 'info'

// Allow dynamic tokens beyond the predefined names
export type Palette = Record<string, string> // hex string like #RRGGBB

export const defaultPalette: Palette = {
  primary: '#6366f1',
  secondary: '#ec4899',
  accent: '#22c55e',
  tertiary: '#a855f7',
  background: '#0b0b0c',
  surface: '#1f2937',
  surfaceAlt: '#243045',
  surfaceElevated: '#2d3a52',
  surfaceInverted: '#f8fafc',
  text: '#e5e7eb',
  textMuted: '#94a3b8',
  textInverted: '#0f172a',
  textOnPrimary: '#ffffff',
  textOnSuccess: '#052e16',
  textOnDanger: '#450a0a',
  border: '#374151',
  borderSubtle: '#2a3446',
  borderStrong: '#475569',
  outline: '#475569',
  muted: '#94a3b8',
  link: '#3b82f6',
  neutral: '#9ca3af',
  highlight: '#fde047',
  overlay: '#111827',
  backdrop: 'rgba(15,23,42,0.6)',
  shadow: '#000000',
  success: '#22c55e',
  successHover: '#16a34a',
  successActive: '#15803d',
  successSubtle: '#dcfce7',
  successSubtleHover: '#bbf7d0',
  successFg: '#052e16',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  dangerActive: '#b91c1c',
  dangerSubtle: '#fee2e2',
  dangerSubtleHover: '#fecaca',
  dangerFg: '#450a0a',
  warning: '#f59e0b',
  warningHover: '#d97706',
  warningActive: '#b45309',
  warningSubtle: '#fef9c3',
  warningSubtleHover: '#fde68a',
  warningFg: '#442a03',
  info: '#3b82f6',
  infoHover: '#2563eb',
  infoActive: '#1d4ed8',
  infoSubtle: '#e0f2fe',
  infoSubtleHover: '#bae6fd',
  infoFg: '#082f49',
  focus: '#818cf8',
  focusRing: '#818cf8',
  active: '#6366f1',
  disabled: '#d1d5db',
  error: '#ef4444',
  successBg: '#dcfce7',
  successBgStrong: '#bbf7d0',
  dangerBg: '#fee2e2',
  dangerBgStrong: '#fecaca',
  warningBg: '#fef9c3',
  warningBgStrong: '#fde68a',
  infoBg: '#e0f2fe',
  infoBgStrong: '#bae6fd',
  selection: '#f3f4f6',
  selectionFg: '#1e293b',
  placeholder: '#9ca3af',
  skeleton: '#1e2532',
  primaryHover: '#4f46e5',
  primaryActive: '#4338ca',
  primarySubtle: '#eef2ff',
  primarySubtleHover: '#e0e7ff',
  primaryFg: '#ffffff',
}

/**
 * Normalize an arbitrary user-provided color string to a canonical #rrggbb lowercase form.
 * Falls back to #000000 on invalid input. Supports #rgb shorthand and gracefully strips alpha (#rrggbbaa).
 */
/**
 * Normalize a hex color string to #rrggbb lowercase. Returns #000000 on error.
 * Accepts #rgb, #rrggbb, #rrggbbaa, with or without leading #. Strips alpha if present.
 */
export function safeHex(val?: string): string {
  if (typeof val !== 'string' || !val.trim()) return '#000000';
  let v = val.trim();
  if (!v.startsWith('#')) v = '#' + v;
  // Strip trailing alpha channel if provided (#RRGGBBAA)
  if (/^#([0-9a-fA-F]{8})$/.test(v)) v = '#' + v.slice(1,7);
  const short = /^#([0-9a-fA-F]{3})$/;
  const long = /^#([0-9a-fA-F]{6})$/;
  if (short.test(v)) {
    const m = v.slice(1);
    v = '#' + m.split('').map(ch => ch + ch).join('');
  }
  if (!long.test(v)) return '#000000';
  return v.toLowerCase();
}

/**
 * Parse a hex string to RGB object. Returns {r:0,g:0,b:0} on error.
 * Accepts #rgb, #rrggbb, #rrggbbaa, with or without leading #.
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const v = safeHex(hex);
  if (!/^#([0-9a-fA-F]{6})$/.test(v)) return { r:0, g:0, b:0 };
  const n = v.slice(1);
  const bigint = Number.parseInt(n, 16);
  if (Number.isNaN(bigint)) return { r:0, g:0, b:0 };
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

export function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const [R, G, B] = [r, g, b].map(v => {
    const x = v/255
    return x <= 0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4)
  })
  return 0.2126*R + 0.7152*G + 0.0722*B
}

export function contrastRatio(hex1: string, hex2: string) {
  const L1 = luminance(hex1)
  const L2 = luminance(hex2)
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}

// Utility conversions / operations
function clamp01(x: number) { return Math.min(1, Math.max(0, x)) }

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => n.toString(16).padStart(2, '0')
  return '#' + to(r) + to(g) + to(b)
}

export function lighten(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex)
  const k = clamp01(amt)
  return rgbToHex(
    Math.round(r + (255 - r) * k),
    Math.round(g + (255 - g) * k),
    Math.round(b + (255 - b) * k)
  )
}

export function darken(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex)
  const k = clamp01(amt)
  return rgbToHex(
    Math.round(r * (1 - k)),
    Math.round(g * (1 - k)),
    Math.round(b * (1 - k))
  )
}

export function mix(hex1: string, hex2: string, ratio: number) {
  const k = clamp01(ratio)
  const a = hexToRgb(hex1)
  const b = hexToRgb(hex2)
  return rgbToHex(
    Math.round(a.r + (b.r - a.r) * k),
    Math.round(a.g + (b.g - a.g) * k),
    Math.round(a.b + (b.b - a.b) * k)
  )
}

/**
 * Ensure that fg has at least the target contrast ratio against bg.
 * If not, moves fg toward black or white until the target is met, or returns the extreme.
 */
export function ensureContrast(fg: string, bg: string, target: number): string {
  let cFg = safeHex(fg), cBg = safeHex(bg);
  let current = contrastRatio(cFg, cBg);
  if (current >= target) return cFg;
  // Decide direction: move color toward the extreme (black/white) that increases contrast.
  const towardWhite = contrastRatio('#ffffff', cBg) > contrastRatio('#000000', cBg);
  const extreme = towardWhite ? '#ffffff' : '#000000';
  // Binary search in mix ratio space [0,1] to achieve target contrast.
  let lo = 0, hi = 0, step = 0.25, candidate = cFg;
  while (hi < 1) {
    const test = mix(cFg, extreme, hi);
    const c = contrastRatio(test, cBg);
    if (c >= target) { candidate = test; break; }
    hi += step;
  }
  if (hi >= 1) {
    return extreme;
  }
  // Refine with binary search
  lo = hi - step;
  for (let i = 0; i < 7; i++) {
    const mid = (lo + hi) / 2;
    const test = mix(cFg, extreme, mid);
    const c = contrastRatio(test, cBg);
    if (c >= target) { candidate = test; hi = mid; } else { lo = mid; }
  }
  return candidate;
}

export function rgbDistance(a: string, b: string) {
  const A = hexToRgb(a), B = hexToRgb(b)
  const dr = A.r - B.r, dg = A.g - B.g, db = A.b - B.b
  return Math.sqrt(dr*dr + dg*dg + db*db)
}

// --- ΔE (perceptual difference) using OKLab (approximation)
// Convert sRGB -> linear -> OKLab per Björn Ottosson's formula
function srgbToLinear(c: number) {
  const x = c / 255
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
}
function linearToOklab(r: number, g: number, b: number) {
  // LMS
  const l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
  const m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
  const s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  return {
    L: 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_,
    a: 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_,
    b: 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
  }
}
export function deltaE(a: string, b: string) {
  const A = hexToRgb(a), B = hexToRgb(b)
  const la = linearToOklab(srgbToLinear(A.r), srgbToLinear(A.g), srgbToLinear(A.b))
  const lb = linearToOklab(srgbToLinear(B.r), srgbToLinear(B.g), srgbToLinear(B.b))
  const dL = la.L - lb.L
  const da = la.a - lb.a
  const db = la.b - lb.b
  return Math.sqrt(dL*dL + da*da + db*db)
}
