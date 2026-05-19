import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../services/api'
import '../styles/Auth.css'

function AdoptForm() {
  const [homeType, setHomeType] = useState('')
  const [hasChildren, setHasChildren] = useState(false)
  const [experience, setExperience] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setMessage('Please login first to apply!')
      return
    }

    const application = {
      adopter: { id: user.id },
      pet: { id: 1 },
      homeType,
      hasChildren,
      experience,
      reason,
      status: 'PENDING'
    }

    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
      })

      if (response.ok) {
        setMessage('Application submitted successfully!')
        setTimeout(() => navigate('/'), 2000)
      } else {
        setMessage('Something went wrong. Try again.')
      }
    } catch (err) {
      setMessage('Error submitting application.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{maxWidth:'500px'}}>
        <h2>🐾 Adoption Application</h2>
        <p className="auth-sub">Tell us about yourself</p>
        {message && <p className="auth-msg">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Home Type</label>
            <select
              value={homeType}
              onChange={e => setHomeType(e.target.value)}
              required
              style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1.5px solid #e0e0e0',fontSize:'14px'}}
            >
              <option value="">Select home type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div className="form-group">
            <label>Do you have children?</label>
            <select
              value={hasChildren}
              onChange={e => setHasChildren(e.target.value === 'true')}
              style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1.5px solid #e0e0e0',fontSize:'14px'}}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Previous pet experience</label>
            <input
              type="text"
              placeholder="Describe your experience..."
              value={experience}
              onChange={e => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Why do you want to adopt?</label>
            <textarea
              placeholder="Tell us why..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1.5px solid #e0e0e0',fontSize:'14px',minHeight:'100px'}}
            />
          </div>
          <button type="submit" className="auth-btn">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdoptForm