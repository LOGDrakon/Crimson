import React from 'react'

export const PreviewPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Prévisualisation</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface p-4 rounded border border-default">
          <button className="btn btn-primary">Bouton primaire</button>
        </div>
        <div className="bg-surface p-4 rounded border border-default">Carte</div>
        <div className="bg-surface p-4 rounded border border-default">Badge</div>
      </div>
    </div>
  )
}
