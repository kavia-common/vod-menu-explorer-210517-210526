const defaultUser = { id: 'user-001', name: 'Ocean User', roles: ['user'] }

/**
// PUBLIC_INTERFACE
export const auth
/** Lightweight auth context mock to provide current user and role management. */
export const auth = (() => {
  let current = defaultUser
  return {
    getCurrentUser() { return current },
    setCurrentUser(u) {
      if (!u || !u.id) throw new Error('Invalid user')
      current = u
    },
    reset() { current = defaultUser },
  }
})()
