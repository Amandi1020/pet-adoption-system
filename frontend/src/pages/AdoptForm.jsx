import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import BASE_URL from '../services/api'
import { getPetById } from '../services/petService'
import Toast from '../components/Toast'
import '../styles/Auth.css'

function AdoptForm() {
  const { petId } = useParams()
  const navigate = useNavigate()

  const [pet, setPet] = useState(null)
  const [loadingPet, setLoadingPet] = useState(true)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [homeType, setHomeType] = useState('')
  const [hasChildren, setHasChildren] = useState(false)
  const [experience, setExperience] = useState('')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (user) setFullName(user.name || '')
  }, [])

  useEffect(() => {
    if (petId) {
      getPetById(petId).then(data => {
        setPet(data)
        setLoadingPet(false)
      }).catch(() => setLoadingPet(false))
    } else {
      setLoadingPet(false)
    }
  }, [petId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setToast({ message: 'Please login first to apply!', type: 'error' })
      return
    }

    if (!petId) {
      setToast({ message: 'No pet selected. Please choose a pet to adopt first.', type: 'error' })
      return
    }

    setSubmitting(true)

    const application = {
      adopter: { id: user.id },
      pet: { id: parseInt(petId) },
      homeType,
      hasChildren,
      experience,
      reason: `Applicant: ${fullName} | Phone: ${phone} | Address: ${address}\n\nReason for adopting: ${reason}`,
      status: 'PENDING'
    }

    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
      })

      if (response.ok) {
        setToast({ message: `Application for ${pet?.name || 'this pet'} submitted successfully! 🐾`, type: 'success' })
        setTimeout(() => navigate('/my-applications'), 2000)
      } else {
        setToast({ message: 'Something went wrong. Try again.', type: 'error' })
      }
    } catch (err) {
      setToast({ message: 'Error submitting application.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="adopt-page">

      <div className="paw-watermark-wrap">
        <span className="paw-watermark">🐾</span>
      </div>

      <div className="auth-card adopt-card">
        <div className="adopt-header">
          <span className="adopt-paw-icon">🐾</span>
          <h2>Adoption Application</h2>
          {!loadingPet && pet ? (
            <p className="auth-sub">
              You are applying to adopt <strong>{pet.name}</strong> — {pet.species}, {pet.breed}
            </p>
          ) : !loadingPet && !petId ? (
            <p className="auth-sub" style={{color:'#D84315'}}>
              No pet selected. Please <Link to="/pets">browse pets</Link> and click "View & Adopt" first.
            </p>
          ) : (
            <p className="auth-sub">Loading pet details...</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+94 XX XXX XXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Home Address</label>
            <input
              type="text"
              placeholder="Your home address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Home Type</label>
            <select
              value={homeType}
              onChange={e => setHomeType(e.target.value)}
              required
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #D7CCC8',fontSize:'14px',
                background:'#FFF8E7',color:'#4E342E',outline:'none'}}
            >
              <option value="">Select your home type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House with garden</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          <div className="form-group">
            <label>Do you have children at home?</label>
            <select
              value={hasChildren}
              onChange={e => setHasChildren(e.target.value === 'true')}
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #D7CCC8',fontSize:'14px',
                background:'#FFF8E7',color:'#4E342E',outline:'none'}}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Previous pet experience</label>
            <input
              type="text"
              placeholder="Describe your experience with pets..."
              value={experience}
              onChange={e => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Why do you want to adopt {pet?.name || 'this pet'}?</label>
            <textarea
              placeholder="Tell us why you want to adopt..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #D7CCC8',fontSize:'14px',
                background:'#FFF8E7',color:'#4E342E',
                minHeight:'100px',fontFamily:'inherit',outline:'none'}}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={submitting || !petId}>
            {submitting ? 'Submitting...' : 'Submit Application 🐾'}
          </button>
        </form>
      </div>

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

export default AdoptForm