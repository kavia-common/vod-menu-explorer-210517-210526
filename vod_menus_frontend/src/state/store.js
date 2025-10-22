import { auth } from './auth.js'

/**
// PUBLIC_INTERFACE
export const store
/** Global store for simple UI state like view layout and user accessor. */
export const store = (() => {
  let view = 'grid'

  function setView(v) {
    if (v !== 'grid' && v !== 'list') throw new Error('Invalid view')
    view = v
  }
  function getView() { return view }
  function getUser() { return auth.getCurrentUser() }

  return { setView, getView, getUser }
})()
