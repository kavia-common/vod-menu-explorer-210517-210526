import Blits from '@lightningjs/blits'
import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import TitleGrid from '../components/TitleGrid.js'
import TitleList from '../components/TitleList.js'
import DetailsModal from '../components/DetailsModal.js'
import Alert from '../components/Alert.js'
import { theme } from '../theme/theme.js'
import { store } from '../state/store.js'
import { dataSource } from '../services/dataSource.js'
import { auditTrail } from '../services/auditTrail.js'
import { ensureRole } from '../services/accessControl.js'
import { validate } from '../services/validation.js'

export default Blits.Component('Catalog', {
  components: { Sidebar, TopNav, TitleGrid, TitleList, DetailsModal, Alert },
  template: `
    <Element :w="$appW" :h="$appH" :color="$colors.background">
      <Sidebar :categories="$categories" @event="$onCategory" />
      <Element x="320" y="0" :w="$contentW" h="1080">
        <TopNav :title="$title" :view="$view" :query="$query" @event="$onTopNavEvent" />
        <Element y="140" :w="$contentW" h="940">
          <Element :alpha="$alert ? 1 : 0">
            <Alert :type="$alert?.type" :message="$alert?.message" />
          </Element>
          <Element :alpha="$showDetails ? 1 : 0">
            <DetailsModal :item="$selected" @event="$onDetailsEvent" />
          </Element>
          <Element :alpha="$view === 'grid' ? 1 : 0">
            <TitleGrid :items="$items" @event="$onItemEvent" />
          </Element>
          <Element :alpha="$view === 'list' ? 1 : 0">
            <TitleList :items="$items" @event="$onItemEvent" />
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  data() {
    return {
      title: 'Catalog',
      colors: theme.colorsHex,
      appW: 1920, appH: 1080, contentW: 1600,
      categories: [],
      items: [],
      query: '',
      view: store.getView(),
      selected: null,
      showDetails: false,
      alert: null,
      activeCategory: 'All',
    }
  },
  methods: {
    async loadInitial() {
      try {
        const { categories } = await dataSource.getCategories()
        this.categories = categories
        await this.fetchItems()
      } catch (err) {
        this.handleError('LOAD_INITIAL', err)
      }
    },
    async fetchItems() {
      try {
        const params = { category: this.activeCategory, query: this.query, sort: 'title', page: 1, pageSize: 20 }
        validate.params(params, { category: 'string', query: 'string', sort: 'string', page: 'number', pageSize: 'number' })
        const result = await dataSource.listTitles(params)
        this.items = result.items
        auditTrail.log({
          actionType: 'READ',
          entity: 'Title',
          userId: store.getUser().id,
          isoTimestamp: new Date().toISOString(),
          details: { query: params },
        })
      } catch (err) {
        this.handleError('FETCH_ITEMS', err)
      }
    },
    toggleView() {
      const newView = this.view === 'grid' ? 'list' : 'grid'
      store.setView(newView)
      const before = this.view
      this.view = newView
      auditTrail.log({
        actionType: 'UPDATE',
        entity: 'Preference.View',
        userId: store.getUser().id,
        isoTimestamp: new Date().toISOString(),
        before: { view: before },
        after: { view: newView },
        reason: 'User toggled view',
      })
    },
    openDetails(item) {
      try {
        validate.object(item, ['id', 'title'])
        this.selected = item
        this.showDetails = true
      } catch (err) {
        this.handleError('OPEN_DETAILS', err)
      }
    },
    closeDetails() {
      this.showDetails = false
      this.selected = null
    },
    onTopNavEvent(e) {
      if (e.type === 'toggleView') this.toggleView()
      if (e.type === 'search') {
        this.query = e.query || ''
        this.fetchItems()
      }
      if (e.type === 'profile') {
        // reserved
      }
    },
    onItemEvent(e) {
      if (e.type === 'select') this.openDetails(e.item)
    },
    onCategory(e) {
      if (e.type === 'selectCategory') {
        this.activeCategory = e.category
        this.fetchItems()
      }
    },
    onDetailsEvent(e) {
      if (e.type === 'close') this.closeDetails()
      if (e.type === 'delete') {
        try {
          ensureRole(['admin'], store.getUser())
          auditTrail.log({
            actionType: 'DELETE',
            entity: 'Title',
            userId: store.getUser().id,
            isoTimestamp: new Date().toISOString(),
            reason: 'Admin removed title',
            before: { title: this.selected },
          })
          this.closeDetails()
        } catch (err) {
          this.handleError('DELETE_DENIED', err, 'You do not have permission to delete.')
        }
      }
    },
    handleError(action, err, userMessage) {
      const message = userMessage || 'Something went wrong. Please try again.'
      this.alert = { type: 'error', message }
      auditTrail.error({
        actionType: action,
        entity: 'UI',
        userId: store.getUser().id,
        isoTimestamp: new Date().toISOString(),
        error: { name: err?.name, message: err?.message, stack: (err && err.stack) || '' },
      })
      // auto-dismiss alert after a short time
      setTimeout(() => { this.alert = null }, 2000)
    },
  },
  hooks: {
    mounted() { this.loadInitial() },
  },
  input: {
    toggleView() { this.toggleView() },
    search() { this.$router.to('/search') },
    back() { this.$router.to('/') },
  },
})
