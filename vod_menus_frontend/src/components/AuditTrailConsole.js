import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'
import { audit } from '../state/audit.js'

export default Blits.Component('AuditTrailConsole', {
  template: `
    <Element x="20" y="740" w="1880" h="320" :color="$surface" alpha="0.95">
      <Text content="Audit Trail (Recent)" x="16" y="8" :textColor="$text" fontSize="24" />
      <Element x="12" y="40" w="1856" h="268">
        <Element :for="(ev, idx) in $events" :key="$ev.id" :y="$idx * 28" x="8" w="1840" h="24" :color="$primary" alpha="0.06">
          <Text :content="$ev.isoTimestamp + ' • ' + $ev.userId + ' • ' + $ev.actionType + ' • ' + $ev.entity" x="10" y="2" :textColor="$dim" fontSize="18" />
        </Element>
      </Element>
    </Element>
  `,
  data() {
    return {
      surface: theme.colorsHex.surface,
      primary: theme.colorsHex.primary,
      text: theme.colorsHex.text,
      dim: theme.colorsHex.textDim,
      events: [],
    }
  },
  hooks: {
    mounted() {
      this.events = audit.getEvents().slice(-10).reverse()
      audit.subscribe(() => { this.events = audit.getEvents().slice(-10).reverse() })
    },
    destroyed() {
      audit.unsubscribeAll()
    },
  },
})
