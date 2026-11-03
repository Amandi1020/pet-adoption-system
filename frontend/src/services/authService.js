import { apiFetch } from './api'

export const registerUser = (userData) => apiFetch('/users/register', {
  method: 'POST',
  body: userData,
  handleUnauthorized: false,
  fallbackMessage: 'Registration failed. Try again.',
})

export const loginUser = (credentials) => apiFetch('/auth/login', {
  method: 'POST',
  body: credentials,
  handleUnauthorized: false,
  fallbackMessage: 'Login failed. Try again.',
})
