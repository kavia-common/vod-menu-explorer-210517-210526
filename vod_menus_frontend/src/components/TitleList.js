import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('TitleList', {
  props: ['items'],
  template: `
    <Element w="1600" h="900">
      <Element :for="(it, i) in $items" :key="$it.id" :y="$i * 72 + 8" x="40" w="1520" h="64" :color="$primary" alpha="0.08" @event="$select($it)">
        <Text :content="$it.title" x="16" y="14" :textColor="$text" fontSize="26" />
        <Text :content="$it.category + ' • ' + $it.year" x="16" y="40" :textColor="$dim" fontSize="20" />
      </Element>
    </Element>
  `,
  data() {
    return {
      primary: theme.colorsHex.primary,
      text: theme.colorsHex.text,
      dim: theme.colorsHex.textDim,
    }
  },
  methods: {
    select(item) { this.$emit({ type: 'select', item }) },
  },
})
