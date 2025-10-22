# GxP Controls

This frontend implements controls aligned to ALCOA+ and project requirements:

- Audit Trail
  - Attributable: Captures userId from auth context.
  - Contemporaneous: Uses ISO 8601 timestamps when events occur.
  - Complete/Consistent: Includes actionType, entity, optional before/after, reason, and error details.
  - Enduring: Held in memory here; in production integrate with persistent store.
- Electronic Signature (Scaffold)
  - Provides a button and emits an event with artifact `{ intent, bindTo }`. In production, present credential prompt and server binding.
- Validation Controls
  - Centralized validation service with typed checks (string, number, object, params).
- Error Handling
  - Friendly Alert messages for UI, with complete technical logs to auditTrail.error.
- Access Controls
  - Role-based guard ensureRole(['admin']) to restrict administrative actions.

ALCOA+ Mapping:
- Attributable: `auditTrail.log/error` include `userId`.
- Legible: Code documented and structured; docs included.
- Contemporaneous: ISO timestamp at event creation.
- Original/Accurate: Use validation and before/after where applicable.
- Complete/Consistent: Rich event schema.
- Enduring/Available: Provide subscription mechanism; production persistence recommended.

Operations logged:
- READ: Listing, search queries.
- UPDATE: Preference changes (view).
- DELETE: Admin title removal (simulated).
- ERROR: Technical errors captured.
