import React from 'react'

export type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const Listbox: React.FC<Props> = ({ options, value, onChange, placeholder = 'Sélectionner…', className }) => {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const listRef = React.useRef<HTMLUListElement | null>(null)
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)

  const selected = options.find(o => o.value === value)

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return
      if (btnRef.current?.contains(e.target as Node)) return
      if (listRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const toggle = () => setOpen(o => !o)
  const close = () => setOpen(false)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); setOpen(true); setActiveIndex(Math.max(0, options.findIndex(o => o.value === value)))
      }
      return
    }
    if (e.key === 'Escape') { e.preventDefault(); close(); btnRef.current?.focus(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(options.length - 1, i + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(0, i - 1)) }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const opt = options[activeIndex]
      if (opt) { onChange(opt.value); close(); btnRef.current?.focus() }
    }
  }

  return (
    <div className={`listbox relative ${className || ''}`} onKeyDown={onKeyDown}>
      <button ref={btnRef} type="button" className="btn w-full justify-between" onClick={toggle} aria-haspopup="listbox" aria-expanded={open}>
        <span>{selected ? selected.label : placeholder}</span>
        <span aria-hidden>▾</span>
      </button>
      {open && (
        <ul ref={listRef} role="listbox" className="listbox-options card absolute z-50 mt-1 w-full max-h-60 overflow-auto">
          {options.map((o, idx) => {
            const selected = o.value === value
            const active = idx === activeIndex
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={selected}
                className={`listbox-option px-3 py-2 cursor-pointer flex items-center gap-2 ${selected ? 'selected' : ''} ${active ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => { onChange(o.value); close() }}
              >
                {selected ? '✓' : ''}
                <span>{o.label}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
