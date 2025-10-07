import React from 'react'

interface ErrorBoundaryState { error: Error | null, info: React.ErrorInfo | null }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, info: null }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ error, info })
    // Optionally could log to a persistence layer later.
    // For now rely on console for diagnostics.
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  handleReset = () => {
    // naive reset: reload the window so we rehydrate from store
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-sm flex flex-col gap-4 items-start">
          <h2 className="text-lg font-semibold text-red-500">Une erreur est survenue</h2>
          <p className="opacity-80">Le rendu de la vue a échoué. Vous pouvez recharger l'application. L'historique de palette est conservé via le store.</p>
          <pre className="max-h-40 overflow-auto w-full bg-black/30 p-2 rounded text-red-300 text-[11px] whitespace-pre-wrap">
            {this.state.error?.message}\n{this.state.info?.componentStack}
          </pre>
          <div className="flex gap-2">
            <button onClick={this.handleReset} className="btn btn-primary">Recharger</button>
          </div>
        </div>
      )
    }
    return this.props.children as any
  }
}

export default ErrorBoundary
