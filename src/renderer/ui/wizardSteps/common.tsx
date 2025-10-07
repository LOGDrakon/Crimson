import React from 'react'

export interface StepHeaderProps { title: string; subtitle?: string }
export const StepHeader: React.FC<StepHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {subtitle && <p className="text-xs opacity-70 mt-1 leading-snug">{subtitle}</p>}
  </div>
)
