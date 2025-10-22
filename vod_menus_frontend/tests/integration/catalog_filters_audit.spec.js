import { describe, it, expect, beforeEach } from 'vitest'
import Catalog from '../../src/pages/Catalog.js'
import { audit } from '../../src/state/audit.js'

describe('catalog filters & audit', () => {
  beforeEach(() => { audit.clear() })
  it('loads and logs read events', async () => {
    const c = Catalog.create()
    await c.loadInitial()
    await c.fetchItems()
    const evs = audit.getEvents()
    expect(evs.some(e => e.actionType === 'READ' && e.entity === 'Title')).toBe(true)
  })
})
