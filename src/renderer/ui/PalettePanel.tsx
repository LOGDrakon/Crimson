import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { extractTopColors } from '../utils/imagePalette'
import { converter, parse, formatHex } from 'culori'

export const PalettePanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const setToken = usePaletteStore((s) => s.setToken)
  const addToken = usePaletteStore((s) => s.addToken)
  const removeToken = usePaletteStore((s) => s.removeToken)
  const [active, setActive] = React.useState<string>('primary')
  const [imageDataUrl, setImageDataUrl] = React.useState<string | null>(null)
  const [pipette, setPipette] = React.useState<boolean>(false)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const generate = usePaletteStore((s) => s.generateHarmony)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Génération & édition de palettes</h2>
      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-4 bg-surface p-4 rounded border border-default space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">Couleurs</div>
            <button className="btn" onClick={() => addToken()}>Ajouter couleur</button>
          </div>
          <ul className="space-y-2">
            {Object.entries(palette).map(([name, hex]) => (
              <li key={name} className={`flex items-center gap-2 p-2 rounded border border-default hover:bg-background ${active===name?'ring-1 ring-[rgb(var(--color-primary))]':''}`}>
                <button className="w-6 h-6 rounded" style={{ background: hex }} onClick={() => setActive(name)} title={name} />
                <span className="flex-1 cursor-pointer" onClick={() => setActive(name)}>{name}</span>
                <input type="color" value={hex} onChange={(e) => setToken(name, e.target.value)} />
                {!["primary","secondary","accent","background","surface","text","border","success","danger","warning","info"].includes(name) && (
                  <button className="btn" onClick={() => removeToken(name)}>Supprimer</button>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-8 bg-surface p-4 rounded border border-default space-y-3">
          <div className="flex items-center gap-2">
            <div className="font-medium w-32">Éditeur</div>
            <select className="btn" onChange={(e)=>generate(e.target.value as any, palette[active] || palette.primary)}>
              <option value="complementary">Complémentaire</option>
              <option value="analogous">Analogue</option>
              <option value="triadic">Triadique</option>
              <option value="tetradic">Tétradique</option>
              <option value="monochrome">Monochrome</option>
            </select>
            <button className={`btn ${pipette?'btn-primary':''}`} onClick={() => setPipette(p => !p)} title="Pipette image">🎯 Pipette</button>
            <input className="btn" value={palette[active] || ''} onChange={(e)=>setToken(active, e.target.value)} />
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
            <div className="font-medium">Ajustements (token actif): HSL / HSV / LAB</div>
            <HslSliders hex={palette[active] || palette.primary} onChange={(hex) => setToken(active, hex)} />
            <HsvSliders hex={palette[active] || palette.primary} onChange={(hex) => setToken(active, hex)} />
            <LabSliders hex={palette[active] || palette.primary} onChange={(hex) => setToken(active, hex)} />
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
              }}>Ouvrir une image…</button>
              <button className="btn" onClick={async () => {
                const file = await window.crimson.openText()
                if (!file) return
                try {
                  const json = JSON.parse(file.content)
                  for (const [k,v] of Object.entries(json)) setToken(k, v as string)
                } catch {}
              }}>Importer JSON…</button>
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

const toHsl = converter('hsl')
const fromHsl = converter('rgb')
function HslSliders({ hex, onChange }: { hex: string, onChange: (hex: string) => void }) {
  const c = parse(hex)
  const hsl = toHsl(c || hex) as any
  const update = (k: 'h'|'s'|'l', v: number) => {
    const next = { ...hsl, [k]: v }
    onChange(formatHex(fromHsl(next)) || hex)
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="w-10">H</label>
        <input type="range" min={0} max={360} value={Math.round(hsl.h || 0)} onChange={e => update('h', parseInt(e.target.value))} className="w-full" />
        <span className="w-10 text-right">{Math.round(hsl.h || 0)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">S</label>
        <input type="range" min={0} max={100} value={Math.round((hsl.s || 0)*100)} onChange={e => update('s', parseInt(e.target.value)/100)} className="w-full" />
        <span className="w-10 text-right">{Math.round((hsl.s || 0)*100)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">L</label>
        <input type="range" min={0} max={100} value={Math.round((hsl.l || 0)*100)} onChange={e => update('l', parseInt(e.target.value)/100)} className="w-full" />
        <span className="w-10 text-right">{Math.round((hsl.l || 0)*100)}</span>
      </div>
    </div>
  )
}

const toHsv = converter('hsv')
const fromHsv = converter('rgb')
function HsvSliders({ hex, onChange }: { hex: string, onChange: (hex: string) => void }) {
  const c = parse(hex)
  const hsv = toHsv(c || hex) as any
  const update = (k: 'h'|'s'|'v', v: number) => {
    const next = { ...hsv, [k]: v }
    onChange(formatHex(fromHsv(next)) || hex)
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="w-10">H</label>
        <input type="range" min={0} max={360} value={Math.round(hsv.h || 0)} onChange={e => update('h', parseInt(e.target.value))} className="w-full" />
        <span className="w-10 text-right">{Math.round(hsv.h || 0)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">S</label>
        <input type="range" min={0} max={100} value={Math.round((hsv.s || 0)*100)} onChange={e => update('s', parseInt(e.target.value)/100)} className="w-full" />
        <span className="w-10 text-right">{Math.round((hsv.s || 0)*100)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">V</label>
        <input type="range" min={0} max={100} value={Math.round((hsv.v || 0)*100)} onChange={e => update('v', parseInt(e.target.value)/100)} className="w-full" />
        <span className="w-10 text-right">{Math.round((hsv.v || 0)*100)}</span>
      </div>
    </div>
  )
}

const toLab = converter('lab')
const fromLab = converter('rgb')
function LabSliders({ hex, onChange }: { hex: string, onChange: (hex: string) => void }) {
  const c = parse(hex)
  const lab = toLab(c || hex) as any
  const update = (k: 'l'|'a'|'b', v: number) => {
    const next = { ...lab, [k]: v }
    onChange(formatHex(fromLab(next)) || hex)
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="w-10">L</label>
        <input type="range" min={0} max={100} value={Math.round(lab.l || 0)} onChange={e => update('l', parseInt(e.target.value))} className="w-full" />
        <span className="w-10 text-right">{Math.round(lab.l || 0)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">a</label>
        <input type="range" min={-150} max={150} value={Math.round(lab.a || 0)} onChange={e => update('a', parseInt(e.target.value))} className="w-full" />
        <span className="w-10 text-right">{Math.round(lab.a || 0)}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-10">b</label>
        <input type="range" min={-150} max={150} value={Math.round(lab.b || 0)} onChange={e => update('b', parseInt(e.target.value))} className="w-full" />
        <span className="w-10 text-right">{Math.round(lab.b || 0)}</span>
      </div>
    </div>
  )
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}
