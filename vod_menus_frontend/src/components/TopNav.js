import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('TopNav', {
  props: ['title', 'view', 'query'],
  template: `
    <Element w="1600" h="140" :color="$surface">
      <Text :content="$title" x="24" y="28" :textColor="$text" fontSize="40" />
      <Element x="24" y="84" w="800" h="44" :color="$primary" alpha="0.08" />
      <Text :content="'Search: ' + ($query || '')" x="32" y="92" :textColor="$dim" fontSize="22" />
      <Element x="1440" y="24" w="120" h="40" :color="$primary" alpha="0.12" @event="$toggleView">
        <Text :content="($view || 'grid').toUpperCase()" x="16" y="8" :textColor="$primary" fontSize="22" />
      </Element>
      <Element x="1280" y="24" w="140" h="40" :color="$secondary" alpha="0.12" @event="$profile">
        <Text content="Profile" x="16" y="8" :textColor="$secondary" fontSize="22" />
      </Element>
    </Element>
  `,
  data() {
    return {
      surface: theme.colorsHex.surface,
      text: theme.colorsHex.text,
      dim: theme.colorsHex.textDim,
      primary: theme.colorsHex.primary,
      secondary: theme.colorsHex.secondary,
    }
  },
  methods: {
    toggleView() { this.$emit({ type: 'toggleView' }) },
    profile() { this.$emit({ type: 'profile' }) },
  },
  input: {
    enter() { /* noop */ },
    search() {
      const newQ = (this.query || '') + '*'
      this.$emit({ type: 'search', query: newQ })
    },
  },
})
