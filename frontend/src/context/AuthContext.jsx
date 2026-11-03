import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/authService'
import { SESSION_EXPIRED_MESSAGE } from '../services/api'
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../services/authStorage'
import AuthContext from './authContext'
import Toast from '../components/Toast'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type })
  }, [])

  const closeToast = useCallback(() => setToast(null), [])

  const saveSession = useCallback((session) => {
    const nextUser = setStoredUser(session)
    if (!nextUser) {
      throw new Error('The server did not return a valid session.')
    }

    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback(async (credentials) => {
    return saveSession(await loginUser(credentials))
  }, [saveSession])

  const register = useCallback(async (details) => {
    return saveSession(await registerUser(details))
  }, [saveSession])

  const logout = useCallback(() => {
    clearStoredUser()
    setUser(null)
  }, [])

  useEffect(() => {
    const handleSessionExpired = (event) => {
      setUser(null)
      setToast({
        message: event.detail?.message || SESSION_EXPIRED_MESSAGE,
        type: 'error',
      })
      navigate('/login', {
        replace: true,
        state: { from: event.detail?.from },
      })
    }

    window.addEventListener('auth:expired', handleSessionExpired)
    return () => window.removeEventListener('auth:expired', handleSessionExpired)
  }, [navigate])

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    showToast,
  }), [user, login, register, logout, showToast])

  return (
    <AuthContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </AuthContext.Provider>
  )
}
