class ValidationError extends Error {
  constructor(message, path) { super(message); this.name = 'ValidationError'; this.path = path }
}

/**
// PUBLIC_INTERFACE
export const validate
/** Validation helpers for inputs and params with structured errors. */
export const validate = {
  string(val, { min = 0, max = 256 } = {}) {
    if (typeof val !== 'string') throw new ValidationError('Expected string', 'string')
    if (val.length < min) throw new ValidationError(`String too short (min ${min})`, 'string')
    if (val.length > max) throw new ValidationError(`String too long (max ${max})`, 'string')
  },
  number(val, { min = -Infinity, max = Infinity } = {}) {
    if (typeof val !== 'number' || Number.isNaN(val)) throw new ValidationError('Expected number', 'number')
    if (val < min || val > max) throw new ValidationError('Number out of range', 'number')
  },
  object(obj, requiredKeys = []) {
    if (obj == null || typeof obj !== 'object') throw new ValidationError('Expected object', 'object')
    requiredKeys.forEach(k => { if (!(k in obj)) throw new ValidationError(`Missing key: ${k}`, k) })
  },
  params(obj, schema) {
    this.object(obj)
    Object.keys(schema).forEach(k => {
      const t = schema[k]
      const v = obj[k]
      if (t === 'string') this.string(String(v))
      if (t === 'number') this.number(Number(v))
      if (t === 'object') this.object(v)
    })
  },
}

export { ValidationError }
