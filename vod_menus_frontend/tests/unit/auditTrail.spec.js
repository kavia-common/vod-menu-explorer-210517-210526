import { describe, it, expect, beforeEach } from 'vitest'
import { auditTrail } from '../../src/services/auditTrail.js'
import { audit } from '../../src/state/audit.js'

describe('auditTrail', () => {
  beforeEach(() => { audit.clear() })
  it('logs standard event', () => {
    const ev = auditTrail.log({ userId: 'u1', actionType: 'READ', entity: 'Title' })
    const items = audit.getEvents()
    expect(items.length).toBe(1)
    expect(items[0].userId).toBe('u1')
    expect(ev.entity).toBe('Title')
  })
  it('logs errors', () => {
    auditTrail.error({ userId: 'u2', entity: 'UI', error: { message: 'x' } })
    const items = audit.getEvents()
    expect(items[0].actionType).toBe('ERROR')
  })
})
