import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('TitleGrid', {
  props: ['items'],
  template: `
    <Element w="1600" h="900">
      <Element
        :for="(it, i) in $items"
        :key="$it.id"
        :x="($i % 5) * 300 + 40"
        :y="Math.floor($i / 5) * 220 + 20"
        w="260" h="200" :color="$cardColor" alpha="0.1"
        @event="$select($it)"
      >
        <Element x="0" y="0" w="260" h="146" :color="$primary" alpha="0.15" />
        <Text :content="$it.title" x="8" y="156" :textColor="$text" fontSize="22" />
        <Text :content="$it.category" x="8" y="186" :textColor="$dim" fontSize="18" />
      </Element>
    </Element>
  `,
  data() {
    return {
      primary: theme.colorsHex.primary,
      text: theme.colorsHex.text,
      dim: theme.colorsHex.textDim,
      cardColor: theme.colorsHex.text,
    }
  },
  methods: {
    select(item) { this.$emit({ type: 'select', item }) },
  },
})
