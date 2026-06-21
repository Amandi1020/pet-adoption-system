import { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import '../../styles/Admin.css'

function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/contact')
      .then(res => res.json())
      .then(data => {
        setMessages(data.reverse())
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const markRead = async (id) => {
    await fetch(`http://localhost:8080/api/contact/${id}/read`, { method: 'PUT' })
    setMessages(messages.map(m => m.id === id ? {...m, isRead: true} : m))
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">📨 Contact Messages</h1>
      {loading ? <Spinner message="Loading messages..." /> : messages.length === 0 ? (
        <p className="loading">No messages yet.</p>
      ) : (
        <div className="applications-list">
          {messages.map(msg => (
            <div className="application-card" key={msg.id}>
              <div className="app-header">
                <h3>{msg.name} — {msg.subject}</h3>
                <span className="status-badge" style={{background: msg.isRead ? '#D7CCC8' : '#8D6E63', color: msg.isRead ? '#4E342E' : '#FFF8E7'}}>
                  {msg.isRead ? 'Read' : 'New'}
                </span>
              </div>
              <div className="app-details">
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone || 'Not provided'}</p>
              </div>
              <p style={{fontSize:'13px',color:'#6D4C41',margin:'10px 0'}}>{msg.message}</p>
              {!msg.isRead && (
                <button className="approve-btn" onClick={() => markRead(msg.id)}>
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages