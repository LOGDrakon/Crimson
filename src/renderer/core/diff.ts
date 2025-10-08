export interface PaletteDiff { added: string[]; removed: string[]; changed: string[] }

export function comparePalettes(base: Record<string,string>, draft: Record<string,string>): PaletteDiff {
  const added: string[] = []
  const removed: string[] = []
  const changed: string[] = []
  const baseKeys = new Set(Object.keys(base))
  const draftKeys = new Set(Object.keys(draft))
  for (const k of draftKeys) {
    if (!baseKeys.has(k)) { added.push(k); continue }
    if (base[k] !== draft[k]) changed.push(k)
  }
  for (const k of baseKeys) if (!draftKeys.has(k)) removed.push(k)
  return { added, removed, changed }
}
