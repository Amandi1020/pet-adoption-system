import { clearStoredUser, getStoredUser } from './authStorage'

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const SESSION_EXPIRED_MESSAGE = 'Your session expired. Please log in again.'

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const parseResponseBody = async (response) => {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const getErrorMessage = (data, fallback) => {
  if (data && typeof data === 'object' && typeof data.message === 'string' && data.message.trim()) {
    return data.message
  }
  return fallback
}

export const apiFetch = async (path, options = {}) => {
  const {
    fallbackMessage = 'Something went wrong. Please try again.',
    handleUnauthorized = true,
    headers,
    body,
    ...requestOptions
  } = options

  const requestHeaders = new Headers(headers || {})
  const storedUser = getStoredUser()

  if (storedUser?.token) {
    requestHeaders.set('Authorization', `Bearer ${storedUser.token}`)
  }

  let requestBody = body
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    requestBody = JSON.stringify(body)
    if (!requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json')
    }
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...requestOptions,
      headers: requestHeaders,
      body: requestBody,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Unable to reach the server. Please try again.', 0, null)
  }

  const data = await parseResponseBody(response)

  if (!response.ok) {
    if (response.status === 401 && handleUnauthorized) {
      clearStoredUser()
      window.dispatchEvent(new CustomEvent('auth:expired', {
        detail: {
          message: SESSION_EXPIRED_MESSAGE,
          from: `${window.location.pathname}${window.location.search}${window.location.hash}`,
        },
      }))
    }

    const message = response.status === 403
      ? getErrorMessage(data, 'You do not have permission to perform this action.')
      : getErrorMessage(data, fallbackMessage)

    throw new ApiError(message, response.status, data)
  }

  return data
}

export default BASE_URL
