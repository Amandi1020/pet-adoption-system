import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import loginAnimal from '../assets/images/other/login-animal.jpeg'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, showToast } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await login({ email, password })
      showToast('Login successful! Welcome back 🐾', 'success')
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      showToast(err.message || 'Something went wrong. Try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-bg">
        <img src={loginAnimal} alt="background" className="login-bg-img" />
        <div className="login-bg-overlay"></div>
      </div>

      <div className="login-paw login-paw-1">🐾</div>
      <div className="login-paw login-paw-2">🐾</div>
      <div className="login-paw login-paw-3">🐾</div>
      <div className="login-paw login-paw-4">🐾</div>
      <div className="login-paw login-paw-5">🐾</div>

      <div className="login-card">

        <div className="login-card-header">
          <span className="login-card-paw">🐾</span>
          <p className="login-card-brand">PawFind</p>
          <p className="login-card-tagline">Find your perfect companion</p>
        </div>

        <div className="login-card-body">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-sub">Login to your PawFind account</p>

          <form onSubmit={handleLogin}>
            <div className="login-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="login-switch">
            Don't have an account?{' '}
            <Link to="/register" state={{ from: location.state?.from }}>Sign Up</Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Login
