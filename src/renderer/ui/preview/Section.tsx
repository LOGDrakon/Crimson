import React from 'react'

export const Section: React.FC<{ title: string; description?: string; children: React.ReactNode; right?: React.ReactNode }>=({ title, description, children, right }) => {
  return (
    <section className="space-y-2">
      <div className="flex items-start gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-[rgb(var(--color-foreground))]/90">{title}</h3>
          {description && <p className="text-xs text-muted mt-0.5 max-w-prose leading-snug">{description}</p>}
        </div>
        {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
      </div>
      <div className="rounded-lg border border-default/60 bg-surface/40 p-4 backdrop-blur-sm shadow-inner">
        {children}
      </div>
    </section>
  )
}
