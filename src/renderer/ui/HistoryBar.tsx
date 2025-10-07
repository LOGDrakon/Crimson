import React from 'react'
import { usePaletteStore } from '../store/paletteStore'

interface SnapshotEntry {
  id: string
  palette: Record<string,string>
  timestamp: number
}

// Build a derived list: history (past states) + current state as last snapshot.
// We don't include future (redo) to keep UX simple.
export const HistoryBar: React.FC = () => {
  const history = usePaletteStore(s => s.history)
  const current = usePaletteStore(s => s.palette)
  const applySnapshot = usePaletteStore(s => (s as any).applySnapshot)
  const [snapshots, setSnapshots] = React.useState<SnapshotEntry[]>([])
  const [mountedAt] = React.useState(Date.now())

  // Recompute snapshots when history length or current palette changes reference
  React.useEffect(() => {
    const items: SnapshotEntry[] = []
    // Copy existing history palettes
    history.forEach((pal, idx) => {
      items.push({ id: 'h'+idx, palette: pal, timestamp: mountedAt + idx })
    })
    // Append current
    items.push({ id: 'current', palette: current, timestamp: Date.now() })
    // Limit to last 20
    const trimmed = items.slice(-20)
    setSnapshots(trimmed)
  }, [history, current, mountedAt])

  if (!snapshots.length) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="font-medium text-sm">Historique</div>
        <span className="text-[10px] text-muted">{snapshots.length} états</span>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1" role="list" aria-label="Historique palettes">
        {snapshots.map((s, i) => {
          const isCurrent = i === snapshots.length - 1
          const keys = Object.keys(s.palette).slice(0, 6)
          return (
            <button
              key={s.id}
              role="listitem"
              aria-label={`Snapshot ${i+1}${isCurrent?' (actuel)':''}`}
              title={isCurrent? 'État actuel' : 'Revenir à ce snapshot'}
              className={`relative group border rounded-md p-1 flex flex-col gap-1 min-w-[64px] outline-none focus:ring-2 focus:ring-primary/70 transition ${isCurrent? 'border-primary/70 bg-primary/10':'border-default/50 hover:border-primary/60 hover:bg-primary/5'}`}
              disabled={isCurrent}
              onClick={() => { if(!isCurrent) applySnapshot?.(s.palette) }}
            >
              <div className="grid grid-cols-3 gap-[2px] w-full h-full">
                {keys.map(k => (
                  <div key={k} className="w-5 h-5 rounded border border-black/10" style={{ background: s.palette[k] }} />
                ))}
                {keys.length < 6 && (
                  <div className="col-span-full text-[10px] text-muted text-center py-1">{s.palette.primary?.replace('#','')}</div>
                )}
              </div>
              {!isCurrent && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-surface border border-default rounded px-1 opacity-0 group-hover:opacity-100 transition">↩</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
