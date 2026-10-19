import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import TopNav from './components/TopNav'
import AssemblyPanel from './components/AssemblyPanel'
import ComponentPanel from './components/ComponentPanel'
import Scene from './components/Scene'
import { useAssemblyStore } from './hooks/useAssemblyStore'
import { HomePage, LearningPage, WindowsPractice } from './components/LearningPages'
import { saveQuizRecord } from './services/googleSheets'

export default function App() {
  const store = useAssemblyStore()
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    localStorage.removeItem('computer-assembly-student')
  }, [])

  useEffect(() => {
    store.setTimerRunning(activePage === 'assembly' && !store.assemblyComplete && store.hasStarted)
  }, [activePage, store.assemblyComplete, store.hasStarted])

  const handleQuizComplete = ({ testType, topic, score, maxScore, student }) =>
    saveQuizRecord({
      testType,
      topic,
      score,
      maxScore,
      // Keep the old Apps Script deployment compatible while recording the room value.
      student: { ...student, department: student.room },
    })

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
      </div> : activePage === 'windows' ? <WindowsPractice /> : <LearningPage key={activePage} type={activePage} onQuizComplete={handleQuizComplete} />}
    </div>
  )
}
