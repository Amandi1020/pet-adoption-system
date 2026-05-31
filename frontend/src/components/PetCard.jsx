import { useNavigate } from 'react-router-dom'
import '../styles/PetCard.css'

// Import default fallback images per species
import dogDefault from '../assets/images/pets/dog-default.jpg'
import catDefault from '../assets/images/pets/cat-default.jpg'
import birdDefault from '../assets/images/pets/bird-default.jpg'
import rabbitDefault from '../assets/images/pets/rabbit-default.jpg'

const speciesDefaults = {
  Dog: dogDefault,
  Cat: catDefault,
  Bird: birdDefault,
  Rabbit: rabbitDefault,
}

function PetCard({ pet }) {
  const navigate = useNavigate()

  // Try to load individual pet photo
  // Falls back to species default if not found
  const getImage = () => {
    try {
      return require(`../assets/images/pets/${pet.name.toLowerCase()}.jpg`)
    } catch {
      return speciesDefaults[pet.species] || dogDefault
    }
  }

  return (
    <div className="pet-card" onClick={() => navigate(`/pets/${pet.id}`)}>
      <div className="pet-img-wrap">
        <img
          src={getImage()}
          alt={pet.name}
          onError={e => {
            e.target.src = speciesDefaults[pet.species] || dogDefault
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
          <button className="adopt-btn">View & Adopt 🐾</button>
        ) : (
          <button className="adopted-btn">✓ Adopted</button>
        )}
      </div>
    </div>
  )
}

export default PetCard