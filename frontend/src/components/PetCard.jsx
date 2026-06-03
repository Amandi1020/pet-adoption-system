import { useNavigate } from 'react-router-dom'
import '../styles/PetCard.css'

const petImagesByName = {
  // Add your pet names here with their photo URLs
  // Format: 'petname in lowercase': 'image url'
  'bruno': 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  'luna': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',
  'sunny': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  'coco': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80',
  'max': 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80',
  'mimi': 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&q=80',
}

const speciesDefaults = {
  'Dog': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  'Cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  'Bird': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  'Rabbit': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80',
}

function PetCard({ pet }) {
  const navigate = useNavigate()

  const getImage = () => {
    // First check if pet has unique photo by name
    const nameKey = pet.name?.toLowerCase()
    if (petImagesByName[nameKey]) {
      return petImagesByName[nameKey]
    }
    // Fall back to species default
    return speciesDefaults[pet.species] || speciesDefaults['Dog']
  }

  return (
    <div className="pet-card" onClick={() => navigate(`/pets/${pet.id}`)}>
      <div className="pet-img-wrap">
        <img
          src={getImage()}
          alt={pet.name}
          onError={e => {
            e.target.src = speciesDefaults[pet.species] || speciesDefaults['Dog']
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