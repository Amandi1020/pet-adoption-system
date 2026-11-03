import { useEffect } from 'react'
import '../styles/Toast.css'

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message, type, onClose])

  return (
    <div className={`toast toast-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span>{type === 'success' ? '✅' : '❌'} {message}</span>
      <button type="button" className="toast-close" aria-label="Close notification" onClick={onClose}>×</button>
    </div>
  )
}

export default Toast