import Blits from '@lightningjs/blits'
import TopNav from '../components/TopNav.js'
import TitleList from '../components/TitleList.js'
import DetailsModal from '../components/DetailsModal.js'
import Alert from '../components/Alert.js'
import { theme } from '../theme/theme.js'
import { dataSource } from '../services/dataSource.js'
import { store } from '../state/store.js'
import { auditTrail } from '../services/auditTrail.js'
import { validate } from '../services/validation.js'

export default Blits.Component('Search', {
  components: { TopNav, TitleList, DetailsModal, Alert },
  template: `
    <Element :w="$appW" :h="$appH" :color="$colors.background">
      <Element x="0" y="0" :w="$appW" h="1080">
        <TopNav :title="$title" :query="$query" @event="$onTopNavEvent" />
        <Element y="140" :w="$appW" h="940">
          <Element :alpha="$alert ? 1 : 0">
            <Alert :type="$alert?.type" :message="$alert?.message" />
          </Element>
          <Element :alpha="$showDetails ? 1 : 0">
            <DetailsModal :item="$selected" @event="$onDetailsEvent" />
          </Element>
          <TitleList :items="$items" @event="$onItemEvent" />
        </Element>
      </Element>
    </Element>
  `,
  data() {
    return {
      title: 'Search',
      appW: 1920, appH: 1080,
      colors: theme.colorsHex,
      items: [],
      query: '',
      selected: null,
      showDetails: false,
      alert: null,
      debounceHandle: null,
    }
  },
  methods: {
    onTopNavEvent(e) {
      if (e.type === 'search') {
        this.query = e.query || ''
        this.debouncedSearch()
      }
      if (e.type === 'toggleView') {
        // not relevant here
      }
      if (e.type === 'profile') {
        // reserved
      }
    },
    debouncedSearch() {
      if (this.debounceHandle) clearTimeout(this.debounceHandle)
      this.debounceHandle = setTimeout(() => this.executeSearch(), 250)
    },
    async executeSearch() {
      try {
        validate.string(this.query, { min: 0, max: 64 })
        const { items } = await dataSource.search({ query: this.query, page: 1, pageSize: 25 })
        this.items = items
        auditTrail.log({
          actionType: 'READ',
          entity: 'Search',
          userId: store.getUser().id,
          isoTimestamp: new Date().toISOString(),
          details: { query: this.query },
        })
      } catch (err) {
        this.handleError('SEARCH', err)
      }
    },
    onItemEvent(e) {
      if (e.type === 'select') {
        this.selected = e.item
        this.showDetails = true
      }
    },
    onDetailsEvent(e) {
      if (e.type === 'close') {
        this.showDetails = false
        this.selected = null
      }
    },
    handleError(action, err, userMessage) {
      const message = userMessage || 'Search failed. Please adjust your query.'
      this.alert = { type: 'error', message }
      auditTrail.error({
        actionType: action,
        entity: 'Search',
        userId: store.getUser().id,
        isoTimestamp: new Date().toISOString(),
        error: { name: err?.name, message: err?.message, stack: (err && err.stack) || '' },
      })
      setTimeout(() => { this.alert = null }, 2000)
    },
  },
  input: {
    back() { this.$router.back() },
  },
})
