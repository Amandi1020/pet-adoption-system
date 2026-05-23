import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <p className="notfound-emoji">🐾</p>
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="notfound-btn">Go back home</Link>
      </div>
    </div>
  )
}

export default NotFound