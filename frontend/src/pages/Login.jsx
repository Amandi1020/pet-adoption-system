import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import Toast from '../components/Toast'
import loginAnimal from '../assets/images/Other/login-animal.jpeg'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const closeToast = useCallback(() => setToast(null), [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await loginUser({ email, password })
      if (result && result.id) {
        localStorage.setItem('user', JSON.stringify(result))
        setToast({ message: 'Login successful! Welcome back 🐾', type: 'success' })
        setTimeout(() => navigate('/'), 1500)
      } else {
        setToast({ message: 'Invalid email or password.', type: 'error' })
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Try again.'
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
            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="login-switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default Login