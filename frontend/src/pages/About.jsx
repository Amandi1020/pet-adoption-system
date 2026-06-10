import { Link } from 'react-router-dom'
import '../styles/About.css'

function About() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-tag">Est. 2026 · Colombo, Sri Lanka</span>
          <h1>About PawFind 🐾</h1>
          <p>We connect loving families with pets who need a home</p>
        </div>
      </div>

      <div className="about-mission-section">
        <div className="about-mission-grid">
          <div className="about-mission-text">
            <span className="about-section-tag">Our story</span>
            <h2>Built to solve a real problem</h2>
            <p>Animal shelters in Sri Lanka manage hundreds of pets using paper registers and WhatsApp groups. We saw this problem and built PawFind — a complete digital system that makes the entire adoption process easier, faster, and more transparent.</p>
            <p>Every pet deserves a loving home. Every family deserves to find their perfect companion. PawFind makes that connection possible.</p>
            <Link to="/pets" className="about-cta-inline">Browse available pets →</Link>
          </div>
          <div className="about-mission-img">
            <img
              src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80"
              alt="Happy dog with owner"
            />
          </div>
        </div>
      </div>

      <div className="about-stats-bar">
        <div className="about-stat-item">
          <h2>124+</h2>
          <p>Pets rehomed</p>
        </div>
        <div className="about-stat-item">
          <h2>87+</h2>
          <p>Happy families</p>
        </div>
        <div className="about-stat-item">
          <h2>12</h2>
          <p>Species cared for</p>
        </div>
        <div className="about-stat-item">
          <h2>100%</h2>
          <p>Vaccinated</p>
        </div>
      </div>

      <div className="about-values-section">
        <div className="about-values-inner">
          <span className="about-section-tag">What drives us</span>
          <h2>Our values</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">❤️</div>
              <h3>Compassion</h3>
              <p>Every animal in our care is treated with love, respect, and dignity.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🔍</div>
              <h3>Transparency</h3>
              <p>Adopters can track every step of their application with full visibility.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🤝</div>
              <h3>Community</h3>
              <p>We build a community of pet lovers who support and inspire each other.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">💉</div>
              <h3>Health first</h3>
              <p>All pets are vaccinated, checked by vets, and cared for before adoption.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-team-section">
        <div className="about-team-inner">
          <span className="about-section-tag">The people behind PawFind</span>
          <h2>Meet the team</h2>
          <div className="about-team-grid">
            <div className="about-team-card">
              <div className="about-team-avatar">👩‍💻</div>
              <h3>Amandi</h3>
              <p className="about-team-role">Lead Developer</p>
              <p className="about-team-sub">MIS Undergraduate · Built the full system</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-avatar">👨‍💼</div>
              <h3>Shelter Manager</h3>
              <p className="about-team-role">Operations</p>
              <p className="about-team-sub">10 years of shelter management experience</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-avatar">👩‍⚕️</div>
              <h3>Dr. Perera</h3>
              <p className="about-team-role">Veterinarian</p>
              <p className="about-team-sub">Licensed animal health specialist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-cta-section">
        <div className="about-cta-inner">
          <h2>Ready to give a pet a loving home?</h2>
          <p>Browse our available pets and start your adoption journey today.</p>
          <div className="about-cta-btns">
            <Link to="/pets" className="about-btn-primary">Browse pets</Link>
            <Link to="/contact" className="about-btn-outline">Contact us</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About