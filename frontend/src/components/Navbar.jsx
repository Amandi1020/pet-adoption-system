import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { ADMIN_ROLES } from '../utils/roles'
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{textDecoration:'none', color:'#FFF8E7'}}>
          🐾 PawFind
        </Link>
      </div>

      <div className="navbar-links">

        <Link to="/" className={`nav-link ${isActive('/') ? 'nav-active' : ''}`}>Home</Link>
          <Link to="/pets" className={`nav-link ${isActive('/pets') ? 'nav-active' : ''}`}>Browse Pets</Link>
          <Link to="/care-guide" className={`nav-link ${isActive('/care-guide') ? 'nav-active' : ''}`}>Care Guide</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-active' : ''}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'nav-active' : ''}`}>Contact</Link>

          {user ? (
            <>
              {ADMIN_ROLES.includes(user.role) && (
                <Link to="/admin" className={`nav-link admin-link ${isActive('/admin') ? 'nav-active' : ''}`}>
                  ⚙️ Admin
                </Link>
              )}
              <Link to="/my-applications" className={`nav-link ${isActive('/my-applications') ? 'nav-active' : ''}`}>
                My Applications
              </Link>
              <span className="nav-user">👤 {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${isActive('/login') ? 'nav-active' : ''}`}>Login</Link>
              <Link to="/register" className={`nav-link register-btn ${isActive('/register') ? 'nav-active' : ''}`}>Register</Link>
            </>
          )}
      </div>
    </nav>
  )
}

export default Navbar
