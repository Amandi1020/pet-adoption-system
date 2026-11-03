import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../../services/api'
import Toast from '../../components/Toast'
import '../../styles/Admin.css'

function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const loadApplications = useCallback(async () => {
    return apiFetch('/applications', {
      fallbackMessage: 'Failed to load applications.',
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    loadApplications()
      .then(data => {
        if (!cancelled) {
          setApplications(data)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setToast({ message: err.message, type: 'error' })
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [loadApplications])

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/applications/${id}/status?status=${status}`, {
        method: 'PUT',
        fallbackMessage: 'Failed to update application.',
      })
      setApplications(await loadApplications())
    } catch (err) {
      setToast({ message: err.message || 'Failed to update application.', type: 'error' })
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
              {(app.status === 'PENDING' || app.status === 'REVIEWING') && (
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
                  {app.status === 'PENDING' && (
                    <button
                      className="review-btn"
                      onClick={() => updateStatus(app.id, 'REVIEWING')}
                    >
                      👁 Mark Reviewing
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default Applications