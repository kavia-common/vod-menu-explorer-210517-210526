import { describe, it, expect } from 'vitest'
import Catalog from '../../src/pages/Catalog.js'

describe('view toggle', () => {
  it('switches between grid and list', () => {
    const c = Catalog.create()
    const before = c.view
    c.toggleView()
    expect(c.view).not.toBe(before)
  })
})
