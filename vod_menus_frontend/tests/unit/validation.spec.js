import { describe, it, expect } from 'vitest'
import { validate, ValidationError } from '../../src/services/validation.js'

describe('validation', () => {
  it('validates string length', () => {
    expect(() => validate.string('ok', { min: 1, max: 5 })).not.toThrow()
    expect(() => validate.string('', { min: 1 })).toThrow(ValidationError)
    expect(() => validate.string('toolong', { max: 3 })).toThrow(ValidationError)
  })
  it('validates numbers', () => {
    expect(() => validate.number(5, { min: 0, max: 10 })).not.toThrow()
    expect(() => validate.number('5')).toThrow(ValidationError)
  })
  it('validates objects and params', () => {
    expect(() => validate.object({ a: 1 }, ['a'])).not.toThrow()
    expect(() => validate.object({}, ['a'])).toThrow(ValidationError)
    expect(() => validate.params({ a: 'x', b: 1 }, { a: 'string', b: 'number' })).not.toThrow()
  })
})
