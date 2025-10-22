import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('Sidebar', {
  props: ['categories'],
  template: `
    <Element w="320" h="1080" :color="$surface">
      <Text content="Categories" x="24" y="24" :textColor="$text" fontSize="32" />
      <Element y="70" x="16" w="288" h="1000">
        <Element :for="(cat, idx) in $cats" :key="$cat"
                 :y="$idx * 60" w="288" h="52" :color="$itemColor($cat)" alpha="0.15"
                 @event="$emitSelect($cat)">
          <Text :content="$cat" x="16" y="12" :textColor="$text" fontSize="24" />
        </Element>
      </Element>
    </Element>
  `,
  data() {
    return {
      text: theme.colorsHex.text,
      surface: theme.colorsHex.surface,
      cats: [],
      active: 'All',
    }
  },
  hooks: {
    mounted() {
      const input = Array.isArray(this.categories) && this.categories.length ? this.categories : ['All','Action','Drama','Comedy']
      this.cats = input
    },
  },
  methods: {
    itemColor(cat) {
      return cat === this.active ? theme.colorsHex.primary : theme.colorsHex.text
    },
    emitSelect(cat) {
      this.active = cat
      this.$emit({ type: 'selectCategory', category: cat })
    },
  },
})
