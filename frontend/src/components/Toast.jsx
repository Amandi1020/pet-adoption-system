import { useState, useEffect } from 'react'
import '../styles/Toast.css'

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span>{type === 'success' ? '✅' : '❌'} {message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}

export default Toast