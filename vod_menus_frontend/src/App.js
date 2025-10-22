import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import Catalog from './pages/Catalog.js'
import Search from './pages/Search.js'
import { theme } from './theme/theme.js'

/**
// PUBLIC_INTERFACE
export default Blits.Application
/** Application root for VOD Menus explorer.
  Provides RouterView, global colors, and routes for Home, Catalog, and Search.
*/
export default Blits.Application({
  name: 'VODMenusApp',
  template: `
    <Element :w="$appW" :h="$appH" :color="$colors.background">
      <RouterView />
    </Element>
  `,
  data() {
    return {
      colors: theme.colorsHex,
      appW: 1920,
      appH: 1080,
    }
  },
  routes: [
    { path: '/', component: Home, options: { reuse: true } },
    { path: '/catalog', component: Catalog, options: { reuse: true } },
    { path: '/search', component: Search, options: { reuse: true } },
  ],
})
