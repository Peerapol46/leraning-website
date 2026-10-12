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
    console.error('เกิดข้อผิดพลาดในพื้นที่ 3 มิติ:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>เปิดพื้นที่ 3 มิติไม่ได้</h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>รายละเอียดข้อผิดพลาด:</p>
          <pre>{this.state.error?.message || String(this.state.error)}</pre>
          <button
            className="btn"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            ลองอีกครั้ง
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
