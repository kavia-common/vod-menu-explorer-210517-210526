let events = []
let subs = []

/**
// PUBLIC_INTERFACE
export const audit
/** In-memory audit event buffer with subscription. */
export const audit = {
  add(ev) { events.push({ id: String(Date.now()) + Math.random(), ...ev }) ; subs.forEach(fn => fn()) },
  getEvents() { return events.slice() },
  clear() { events = [] ; subs = [] },
  subscribe(fn) { subs.push(fn) },
  unsubscribeAll() { subs = [] },
}
