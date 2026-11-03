const AUTH_STORAGE_KEY = 'user'

export const sanitizeUser = (value) => {
  if (!value || typeof value !== 'object') return null

  const { id, name, role, token } = value
  if (!id || !name || !role || !token) return null

  return { id, name, role, token }
}

export const getStoredUser = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) return null

  try {
    const user = sanitizeUser(JSON.parse(raw))
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    return user
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export const setStoredUser = (value) => {
  const user = sanitizeUser(value)
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  return user
}

export const clearStoredUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
