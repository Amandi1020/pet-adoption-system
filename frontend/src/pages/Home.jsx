import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Find Your Perfect Pet Companion 🐾</h1>
        <p className="hero-sub">Over 120 pets waiting for a loving home</p>
        <div className="hero-buttons">
          <Link to="/pets" className="btn-primary">Browse Pets</Link>
          <Link to="/register" className="btn-outline">Get Started</Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          <h2>124</h2>
          <p>Pets Available</p>
        </div>
        <div className="stat-card">
          <h2>87</h2>
          <p>Successfully Adopted</p>
        </div>
        <div className="stat-card">
          <h2>34</h2>
          <p>Pending Applications</p>
        </div>
        <div className="stat-card">
          <h2>12</h2>
          <p>Species</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="features">
        <h2 className="features-title">Why Choose PawFind?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Easy Search</h3>
            <p>Filter pets by species, age, size and gender to find your perfect match</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💉</span>
            <h3>Health Verified</h3>
            <p>All pets have complete vaccination records and vet checkup history</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">❤️</span>
            <h3>Perfect Match Quiz</h3>
            <p>Answer 7 questions about your lifestyle and we find your ideal pet</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <h3>Simple Process</h3>
            <p>Apply online, track your application status, and bring your pet home</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home