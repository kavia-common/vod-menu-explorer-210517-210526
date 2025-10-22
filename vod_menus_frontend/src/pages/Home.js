import Blits from '@lightningjs/blits'
import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import { theme } from '../theme/theme.js'

export default Blits.Component('Home', {
  components: { Sidebar, TopNav },
  template: `
    <Element :w="$appW" :h="$appH" :color="$colors.background">
      <Element w="1920" h="1080">
        <Sidebar />
        <Element x="320" y="0" :w="$contentW" h="1080">
          <TopNav :title="$title" />
          <Element y="140" :w="$contentW" h="940">
            <Text :content="$headline" x="40" y="40" :textColor="$colors.text" fontSize="48" />
            <Text :content="$sub" x="40" y="110" :textColor="$colorsDim" fontSize="28" />
            <Element x="40" y="180" w="640" h="80" :color="$colors.primary" alpha="0.15" />
            <Element x="40" y="280" w="640" h="80" :color="$colors.secondary" alpha="0.15" />
            <Text content="Press Enter to open Catalog • Press F to Search" x="40" y="400" :textColor="$colorsDim" fontSize="26" />
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  data() {
    return {
      colors: theme.colorsHex,
      colorsDim: theme.colorsHex.textDim,
      appW: 1920, appH: 1080, contentW: 1600,
      title: 'Home',
      headline: 'Welcome to Ocean VOD',
      sub: 'Browse categories, search titles, and view details with a professional, compliant experience.',
    }
  },
  input: {
    enter() {
      this.$router.to('/catalog')
    },
    back() {
      // remain on home; could open help in future
    },
    search() {
      this.$router.to('/search')
    },
  },
})
