import slide1 from '../assets/images/carousel/slide1.jpg'
import slide2 from '../assets/images/carousel/slide2.jpg'
import slide3 from '../assets/images/carousel/slide3.jpg'
import slide4 from '../assets/images/carousel/slide4.jpg'
import brunoImg from '../assets/images/pets/bruno.jpg'
import lunaImg from '../assets/images/pets/luna.jpg'
import cocoImg from '../assets/images/pets/coco.jpg'
import maxImg from '../assets/images/pets/max.jpg'
import mimiImg from '../assets/images/pets/mimi.jpg'
import sunnyImg from '../assets/images/pets/sunny.jpg'
import bellaImg from '../assets/images/pets/bella.jpg'
import daisyImg from '../assets/images/pets/daisy.jpg'
import kiwiImg from '../assets/images/pets/kiwi.jpg'
import miloImg from '../assets/images/pets/milo.jpg'
import rosiImg from '../assets/images/pets/rosi.jpg'
import dogDefault from '../assets/images/pets/dog-default.jpg'
import catDefault from '../assets/images/pets/cat-default.jpg'
import birdDefault from '../assets/images/pets/bird-default.jpg'
import rabbitDefault from '../assets/images/pets/rabbit-default.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllPets } from '../services/petService'
import '../styles/Home.css'

const slides = [
  {
    img: slide1,
    alt: 'Happy dog looking for a home',
    tag: '🐶 Featured this week',
    title: 'Find your perfect furry companion',
    sub: 'Over 120 loving pets waiting for a warm home. Browse dogs, cats, birds and more.',
    btn1: 'Browse pets', btn1Link: '/pets',
    btn2: 'Take the quiz', btn2Link: '/quiz',
  },
  {
    img: slide2,
    alt: 'Cute cat waiting for adoption',
    tag: '🐱 New arrivals',
    title: 'Cats looking for cozy loving homes',
    sub: 'Gentle, playful and affectionate — our cats are ready to curl up with you.',
    btn1: 'Meet the cats', btn1Link: '/pets',
    btn2: 'Apply now', btn2Link: '/adopt',
  },
  {
    img: slide3,
    alt: 'Colourful bird at the shelter',
    tag: '🐦 Special adoption',
    title: 'Birds that bring joy to every home',
    sub: 'Colourful, vocal and full of personality — adopt a feathered friend today.',
    btn1: 'See birds', btn1Link: '/pets',
    btn2: 'Learn more', btn2Link: '/care-guide',
  },
  {
    img: slide4,
    alt: 'Fluffy rabbit ready for adoption',
    tag: '🐰 Gentle companions',
    title: 'Rabbits — soft, calm and loving',
    sub: 'Perfect for families and apartment living. Easy to care for and full of character.',
    btn1: 'See rabbits', btn1Link: '/pets',
    btn2: 'Care guide', btn2Link: '/care-guide',
  },
]

const petImagesByName = {
  'bruno': brunoImg, 'luna': lunaImg, 'coco': cocoImg,
  'max': maxImg, 'mimi': mimiImg, 'sunny': sunnyImg,
  'bella': bellaImg, 'daisy': daisyImg, 'kiwi': kiwiImg,
  'milo': miloImg, 'rosi': rosiImg,
}

const speciesDefaults = {
  'Dog': dogDefault, 'Cat': catDefault,
  'Bird': birdDefault, 'Rabbit': rabbitDefault,
}

function Home() {
  const [current, setCurrent] = useState(0)
  const [pets, setPets] = useState([])
  const [stats, setStats] = useState({ available: 0, adopted: 0, pending: 0, species: 0 })

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    getAllPets().then(data => {
      setPets(data.slice(0, 6))
      const available = data.filter(p => p.status === 'AVAILABLE').length
      const adopted = data.filter(p => p.status === 'ADOPTED').length
      const speciesSet = new Set(data.map(p => p.species).filter(Boolean))
      setStats({ available, adopted, species: speciesSet.size, pending: 0 })
    })
    fetch('http://localhost:8080/api/applications')
      .then(res => res.json())
      .then(data => {
        const pending = data.filter(a => a.status === 'PENDING').length
        setStats(prev => ({...prev, pending}))
      })
      .catch(() => {})
  }, [])

  const getImage = (pet) => {
    const nameKey = pet.name?.toLowerCase()
    return petImagesByName[nameKey] || speciesDefaults[pet.species] || dogDefault
  }

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
                <Link to={slide.btn1Link} className="btn-cream">{slide.btn1}</Link>
                <Link to={slide.btn2Link} className="btn-outline">{slide.btn2}</Link>
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

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">🐾</span>
          <h2>{stats.available}</h2>
          <p>Pets available</p>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏠</span>
          <h2>{stats.adopted}</h2>
          <p>Successfully adopted</p>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📋</span>
          <h2>{stats.pending}</h2>
          <p>Applications pending</p>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌿</span>
          <h2>{stats.species}</h2>
          <p>Species</p>
        </div>
      </div>

      {/* FEATURED PETS */}
      <div className="home-section">
        <div className="sec-header">
          <div>
            <h2 className="sec-title">Available pets</h2>
            <p className="sec-sub">Find your perfect companion from our shelter</p>
          </div>
          <Link to="/pets" className="view-all-btn">View all →</Link>
        </div>
        <div className="home-pets-grid">
          {pets.map(pet => (
            <div
              className="home-pet-card"
              key={pet.id}
              onClick={() => window.location.href = `/pets/${pet.id}`}
            >
              <div className="home-pet-img">
                <img
                  src={getImage(pet)}
                  alt={pet.name}
                  onError={e => { e.target.src = speciesDefaults[pet.species] || dogDefault }}
                />
                {pet.status === 'ADOPTED' && (
                  <span className="home-pet-badge badge-adopted">Adopted</span>
                )}
                {pet.status === 'AVAILABLE' && (
                  <span className="home-pet-badge badge-available">Available</span>
                )}
              </div>
              <div className="home-pet-body">
                <p className="home-pet-name">{pet.name}</p>
                <p className="home-pet-info">
                  {pet.breed} · {pet.age >= 12
                    ? `${Math.floor(pet.age / 12)} yr${Math.floor(pet.age / 12) > 1 ? 's' : ''}`
                    : `${pet.age} month${pet.age > 1 ? 's' : ''}`}
                </p>
                <p className="home-pet-species">{pet.species} · {pet.gender}</p>
                {pet.status === 'AVAILABLE'
                  ? <span className="home-adopt-btn">View & Adopt 🐾</span>
                  : <span className="home-adopted-btn">✓ Adopted</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY PAWFIND */}
      <div className="home-why">
        <div className="home-why-inner">
          <div className="home-why-text">
            <span className="home-why-tag">Why PawFind?</span>
            <h2>Making adoption simple, safe and joyful</h2>
            <p>We built PawFind because every pet deserves a loving home, and every family deserves to find their perfect companion without the hassle of paperwork and phone queues.</p>
            <div className="home-why-points">
              <div className="home-why-point">
                <span>✅</span>
                <p>All pets are vaccinated and vet-checked before listing</p>
              </div>
              <div className="home-why-point">
                <span>✅</span>
                <p>Online application — no paperwork, no queues</p>
              </div>
              <div className="home-why-point">
                <span>✅</span>
                <p>Real-time application status tracking</p>
              </div>
              <div className="home-why-point">
                <span>✅</span>
                <p>Personality quiz to find your perfect pet match</p>
              </div>
            </div>
            <Link to="/about" className="home-why-btn">Learn more about us →</Link>
          </div>
          <div className="home-why-img">
            <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80" alt="Happy pet owner" />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="home-features">
        <h2 className="sec-title">Everything you need</h2>
        <p className="sec-sub">All the tools to make your adoption journey smooth and enjoyable</p>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-icon">🔍</div>
            <h3>Smart search</h3>
            <p>Filter by species, age, size and gender to find your ideal match instantly</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">❤️</div>
            <h3>Match quiz</h3>
            <p>7 lifestyle questions that suggest the perfect pet type for your home</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📋</div>
            <h3>Online application</h3>
            <p>Apply in minutes from your phone or laptop — no paperwork needed</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">💉</div>
            <h3>Health verified</h3>
            <p>Complete vaccination records and vet history for every pet</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📍</div>
            <h3>Status tracking</h3>
            <p>Follow your application from pending to approved in real time</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🌟</div>
            <h3>Success stories</h3>
            <p>Read real stories from families who found their perfect companion</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <h2 className="sec-title">How it works</h2>
        <p className="sec-sub">Adopt your perfect pet in 4 simple steps</p>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-num">1</div>
            <h3>Browse pets</h3>
            <p>Search and filter all available pets by species, age, size and gender</p>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <h3>Take the quiz</h3>
            <p>Answer 7 lifestyle questions and get matched with your perfect pet</p>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <h3>Apply online</h3>
            <p>Submit your adoption application online in minutes — no paperwork</p>
          </div>
          <div className="step-item">
            <div className="step-num">4</div>
            <h3>Bring them home</h3>
            <p>Once approved, visit the shelter and bring your companion home!</p>
          </div>
        </div>
      </div>

      {/* QUIZ BANNER */}
      <div className="quiz-banner">
        <div className="quiz-banner-text">
          <span className="quiz-banner-emoji">🤔</span>
          <h3>Not sure which pet suits you?</h3>
          <p>Answer 7 quick questions about your lifestyle and we'll find your perfect match.</p>
        </div>
        <Link to="/quiz" className="btn-cream">Take the quiz ↗</Link>
      </div>

      {/* SUCCESS STORIES */}
      <div className="home-section">
        <div className="sec-header">
          <div>
            <h2 className="sec-title">Success stories</h2>
            <p className="sec-sub">Families who found their perfect companion through PawFind</p>
          </div>
          <Link to="/stories" className="view-all-btn">View all →</Link>
        </div>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-quote">❝</div>
            <p className="story-text">Max changed our family completely. He is the best thing that happened to us this year!</p>
            <div className="story-footer">
              <span className="story-pet-icon">🐶</span>
              <div>
                <p className="story-pet">Max the Labrador</p>
                <p className="story-author">Nimal & family, Colombo</p>
              </div>
            </div>
          </div>
          <div className="story-card">
            <div className="story-quote">❝</div>
            <p className="story-text">Mimi settled in within a day. She is so gentle with our kids. Thank you PawFind!</p>
            <div className="story-footer">
              <span className="story-pet-icon">🐱</span>
              <div>
                <p className="story-pet">Mimi the Persian</p>
                <p className="story-author">Ayesha, Kandy</p>
              </div>
            </div>
          </div>
          <div className="story-card">
            <div className="story-quote">❝</div>
            <p className="story-text">Rio already knows our names. Smartest pet I have ever had. Couldn't be happier!</p>
            <div className="story-footer">
              <span className="story-pet-icon">🐦</span>
              <div>
                <p className="story-pet">Rio the Parrot</p>
                <p className="story-author">Kasun, Galle</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="home-cta">
        <div className="home-cta-inner">
          <span className="home-cta-emoji">🐾</span>
          <h2>Ready to find your companion?</h2>
          <p>Join hundreds of happy families who found their perfect pet through PawFind</p>
          <div className="cta-btns">
            <Link to="/pets" className="btn-cream">Browse all pets</Link>
            <Link to="/adopt" className="btn-outline-dark">Apply to adopt</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home