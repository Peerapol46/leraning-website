import assert from 'node:assert/strict'
import test from 'node:test'
import { navigateToPage, pageFromPath } from './usePageNavigation.js'

test('direct links and reloads resolve every supported page', () => {
  for (const page of ['assembly', 'windows', 'pretest', 'posttest']) {
    assert.equal(pageFromPath(`/${page}`), page)
    assert.equal(pageFromPath(`/${page}/`), page)
  }
  assert.equal(pageFromPath('/'), 'home')
  assert.equal(pageFromPath('/unknown'), 'home')
  assert.equal(pageFromPath('/lab/windows', '/lab/'), 'windows')
  assert.equal(pageFromPath('/lab', '/lab/'), 'home')
  assert.equal(pageFromPath('/other/windows', '/lab/'), 'home')
})

test('each page change creates history; repeated menu clicks do not', () => {
  const entries = ['/']
  const browser = {
    location: { pathname: '/', search: '?class=2' },
    history: {
      pushState(state, title, url) {
        entries.push(url)
        browser.location.pathname = new URL(url, 'https://example.test').pathname
      },
    },
  }
  navigateToPage('assembly', browser)
  navigateToPage('assembly', browser)
  navigateToPage('windows', browser)
  assert.deepEqual(entries, ['/', '/assembly?class=2', '/windows?class=2'])
  // The previous entries can be resolved after browser Back and Forward.
  assert.equal(pageFromPath(new URL(entries[1], 'https://example.test').pathname), 'assembly')
  assert.equal(pageFromPath(new URL(entries[0], 'https://example.test').pathname), 'home')
  assert.equal(navigateToPage('invalid', browser), false)
  assert.equal(entries.length, 3)
})

test('navigation respects a subdirectory deployment and home URL', () => {
  const urls = []
  const browser = {
    location: { pathname: '/lab/assembly', search: '' },
    history: { pushState: (state, title, url) => urls.push(url) },
  }
  navigateToPage('windows', browser, '/lab/')
  navigateToPage('home', browser, '/lab/')
  assert.deepEqual(urls, ['/lab/windows', '/lab/'])
})
