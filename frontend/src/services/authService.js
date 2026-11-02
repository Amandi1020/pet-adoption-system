import BASE_URL, { getApiErrorMessage } from './api'

const readResponse = async (response, fallback) => {
  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, fallback))
  }
  return response.json()
}

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return readResponse(response, 'Registration failed. Try again.')
}

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return readResponse(response, 'Login failed. Try again.')
}