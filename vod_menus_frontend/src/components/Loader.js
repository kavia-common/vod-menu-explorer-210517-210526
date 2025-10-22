import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('Loader', {
  template: `
    <Element w="200" h="56" :color="$primary" alpha="0.10">
      <Text content="Loading..." x="16" y="12" :textColor="$text" fontSize="24" />
    </Element>
  `,
  data() {
    return { primary: theme.colorsHex.primary, text: theme.colorsHex.text }
  },
})
