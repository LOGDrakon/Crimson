import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { Listbox } from './components/Listbox'

type Template = 'desktop' | 'mobile' | 'landing' | 'branding'

export const PreviewPanel: React.FC = () => {
  const [template, setTemplate] = React.useState<Template>('desktop')
  const [localTheme, setLocalTheme] = React.useState<'dark'|'light'>('dark')
  const palette = usePaletteStore(s => s.palette)
  return (
    <div className={`space-y-4 ${localTheme==='light'?'light':''}`}>
      <h2 className="text-lg font-semibold">Prévisualisation</h2>
      <div className="flex gap-2 items-center">
        <div className="min-w-[220px]">
          <Listbox
            options={[
              { value: 'desktop', label: 'UI Desktop' },
              { value: 'mobile', label: 'UI Mobile' },
              { value: 'landing', label: 'Web Landing Page' },
              { value: 'branding', label: 'Branding' },
            ]}
            value={template}
            onChange={(v) => setTemplate(v as Template)}
          />
        </div>
        <button className="btn" onClick={() => setLocalTheme(s => s==='dark'?'light':'dark')}>{localTheme==='dark'?'Mode clair':'Mode sombre'}</button>
      </div>
      <div className="card p-4">
        <div className="text-sm text-muted mb-2">Palette active</div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(palette).map(([k,v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded" style={{ background: v }} />
              <span className="text-xs">{k}</span>
            </div>
          ))}
        </div>
      </div>
      {template === 'desktop' && <DesktopTemplate />}
      {template === 'mobile' && <MobileTemplate />}
      {template === 'landing' && <LandingTemplate />}
      {template === 'branding' && <BrandingTemplate />}
    </div>
  )
}

const DesktopTemplate: React.FC = () => (
  <div className="grid grid-cols-3 gap-4">
    <div className="card p-4 space-y-3">
      <div className="text-sm text-muted">Boutons</div>
      <div className="flex gap-2">
        <button className="btn btn-primary">Primaire</button>
        <button className="btn">Secondaire</button>
      </div>
    </div>
  <div className="card p-4 space-y-3">
      <div className="text-sm text-muted">Formulaires</div>
      <input className="btn w-full" placeholder="Champ texte" />
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Checkbox
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Switch
      </label>
    </div>
  <div className="card p-4 space-y-3">
      <div className="text-sm text-muted">Card</div>
      <div className="border border-default rounded p-3">Contenu</div>
    </div>
  </div>
)

const MobileTemplate: React.FC = () => (
  <div className="max-w-xs card p-3 space-y-3">
    <div className="h-6 bg-background rounded" />
    <button className="btn btn-primary w-full">Call to action</button>
    <input className="btn w-full" placeholder="Search" />
  </div>
)

const LandingTemplate: React.FC = () => (
  <div className="space-y-4">
    <div className="card p-6">
      <div className="text-2xl font-bold mb-2">Crimson</div>
      <div className="text-muted mb-4">Générez votre identité visuelle</div>
      <button className="btn btn-primary">Commencer</button>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[1,2,3].map(i => <div key={i} className="h-24 card"></div>)}
    </div>
  </div>
)

const BrandingTemplate: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="card p-6">
      <div className="text-xl font-bold">LOGO</div>
      <div className="text-muted">Brand Kit</div>
    </div>
  <div className="card p-6">
      <div className="font-medium mb-2">Carte de visite</div>
      <div className="border border-default rounded p-4">
        <div className="text-lg font-bold">Crimson</div>
        <div className="text-muted">Design System</div>
      </div>
    </div>
  </div>
)
