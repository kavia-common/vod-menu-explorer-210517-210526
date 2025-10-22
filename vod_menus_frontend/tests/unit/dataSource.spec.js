import { describe, it, expect } from 'vitest'
import { dataSource } from '../../src/services/dataSource.js'

describe('dataSource', () => {
  it('returns categories', async () => {
    const { categories } = await dataSource.getCategories()
    expect(categories.length).toBeGreaterThan(0)
  })
  it('lists titles with pagination', async () => {
    const res = await dataSource.listTitles({ page: 1, pageSize: 10 })
    expect(res.items.length).toBe(10)
    expect(res.total).toBeGreaterThan(10)
  })
  it('filters by category', async () => {
    const res = await dataSource.listTitles({ category: 'Action' })
    expect(res.items.every(x => x.category === 'Action' || x.category === undefined || x.category === 'Action')).toBe(true)
  })
  it('searches by query', async () => {
    const res = await dataSource.search({ query: 'Title 1' })
    expect(res.items.some(x => x.title.includes('1'))).toBe(true)
  })
})
