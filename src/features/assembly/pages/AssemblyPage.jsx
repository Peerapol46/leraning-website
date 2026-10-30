import React from 'react'
import { ErrorBoundary } from '../../../components/common/ErrorBoundary'
import AssemblyPanel from '../components/AssemblyPanel'
import ComponentPanel from '../components/ComponentPanel'
import Scene from '../scene/Scene'

export default function AssemblyPage({ store }) {
  return (
    <div className="main-row">
      <aside className="panel panel-left">
        <AssemblyPanel store={store} />
      </aside>
      <main className="workspace">
        <ErrorBoundary>
          <div className="canvas-wrap">
            <Scene store={store} />
          </div>
        </ErrorBoundary>
      </main>
      <aside className="panel panel-right">
        <ComponentPanel store={store} />
      </aside>
    </div>
  )
}
