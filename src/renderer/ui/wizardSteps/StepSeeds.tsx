import React, { useMemo, useState, useEffect } from 'react'
import { useNewProjectWizard } from '../../store/newProjectWizardStore'
import { t } from '../i18n'
import Tooltip from '../components/Tooltip'
import { StepHeader } from './common'
import { parse, converter, formatHex } from 'culori'

const toHsl = converter('hsl') as any
const toRgb = converter('rgb') as any

function getHue(hex?: string) {
  if (!hex) return null
  const p = parse(hex)
  if (!p) return null
  const h = toHsl(p).h
  return typeof h === 'number' ? ((h%360)+360)%360 : null
}

function rotate(hex: string, deg: number) {
  const p = parse(hex); if (!p) return hex
  const h = toHsl(p)
  h.h = (((h.h||0)+deg)%360+360)%360
  return formatHex(toRgb(h)) || hex
}

export const StepSeeds: React.FC = () => {
  const w = useNewProjectWizard()
  const chosen = (w.draft as any)?.meta?.chosenHarmony as string | undefined
  const primary = w.seeds[0]
  const secondary = w.seeds[1]
  const accent = w.seeds[2]

  // Derived preview hues if not provided
  const previewSeeds = useMemo(() => {
    if (!primary) return [] as { hex: string; label: string }[]
    const arr: { hex: string; label: string }[] = [{ hex: primary, label: 'P' }]
    if (secondary) arr.push({ hex: secondary, label: 'S' })
    if (accent) arr.push({ hex: accent, label: 'A' })
    if (!secondary || !accent) {
      // generate based on harmonyMode (mirrors logic in core but simplified for preview)
      const mode = w.harmonyMode || 'auto'
      const add = (hex: string, label: string) => { if (!arr.find(a=>a.label===label)) arr.push({ hex, label }) }
      if (mode==='complementary') add(rotate(primary,180),'S')
      else if (mode==='triad') { add(rotate(primary,120),'S'); add(rotate(primary,-120),'A') }
      else if (mode==='analogous') { add(rotate(primary,30),'S'); add(rotate(primary,-30),'A') }
      else if (mode==='auto') {
        if (!secondary) add(rotate(primary, 150),'S')
        if (!accent) add(rotate(primary,-150),'A')
      }
    }
    return arr
  }, [primary, secondary, accent, w.harmonyMode])

  const markers = previewSeeds.map(s => ({ hue: getHue(s.hex)||0, ...s }))

  // Local editable text state so user can type partial hex (#, #1, #12, etc.) without being forced through safeHex prematurely.
  const [editing, setEditing] = useState<string[]>(() => w.seeds)
  // Keep local state in sync if seeds change externally (picker, preset, lock-driven regeneration etc.)
  useEffect(() => {
    // Only overwrite positions that have a committed valid hex (#rrggbb) to avoid wiping user's in-progress typing mid-edit.
    setEditing(prev => {
      const next = [...prev]
      w.seeds.forEach((seed, i) => {
        if (/^#?[0-9a-fA-F]{6}$/.test(seed)) next[i] = seed
        else if (!seed) next[i] = ''
      })
      return next
    })
  }, [w.seeds.join('|')])

  const handleTextChange = (idx: number, raw: string) => {
    // Allow empty or partial up to 6 hex chars (with or without leading #)
    if (!/^#?[0-9a-fA-F]{0,6}$/.test(raw)) return
    setEditing(prev => {
      const next = [...prev]; next[idx] = raw; return next
    })
    // Commit when full length 6 hex reached
    if (/^#?[0-9a-fA-F]{6}$/.test(raw)) {
      const hex = raw.startsWith('#') ? raw : '#' + raw
      const arr = [...w.seeds]
      arr[idx] = hex
      w.setSeeds(arr)
    } else if (raw === '') {
      const arr = [...w.seeds]
      arr[idx] = ''
      w.setSeeds(arr)
    }
  }

  const commitOnBlur = (idx: number) => {
    const val = editing[idx]
    if (/^#?[0-9a-fA-F]{3}$/.test(val)) {
      // Expand #rgb to full #rrggbb
      const v = val.replace('#','')
      const full = '#' + v.split('').map(c=>c+c).join('')
      const arr = [...w.seeds]; arr[idx] = full; w.setSeeds(arr)
      setEditing(ed => { const n=[...ed]; n[idx]=full; return n })
    }
    // If invalid partial on blur (e.g. '#1'), revert to last committed store value
    if (val && !/^#?[0-9a-fA-F]{6}$/.test(val) && !/^#?[0-9a-fA-F]{3}$/.test(val)) {
      setEditing(ed => { const n=[...ed]; n[idx]= w.seeds[idx] || ''; return n })
    }
  }

  return (
    <div className="space-y-4">
      <StepHeader title={t('step_seeds')} subtitle={t('step_seeds_sub')} />
      <div className="flex flex-wrap gap-4 items-start text-xs">
        {['Primary','Secondary','Accent'].map((label, idx) => {
          const s = w.seeds[idx] || (idx===1? w.seeds[0]: w.seeds[0])
          return (
            <div key={idx} className="flex flex-col gap-1 items-center">
              <span className="opacity-70 text-[11px] flex items-center gap-1">{label}
                {idx>0 && <Tooltip label={`Auto si vide – dérivé de ${idx===1?'Primary':'Primary/contrast'}`}><span className="cursor-help text-neutral-400">?</span></Tooltip>}
                <button onClick={()=>w.toggleLockedSeed?.(idx)} className={`ml-1 px-1 rounded border text-[10px] ${w.lockedSeeds?.[idx]? 'border-amber-500 text-amber-400':'border-neutral-700 text-neutral-400 hover:border-neutral-500'}`} title={w.lockedSeeds?.[idx] ? 'Déverrouiller seed (permettre ajustements auto)' : 'Verrouiller seed (empêcher ajustements auto)'}>
                  {w.lockedSeeds?.[idx] ? '🔒' : '🔓'}
                </button>
              </span>
              <input type="color" value={s && /^#([0-9a-fA-F]{6})$/.test(s) ? s : '#000000'} onChange={e=>{ const arr=[...w.seeds]; arr[idx]=e.target.value; w.setSeeds(arr) }} className="w-12 h-12 p-0 bg-transparent border border-neutral-700 rounded" />
              <input value={editing[idx] ?? ''} placeholder={idx>0? '(auto)': ''} onChange={e=>handleTextChange(idx, e.target.value)} onBlur={()=>commitOnBlur(idx)} className="w-24 px-1 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono" />
            </div>
          )
        })}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] opacity-70 flex items-center gap-1">Harmonie <Tooltip label="Détermine les rotations de teinte proposées (triad, complémentaire, analogue). Si 'auto' et secondary/accent non fournis, ils sont générés."><span className="cursor-help text-neutral-400">?</span></Tooltip></span>
          <select value={w.harmonyMode||'auto'} onChange={e=>w.setHarmonyMode?.(e.target.value as any)} className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-[11px]">
            {['auto','complementary','triad','analogous'].map(h=> <option key={h} value={h}>{h}</option>)}
          </select>
          {w.harmonyMode==='auto' && chosen && (
            <div className="text-[10px] mt-1 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 flex items-center gap-1">
              <span className="opacity-60">Auto →</span>
              <span className="font-medium text-amber-400">{chosen}</span>
              <Tooltip label="Sélection automatique basée sur profil & mots-clés."><span className="cursor-help text-neutral-400">?</span></Tooltip>
            </div>
          )}
        </div>
      </div>
      {/* Hue wheel preview */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] opacity-70 flex items-center gap-1">Aperçu Teinte <Tooltip label="Visualisation des rotations d'harmonie. Les points représentent Primary (P), Secondary (S) et Accent (A)."><span className="cursor-help text-neutral-400">?</span></Tooltip></span>
          <div className="relative w-40 h-40 rounded-full border border-neutral-700" style={{ background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)' }}>
            {markers.map(m => {
              const angle = (m.hue/360)*Math.PI*2
              const r = 70
              const cx = 80 + Math.sin(angle)*r
              const cy = 80 - Math.cos(angle)*r
              return (
                <div key={m.label} className="absolute flex items-center justify-center text-[10px] font-bold" style={{ left: cx, top: cy, width: 16, height: 16, marginLeft: -8, marginTop: -8, background: m.hex, color: '#000', border: '1px solid #111', borderRadius: '50%' }} title={`${m.label}: ${m.hex}`}>{m.label}</div>
              )
            })}
          </div>
        </div>
        <div className="max-w-xs text-[11px] opacity-70 leading-snug">
          Les positions montrent l'espacement de teinte. Modifier l'harmonie ou les couleurs ajuste la distribution. Conserver un bon écart aide à éviter la confusion entre les rôles.
        </div>
      </div>
      <div className="flex gap-3 text-xs">
        {(['single','dual','triad','mono'] as const).map(m => (
          <button key={m} onClick={()=>w.setMode(m)} className={`px-2 py-1 rounded border text-xs ${w.mode===m?'border-amber-500 text-amber-400':'border-neutral-700'}`}>{m}</button>
        ))}
      </div>
    </div>
  )
}

export default StepSeeds
