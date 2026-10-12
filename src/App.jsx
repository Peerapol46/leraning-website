import React, { useState } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import TopNav from './components/TopNav'
import AssemblyPanel from './components/AssemblyPanel'
import ComponentPanel from './components/ComponentPanel'
import Scene from './components/Scene'
import { useAssemblyStore } from './hooks/useAssemblyStore'
import { HomePage, LearningPage, WindowsPractice } from './components/LearningPages'

export default function App() {
  const store = useAssemblyStore()
  const [activePage, setActivePage] = useState('home')

  return (
    <div className="app">
      <TopNav store={store} activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'home' ? <HomePage onNavigate={setActivePage} /> : activePage === 'assembly' ? <div className="main-row">
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
      </div> : activePage === 'windows' ? <WindowsPractice /> : <LearningPage key={activePage} type={activePage} />}
    </div>
  )
}
