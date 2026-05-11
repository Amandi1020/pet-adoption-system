import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🐾 PawFind
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/pets" className="nav-link">Browse Pets</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link register-btn">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar