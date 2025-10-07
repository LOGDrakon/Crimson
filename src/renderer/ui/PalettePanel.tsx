// Temporary clean copy of PalettePanel while original file truncation issues are resolved
import React from 'react'
import ReactDOM from 'react-dom'
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
  // Side panel only now (no floating dock)
  const listRef = React.useRef<HTMLDivElement|null>(null)
  const [search, setSearch] = React.useState('')
  const [groupFilter, setGroupFilter] = React.useState('')
  const [renaming, setRenaming] = React.useState<string|null>(null)
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set())
  const [customVariants, setCustomVariants] = React.useState<Record<string,string[]>>({})
  // Side panel enhancements
  const [panelSide, setPanelSide] = React.useState<'right'|'left'>('right')
  const [panelWidth, setPanelWidth] = React.useState<number>(256)
  const [panelCompact, setPanelCompact] = React.useState<boolean>(false)
  const resizing = React.useRef<null | { startX:number, startW:number }>(null)
  const [tokenHistory, setTokenHistory] = React.useState<Record<string,string[]>>({})

  React.useEffect(() => { setHexInput(effectivePalette[active] || ''); }, [effectivePalette, active]);

  // (Removed dock persistence & drag logic)

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

  const commitHex = (value: string) => {
    if (!active) return;
    const v = safeHex(value);
    // History: store previous value if changed
    const current = effectivePalette[active]
    if (current && current.toLowerCase() !== v.toLowerCase()) {
      setTokenHistory(h => {
        const prev = h[active] || []
        if (prev[0]?.toLowerCase() === current.toLowerCase()) return h
        const nextArr = [current, ...prev].slice(0,10)
        return { ...h, [active]: nextArr }
      })
    }
    if (sandboxActive) setSandboxToken?.(active, v); else setToken(active, v);
  };
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

  // Hydrate persisted panel settings
  React.useEffect(() => {
    (async () => {
      try {
        const side = await window.crimson.storeGet('palettePanel.side')
        const width = await window.crimson.storeGet('palettePanel.width')
        const compact = await window.crimson.storeGet('palettePanel.compact')
        if (side === 'left' || side === 'right') setPanelSide(side)
        if (typeof width === 'number' && width >= 220 && width <= 420) setPanelWidth(width)
        if (typeof compact === 'boolean') setPanelCompact(compact)
      } catch {}
    })()
  }, [])

  // Persist on change (debounced for width)
  React.useEffect(() => { window.crimson.storeSet('palettePanel.side', panelSide) }, [panelSide])
  React.useEffect(() => { window.crimson.storeSet('palettePanel.compact', panelCompact) }, [panelCompact])
  React.useEffect(() => {
    const id = setTimeout(()=>{ window.crimson.storeSet('palettePanel.width', panelWidth) }, 300)
    return () => clearTimeout(id)
  }, [panelWidth])

  // Resize effect
  useResizeEffect(resizing, setPanelWidth, panelSide)

  const revertToken = (hex: string) => {
    if (!active) return; commitHex(hex)
  }

  const renderHistory = () => {
    const hist = tokenHistory[active] || []
    if (!hist.length) return null
    return (
      <div className="flex flex-col gap-1">
        <div className="text-[10px] font-medium opacity-70">Historique</div>
        <div className="flex flex-wrap gap-1">
          {hist.map(h => (
            <button key={h} onClick={()=>revertToken(h)} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${isDark?'border-neutral-700 hover:border-neutral-500':'border-neutral-300 hover:border-neutral-400'}`}>{h.replace('#','')}</button>
          ))}
        </div>
      </div>
    )
  }

  const renderPreviews = () => (
    <div className="grid grid-cols-2 gap-2 text-[10px]">
      {[
        { label: 'Light', bg: '#ffffff', fg: '#111111' },
        { label: 'Dark', bg: '#0b0b0c', fg: '#ffffff' }
      ].map(p => {
        const cr = contrastRatio(activeValue, p.bg).toFixed(2)
        return (
          <button key={p.label} onClick={()=>copy(activeValue)} className="flex flex-col gap-1 items-center group focus:outline-none">
            <div className="w-full h-12 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative overflow-hidden" style={{ background: p.bg }}>
              <div className="w-7 h-7 rounded shadow-inner border border-black/10" style={{ background: activeValue }} />
              <div className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-black/30 text-white opacity-0 group-hover:opacity-100 transition">{cr}:1</div>
            </div>
            <span className="opacity-60 group-hover:text-amber-400 transition">{p.label}</span>
          </button>
        )
      })}
    </div>
  )

  const renderSidePanel = () => (
    <>
      <div className={`px-2 sm:px-2 py-2 border-b flex items-center gap-1 sticky top-0 z-10 backdrop-blur-md ${isDark?'border-neutral-800 bg-neutral-950/70':'border-neutral-200 bg-white/70'}`}>
        {!panelCompact && (
          <span className="font-semibold text-xs truncate max-w-[120px]" title={active}>{active}</span>
        )}
        <button onClick={()=>setPanelCompact(c=>!c)} title={panelCompact?'Étendre':'Réduire'} className={`ml-auto w-7 h-7 flex items-center justify-center rounded text-[13px] ${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'}`}>{panelCompact?'›':'‹'}</button>
        <button onClick={()=>setPanelSide(s=>s==='right'?'left':'right')} title="Changer côté" className={`w-7 h-7 flex items-center justify-center rounded text-[13px] ${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'}`}>⇆</button>
      </div>
      {!panelCompact && (
        <div className="p-3 flex flex-col gap-4 overflow-auto text-xs flex-1 min-h-0">
          <div className="flex items-center gap-2">
            <input type="color" value={safeHex(activeValue)} onChange={e=>commitHex(e.target.value)} className="w-10 h-10 p-0 border rounded cursor-pointer bg-transparent" />
            <div className="flex flex-col gap-1 flex-1">
              <input value={hexInput} onChange={e=>onHexChange(e.target.value)} className={`px-2 py-1 rounded font-mono text-[11px] ${isDark?'bg-neutral-800 border border-neutral-700':'bg-neutral-100 border border-neutral-300'}`} />
              <div className="flex justify-between text-[10px] opacity-70">
                <span>Contrast bg</span><span className="tabular-nums">{ratioToBg.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {renderPreviews()}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button onClick={genVariants} className={`${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'} rounded px-2 py-1`}>Variants</button>
            <button onClick={autoContrast} className={`${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'} rounded px-2 py-1`}>AutoCtr</button>
            <button onClick={duplicate} className={`${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'} rounded px-2 py-1`}>Dupliquer</button>
            <button onClick={()=>addToken()} className={`${isDark?'bg-neutral-800 hover:bg-neutral-700':'bg-neutral-200 hover:bg-neutral-300'} rounded px-2 py-1`}>+ Token</button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium">Sandbox</span>
              <button onClick={()=>setSandboxActive?.(!sandboxActive)} className={`px-2 py-0.5 rounded border ${sandboxActive?'border-amber-500 text-amber-400':isDark?'border-neutral-700 hover:border-neutral-500':'border-neutral-300 hover:border-neutral-400'}`}>{sandboxActive?'Actif':'Off'}</button>
            </div>
            {sandboxActive && (
              <div className="flex gap-2">
                <button onClick={()=>applySandbox?.()} className="flex-1 px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-[11px]">Appliquer</button>
                <button onClick={()=>discardSandbox?.()} className="flex-1 px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[11px]">Annuler</button>
              </div>
            )}
          </div>
          {renderHistory()}
          <div className="text-[10px] opacity-60 leading-snug">
            <p>Double-clic: renommer. Variants auto: bouton Variants.</p>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
    <div className="flex flex-col h-full overflow-hidden">
      <div className={`p-3 border-b flex flex-wrap gap-2 items-center ${panelBg}`}>
        <input id="palette-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher token…" className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`} />
        <select value={groupFilter} onChange={e => setGroupFilter(e.target.value)} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-300'}`}>
          <option value="">Groupes: Tous</option>
          {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <HistoryBar />
      <div className="flex flex-1 min-h-0 relative">
        <div
          ref={listRef}
          className="flex-1 overflow-auto p-4 space-y-4"
          style={panelSide==='right' ? { marginRight: panelCompact ? 40 : panelWidth } : { marginLeft: panelCompact ? 40 : panelWidth }}
        >
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
    </div>
    {ReactDOM.createPortal(
      <div
        className={`fixed top-[var(--panel-offset,96px)] ${panelSide==='right'?'right-0':'left-0'} h-[calc(100vh-var(--panel-offset,96px))] flex flex-col shadow-lg ${panelSide==='right'?'border-l':'border-r'} ${isDark?'border-neutral-800 bg-neutral-950/70':'border-neutral-200 bg-white/80'} backdrop-blur-md transition-[width] duration-200`}
        style={{ width: panelCompact ? 40 : panelWidth, zIndex: 40 }}
      >
        {renderSidePanel()}
        {!panelCompact && (
          <div
            onMouseDown={(e)=>{ resizing.current = { startX: e.clientX, startW: panelWidth }; e.preventDefault(); }}
            className={`absolute top-0 ${panelSide==='right'?'left-0':'right-0'} w-1 cursor-ew-resize h-full opacity-0 hover:opacity-60 bg-amber-500/40`}
          />
        )}
      </div>,
      document.body
    )}
    </>
  );

// Helper hook
function useResizeEffect(resizingRef: React.MutableRefObject<any>, setPanelWidth: (w:number)=>void, side: 'left'|'right') {
  React.useEffect(()=>{
    const onMove = (e: MouseEvent) => {
      if (!resizingRef.current) return
      e.preventDefault()
      const { startX, startW } = resizingRef.current
      const delta = e.clientX - startX
      const raw = side === 'right' ? (startW - delta) : (startW + delta)
      const next = Math.min(420, Math.max(220, raw))
      setPanelWidth(next)
    }
    const onUp = () => { resizingRef.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [resizingRef, setPanelWidth, side])
}

// Since we need access to component state, define renderSidePanel as function inside component scope – patched earlier
};

export default PalettePanel;