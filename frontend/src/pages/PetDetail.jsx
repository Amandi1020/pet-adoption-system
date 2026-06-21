import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPetById } from '../services/petService'
import '../styles/PetDetail.css'

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

const petImagesByName = {
  'bruno': brunoImg,
  'luna': lunaImg,
  'coco': cocoImg,
  'max': maxImg,
  'mimi': mimiImg,
  'sunny': sunnyImg,
  'bella': bellaImg,
  'daisy': daisyImg,
  'kiwi': kiwiImg,
  'milo': miloImg,
  'rosi': rosiImg,
}

const speciesDefaults = {
  'Dog': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
  'Cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
  'Bird': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80',
  'Rabbit': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
}

function PetDetail() {
  const { id } = useParams()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPetById(id).then(data => {
      setPet(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="detail-loading">
      <p>Loading pet details...</p>
    </div>
  )

  if (!pet) return (
    <div className="detail-loading">
      <p>Pet not found.</p>
      <Link to="/pets" className="detail-back-btn">← Back to listings</Link>
    </div>
  )

  const getImage = () => {
    const nameKey = pet.name?.toLowerCase()
    return petImagesByName[nameKey] || speciesDefaults[pet.species] || speciesDefaults['Dog']
  }

  return (
    <div className="detail-page">
      <div className="detail-container">

        <div className="detail-img-wrap">
          <img
            src={getImage()}
            alt={pet.name}
            onError={e => {
              e.target.src = speciesDefaults[pet.species] || speciesDefaults['Dog']
            }}
          />
          <span className={`detail-status ${pet.status === 'AVAILABLE' ? 'status-available' : 'status-adopted'}`}>
            {pet.status === 'AVAILABLE' ? '✓ Available' : '✓ Adopted'}
          </span>
        </div>

        <div className="detail-info">
          <Link to="/pets" className="detail-back">← Back to listings</Link>
          <h1 className="detail-name">{pet.name}</h1>
          <p className="detail-breed">{pet.breed}</p>

          <div className="detail-tags">
            <span className="detail-tag">{pet.species}</span>
            <span className="detail-tag">{pet.gender}</span>
            <span className="detail-tag">{pet.size}</span>
            <span className="detail-tag">
              {pet.age >= 12
                ? `${Math.floor(pet.age / 12)} yr${Math.floor(pet.age / 12) > 1 ? 's' : ''} old`
                : `${pet.age} month${pet.age > 1 ? 's' : ''} old`}
            </span>
          </div>

          <div className="detail-desc">
            <h3>About {pet.name}</h3>
            <p>{pet.description || `${pet.name} is a wonderful ${pet.species?.toLowerCase()} looking for a loving home.`}</p>
          </div>

          <div className="detail-facts">
            <div className="fact-item">
              <span className="fact-label">Species</span>
              <span className="fact-value">{pet.species}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Breed</span>
              <span className="fact-value">{pet.breed || 'Mixed'}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Age</span>
              <span className="fact-value">
                {pet.age >= 12
                  ? `${Math.floor(pet.age / 12)} year${Math.floor(pet.age / 12) > 1 ? 's' : ''}`
                  : `${pet.age} month${pet.age > 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Gender</span>
              <span className="fact-value">{pet.gender}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Size</span>
              <span className="fact-value">{pet.size}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Status</span>
              <span className="fact-value">{pet.status}</span>
            </div>
          </div>

          {pet.status === 'AVAILABLE' ? (
            <Link to={`/adopt/${pet.id}`} className="detail-adopt-btn">
                🐾 Apply to Adopt {pet.name}
              </Link>
          ) : (
            <button className="detail-adopted-btn" disabled>
              ✓ This pet has been adopted
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default PetDetail