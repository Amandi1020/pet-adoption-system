import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../services/api'
import Toast from '../components/Toast'
import '../styles/Auth.css'

function AdoptForm() {
  const [homeType, setHomeType] = useState('')
  const [hasChildren, setHasChildren] = useState(false)
  const [experience, setExperience] = useState('')
  const [reason, setReason] = useState('')
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const closeToast = useCallback(() => setToast(null), [])

  const user = JSON.parse(localStorage.getItem('user'))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setToast({ message: 'Please login first to apply!', type: 'error' })
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
        setToast({ message: 'Application submitted successfully! 🐾', type: 'success' })
        setTimeout(() => navigate('/my-applications'), 2000)
      } else {
        setToast({ message: 'Something went wrong. Try again.', type: 'error' })
      }
    } catch (err) {
      setToast({ message: 'Error submitting application.', type: 'error' })
    }
  }

  return (
    <div className="adopt-page">

      {/* PAW WATERMARK BACKGROUND */}
      <div className="paw-watermark-wrap">
        <span className="paw-watermark">🐾</span>
      </div>

      <div className="auth-card adopt-card">
        <div className="adopt-header">
          <span className="adopt-paw-icon">🐾</span>
          <h2>Adoption Application</h2>
          <p className="auth-sub">Tell us about yourself and your home</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label>Why do you want to adopt?</label>
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

          <button type="submit" className="auth-btn">
            Submit Application 🐾
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