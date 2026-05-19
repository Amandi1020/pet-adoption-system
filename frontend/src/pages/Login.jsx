import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import '../styles/Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await loginUser({ email, password })
      if (result && result.id) {
        localStorage.setItem('user', JSON.stringify(result))
        setMessage('Login successful!')
        setTimeout(() => navigate('/'), 1500)
      } else {
        setMessage('Invalid email or password. Try again.')
      }
    } catch (err) {
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🐾 Welcome Back</h2>
        <p className="auth-sub">Login to your PawFind account</p>
        {message && <p className="auth-msg">{message}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login