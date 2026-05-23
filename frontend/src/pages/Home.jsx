import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllPets } from '../services/petService'
import '../styles/Home.css'

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
    alt: 'Golden Retriever dog',
    tag: 'Featured this week',
    title: 'Find your perfect furry companion',
    sub: 'Over 120 loving pets waiting for a warm home. Browse dogs, cats, birds and more.',
  },
  {
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80',
    alt: 'Cute cat',
    tag: 'New arrivals',
    title: 'Cats looking for cozy loving homes',
    sub: 'Gentle, playful and affectionate — our cats are ready to curl up with you.',
  },
  {
    img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1200&q=80',
    alt: 'Colourful parrot',
    tag: 'Special adoption',
    title: 'Birds that bring joy to every home',
    sub: 'Colourful, vocal and full of personality — adopt a feathered friend today.',
  },
  {
    img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1200&q=80',
    alt: 'Fluffy rabbit',
    tag: 'Gentle companions',
    title: 'Rabbits — soft, calm and loving',
    sub: 'Perfect for families and apartment living. Easy to care for and full of character.',
  },
]

const petImages = {
  Dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  Cat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',
  Bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80',
}

function Home() {
  const [current, setCurrent] = useState(0)
  const [pets, setPets] = useState([])
  const [stats, setStats] = useState({
    available: 0,
    adopted: 0,
    pending: 0,
    species: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    getAllPets().then(data => {
      setPets(data.slice(0, 6))
      const available = data.filter(p => p.status === 'AVAILABLE').length
      const adopted = data.filter(p => p.status === 'ADOPTED').length
      const speciesSet = new Set(data.map(p => p.species).filter(Boolean))
      setStats({
        available,
        adopted,
        species: speciesSet.size,
        pending: 0,
      })
    })

    // fetch pending applications count
    fetch('http://localhost:8080/api/applications')
      .then(res => res.json())
      .then(data => {
        const pending = data.filter(a => a.status === 'PENDING').length
        setStats(prev => ({...prev, pending}))
      })
      .catch(() => {})
  }, [])

  return (
    <div className="home">

      {/* HERO CAROUSEL */}
      <div className="hero">
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${i === current ? 'active' : ''}`}>
            <img src={slide.img} alt={slide.alt} />
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <span className="slide-tag">{slide.tag}</span>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-sub">{slide.sub}</p>
              <div className="slide-btns">
                <Link to="/pets" className="btn-cream">Browse pets</Link>
                <Link to="/quiz" className="btn-outline">Take the quiz</Link>
              </div>
            </div>
          </div>
        ))}
        <button className="nav-arrow prev" onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}>‹</button>
        <button className="nav-arrow next" onClick={() => setCurrent(c => (c + 1) % slides.length)}>›</button>
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)}></button>
          ))}
        </div>
        <div className="slide-counter">{current + 1} / {slides.length}</div>
      </div>

      {/* REAL STATS */}
      <div className="stats-row">
        <div className="stat-item"><h2>{stats.available}</h2><p>Pets available</p></div>
        <div className="stat-item"><h2>{stats.adopted}</h2><p>Successfully adopted</p></div>
        <div className="stat-item"><h2>{stats.pending}</h2><p>Applications pending</p></div>
        <div className="stat-item"><h2>{stats.species}</h2><p>Species</p></div>
      </div>

      {/* PET CARDS */}
      <div className="home-section">
        <div className="sec-header">
          <div>
            <h2 className="sec-title">Available pets</h2>
            <p className="sec-sub">Find your perfect companion from our shelter</p>
          </div>
          <Link to="/pets" className="view-all-btn">View all</Link>
        </div>
        <div className="home-pets-grid">
          {pets.map(pet => (
            <div className="home-pet-card" key={pet.id}>
              <div className="home-pet-img">
                <img
                  src={petImages[pet.species] || petImages['Dog']}
                  alt={pet.name}
                />
                {pet.status === 'ADOPTED' && (
                  <span className="home-pet-badge badge-adopted">Adopted</span>
                )}
              </div>
              <div className="home-pet-body">
                <p className="home-pet-name">{pet.name}</p>
                <p className="home-pet-info">{pet.breed} · {pet.age} yr{pet.age > 1 ? 's' : ''}</p>
                {pet.status === 'AVAILABLE' ? (
                  <Link to="/adopt" className="home-adopt-btn">Adopt me</Link>
                ) : (
                  <button className="home-adopted-btn">✓ Adopted</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="home-features">
        <h2 className="sec-title">Why choose PawFind?</h2>
        <p className="sec-sub">We make pet adoption simple, safe and joyful</p>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-icon">🔍</div>
            <h3>Easy search</h3>
            <p>Filter by species, age, size and gender to find your ideal match</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">💉</div>
            <h3>Health verified</h3>
            <p>All pets have full vaccination records and vet checkup history</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">❤️</div>
            <h3>Match quiz</h3>
            <p>Answer 7 lifestyle questions and we find your perfect pet type</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📋</div>
            <h3>Simple process</h3>
            <p>Apply online, track status, and bring your pet home easily</p>
          </div>
        </div>
      </div>

      {/* QUIZ BANNER */}
      <div className="quiz-banner">
        <div>
          <h3>Not sure which pet suits you?</h3>
          <p>Answer 7 quick questions about your lifestyle and we'll find your match.</p>
        </div>
        <Link to="/quiz" className="btn-cream">Take the quiz ↗</Link>
      </div>

      {/* SUCCESS STORIES */}
      <div className="home-section">
        <h2 className="sec-title">Success stories</h2>
        <p className="sec-sub">Families who found their perfect companion through PawFind</p>
        <div className="stories-grid">
          <div className="story-card">
            <p className="story-pet">🐶 Max the Labrador</p>
            <p className="story-text">"Max changed our family completely. He is the best thing that happened to us this year!"</p>
            <p className="story-author">— Nimal & family, Colombo</p>
          </div>
          <div className="story-card">
            <p className="story-pet">🐱 Mimi the Persian</p>
            <p className="story-text">"Mimi settled in within a day. She is so gentle with our kids. Thank you PawFind!"</p>
            <p className="story-author">— Ayesha, Kandy</p>
          </div>
          <div className="story-card">
            <p className="story-pet">🐦 Rio the Parrot</p>
            <p className="story-text">"Rio already knows our names. Smartest pet I have ever had. Couldn't be happier!"</p>
            <p className="story-author">— Kasun, Galle</p>
          </div>
        </div>
        <div style={{textAlign:'center', marginTop:'1.5rem'}}>
          <Link to="/stories" className="view-all-btn">View all stories</Link>
        </div>
      </div>

      {/* CTA */}
      <div className="home-cta">
        <h2>Ready to find your companion?</h2>
        <p>Join hundreds of happy families who found their perfect pet through PawFind</p>
        <div className="cta-btns">
          <Link to="/pets" className="btn-cream">Browse all pets</Link>
          <Link to="/adopt" className="btn-outline-dark">Apply to adopt</Link>
        </div>
      </div>

    </div>
  )
}

export default Home