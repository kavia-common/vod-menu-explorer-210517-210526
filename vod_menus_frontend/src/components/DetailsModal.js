import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('DetailsModal', {
  props: ['item'],
  template: `
    <Element x="200" y="120" w="1200" h="840" :color="$surface" alpha="0.98">
      <Element x="0" y="0" w="1200" h="80" :color="$primary" alpha="0.10" />
      <Text :content="$item?.title || 'Details'" x="24" y="24" :textColor="$text" fontSize="36" />
      <Text :content="'Category: ' + ($item?.category || '')" x="24" y="110" :textColor="$dim" fontSize="24" />
      <Text :content="'Year: ' + ($item?.year || '')" x="24" y="146" :textColor="$dim" fontSize="24" />
      <Text :content="$item?.description || '—'" x="24" y="190" :textColor="$text" fontSize="24" />
      <Element x="24" y="760" w="160" h="48" :color="$primary" alpha="0.16" @event="$close">
        <Text content="Close" x="16" y="10" :textColor="$primary" fontSize="24" />
      </Element>
      <Element x="200" y="760" w="220" h="48" :color="$secondary" alpha="0.16" @event="$requestDelete">
        <Text content="Delete (Admin)" x="16" y="10" :textColor="$secondary" fontSize="24" />
      </Element>
      <Element x="460" y="760" w="320" h="48" :color="$primary" alpha="0.10" @event="$esign">
        <Text content="Electronic Signature (Scaffold)" x="16" y="10" :textColor="$text" fontSize="24" />
      </Element>
    </Element>
  `,
  data() {
    return {
      primary: theme.colorsHex.primary,
      secondary: theme.colorsHex.secondary,
      surface: theme.colorsHex.surface,
      text: theme.colorsHex.text,
      dim: theme.colorsHex.textDim,
    }
  },
  methods: {
    close() { this.$emit({ type: 'close' }) },
    requestDelete() { this.$emit({ type: 'delete' }) },
    esign() {
      // Scaffold: In a regulated deployment, this would open a credential re-entry modal
      this.$emit({ type: 'esign', artifact: { intent: 'approve', bindTo: this.item?.id } })
    },
  },
})
