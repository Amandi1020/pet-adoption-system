import '../styles/PetCard.css'

const emojiMap = {
  Dog: '🐶',
  Cat: '🐱',
  Bird: '🐦',
  Rabbit: '🐰',
}

const colorMap = {
  Dog: '#EEEDFE',
  Cat: '#E1F5EE',
  Bird: '#FAEEDA',
  Rabbit: '#FAECE7',
}

function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <div
        className="pet-img"
        style={{ background: colorMap[pet.species] || '#f0f0f0' }}
      >
        <span>{emojiMap[pet.species] || '🐾'}</span>
        {pet.status === 'ADOPTED' && (
          <span className="adopted-badge">Adopted</span>
        )}
      </div>
      <div className="pet-body">
        <h3>{pet.name}</h3>
        <p className="pet-breed">{pet.breed} · {pet.age} yr{pet.age > 1 ? 's' : ''}</p>
        <p className="pet-gender">{pet.gender} · {pet.species}</p>
        {pet.status === 'AVAILABLE' ? (
          <button className="adopt-btn">Adopt Me 🐾</button>
        ) : (
          <button className="adopted-btn">✓ Adopted</button>
        )}
      </div>
    </div>
  )
}

export default PetCard