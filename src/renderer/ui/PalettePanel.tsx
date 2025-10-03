import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { extractTopColors } from '../utils/imagePalette'
import { converter, parse, formatHex } from 'culori'
import { Listbox } from './components/Listbox'

export const PalettePanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const setToken = usePaletteStore((s) => s.setToken)
  const addToken = usePaletteStore((s) => s.addToken)
  const removeToken = usePaletteStore((s) => s.removeToken)
  const [active, setActive] = React.useState<string>('primary')
  const groups = usePaletteStore((s) => s.groups)
  const tokenGroups = usePaletteStore((s) => s.tokenGroups)
  const addGroup = usePaletteStore((s) => s.addGroup)
  const renameGroup = usePaletteStore((s) => s.renameGroup)
  const assignTokenToGroup = usePaletteStore((s) => s.assignTokenToGroup)
  const renameToken = usePaletteStore((s) => s.renameToken)
  const removeGroup = usePaletteStore((s) => s.removeGroup)
  const imageDataUrl = usePaletteStore((s) => s.imageDataUrl)
  const setImageDataUrl = usePaletteStore((s) => s.setImageDataUrl)
  const [pipette, setPipette] = React.useState<boolean>(false)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const generate = usePaletteStore((s) => s.generateHarmony)
  const [groupFilter, setGroupFilter] = React.useState<string>('')
  const [hexInput, setHexInput] = React.useState<string>(palette[active] || '')
  const recommendFor = usePaletteStore(s => (s as any).recommendFor?.bind(null))
  const applyRecommendation = usePaletteStore(s => (s as any).applyRecommendation)

  React.useEffect(() => {
    setHexInput(palette[active] || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, palette[active]])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Génération & édition de palettes</h2>
      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-4 card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">Couleurs</div>
            <button className="btn" onClick={() => addToken()}>➕ Ajouter couleur</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Filtrer par groupe:</span>
            <select className="btn flex-1" value={groupFilter} onChange={e=>setGroupFilter(e.target.value)}>
              <option value="">Tous</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <ul className="space-y-2 max-h-[50vh] overflow-auto">
            {Object.entries(palette)
              .filter(([name]) => groupFilter ? (tokenGroups[name] === groupFilter) : true)
              .map(([name, hex]) => (
              <li key={name} className={`flex items-center gap-2 p-2 rounded border border-default/60 hover:border-default transition-colors ${active===name?'ring-1 ring-[rgb(var(--color-primary))] bg-background/40':''}`}>
                <button className="w-6 h-6 rounded" style={{ background: hex }} onClick={() => setActive(name)} title={name} />
                <span className="flex-1 cursor-pointer" onClick={() => setActive(name)}>{name}</span>
                <input type="color" value={hex} onChange={(e) => setToken(name, e.target.value)} />
                {!["primary","secondary","accent","background","surface","text","border","success","danger","warning","info"].includes(name) && (
                  <button className="btn" onClick={() => removeToken(name)}>🗑️ Supprimer</button>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Groupes</div>
              <button className="btn" onClick={() => addGroup('Nouveau groupe')}>🗂️ Ajouter groupe</button>
            </div>
            <ul className="space-y-1">
              {groups.map(g => (
                <li key={g.id} className="flex items-center gap-2">
                  <input className="flex-1 bg-transparent border border-default rounded px-2 py-1" value={g.name} onChange={e => renameGroup(g.id, e.target.value)} />
                  <span className="text-xs text-muted">{Object.values(tokenGroups).filter(id => id===g.id).length} couleurs</span>
                  {g.id !== 'core' && (
                    <button className="btn" title="Supprimer le groupe" onClick={() => {
                      // remove assignments
                      Object.entries(tokenGroups).forEach(([t, gid]) => { if (gid === g.id) assignTokenToGroup(t, null) })
                      // remove group (local state helper)
                      // @ts-ignore simple state update
                      removeGroup(g.id)
                    }}>🗑️ Supprimer</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="col-span-8 card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="font-medium w-32">Éditeur</div>
            <button className={`btn ${pipette?'btn-primary':''}`} onClick={() => setPipette(p => !p)} title="Pipette image">🎯 Pipette</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="btn" onClick={() => generate('complementary', palette.primary)}>Complémentaire</button>
            <button className="btn" onClick={() => generate('analogous', palette.primary)}>Analogue</button>
            <button className="btn" onClick={() => generate('triadic', palette.primary)}>Triadique</button>
            <button className="btn" onClick={() => generate('tetradic', palette.primary)}>Tétradique</button>
            <button className="btn" onClick={() => generate('monochrome', palette.primary)}>Monochrome</button>
          </div>
          <p className="text-muted">Sélectionnez une harmonie pour générer les autres tokens à partir de la couleur active.</p>
          <div className="h-px bg-[rgb(var(--color-border))]" />
          <div className="space-y-2">
            <div className="font-medium">Token actif</div>
            <div className="grid grid-cols-2 gap-2 max-w-xl">
              <label className="col-span-1 flex items-center gap-2">
                <span className="w-24">Nom</span>
                <input className="flex-1 bg-transparent border border-default rounded px-2 py-1" value={active}
                  onChange={(e) => {
                    const newName = e.target.value
                    if (!newName) return
                    renameToken(active, newName)
                    setActive(newName)
                  }} />
              </label>
              <label className="col-span-1 flex items-center gap-2">
                <span className="w-24">HEX</span>
                <input
                  className="flex-1 bg-transparent border border-default rounded px-2 py-1"
                  value={hexInput}
                  onChange={(e) => {
                    const val = e.target.value
                    setHexInput(val)
                    const short = /^#?[0-9a-fA-F]{3}$/
                    const long = /^#?[0-9a-fA-F]{6}$/
                    if (short.test(val) || long.test(val)) {
                      const v = val.startsWith('#') ? val : `#${val}`
                      setToken(active, v)
                    }
                  }}
                  onBlur={() => setHexInput(palette[active] || '')}
                  placeholder="#RRGGBB"
                />
              </label>
              <label className="col-span-1 flex items-center gap-2">
                <span className="w-24">Groupe</span>
                <div className="flex-1">
                  <Listbox
                    options={[{ label: '(Aucun)', value: '' }, ...groups.map(g => ({ label: g.name, value: g.id }))]}
                    value={tokenGroups[active] || ''}
                    onChange={(val) => assignTokenToGroup(active, val || null)}
                  />
                </div>
              </label>
              <div className="col-span-2">
                <div className="text-sm text-muted mb-1">Recommandations</div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn" onClick={() => applyRecommendation?.(active)}>Auto</button>
                  {(recommendFor ? recommendFor(active) : []).map((r: any) => (
                    <button key={r.label}
                      className="btn"
                      title={r.label}
                      onClick={() => applyRecommendation?.(active, r.value)}>
                      <span className="inline-block w-4 h-4 rounded" style={{ background: r.value }} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="h-px bg-[rgb(var(--color-border))]" />
          <div className="space-y-2">
            <div className="font-medium">Extraction depuis image</div>
            <div className="flex gap-2 flex-wrap">
              <button className="btn" onClick={async () => {
                const img = await window.crimson.openImage()
                if (!img) return
                setImageDataUrl(img.dataUrl)
                const cols = await extractTopColors(img.dataUrl, 5)
                if (cols[0]) setToken('primary', cols[0])
                if (cols[1]) setToken('secondary', cols[1])
                if (cols[2]) setToken('accent', cols[2])
              }}>🖼️ Ouvrir une image…</button>
              <button className="btn" onClick={async () => {
                const file = await window.crimson.openText()
                if (!file) return
                try {
                  const json = JSON.parse(file.content)
                  for (const [k,v] of Object.entries(json)) setToken(k, v as string)
                } catch {}
              }}>📥 Importer JSON…</button>
            </div>
            <div
              className="mt-2 border-2 border-dashed border-default rounded p-4 text-center text-sm text-muted"
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy' }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files && e.dataTransfer.files[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = async () => {
                  const url = reader.result as string
                  setImageDataUrl(url)
                  const cols = await extractTopColors(url, 5)
                  if (cols[0]) setToken('primary', cols[0])
                  if (cols[1]) setToken('secondary', cols[1])
                  if (cols[2]) setToken('accent', cols[2])
                }
                reader.readAsDataURL(file)
              }}
            >
              Glissez-déposez une image ici pour extraire une palette
            </div>
            {imageDataUrl && (
              <div className="mt-3">
                <div className="text-sm mb-1">Aperçu image {pipette ? '(pipette active: cliquez pour prélever)' : ''}</div>
                <img
                  ref={imgRef}
                  src={imageDataUrl}
                  alt="preview"
                  className={`max-h-64 rounded border border-default ${pipette?'cursor-crosshair':''}`}
                  onClick={(e) => {
                    if (!pipette || !imgRef.current) return
                    const rect = imgRef.current.getBoundingClientRect()
                    const xRel = (e.clientX - rect.left) / rect.width
                    const yRel = (e.clientY - rect.top) / rect.height
                    const cvs = document.createElement('canvas')
                    const iw = imgRef.current.naturalWidth
                    const ih = imgRef.current.naturalHeight
                    cvs.width = iw; cvs.height = ih
                    const ctx = cvs.getContext('2d')!
                    ctx.drawImage(imgRef.current, 0, 0, iw, ih)
                    const x = Math.min(iw-1, Math.max(0, Math.round(xRel * iw)))
                    const y = Math.min(ih-1, Math.max(0, Math.round(yRel * ih)))
                    const { data } = ctx.getImageData(x, y, 1, 1)
                    const hex = rgbToHex(data[0], data[1], data[2])
                    setToken(active, hex)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}
