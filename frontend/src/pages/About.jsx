import { Link } from 'react-router-dom'
import '../styles/About.css'

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <h1>About PawFind 🐾</h1>
        <p>We connect loving families with pets who need a home</p>
      </div>

      {/* MISSION */}
      <div className="about-section">
        <div className="about-mission">
          <div className="about-mission-text">
            <h2>Our mission</h2>
            <p>PawFind was created to solve a real problem — animal shelters in Sri Lanka manage hundreds of pets using paper registers and WhatsApp groups. We built a digital system that makes the entire adoption process easier, faster, and more transparent for shelters, staff, and adopters.</p>
            <p>Every pet deserves a loving home. Every family deserves to find their perfect companion. PawFind makes that connection possible.</p>
          </div>
          <div className="about-mission-img">
            <img
              src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80"
              alt="Happy dog with owner"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="about-stats">
        <div className="about-stat">
          <h2>124+</h2>
          <p>Pets rehomed</p>
        </div>
        <div className="about-stat">
          <h2>87+</h2>
          <p>Happy families</p>
        </div>
        <div className="about-stat">
          <h2>12</h2>
          <p>Species cared for</p>
        </div>
        <div className="about-stat">
          <h2>100%</h2>
          <p>Vaccinated pets</p>
        </div>
      </div>

      {/* VALUES */}
      <div className="about-section" style={{background:'#EFEBE9'}}>
        <h2 className="about-section-title">Our values</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">❤️</span>
            <h3>Compassion</h3>
            <p>Every animal in our care is treated with love, respect, and dignity.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">🔍</span>
            <h3>Transparency</h3>
            <p>Adopters can track every step of their application with full visibility.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">🤝</span>
            <h3>Community</h3>
            <p>We build a community of pet lovers who support and inspire each other.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">💉</span>
            <h3>Health first</h3>
            <p>All pets are vaccinated, checked by vets, and cared for before adoption.</p>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="about-section">
        <h2 className="about-section-title">Meet the team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">👩</div>
            <h3>Amandi</h3>
            <p>Lead Developer</p>
            <p className="team-sub">MIS Undergraduate</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">👨</div>
            <h3>Shelter Manager</h3>
            <p>Operations</p>
            <p className="team-sub">10 years experience</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">👩‍⚕️</div>
            <h3>Dr. Perera</h3>
            <p>Veterinarian</p>
            <p className="team-sub">Animal health specialist</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2>Ready to give a pet a loving home?</h2>
        <p>Browse our available pets and start your adoption journey today.</p>
        <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
          <Link to="/pets" className="about-btn-primary">Browse pets</Link>
          <Link to="/contact" className="about-btn-outline">Contact us</Link>
        </div>
      </div>

    </div>
  )
}

export default About