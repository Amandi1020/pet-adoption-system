import { useState } from 'react'
import PetCard from '../components/PetCard'
import '../styles/PetList.css'

const samplePets = [
  { id: 1, name: 'Bruno', breed: 'Golden Retriever', age: 2, species: 'Dog', gender: 'Male', status: 'AVAILABLE' },
  { id: 2, name: 'Luna', breed: 'Siamese Cat', age: 1, species: 'Cat', gender: 'Female', status: 'AVAILABLE' },
  { id: 3, name: 'Sunny', breed: 'African Grey Parrot', age: 3, species: 'Bird', gender: 'Male', status: 'AVAILABLE' },
  { id: 4, name: 'Coco', breed: 'Holland Lop Rabbit', age: 1, species: 'Rabbit', gender: 'Female', status: 'ADOPTED' },
  { id: 5, name: 'Max', breed: 'Labrador', age: 4, species: 'Dog', gender: 'Male', status: 'AVAILABLE' },
  { id: 6, name: 'Mimi', breed: 'Persian Cat', age: 2, species: 'Cat', gender: 'Female', status: 'AVAILABLE' },
]

function PetList() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = samplePets.filter(pet => {
    const matchSearch = pet.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || pet.species === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="petlist-page">
      <div className="petlist-header">
        <h1>Find Your Companion</h1>
        <p>Browse all available pets</p>
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="petlist-body">
        <div className="filter-bar">
          {['All', 'Dog', 'Cat', 'Bird', 'Rabbit'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="pets-grid">
          {filtered.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetList