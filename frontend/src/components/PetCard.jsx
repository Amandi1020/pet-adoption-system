import { Link } from 'react-router-dom'
import { getPetImage, getSpeciesFallbackImage } from '../utils/petImage'
import '../styles/PetCard.css'

function PetCard({ pet }) {
  return (
    <Link to={`/pets/${pet.id}`} className="pet-card">
      <div className="pet-img-wrap">
        <img
          src={getPetImage(pet)}
          alt={`${pet.name}, ${pet.breed || pet.species}`}
          loading="lazy"
          decoding="async"
          onError={e => {
            e.target.src = getSpeciesFallbackImage(pet.species)
          }}
        />
        {pet.status === 'ADOPTED' && (
          <span className="adopted-badge">Adopted</span>
        )}
      </div>
      <div className="pet-body">
        <h3>{pet.name}</h3>
        <p className="pet-breed">
          {pet.breed} · {pet.age >= 12
            ? `${Math.floor(pet.age / 12)} yr${Math.floor(pet.age / 12) > 1 ? 's' : ''}`
            : `${pet.age} month${pet.age > 1 ? 's' : ''}`}
        </p>
        <p className="pet-gender">{pet.gender} · {pet.species}</p>
        {pet.status === 'AVAILABLE' ? (
          <span className="adopt-btn">View & Adopt 🐾</span>
        ) : (
          <span className="adopted-btn">✓ Adopted</span>
        )}
      </div>
    </Link>
  )
}

export default PetCard