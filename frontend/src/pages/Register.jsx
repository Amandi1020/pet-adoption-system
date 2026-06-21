import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import Toast from '../components/Toast'
import loginAnimal from '../assets/images/Other/login-animal.jpeg'
import '../styles/Login.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const closeToast = useCallback(() => setToast(null), [])

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setToast({ message: 'Password must be at least 6 characters.', type: 'error' })
      return
    }
    try {
      const result = await registerUser({ name, email, password, role: 'ADOPTER' })
      if (result.id) {
        localStorage.setItem('user', JSON.stringify(result))
        setToast({ message: 'Account created! Welcome to PawFind 🐾', type: 'success' })
        setTimeout(() => navigate('/'), 2000)
      } else {
        setToast({ message: 'Registration failed. Try again.', type: 'error' })
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong.'
      setToast({ message: msg, type: 'error' })
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
          <p className="login-card-tagline">Join our community today</p>
        </div>

        <div className="login-card-body">
          <h2 className="login-title">Get started</h2>
          <p className="login-sub">Create your PawFind account</p>

          <form onSubmit={handleRegister}>
            <div className="login-form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Create Account</button>
          </form>

          <p className="login-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default Register