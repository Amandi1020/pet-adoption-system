import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import loginAnimal from '../assets/images/other/login-animal.jpeg'
import '../styles/Login.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { register, showToast } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error')
      return
    }

    setSubmitting(true)

    try {
      await register({ name, email, password })
      showToast('Account created! Welcome to PawFind 🐾', 'success')
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      showToast(err.message || 'Something went wrong.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-bg">
        <img src={loginAnimal} alt="" className="login-bg-img" />
        <div className="login-bg-overlay"></div>
      </div>

      <div className="login-paw login-paw-1" aria-hidden="true">🐾</div>
      <div className="login-paw login-paw-2" aria-hidden="true">🐾</div>
      <div className="login-paw login-paw-3" aria-hidden="true">🐾</div>
      <div className="login-paw login-paw-4" aria-hidden="true">🐾</div>
      <div className="login-paw login-paw-5" aria-hidden="true">🐾</div>

      <div className="login-card">

        <div className="login-card-header">
          <span className="login-card-paw">🐾</span>
          <p className="login-card-brand">PawFind</p>
          <p className="login-card-tagline">Join our community today</p>
        </div>

        <div className="login-card-body">
          <h2 className="login-title">Get started</h2>
          <p className="login-sub">Create your PawFind account</p>

          <form onSubmit={handleRegister}>
            <div className="login-form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="login-switch">
            Already have an account?{' '}
            <Link to="/login" state={{ from: location.state?.from }}>Login</Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Register
