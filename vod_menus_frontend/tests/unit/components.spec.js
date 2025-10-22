import { describe, it, expect } from 'vitest'
import Home from '../../src/pages/Home.js'
import Catalog from '../../src/pages/Catalog.js'
import Search from '../../src/pages/Search.js'

describe('components existence', () => {
  it('home component defined', () => { expect(typeof Home).toBe('function') })
  it('catalog component defined', () => { expect(typeof Catalog).toBe('function') })
  it('search component defined', () => { expect(typeof Search).toBe('function') })
})
