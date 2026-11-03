import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPets } from '../services/petService'
import aboutImg from '../assets/images/other/about.jpg'
import '../styles/About.css'

const timeline = [
  { year: '2024', title: 'The idea', desc: 'We noticed shelters in Sri Lanka struggling with paper records and WhatsApp chaos. We decided to fix it.' },
  { year: 'Jan 2025', title: 'Development begins', desc: 'Built with React, Spring Boot and MySQL — a complete digital system for pet shelters.' },
  { year: 'Apr 2025', title: 'First shelter onboarded', desc: 'Our first shelter partner joined PawFind and began digitizing its pet records.' },
  { year: 'Today', title: 'Growing community', desc: '' },
]

const team = [
  { name: 'Amandi', role: 'Lead Developer', sub: 'MIS Undergraduate · Built the full system', emoji: '👩‍💻', bg: '#EFEBE9' },
  { name: 'Shelter Manager', role: 'Operations Head', sub: '10 years of shelter management experience', emoji: '👨‍💼', bg: '#FFF3E0' },
  { name: 'Dr. Perera', role: 'Veterinarian', sub: 'Licensed animal health specialist since 2015', emoji: '👩‍⚕️', bg: '#E8F5E9' },
  { name: 'Volunteers', role: 'Community Team', sub: '20+ dedicated animal lovers supporting daily', emoji: '🤝', bg: '#F3E5F5' },
]

const values = [
  { icon: '❤️', title: 'Compassion', desc: 'Every animal in our care is treated with love, respect and dignity — no exceptions.' },
  { icon: '🔍', title: 'Transparency', desc: 'Adopters track every step of their application with complete visibility.' },
  { icon: '🤝', title: 'Community', desc: 'We build a community of pet lovers who support and inspire each other.' },
  { icon: '💉', title: 'Health first', desc: 'All pets are vaccinated, vet-checked, and healthy before they are listed.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We promote responsible pet ownership and long-term animal welfare.' },
  { icon: '📱', title: 'Digital first', desc: 'Technology makes adoption faster, simpler and more accessible for everyone.' },
]

function About() {
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0, species: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getAllPets()
      .then(data => {
        if (cancelled) return
        const species = new Set(data.map(pet => pet.species).filter(Boolean))
        setStats({
          total: data.length,
          available: data.filter(pet => pet.status === 'AVAILABLE').length,
          adopted: data.filter(pet => pet.status === 'ADOPTED').length,
          species: species.size,
        })
        setStatsLoading(false)
      })
      .catch(() => {
        if (!cancelled) setStatsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const timelineWithLiveStats = timeline.map((item, i) => (
    i === timeline.length - 1
      ? {
          ...item,
          desc: statsLoading
            ? 'Loading current adoption numbers...'
            : `${stats.adopted} pets adopted and ${stats.available} currently available for adoption.`,
        }
      : item
  ))

  return (
    <div className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <img src={aboutImg} alt="Our mission" />
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-tag">Est. 2025 · Colombo, Sri Lanka</span>
          <h1>We believe every pet<br/>deserves a loving home 🐾</h1>
          <p>PawFind connects families with shelter animals through a simple, transparent, and digital adoption process.</p>
          <div className="about-hero-btns">
            <Link to="/pets" className="about-hero-btn-primary">Find a pet</Link>
            <Link to="/contact" className="about-hero-btn-outline">Contact us</Link>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="about-stats-strip">
        <div className="about-stats-item">
          <h2>{statsLoading ? '—' : stats.total}</h2>
          <p>Pets listed</p>
        </div>
        <div className="about-stats-item">
          <h2>{statsLoading ? '—' : stats.available}</h2>
          <p>Available now</p>
        </div>
        <div className="about-stats-item">
          <h2>{statsLoading ? '—' : stats.adopted}</h2>
          <p>Adopted pets</p>
        </div>
        <div className="about-stats-item">
          <h2>{statsLoading ? '—' : stats.species}</h2>
          <p>Species</p>
        </div>
      </div>

      {/* MISSION */}
      <div className="about-mission">
        <div className="about-mission-inner">
          <div className="about-mission-text">
            <span className="about-label">Our mission</span>
            <h2>Built to solve a real problem</h2>
            <p>Animal shelters in Sri Lanka manage hundreds of pets using paper registers and WhatsApp groups. We saw this problem firsthand and decided to build a solution.</p>
            <p>PawFind is a complete digital management system that replaces paper chaos with clean, transparent, and accessible technology — making adoption easier for shelters, staff, and adopters alike.</p>
            <div className="about-mission-highlights">
              <div className="about-highlight">
                <span>📄</span>
                <p>Replaced paper registers with digital pet profiles</p>
              </div>
              <div className="about-highlight">
                <span>📱</span>
                <p>Replaced WhatsApp chaos with structured online applications</p>
              </div>
              <div className="about-highlight">
                <span>📊</span>
                <p>Gave admins real-time analytics and dashboards</p>
              </div>
            </div>
          </div>
          <div className="about-mission-visual">
            <div className="about-mission-card">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80"
                alt="Dog at shelter"
                loading="lazy"
                decoding="async"
              />
              <div className="about-mission-card-tag">
                <span>🏠</span>
                <p>Every pet needs a home</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="about-timeline-section">
        <div className="about-timeline-inner">
          <span className="about-label">Our journey</span>
          <h2>How we got here</h2>
          <div className="about-timeline">
            {timelineWithLiveStats.map((item, i) => (
              <div key={i} className="about-timeline-item">
                <div className="about-timeline-dot"></div>
                <div className="about-timeline-content">
                  <span className="about-timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="about-values-section">
        <div className="about-values-inner">
          <span className="about-label">What drives us</span>
          <h2>Our values</h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="about-team-section">
        <div className="about-team-inner">
          <span className="about-label">The people behind PawFind</span>
          <h2>Meet the team</h2>
          <div className="about-team-grid">
            {team.map((t, i) => (
              <div key={i} className="about-team-card">
                <div className="about-team-avatar" style={{background: t.bg}}>
                  <span>{t.emoji}</span>
                </div>
                <h3>{t.name}</h3>
                <p className="about-team-role">{t.role}</p>
                <p className="about-team-sub">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="about-partners">
        <div className="about-partners-inner">
          <span className="about-label">Supported by</span>
          <h2>Our partners & supporters</h2>
          <div className="about-partners-grid">
            <div className="about-partner-card">🏥<p>Local Vet Clinics</p></div>
            <div className="about-partner-card">🎓<p>University Research</p></div>
            <div className="about-partner-card">🏛️<p>Animal Welfare Board</p></div>
            <div className="about-partner-card">❤️<p>Community Donors</p></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta-section">
        <div className="about-cta-inner">
          <h2>Ready to give a pet a loving home?</h2>
          <p>Browse our available pets and start your adoption journey today.</p>
          <div className="about-cta-btns">
            <Link to="/pets" className="about-btn-primary">Browse pets</Link>
            <Link to="/quiz" className="about-btn-outline">Take match quiz</Link>
            <Link to="/contact" className="about-btn-outline">Contact us</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About