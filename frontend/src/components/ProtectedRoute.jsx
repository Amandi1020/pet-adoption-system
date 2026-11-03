import { Link, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import '../styles/ProtectedRoute.css'

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    )
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return (
      <div className="access-denied-page">
        <div className="access-denied-card">
          <span className="access-denied-code">403</span>
          <h1>Access denied</h1>
          <p>You do not have permission to view this page.</p>
          <Link to="/" className="access-denied-link">Go to home</Link>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
