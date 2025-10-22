const toHex = (c) => {
  // convert #RRGGBB to 0xAARRGGBB with full alpha
  const hex = c.replace('#','')
  return '0xff' + hex
}

export const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textDim: '#6B7280',
  },
  get colorsHex() {
    const c = this.colors
    return {
      primary: toHex(c.primary),
      secondary: toHex(c.secondary),
      success: toHex(c.success),
      error: toHex(c.error),
      background: toHex(c.background),
      surface: toHex(c.surface),
      text: toHex(c.text),
      textDim: toHex(c.textDim),
    }
  },
}
