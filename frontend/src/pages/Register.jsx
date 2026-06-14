import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import Toast from '../components/Toast'
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
    try {
      const result = await registerUser({ name, email, password, role: 'ADOPTER' })
      if (result.id) {
        setToast({ message: 'Account created! Welcome to PawFind 🐾', type: 'success' })
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setToast({ message: 'Registration failed. Try again.', type: 'error' })
      }
    } catch (err) {
    console.error(err)
    setToast({
      message: err.message,
      type: 'error'
    })
    }
  }

  return (
    <div className="login-page">

      <div className="login-bg">
        <img
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1400&q=80"
          alt="background"
          className="login-bg-img"
        />
        <div className="login-bg-overlay"></div>
      </div>

      <div className="login-paw login-paw-1">🐾</div>
      <div className="login-paw login-paw-2">🐾</div>
      <div className="login-paw login-paw-3">🐾</div>
      <div className="login-paw login-paw-4">🐾</div>
      <div className="login-paw login-paw-5">🐾</div>

      <div className="login-card">

        <div className="login-card-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80"
            alt="Happy dog"
            className="login-card-animal"
          />
          <div className="login-card-img-overlay">
            <p className="login-card-brand">🐾 PawFind</p>
          </div>
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
                placeholder="Create a password"
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