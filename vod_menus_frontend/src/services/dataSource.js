import { validate } from './validation.js'

const MOCK = (() => {
  const cats = ['All','Action','Drama','Comedy','Sci-Fi','Documentary']
  const items = []
  for (let i = 1; i <= 60; i++) {
    const category = cats[1 + (i % (cats.length - 1))]
    items.push({
      id: 't' + i,
      title: `Title ${i}`,
      category,
      year: 2000 + (i % 23),
      description: `Description for Title ${i} in ${category}.`,
    })
  }
  return { cats, items }
})()

/**
// PUBLIC_INTERFACE
export const dataSource
/** Provides mock data with filters, pagination, debounced search, and sorting. */
export const dataSource = {
  async getCategories() {
    return { categories: MOCK.cats }
  },
  async listTitles({ category = 'All', query = '', sort = 'title', page = 1, pageSize = 20 } = {}) {
    validate.params({ category, query, sort, page, pageSize },
      { category: 'string', query: 'string', sort: 'string', page: 'number', pageSize: 'number' })
    let arr = MOCK.items.slice()
    if (category && category !== 'All') arr = arr.filter(x => x.category === category)
    if (query) {
      const q = query.toLowerCase()
      arr = arr.filter(x => x.title.toLowerCase().includes(q))
    }
    if (sort === 'title') arr.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'year') arr.sort((a, b) => a.year - b.year)
    const total = arr.length
    const start = (page - 1) * pageSize
    const items = arr.slice(start, start + pageSize)
    return { items, total, page, pageSize }
  },
  async search({ query = '', page = 1, pageSize = 25 } = {}) {
    validate.string(query, { min: 0, max: 64 })
    return this.listTitles({ query, page, pageSize, category: 'All', sort: 'title' })
  },
}
