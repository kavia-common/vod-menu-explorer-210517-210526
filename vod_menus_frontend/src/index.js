import Blits from '@lightningjs/blits'
import App from './App.js'
import { theme } from './theme/theme.js'

/**
// PUBLIC_INTERFACE
export function launch()
/** Launch the Lightning Blits application with key mappings and rendering settings. */
export function launch() {
  Blits.Launch(App, 'app', {
    w: 1920,
    h: 1080,
    clearColor: theme.colorsHex.background,
    debug: false,
    keymap: {
      up: ['ArrowUp'],
      down: ['ArrowDown'],
      left: ['ArrowLeft'],
      right: ['ArrowRight'],
      enter: ['Enter'],
      back: ['Escape', 'Backspace'],
      search: ['KeyF'],
      toggleView: ['KeyV'],
    },
  })
}

launch()
