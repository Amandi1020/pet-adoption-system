import { useState, useEffect, useCallback} from 'react'
import Toast from '../../components/Toast'
import { apiFetch } from '../../services/api'
import { updatePet } from '../../services/petService'
import '../../styles/Admin.css'

const emptyPet = {
  name: '', species: '', breed: '',
  age: 1, ageUnit: 'years', gender: 'Male',
  size: 'Medium', status: 'AVAILABLE', description: ''
}

function ManagePets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formPet, setFormPet] = useState(emptyPet)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    let cancelled = false

    apiFetch('/pets', { fallbackMessage: 'Failed to load pets.' })
      .then(data => {
        if (!cancelled) {
          setPets(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setToast({ message: err.message || 'Failed to load pets.', type: 'error' })
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormPet(emptyPet)
  }

  const startAdd = () => {
    if (showForm && !editingId) {
      resetForm()
      return
    }
    setEditingId(null)
    setFormPet(emptyPet)
    setShowForm(true)
  }

  const startEdit = (pet) => {
    setEditingId(pet.id)
    setFormPet({
      name: pet.name || '',
      species: pet.species || '',
      breed: pet.breed || '',
      age: pet.age ?? 1,
      ageUnit: 'months',
      gender: pet.gender || 'Male',
      size: pet.size || 'Medium',
      status: pet.status || 'AVAILABLE',
      description: pet.description || ''
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const ageInMonths = formPet.ageUnit === 'months'
        ? parseInt(formPet.age)
        : parseInt(formPet.age) * 12

      const petToSend = {
        name: formPet.name,
        species: formPet.species,
        breed: formPet.breed,
        age: ageInMonths,
        gender: formPet.gender,
        size: formPet.size,
        status: formPet.status,
        description: formPet.description ||
          `${formPet.name} is a lovely ${formPet.species?.toLowerCase()}`
      }

      if (editingId) {
        const updatedPet = await updatePet(editingId, petToSend)
        setPets(current => current.map(p => p.id === editingId ? updatedPet : p))
        setToast({ message: `🐾 ${formPet.name} was updated successfully!`, type: 'success' })
      } else {
        const createdPet = await apiFetch('/pets', {
          method: 'POST',
          body: petToSend,
          fallbackMessage: 'Failed to add pet. Please try again.',
        })
        setPets(current => [...current, createdPet])
        setToast({ message: `🐾 ${formPet.name} was added successfully!`, type: 'success' })
      }

      resetForm()
    } catch (err) {
      setToast({
        message: err.message || `Error ${editingId ? 'updating' : 'adding'} pet. Check your connection.`,
        type: 'error'
      })
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return

    try {
      await apiFetch(`/pets/${id}`, {
        method: 'DELETE',
        fallbackMessage: 'Failed to delete pet.',
      })
      setPets(current => current.filter(p => p.id !== id))
    } catch (err) {
      setToast({ message: err.message || 'Failed to delete pet.', type: 'error' })
    }
  }

  const updateForm = (field, value) => {
    setFormPet(current => ({ ...current, [field]: value }))
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">🐾 Manage Pets</h1>
        <button
          type="button"
          className="add-pet-btn"
          aria-expanded={showForm}
          aria-controls="pet-form"
          onClick={startAdd}
        >
          {showForm && !editingId ? '✕ Cancel' : '+ Add New Pet'}
        </button>
      </div>

      {showForm && (
        <div className="pet-form-card" id="pet-form">
          <h3>{editingId ? 'Edit Pet' : 'Add New Pet'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                aria-label="Pet name"
                placeholder="Pet name"
                value={formPet.name}
                onChange={e => updateForm('name', e.target.value)}
                required
              />
              <input
                aria-label="Species"
                placeholder="Species (Dog, Cat...)"
                value={formPet.species}
                onChange={e => updateForm('species', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                aria-label="Breed"
                placeholder="Breed"
                value={formPet.breed}
                onChange={e => updateForm('breed', e.target.value)}
              />
              <div style={{display:'flex', gap:'6px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'4px', flex:1,
                  border:'1.5px solid #D7CCC8', borderRadius:'8px', overflow:'hidden',
                  background:'#FFF8E7'}}>
                  <button
                    type="button"
                    aria-label="Decrease age"
                    onClick={() => updateForm('age', Math.max(0, (parseInt(formPet.age)||0) - 1))}
                    style={{background:'#EFEBE9', border:'none', padding:'10px 12px',
                      cursor:'pointer', fontSize:'16px', color:'#4E342E', fontWeight:'bold'}}
                  >−</button>
                  <input
                    type="number"
                    aria-label="Age"
                    value={formPet.age}
                    onChange={e => updateForm('age', e.target.value)}
                    required
                    min="0"
                    style={{width:'100%', border:'none', outline:'none', textAlign:'center',
                      fontSize:'14px', background:'transparent', color:'#4E342E'}}
                  />
                  <button
                    type="button"
                    aria-label="Increase age"
                    onClick={() => updateForm('age', (parseInt(formPet.age)||0) + 1)}
                    style={{background:'#EFEBE9', border:'none', padding:'10px 12px',
                      cursor:'pointer', fontSize:'16px', color:'#4E342E', fontWeight:'bold'}}
                  >+</button>
                </div>
                <select
                  aria-label="Age unit"
                  value={formPet.ageUnit}
                  onChange={e => updateForm('ageUnit', e.target.value)}
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
                aria-label="Gender"
                value={formPet.gender}
                onChange={e => updateForm('gender', e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                aria-label="Size"
                value={formPet.size}
                onChange={e => updateForm('size', e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="form-row">
              <select
                aria-label="Status"
                value={formPet.status}
                onChange={e => updateForm('status', e.target.value)}
              >
                <option value="AVAILABLE">Available</option>
                <option value="ADOPTED">Adopted</option>
              </select>
            </div>
            <textarea
              aria-label="Description"
              placeholder="Description"
              value={formPet.description}
              onChange={e => updateForm('description', e.target.value)}
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #e0e0e0',fontSize:'14px',minHeight:'80px',
                marginBottom:'10px'}}
            />
            <button type="submit" className="auth-btn">
              {editingId ? 'Save Changes' : 'Add Pet'}
            </button>
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
                    <div className="pet-actions">
                      <button
                        type="button"
                        className="review-btn"
                        onClick={() => startEdit(pet)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        className="reject-btn"
                        onClick={() => handleDelete(pet.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
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
