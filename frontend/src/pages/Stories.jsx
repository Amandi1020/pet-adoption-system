import { useState, useEffect } from 'react'
import BASE_URL from '../services/api'
import '../styles/Stories.css'

function Stories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [storyText, setStoryText] = useState('')
  const [message, setMessage] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetch(`${BASE_URL}/stories`)
      .then(res => res.json())
      .then(data => {
        setStories(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setMessage('Please login first!')
      return
    }
    try {
      const response = await fetch(`${BASE_URL}/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adopter: { id: user.id },
          pet: { id: 1 },
          storyText,
          isApproved: false
        })
      })
      if (response.ok) {
        setMessage('Story submitted! Waiting for approval.')
        setStoryText('')
        setShowForm(false)
      }
    } catch (err) {
      setMessage('Error submitting story.')
    }
  }

  return (
    <div style={{padding:'2rem', background:'#f9f9f9', minHeight:'80vh'}}>
      <div style={{display:'flex',alignItems:'center',
        justifyContent:'space-between',marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:'1.8rem',fontWeight:'bold',color:'#3C3489'}}>
          🌟 Success Stories
        </h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            style={{background:'#7F77DD',color:'white',border:'none',
              padding:'10px 20px',borderRadius:'8px',fontSize:'13px',
              fontWeight:'600',cursor:'pointer'}}
          >
            {showForm ? '✕ Cancel' : '+ Share Your Story'}
          </button>
        )}
      </div>

      {message && (
        <p style={{background:'#E1F5EE',color:'#085041',padding:'10px',
          borderRadius:'8px',fontSize:'13px',marginBottom:'1rem'}}>
          {message}
        </p>
      )}

      {showForm && (
        <div style={{background:'white',borderRadius:'12px',padding:'1.5rem',
          border:'1px solid #EEEDFE',marginBottom:'1.5rem'}}>
          <h3 style={{color:'#3C3489',marginBottom:'1rem'}}>Share your story</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Tell us about your adopted pet..."
              value={storyText}
              onChange={e => setStoryText(e.target.value)}
              required
              style={{width:'100%',padding:'10px',borderRadius:'8px',
                border:'1.5px solid #e0e0e0',fontSize:'14px',
                minHeight:'120px',marginBottom:'10px'}}
            />
            <button type="submit"
              style={{background:'#7F77DD',color:'white',border:'none',
                padding:'10px 20px',borderRadius:'8px',fontSize:'14px',
                fontWeight:'600',cursor:'pointer'}}>
              Submit Story
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p style={{textAlign:'center',color:'#7F77DD'}}>Loading stories...</p>
      ) : stories.length === 0 ? (
        <p style={{textAlign:'center',color:'#888'}}>
          No stories yet. Be the first to share!
        </p>
      ) : (
        <div style={{display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem'}}>
             {stories.map(story => (
            <div key={story.id}
              style={{background:'white',borderRadius:'12px',
                padding:'1.2rem',border:'1px solid #E1F5EE'}}>
              <p style={{fontSize:'13px',color:'#555',
                lineHeight:'1.6',marginBottom:'8px'}}>
                "{story.storyText}"
              </p>
              <p style={{fontSize:'12px',color:'#1D9E75',fontWeight:'600'}}>
                — {story.adopter?.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Stories