class AccessDenied extends Error { constructor(msg = 'Access denied') { super(msg); this.name = 'AccessDenied' } }

/**
// PUBLIC_INTERFACE
export function ensureRole(roles, user)
/** Ensure the user contains at least one of the roles. Throws AccessDenied. */
export function ensureRole(roles, user) {
  const ur = Array.isArray(user?.roles) ? user.roles : []
  const ok = roles.some(r => ur.includes(r))
  if (!ok) throw new AccessDenied('Insufficient role')
  return true
}

export { AccessDenied }
