import React from 'react'
import { usePaletteStore } from '../store/paletteStore'
import { useNewProjectWizard } from '../store/newProjectWizardStore'
import { t } from './i18n'

export const ProjectPanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const setPalette = usePaletteStore((s) => s.setPalette)
  const undo = usePaletteStore((s) => s.undo)
  const redo = usePaletteStore((s) => s.redo)
  const openWizard = useNewProjectWizard(s => s.openWizard)

  const saveProject = async () => {
    await window.crimson.saveText({ defaultPath: 'crimson-project.json', content: JSON.stringify({ palette }, null, 2) })
  }
  const loadProject = async () => {
    const file = await window.crimson.openText()
    if (!file) return
    try {
      const data = JSON.parse(file.content)
      if (data.palette) setPalette(data.palette)
    } catch {}
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Projet</h2>
      <div className="flex gap-2 flex-wrap">
  <button className="btn btn-primary" onClick={openWizard}>{t('new_project')}</button>
        <button className="btn" onClick={saveProject}>Sauvegarder projet</button>
        <button className="btn" onClick={loadProject}>Charger projet</button>
        <button className="btn" onClick={undo}>Undo</button>
        <button className="btn" onClick={redo}>Redo</button>
      </div>
      <div className="bg-surface p-4 rounded border border-default">
        <div className="font-medium mb-2">Favoris (à venir)</div>
        <div className="text-muted">Enregistrez vos palettes favorites pour les réutiliser.</div>
      </div>
    </div>
  )
}
