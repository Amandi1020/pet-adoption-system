import { useNavigate } from 'react-router-dom'
import '../styles/PetCard.css'

const petImages = {
  Dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  Cat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',
  Bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80',
}

function PetCard({ pet }) {
  const navigate = useNavigate()

  return (
    <div className="pet-card" onClick={() => navigate(`/pets/${pet.id}`)}>
      <div className="pet-img-wrap">
        <img
          src={petImages[pet.species] || petImages['Dog']}
          alt={pet.name}
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