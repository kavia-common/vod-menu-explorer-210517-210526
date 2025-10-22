import { describe, it, expect } from 'vitest'
import App from '../../src/App.js'

describe('navigation', () => {
  it('app defines routes', () => {
    expect(Array.isArray(App.routes)).toBe(true)
    const paths = App.routes.map(r => r.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/catalog')
    expect(paths).toContain('/search')
  })
})
