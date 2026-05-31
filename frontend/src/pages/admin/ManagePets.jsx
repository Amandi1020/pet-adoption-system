import { useState, useEffect, useCallback} from 'react'
import Toast from '../../components/Toast'
import BASE_URL from '../../services/api'
import '../../styles/Admin.css'

function ManagePets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newPet, setNewPet] = useState({
  name: '', species: '', breed: '',
  age: 1, ageUnit: 'years', gender: 'Male', size: 'Medium',
  status: 'AVAILABLE', description: ''
})
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPets()
  }, [])
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const fetchPets = () => {
    fetch(`${BASE_URL}/pets`)
      .then(res => res.json())
      .then(data => {
        setPets(data)
        setLoading(false)
      })
  }

  const handleAddPet = async (e) => {
  e.preventDefault()
  try {
    const ageInMonths = newPet.ageUnit === 'months'
      ? parseInt(newPet.age)
      : parseInt(newPet.age) * 12

    const petToSend = {
      name: newPet.name,
      species: newPet.species,
      breed: newPet.breed,
      age: ageInMonths,
      gender: newPet.gender,
      size: newPet.size,
      status: newPet.status,
      description: newPet.description ||
        `${newPet.name} is a lovely ${newPet.species?.toLowerCase()}`
    }

    const response = await fetch(`${BASE_URL}/pets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petToSend)
    })

    if (response.ok) {
      setToast({
        message: `🐾 ${newPet.name} was added successfully!`,
        type: 'success'
      })
      setShowForm(false)
      setNewPet({
        name: '', species: '', breed: '',
        age: 1, ageUnit: 'years', gender: 'Male',
        size: 'Medium', status: 'AVAILABLE', description: ''
      })
      fetchPets()
    } else {
      setToast({
        message: 'Failed to add pet. Please try again.',
        type: 'error'
      })
    }
  } catch (err) {
    setToast({
      message: 'Error adding pet. Check your connection.',
      type: 'error'
    })
  }
}

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      await fetch(`${BASE_URL}/pets/${id}`, { method: 'DELETE' })
      setPets(pets.filter(p => p.id !== id))
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">🐾 Manage Pets</h1>
        <button
          className="add-pet-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add New Pet'}
        </button>
      </div>

      {message && <p className="success-msg">{message}</p>}

      {showForm && (
        <div className="pet-form-card">
          <h3>Add New Pet</h3>
          <form onSubmit={handleAddPet}>
            <div className="form-row">
              <input
                placeholder="Pet name"
                value={newPet.name}
                onChange={e => setNewPet({...newPet, name: e.target.value})}
                required
              />
              <input
                placeholder="Species (Dog, Cat...)"
                value={newPet.species}
                onChange={e => setNewPet({...newPet, species: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                placeholder="Breed"
                value={newPet.breed}
                onChange={e => setNewPet({...newPet, breed: e.target.value})}
              />
              <div style={{display:'flex', gap:'6px'}}>
  <div style={{display:'flex', alignItems:'center', gap:'4px', flex:1,
    border:'1.5px solid #D7CCC8', borderRadius:'8px', overflow:'hidden',
    background:'#FFF8E7'}}>
    <button
      type="button"
      onClick={() => setNewPet({...newPet, age: Math.max(0, (parseInt(newPet.age)||0) - 1)})}
      style={{background:'#EFEBE9', border:'none', padding:'10px 12px',
        cursor:'pointer', fontSize:'16px', color:'#4E342E', fontWeight:'bold'}}
    >−</button>
    <input
      type="number"
      value={newPet.age}
      onChange={e => setNewPet({...newPet, age: e.target.value})}
      required
      min="0"
      style={{width:'100%', border:'none', outline:'none', textAlign:'center',
        fontSize:'14px', background:'transparent', color:'#4E342E'}}
    />
    <button
      type="button"
      onClick={() => setNewPet({...newPet, age: (parseInt(newPet.age)||0) + 1})}
      style={{background:'#EFEBE9', border:'none', padding:'10px 12px',
        cursor:'pointer', fontSize:'16px', color:'#4E342E', fontWeight:'bold'}}
    >+</button>
  </div>
  <select
    value={newPet.ageUnit || 'years'}
    onChange={e => setNewPet({...newPet, ageUnit: e.target.value})}
    style={{padding:'10px', borderRadius:'8px', border:'1.5px solid #D7CCC8',
      fontSize:'13px', background:'#FFF8E7', color:'#4E342E', outline:'none'}}
  >
    <option value="months">Months</option>
    <option value="years">Years</option>
    </select>
    </div>
            </div>
            <div className="form-row">
              <select
                value={newPet.gender}
                onChange={e => setNewPet({...newPet, gender: e.target.value})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={newPet.size}
                onChange={e => setNewPet({...newPet, size: e.target.value})}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={newPet.description}
              onChange={e => setNewPet({...newPet, description: e.target.value})}
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #e0e0e0',fontSize:'14px',minHeight:'80px',
                marginBottom:'10px'}}
            />
            <button type="submit" className="auth-btn">Add Pet</button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading pets...</p>
      ) : (
        <div className="pets-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map(pet => (
                <tr key={pet.id}>
                  <td>{pet.id}</td>
                  <td>{pet.name}</td>
                  <td>{pet.species}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>
                    <span className="status-badge"
                      style={{background: pet.status === 'AVAILABLE' ? '#1D9E75' : '#888'}}>
                      {pet.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="reject-btn"
                      onClick={() => handleDelete(pet.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  )
}

export default ManagePets