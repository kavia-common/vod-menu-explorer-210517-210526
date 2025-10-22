import { describe, it, expect } from 'vitest'
import Catalog from '../../src/pages/Catalog.js'
import { auth } from '../../src/state/auth.js'

describe('details modal access', () => {
  it('denies delete for non-admin', async () => {
    const c = Catalog.create()
    c.selected = { id: 't1', title: 'Title 1' }
    c.showDetails = true
    auth.setCurrentUser({ id: 'u1', roles: ['user'] })
    c.onDetailsEvent({ type: 'delete' })
    expect(c.alert?.type).toBe('error')
  })
})
