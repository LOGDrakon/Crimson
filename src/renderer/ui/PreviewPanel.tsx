import React from 'react'

type Template = 'desktop' | 'mobile' | 'landing' | 'branding'

export const PreviewPanel: React.FC = () => {
  const [template, setTemplate] = React.useState<Template>('desktop')
  const [localTheme, setLocalTheme] = React.useState<'dark'|'light'>('dark')
  return (
    <div className={`space-y-4 ${localTheme==='light'?'light':''}`}>
      <h2 className="text-lg font-semibold">Prévisualisation</h2>
      <div className="flex gap-2 items-center">
        <select className="btn" value={template} onChange={e => setTemplate(e.target.value as Template)}>
          <option value="desktop">UI Desktop</option>
          <option value="mobile">UI Mobile</option>
          <option value="landing">Web Landing Page</option>
          <option value="branding">Branding</option>
        </select>
        <button className="btn" onClick={() => setLocalTheme(s => s==='dark'?'light':'dark')}>{localTheme==='dark'?'Mode clair':'Mode sombre'}</button>
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
    <div className="bg-surface p-4 rounded border border-default space-y-3">
      <div className="text-sm text-muted">Boutons</div>
      <div className="flex gap-2">
        <button className="btn btn-primary">Primaire</button>
        <button className="btn">Secondaire</button>
      </div>
    </div>
    <div className="bg-surface p-4 rounded border border-default space-y-3">
      <div className="text-sm text-muted">Formulaires</div>
      <input className="btn w-full" placeholder="Champ texte" />
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Checkbox
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Switch
      </label>
    </div>
    <div className="bg-surface p-4 rounded border border-default space-y-3">
      <div className="text-sm text-muted">Card</div>
      <div className="border border-default rounded p-3">Contenu</div>
    </div>
  </div>
)

const MobileTemplate: React.FC = () => (
  <div className="max-w-xs border border-default rounded p-3 bg-surface space-y-3">
    <div className="h-6 bg-background rounded" />
    <button className="btn btn-primary w-full">Call to action</button>
    <input className="btn w-full" placeholder="Search" />
  </div>
)

const LandingTemplate: React.FC = () => (
  <div className="space-y-4">
    <div className="p-6 rounded bg-surface border border-default">
      <div className="text-2xl font-bold mb-2">Crimson</div>
      <div className="text-muted mb-4">Générez votre identité visuelle</div>
      <button className="btn btn-primary">Commencer</button>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[1,2,3].map(i => <div key={i} className="h-24 bg-surface rounded border border-default"></div>)}
    </div>
  </div>
)

const BrandingTemplate: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-surface p-6 rounded border border-default">
      <div className="text-xl font-bold">LOGO</div>
      <div className="text-muted">Brand Kit</div>
    </div>
    <div className="bg-surface p-6 rounded border border-default">
      <div className="font-medium mb-2">Carte de visite</div>
      <div className="border border-default rounded p-4">
        <div className="text-lg font-bold">Crimson</div>
        <div className="text-muted">Design System</div>
      </div>
    </div>
  </div>
)
