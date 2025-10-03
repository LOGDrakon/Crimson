import React from 'react'
import { usePaletteStore } from '../store/paletteStore'

function badge(ok: boolean) {
  return <span className={`ml-2 text-xs px-2 py-0.5 rounded ${ok ? 'bg-green-600' : 'bg-red-600'}`}>{ok ? 'OK' : 'NOK'}</span>
}

export const A11yPanel: React.FC = () => {
  const palette = usePaletteStore((s) => s.palette)
  const contrastToBg = usePaletteStore((s) => s.contrastToBackground)

  const items = [
    { label: 'Texte', color: palette.text },
    { label: 'Primaire', color: palette.primary },
    { label: 'Secondaire', color: palette.secondary },
    { label: 'Accent', color: palette.accent },
  ].map(x => ({ ...x, ratio: Number(contrastToBg(x.color).toFixed(2)) }))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accessibilité</h2>
      <table className="min-w-[400px]">
        <thead>
          <tr className="text-left"><th>Token</th><th>Couleur</th><th>Ratio</th><th>AA</th><th>AAA</th></tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const AA = it.ratio >= 4.5
            const AAA = it.ratio >= 7
            return (
              <tr key={it.label}>
                <td className="py-2">{it.label}</td>
                <td><span className="inline-block w-6 h-6 rounded" style={{ background: it.color }} /></td>
                <td>{it.ratio}:1</td>
                <td>{badge(AA)}</td>
                <td>{badge(AAA)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
