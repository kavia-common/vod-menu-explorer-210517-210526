import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('Alert', {
  props: ['type', 'message'],
  template: `
    <Element x="40" y="20" w="1200" h="64" :color="$bg" alpha="0.90">
      <Text :content="$message || ''" x="16" y="16" :textColor="$fg" fontSize="24" />
    </Element>
  `,
  data() {
    return { bg: theme.colorsHex.error, fg: theme.colorsHex.surface }
  },
  hooks: {
    mounted() {
      if (this.type === 'success') {
        this.bg = theme.colorsHex.success
        this.fg = theme.colorsHex.text
      }
    },
  },
})
