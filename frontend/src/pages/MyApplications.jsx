import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../services/api'
import Spinner from '../components/Spinner'
import Toast from '../components/Toast'
import '../styles/MyApplications.css'

function MyApplications() {
  const [applications, setApplications] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(Boolean(user))
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    if (!user) {
      return
    }
    fetch(`${BASE_URL}/applications`)
      .then(res => res.json())
      .then(data => {
        const myApps = data.filter(app => app.adopter?.id === user.id)
        setApplications(myApps)
        setLoading(false)
      })
      .catch(() => {
        setToast({ message: 'Failed to load applications.', type: 'error' })
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return { bg: '#6D4C41', color: '#FFF8E7' }
      case 'REJECTED': return { bg: '#D84315', color: '#FFF8E7' }
      case 'REVIEWING': return { bg: '#8D6E63', color: '#FFF8E7' }
      default: return { bg: '#D7CCC8', color: '#4E342E' }
    }
  }

  if (!user) return (
    <div className="myapps-empty">
      <p>Please login to view your applications.</p>
      <Link to="/login" className="myapps-btn">Login</Link>
    </div>
  )

  return (
    <div className="myapps-page">
      <h1 className="myapps-title">📋 My Applications</h1>
      <p className="myapps-sub">Track the status of your adoption applications</p>

      {loading ? (
        <Spinner message="Loading your applications..." />
      ) : applications.length === 0 ? (
        <div className="myapps-empty">
          <p>You have not submitted any applications yet.</p>
          <Link to="/pets" className="myapps-btn">Browse pets to adopt</Link>
        </div>
      ) : (
        <div className="myapps-list">
          {applications.map(app => {
            const style = getStatusColor(app.status)
            return (
              <div className="myapp-card" key={app.id}>
                <div className="myapp-header">
                  <div>
                    <h3>Application #{app.id}</h3>
                    <p className="myapp-pet">
                      🐾 {app.pet?.name} — {app.pet?.species}
                    </p>
                  </div>
                  <span className="myapp-status"
                    style={{background: style.bg, color: style.color}}>
                    {app.status}
                  </span>
                </div>
                <div className="myapp-details">
                  <p><strong>Home type:</strong> {app.homeType}</p>
                  <p><strong>Has children:</strong> {app.hasChildren ? 'Yes' : 'No'}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  {app.notes && (
                    <p className="myapp-notes">
                      <strong>Admin notes:</strong> {app.notes}
                    </p>
                  )}
                </div>
                {app.status === 'APPROVED' && (
                  <div className="myapp-approved-msg">
                    🎉 Congratulations! Your application has been approved. Please contact the shelter.
                  </div>
                )}
                {app.status === 'REJECTED' && (
                  <div className="myapp-rejected-msg">
                    We are sorry your application was not successful this time.
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default MyApplications