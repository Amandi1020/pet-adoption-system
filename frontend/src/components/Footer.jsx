import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-logo">🐾 PawFind</p>
          <p className="footer-tagline">Connecting pets with loving homes</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">Adopt</p>
            <Link to="/pets">Browse pets</Link>
            <Link to="/quiz">Match quiz</Link>
            <Link to="/adopt">Apply now</Link>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Learn</p>
            <Link to="/care-guide">Care guide</Link>
            <Link to="/stories">Success stories</Link>
            <Link to="/about">About us</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Contact</p>
            <Link to="/contact">Get in touch</Link>
            <a href="mailto:info@pawfind.com">info@pawfind.com</a>
            <p>+94 11 234 5678</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 PawFind — Pet Adoption & Care Info System</p>
        <p className="footer-sub">Built with React & Spring Boot · MIS Project</p>
      </div>
    </footer>
  )
}

export default Footer