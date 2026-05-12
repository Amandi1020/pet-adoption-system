import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('Register:', name, email, password)
    // We will connect this to Spring Boot API later
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🐾 Create Account</h2>
        <p className="auth-sub">Join PawFind and find your pet</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register