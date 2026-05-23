import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{textDecoration:'none', color:'#FFF8E7'}}>
          🐾 PawFind
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/pets" className="nav-link">Browse Pets</Link>
        <Link to="/stories" className="nav-link">Stories</Link>
        {user ? (
          <>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="nav-link">Admin</Link>
            )}
            <Link to="/adopt" className="nav-link">Apply</Link>
            <span className="nav-user">👤 {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar