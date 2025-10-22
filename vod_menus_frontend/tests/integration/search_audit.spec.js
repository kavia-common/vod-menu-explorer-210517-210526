import { describe, it, expect, beforeEach } from 'vitest'
import Search from '../../src/pages/Search.js'
import { audit } from '../../src/state/audit.js'

describe('search audit', () => {
  beforeEach(() => { audit.clear() })
  it('logs search read event', async () => {
    const s = Search.create()
    s.query = 'Title'
    await s.executeSearch()
    const evs = audit.getEvents()
    expect(evs.some(e => e.entity === 'Search' && e.actionType === 'READ')).toBe(true)
  })
})
