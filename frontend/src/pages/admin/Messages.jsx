import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../../services/api'
import Spinner from '../../components/Spinner'
import Toast from '../../components/Toast'
import '../../styles/Admin.css'

function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    let cancelled = false

    apiFetch('/contact', { fallbackMessage: 'Failed to load messages.' })
      .then(data => {
        if (!cancelled) setMessages([...data].reverse())
      })
      .catch(err => {
        if (!cancelled) {
          setToast({ message: err.message || 'Failed to load messages.', type: 'error' })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const markRead = async (id) => {
    try {
      await apiFetch(`/contact/${id}/read`, {
        method: 'PUT',
        fallbackMessage: 'Failed to mark message as read.',
      })
      setMessages(current => current.map(m => m.id === id ? {...m, isRead: true} : m))
    } catch (err) {
      setToast({ message: err.message || 'Failed to mark message as read.', type: 'error' })
    }
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
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

export default Messages