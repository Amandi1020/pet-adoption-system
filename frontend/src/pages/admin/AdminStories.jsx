import { useState, useEffect } from 'react'
import BASE_URL from '../../services/api'
import '../../styles/Admin.css'

function AdminStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/stories`)
      .then(res => res.json())
      .then(data => {
        setStories(data)
        setLoading(false)
      })
  }, [])

  const approveStory = async (id) => {
    await fetch(`${BASE_URL}/stories/${id}/approve`, { method: 'PUT' })
    setStories(stories.map(s => s.id === id ? {...s, isApproved: true} : s))
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
    </div>
  )
}

export default AdminStories