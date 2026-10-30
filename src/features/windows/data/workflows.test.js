import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { buildSync } from 'esbuild'
import { EDITION_TASKS } from './editionTasks.js'
import { TARGET_EDITIONS } from './editions.js'

const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL('../../../', import.meta.url))
// Exercise real event handlers and state across remounts without claiming DOM/WebGL coverage.
function renderer(relative, expose) {
  const file = path.join(root, relative)
  let source = fs.readFileSync(file, 'utf8')
  if (expose) source = expose(source)
  const code = buildSync({ stdin: { contents: source, resolveDir: path.dirname(file), loader: 'jsx' }, bundle: true, write: false, platform: 'node', format: 'cjs', jsx: 'automatic', define: { 'import.meta.env': '{}' }, external: ['react', 'react/jsx-runtime'] }).outputFiles[0].text
  let state = [], refs = [], index = 0, refIndex = 0
  const storage = new Map()
  const react = {
    useState(initial) { const slot = index++; if (!(slot in state)) state[slot] = typeof initial === 'function' ? initial() : initial; return [state[slot], (next) => { state[slot] = typeof next === 'function' ? next(state[slot]) : next }] },
    useRef(initial) { const slot = refIndex++; return refs[slot] ||= { current: initial } },
    useCallback: (fn) => fn, useEffect() {},
  }
  react.default = react
  const module = { exports: {} }
  vm.runInNewContext(code, { module, exports: module.exports, require: (name) => name === 'react' ? react : name === 'react/jsx-runtime' ? { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) } : require(name), sessionStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) }, Date, console, setTimeout: () => 0, clearTimeout() {}, window: {}, document: {} })
  return { render(name, props) { index = 0; refIndex = 0; return module.exports[name](props) }, remount() { state = []; refs = [] }, storage }
}

function windows() {
  return renderer('features/windows/pages/WindowsPractice.jsx', (source) => source.replace('  return <div className="windows-practice-shell">', '  return {mode,step,startedAt,progress,partitions,windowsPartitionId,partitionDialog,error,reset,goNext,openNewPartition,applyPartitionDialog,confirmSystemPartitionCreation,openExtendPartition,openDeletePartition,confirmPartitionPrompt,setStep,setProgress,setPartitionSize,setAccountPassword,setProductKey,accountPassword,productKey};\n  return <div className="windows-practice-shell">') + '\nexport {WindowsInstaller}')
}

test('practice mode stays locked on resume and reset; secrets are not stored', () => {
  const view = windows()
  const props = { targetEdition: 'Windows 10 Pro', initialMode: 'practice' }
  let page = view.render('WindowsInstaller', props)
  const startedAt = page.startedAt
  page.setStep(13); page.setProgress(40); page.setAccountPassword('not-persisted'); page.setProductKey('not-persisted')
  view.remount(); page = view.render('WindowsInstaller', props)
  assert.equal(page.step, 13); assert.equal(page.progress, 40); assert.equal(page.mode, 'practice')
  assert.equal(page.startedAt, startedAt)
  assert.equal(page.accountPassword, ''); assert.equal(page.productKey, '')
  page.reset(); page = view.render('WindowsInstaller', props)
  assert.equal(page.mode, 'practice'); assert.equal(page.step, 0)
})

test('partition regression: Extend preserves total size and deleted target cannot install', () => {
  const view = windows(), props = { targetEdition: 'Windows 10 Home', initialMode: 'learning' }
  let page
  const render = () => { page = view.render('WindowsInstaller', props) }
  render(); page.setStep(8); render(); page.openNewPartition(); render(); page.setPartitionSize('1524'); render()
  page.applyPartitionDialog(); render(); page.confirmSystemPartitionCreation(); render(); page.openExtendPartition(); render(); page.applyPartitionDialog(); render()
  assert.equal(page.partitionDialog, null)
  assert.equal(page.partitions.find((p) => p.id === page.windowsPartitionId).total, 32266)
  assert.equal(page.partitions.reduce((sum, p) => sum + p.total, 0), 32766)
  page.goNext(); render(); assert.equal(page.step, 13)
  page.setStep(12); render(); page.openDeletePartition(); render(); page.confirmPartitionPrompt(); render(); page.goNext(); render()
  assert.equal(page.step, 12); assert.ok(page.error)
})

test('quiz question, selected answer and score survive navigation/remount', () => {
  const view = renderer('features/quiz/pages/QuizPage.jsx', (source) => source.replace('  return <main className="learning-page"', '  return {topic,index,score,selected,requestId,questions,startTopic,answer,next};\n  return <main className="learning-page"'))
  const props = { type: 'pretest' }
  let page = view.render('QuizPage', props)
  page.startTopic('windows'); page = view.render('QuizPage', props)
  const requestId = page.requestId
  page.answer(page.questions[0].answer); page = view.render('QuizPage', props)
  assert.equal(page.score, 1); page.next()
  view.remount(); page = view.render('QuizPage', props)
  assert.equal(page.topic, 'windows'); assert.equal(page.index, 1); assert.equal(page.score, 1); assert.equal(page.selected, null)
  assert.equal(page.requestId, requestId)
})

test('assembly mistakes remain deducted after a correct installation', () => {
  const view = renderer('features/assembly/hooks/useAssemblyStore.js')
  let store = view.render('useAssemblyStore')
  const part = store.PARTS.find((p) => p.id === store.currentStep.partId)
  store.placePart(part.id, store.INSTALL_ZONES.find((z) => !z.accepts.includes(part.type)).id)
  store = view.render('useAssemblyStore')
  store.placePart(part.id, store.INSTALL_ZONES.find((z) => z.accepts.includes(part.type)).id)
  store = view.render('useAssemblyStore'); assert.equal(store.score, 95)
  store.useHint(); store = view.render('useAssemblyStore'); assert.equal(store.score, 93)
  store.reset(); store = view.render('useAssemblyStore'); assert.equal(store.score, 100)
})

test('every edition has a distinct assessed post-installation task', () => {
  assert.equal(new Set(Object.values(EDITION_TASKS).map((task) => task.question)).size, 4)
  for (const edition of TARGET_EDITIONS) {
    const task = EDITION_TASKS[edition]
    assert.ok(task.options[task.answer]); assert.equal(task.options.length, 3)
  }
})
