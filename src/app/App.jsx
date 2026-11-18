import React, { useEffect, lazy, Suspense } from 'react'
import TopNav from '../components/layout/TopNav.jsx'
import SiteFooter from '../components/layout/SiteFooter'
const AssemblyPage = lazy(() => import('../features/assembly/pages/AssemblyPage'))
import { useAssemblyStore } from '../features/assembly/hooks/useAssemblyStore.js'
import HomePage from '../features/home/pages/HomePage'
const QuizPage = lazy(() => import('../features/quiz/pages/QuizPage').then((module) => ({ default: module.QuizPage })))
const WindowsPractice = lazy(() => import('../features/windows/pages/WindowsPractice'))
import { saveQuizRecord } from '../services/googleSheets'
import { usePageNavigation } from './hooks/usePageNavigation.js'

export default function App() {
  const store = useAssemblyStore()
  const [activePage, navigate] = usePageNavigation()

  useEffect(() => {
    localStorage.removeItem('computer-assembly-student')
  }, [])

  useEffect(() => {
    store.setTimerRunning(activePage === 'assembly' && !store.assemblyComplete && store.hasStarted)
  }, [activePage, store.assemblyComplete, store.hasStarted])

  const handleQuizComplete = ({ requestId, testType, score, maxScore, student }) =>
    saveQuizRecord({
      requestId,
      testType,
      score,
      maxScore,
      // Keep the old Apps Script deployment compatible while recording the room value.
      student: { ...student, department: student.room },
    })

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'assembly':
        return <AssemblyPage store={store} />
      case 'windows':
        return <WindowsPractice />
      default:
        return <QuizPage key={activePage} type={activePage} onQuizComplete={handleQuizComplete} />
    }
  }

  return (
    <div className="app">
      <TopNav store={store} activePage={activePage} onNavigate={navigate} />
      <Suspense fallback={<main className="learning-page" role="status">กำลังโหลดบทเรียน…</main>}>{renderPage()}</Suspense>
      <SiteFooter onNavigate={navigate} />
    </div>
  )
}
