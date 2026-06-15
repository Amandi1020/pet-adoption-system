import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner'
import PetCard from '../components/PetCard'
import { getAllPets } from '../services/petService'
import '../styles/PetList.css'

function PetList() {
  const [pets, setPets] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Read species filter from navigation state (from CareGuide)
  useEffect(() => {
    if (location.state?.species) {
      setFilter(location.state.species)
    }
  }, [location.state])

  useEffect(() => {
    getAllPets()
      .then(data => {
        setPets(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching pets:', err)
        setLoading(false)
      })
  }, [])

  const filtered = pets.filter(pet => {
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

        {loading ? (
          <Spinner message="Loading pets..." />
        ) : (
          <div className="pets-grid">
            {filtered.length === 0 ? (
              <p style={{color:'#8D6E63', fontSize:'14px', padding:'1rem'}}>
                No pets found.
              </p>
            ) : (
              filtered.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PetList