import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPetById } from '../services/petService'
import { getPetImage, getSpeciesFallbackImage } from '../utils/petImage'
import '../styles/PetDetail.css'

function PetDetail() {
  const { id } = useParams()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getPetById(id)
      .then(data => {
        if (cancelled) return
        setPet(data || null)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setPet(null)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
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

  return (
    <div className="detail-page">
      <div className="detail-container">

        <div className="detail-img-wrap">
          <img
            src={getPetImage(pet)}
            alt={`${pet.name}, ${pet.breed || pet.species}`}
            decoding="async"
            onError={e => {
              e.target.src = getSpeciesFallbackImage(pet.species)
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