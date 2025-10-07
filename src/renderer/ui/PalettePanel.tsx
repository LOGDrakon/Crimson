// Temporary clean copy of PalettePanel while original file truncation issues are resolved
import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { contrastRatio, lighten } from '../core/palette'
import { HistoryBar } from './HistoryBar'

function safeHex(val?: string) {
  if (!val) return '#000000';
  let v = val.trim();
  if (!v.startsWith('#')) v = '#' + v;
  const short = /^#([0-9a-fA-F]{3})$/;
  const long = /^#([0-9a-fA-F]{6})$/;
  if (short.test(v)) { const m = v.slice(1); v = '#' + m.split('').map(c => c + c).join(''); }
  if (!long.test(v)) return '#000000';
  return v.toLowerCase();
}

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); } catch {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch {} finally { document.body.removeChild(ta); }
  }
}

function nextName(existing: string[], base: string) {
  if (!existing.includes(base)) return base; let i = 2; while (existing.includes(`${base}${i}`)) i++; return `${base}${i}`;
}

export const PalettePanel: React.FC = () => {
  const palette = usePaletteStore(s => s.palette)
  const effectivePalette = usePaletteStore(s => (s as any).effectivePalette?.()) || palette
  const theme = usePaletteStore(s => s.theme)
  const setToken = usePaletteStore(s => s.setToken);
  const addToken = usePaletteStore(s => s.addToken);
  const removeToken = usePaletteStore(s => s.removeToken);
  const renameToken = usePaletteStore(s => s.renameToken);
  const generateVariantsFor = usePaletteStore(s => (s as any).generateVariantsFor);
  const applyAutoContrast = usePaletteStore(s => (s as any).applyAutoContrast);
  const sandboxActive = usePaletteStore(s => (s as any).sandboxActive);
  const setSandboxActive = usePaletteStore(s => (s as any).setSandboxActive);
  const setSandboxToken = usePaletteStore(s => (s as any).setSandboxToken);
  const applySandbox = usePaletteStore(s => (s as any).applySandbox);
  const discardSandbox = usePaletteStore(s => (s as any).discardSandbox);
  const sandbox = usePaletteStore(s => (s as any).sandbox) as Record<string,string>|undefined;
  const groups = usePaletteStore(s => s.groups);
  const tokenGroups = usePaletteStore(s => s.tokenGroups);

  const [active, setActive] = React.useState<string>('primary')
  const [hexInput, setHexInput] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [groupFilter, setGroupFilter] = React.useState('')
  const [renaming, setRenaming] = React.useState<string|null>(null)
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set())
  const [customVariants, setCustomVariants] = React.useState<Record<string,string[]>>({})

  React.useEffect(() => { setHexInput(effectivePalette[active] || ''); }, [effectivePalette, active]);

  const allTokens = React.useMemo(() => Object.keys(palette).sort(), [palette])

  // Fallback active token if removed or palette changed
  React.useEffect(() => {
    if (!allTokens.includes(active)) {
      const fallback = allTokens.includes('primary') ? 'primary' : (allTokens[0] || '')
      if (fallback) setActive(fallback)
    }
  }, [allTokens, active])

  // Determine base tokens vs variants. Heuristic: variant starts with base token and next char is uppercase.
  const baseSet = React.useMemo(() => {
    const set = new Set<string>()
    for (const t of allTokens) set.add(t) // start with all
    // prune variant names
    for (const t of allTokens) {
      for (const b of allTokens) {
        if (b === t) continue
        if (t.startsWith(b) && t.length > b.length && /[A-Z]/.test(t.charAt(b.length))) {
          // t is variant of b -> b remains, t is variant (remove from base set if present)
          set.delete(t)
          break
        }
      }
    }
    return set
  }, [allTokens])

  const variantMap = React.useMemo(() => {
    const map: Record<string,string[]> = {}
    for (const t of allTokens) {
      for (const b of baseSet) {
        if (t.startsWith(b) && t.length > b.length && /[A-Z]/.test(t.charAt(b.length))) {
          if (!map[b]) map[b] = []
          map[b].push(t)
          break
        }
      }
    }
    for (const b of Object.keys(map)) map[b].sort()
    return map
  }, [allTokens, baseSet])

  const visibleBases = Array.from(baseSet).filter(base => {
    if (groupFilter && tokenGroups[base] !== groupFilter) return false
    if (!search) return true
    const lc = search.toLowerCase()
    if (base.toLowerCase().includes(lc)) return true
    const vars = variantMap[base] || []
    return vars.some(v => v.toLowerCase().includes(lc))
  }).sort()

  const commitHex = (value: string) => { if (!active) return; const v = safeHex(value); if (sandboxActive) setSandboxToken?.(active, v); else setToken(active, v); };
  const onHexChange = (val: string) => { setHexInput(val); if (/^#?[0-9a-fA-F]{6}$/.test(val.replace('#',''))) commitHex(val); };
  const duplicate = () => { if (!active) return; const next = nextName(allTokens, active + 'Copy'); addToken(next, effectivePalette[active]); setActive(next); };
  const genVariants = () => generateVariantsFor?.(active);
  const autoContrast = () => applyAutoContrast?.(active);
  const activeValue = effectivePalette[active] || '#000000'
  const copyHex = () => copy(activeValue);
  const copyCSS = () => { if (active) copy(`var(--color-${active})`) };
  const ratioToBg = contrastRatio(activeValue, effectivePalette.background || '#000');
  const startRename = (t: string) => setRenaming(t);
  const finishRename = (oldName: string, next: string) => {
    const trimmed = next.trim();
    if (trimmed && trimmed !== oldName && !palette[trimmed]) { renameToken(oldName, trimmed); if (active === oldName) setActive(trimmed); }
    setRenaming(null);
  };
  const inSandbox = (token: string) => sandboxActive && sandbox && sandbox[token] && sandbox[token] !== palette[token];

  const isDark = theme === 'dark'
  const panelBg = isDark ? 'bg-neutral-950/70 border-neutral-800' : 'bg-white/70 border-neutral-200'
  const barBg = isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100/70 border-neutral-200'
  const cardBase = isDark ? 'bg-neutral-900/40' : 'bg-white'
  const cardBorder = isDark ? 'border-neutral-800 hover:border-neutral-600' : 'border-neutral-300 hover:border-neutral-400'
  const activeBorder = isDark ? 'border-amber-400' : 'border-amber-500'

  const toggleCollapse = (b: string) => setCollapsed(s => { const n = new Set(s); n.has(b) ? n.delete(b) : n.add(b); return n })
  const addCustomVariant = (base: string) => {
    const raw = prompt('Nom du variant (ex: Strong, Alt, Outline)')?.trim()
    if (!raw) return
    const suf = raw.replace(/\s+/g,'').replace(/[^A-Za-z0-9]/g,'')
    if (!suf) return
    const token = base + suf.charAt(0).toUpperCase() + suf.slice(1)
    if (palette[token]) { alert('Existe déjà'); return }
    const baseColor = palette[base]
    const color = lighten(baseColor, 0.08)
    setToken(token, color)
    setCustomVariants(m => ({ ...m, [base]: [...(m[base]||[]), suf] }))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className={`p-3 border-b flex flex-wrap gap-2 items-center ${panelBg}`}>        
        <input id="palette-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher token…" className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`} />
        <select value={groupFilter} onChange={e => setGroupFilter(e.target.value)} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`}>
          <option value="">Groupes: Tous</option>
          {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => addToken()} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>+ token</button>
          <button onClick={() => setSandboxActive?.(!sandboxActive)} className={`px-2 py-1 rounded text-xs border ${sandboxActive ? 'bg-amber-600/90 border-amber-500' : (isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-neutral-200 border-neutral-300 hover:bg-neutral-300')}`}>Sandbox {sandboxActive ? 'ON' : 'OFF'}</button>
          {sandboxActive && <>
            <button onClick={() => applySandbox?.()} className="px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-xs text-white">Appliquer</button>
            <button onClick={() => discardSandbox?.()} className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-xs text-white">Annuler</button>
          </>}
        </div>
      </div>
      <div className={`px-3 py-2 border-b flex items-center gap-3 text-xs ${barBg}`}>
        <div className="font-medium truncate max-w-[140px]" title={active}>{active}</div>
        <div className="flex gap-1">
          <button onClick={copyHex} title="Copier hex" className={`px-2 py-1 rounded ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>#</button>
          <button onClick={copyCSS} title="Copier variable CSS" className={`px-2 py-1 rounded ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>var</button>
          <button onClick={duplicate} title="Dupliquer" className={`px-2 py-1 rounded ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>⧉</button>
          <button onClick={genVariants} title="Générer variants" className={`px-2 py-1 rounded ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>Δ</button>
          <button onClick={autoContrast} title="Auto contraste" className={`px-2 py-1 rounded ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-200 hover:bg-neutral-300'}`}>⚙︎</button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <input value={hexInput} onChange={e => onHexChange(e.target.value)} className={`w-28 px-2 py-1 rounded font-mono ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`} />
          <div className={`w-6 h-6 rounded border ${isDark ? 'border-neutral-700' : 'border-neutral-300'}`} style={{ background: activeValue }} />
          <div className="text-neutral-400 tabular-nums">{ratioToBg.toFixed(2)}:1</div>
        </div>
      </div>
      <HistoryBar />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {visibleBases.map(base => {
          const baseVal = effectivePalette[base]
          const variants = (variantMap[base] || []).sort()
          const isCollapsed = collapsed.has(base)
          const isActiveBase = active === base
          return (
            <div key={base} className="border border-dashed border-transparent rounded">
              <div
                className={`border rounded p-3 ${cardBase} cursor-pointer select-none text-[11px] flex flex-col gap-2 transition ${isActiveBase ? activeBorder : cardBorder}`}
                onClick={() => setActive(base)}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e)=>{ e.stopPropagation(); toggleCollapse(base) }}
                    className={`w-5 h-5 inline-flex items-center justify-center text-[10px] rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}
                  >{isCollapsed ? '+' : '–'}</button>
                  <div className={`w-5 h-5 rounded border ${isDark ? 'border-neutral-600' : 'border-neutral-300'}`} style={{ background: baseVal }} />
                  {renaming === base ? (
                    <input
                      autoFocus
                      defaultValue={base}
                      onBlur={e => finishRename(base, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') finishRename(base, (e.target as HTMLInputElement).value); if (e.key === 'Escape') setRenaming(null) }}
                      className={`px-1 py-0.5 rounded flex-1 ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`}
                    />
                  ) : (
                    <div className="truncate flex-1" onDoubleClick={() => startRename(base)}>{base}</div>
                  )}
                  {inSandbox(base) && <span className="text-amber-400 text-[9px]" title="Modifié dans sandbox">*</span>}
                  <button onClick={(e)=>{ e.stopPropagation(); removeToken(base) }} className="text-xs text-red-400 hover:text-red-300" title="Supprimer">✕</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className={`h-8 rounded border ${isDark ? 'border-neutral-700' : 'border-neutral-300'}`} style={{ background: baseVal }} />
                    <div className="font-mono text-neutral-500 text-[10px] truncate">{baseVal}</div>
                    <div className="text-[9px] text-neutral-500">{contrastRatio(baseVal, effectivePalette.background || '#000').toFixed(1)}:1</div>
                  </div>
                  {!isCollapsed && variants.map(v => {
                    const vVal = effectivePalette[v]
                    const isActiveVar = active === v
                    return (
                      <div
                        key={v}
                        onClick={(e)=>{ e.stopPropagation(); setActive(v) }}
                        className={`relative flex flex-col gap-1 border rounded p-1 pt-4 ${cardBase} ${isActiveVar ? activeBorder : cardBorder}`}
                      >
                        <button
                          onClick={(e)=>{ e.stopPropagation(); removeToken(v); if (active === v) setActive(base); }}
                          title="Supprimer variant"
                          className="absolute top-0 right-0 text-[10px] px-1 text-red-400 hover:text-red-300"
                        >✕</button>
                        <div className={`h-6 rounded border ${isDark ? 'border-neutral-700' : 'border-neutral-300'}`} style={{ background: vVal }} />
                        <div className="truncate" title={v}>{v}</div>
                        <div className="font-mono text-neutral-500 text-[10px] truncate">{vVal}</div>
                      </div>
                    )
                  })}
                  {!isCollapsed && (
                    <button
                      onClick={(e)=>{ e.stopPropagation(); addCustomVariant(base) }}
                      className={`h-8 border border-dashed rounded text-[10px] flex items-center justify-center ${isDark ? 'border-neutral-700 hover:border-neutral-500' : 'border-neutral-300 hover:border-neutral-400'}`}
                    >+ variant</button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {visibleBases.length === 0 && (
          <div className="text-xs text-neutral-500">Aucun token ne correspond aux filtres.</div>
        )}
      </div>
    </div>
  );
};

export default PalettePanel;