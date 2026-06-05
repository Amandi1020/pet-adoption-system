import { useNavigate } from 'react-router-dom'
import '../styles/PetCard.css'

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
  'Dog': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  'Cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  'Bird': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  'Rabbit': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80',
}

function PetCard({ pet }) {
  const navigate = useNavigate()

  const getImage = () => {
    const nameKey = pet.name?.toLowerCase()
    return petImagesByName[nameKey] || speciesDefaults[pet.species] || speciesDefaults['Dog']
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