import { useState, useEffect } from 'react'
import BASE_URL from '../../services/api'
import '../../styles/Admin.css'

function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/applications`)
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setLoading(false)
      })
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/applications/${id}/status?status=${status}`,
        { method: 'PUT' }
      )
      if (response.ok) {
        setApplications(applications.map(app =>
          app.id === id ? { ...app, status } : app
        ))
      }
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return '#1D9E75'
      case 'REJECTED': return '#D85A30'
      case 'REVIEWING': return '#BA7517'
      default: return '#7F77DD'
    }
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">📋 Adoption Applications</h1>
      {loading ? (
        <p className="loading">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="loading">No applications yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map(app => (
            <div className="application-card" key={app.id}>
              <div className="app-header">
                <h3>Application #{app.id}</h3>
                <span
                  className="status-badge"
                  style={{background: getStatusColor(app.status)}}
                >
                  {app.status}
                </span>
              </div>
              <div className="app-details">
                <p><strong>Adopter:</strong> {app.adopter?.name}</p>
                <p><strong>Pet:</strong> {app.pet?.name}</p>
                <p><strong>Home Type:</strong> {app.homeType}</p>
                <p><strong>Has Children:</strong> {app.hasChildren ? 'Yes' : 'No'}</p>
                <p><strong>Experience:</strong> {app.experience}</p>
                <p><strong>Reason:</strong> {app.reason}</p>
              </div>
              {app.status === 'PENDING' && (
                <div className="app-actions">
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(app.id, 'APPROVED')}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(app.id, 'REJECTED')}
                  >
                    ✗ Reject
                  </button>
                  <button
                    className="review-btn"
                    onClick={() => updateStatus(app.id, 'REVIEWING')}
                  >
                    👁 Mark Reviewing
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Applications