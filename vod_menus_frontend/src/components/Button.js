import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('Button', {
  props: ['label', 'color'],
  template: `
    <Element w="200" h="56" :color="$bg" alpha="0.16" @event="$emitClick">
      <Text :content="$label || 'Button'" x="16" y="12" :textColor="$fg" fontSize="24" />
    </Element>
  `,
  data() {
    return { bg: this.color || theme.colorsHex.primary, fg: theme.colorsHex.text }
  },
  methods: {
    emitClick() { this.$emit({ type: 'click' }) },
  },
})
