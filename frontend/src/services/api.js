const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const getApiErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json()
    return data?.message || fallback
  } catch {
    return fallback
  }
}

export default BASE_URL