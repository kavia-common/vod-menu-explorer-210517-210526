import { describe, it, expect } from 'vitest'
import { ensureRole, AccessDenied } from '../../src/services/accessControl.js'

describe('accessControl', () => {
  it('allows when role present', () => {
    expect(ensureRole(['admin'], { roles: ['admin'] })).toBe(true)
  })
  it('denies when missing role', () => {
    expect(() => ensureRole(['admin'], { roles: ['user'] })).toThrow(AccessDenied)
  })
})
