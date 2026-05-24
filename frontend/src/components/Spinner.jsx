import '../styles/Spinner.css'

function Spinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner"></div>
      <p className="spinner-msg">{message}</p>
    </div>
  )
}

export default Spinner