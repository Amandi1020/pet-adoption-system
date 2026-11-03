import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../../services/api'
import Toast from '../../components/Toast'
import '../../styles/Admin.css'

function AdminStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    let cancelled = false

    apiFetch('/stories/all', { fallbackMessage: 'Failed to load stories.' })
      .then(data => {
        if (!cancelled) setStories(data)
      })
      .catch(err => {
        if (!cancelled) {
          setToast({ message: err.message || 'Failed to load stories.', type: 'error' })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const approveStory = async (id) => {
    try {
      await apiFetch(`/stories/${id}/approve`, {
        method: 'PUT',
        fallbackMessage: 'Failed to approve story.',
      })
      setStories(current => current.map(s =>
        s.id === id ? { ...s, isApproved: true } : s
      ))
    } catch (err) {
      setToast({ message: err.message || 'Failed to approve story.', type: 'error' })
    }
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">🌟 Success Stories</h1>
      {loading ? (
        <p className="loading">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="loading">No stories yet.</p>
      ) : (
        <div className="applications-list">
          {stories.map(story => (
            <div className="application-card" key={story.id}>
              <div className="app-header">
                <h3>Story #{story.id} — {story.adopter?.name}</h3>
                <span className="status-badge"
                  style={{background: story.isApproved ? '#6D4C41' : '#8D6E63'}}>
                  {story.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p style={{fontSize:'13px',color:'#6D4C41',
                fontStyle:'italic',marginBottom:'10px'}}>
                "{story.storyText}"
              </p>
              {!story.isApproved && (
                <button className="approve-btn" onClick={() => approveStory(story.id)}>
                  ✓ Approve Story
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default AdminStories