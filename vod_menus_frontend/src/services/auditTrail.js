import { audit } from '../state/audit.js'

/**
// PUBLIC_INTERFACE
export const auditTrail
/** AuditTrail logger for GxP events with error helpers. */
export const auditTrail = {
  log(ev) {
    const entry = {
      userId: ev.userId || 'unknown',
      isoTimestamp: ev.isoTimestamp || new Date().toISOString(),
      actionType: ev.actionType || 'READ',
      entity: ev.entity || 'UI',
      before: ev.before,
      after: ev.after,
      reason: ev.reason,
      details: ev.details,
    }
    audit.add(entry)
    return entry
  },
  error(ev) {
    const entry = {
      userId: ev.userId || 'unknown',
      isoTimestamp: ev.isoTimestamp || new Date().toISOString(),
      actionType: 'ERROR',
      entity: ev.entity || 'UI',
      error: ev.error,
    }
    audit.add(entry)
    return entry
  },
}
