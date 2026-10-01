import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Workspace Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>Unable to load the 3D workspace.</h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Error:</p>
          <pre>{this.state.error?.message || String(this.state.error)}</pre>
          <button
            className="btn"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
