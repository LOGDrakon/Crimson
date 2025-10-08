import React from 'react'

interface TooltipProps {
  label: string
  children: React.ReactElement
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

// Very small CSS-less tooltip using group hover + portal fallback soon if needed
export const Tooltip: React.FC<TooltipProps> = ({ label, children, side='top' }) => {
  return (
    <span className="relative inline-block group">
      {React.cloneElement(children, { 'data-has-tooltip': true })}
      <span
        role="tooltip"
        className={`pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px] px-2 py-1 rounded bg-neutral-900 text-white shadow-lg border border-neutral-700 absolute z-50 whitespace-pre max-w-xs break-words
          ${side==='top'?'bottom-full left-1/2 -translate-x-1/2 mb-1':''}
          ${side==='bottom'?'top-full left-1/2 -translate-x-1/2 mt-1':''}
          ${side==='left'?'right-full top-1/2 -translate-y-1/2 mr-1':''}
          ${side==='right'?'left-full top-1/2 -translate-y-1/2 ml-1':''}
        `}
      >{label}</span>
    </span>
  )
}

export default Tooltip
