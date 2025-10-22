import { describe, it, expect } from 'vitest'
import { store } from '../../src/state/store.js'
import { auth } from '../../src/state/auth.js'

describe('store & auth', () => {
  it('toggles view', () => {
    store.setView('list')
    expect(store.getView()).toBe('list')
    store.setView('grid')
    expect(store.getView()).toBe('grid')
  })
  it('provides user from auth', () => {
    const u = store.getUser()
    expect(u && u.id).toBeTruthy()
    auth.setCurrentUser({ id: 'u2', roles: ['admin'] })
    expect(store.getUser().id).toBe('u2')
  })
})
