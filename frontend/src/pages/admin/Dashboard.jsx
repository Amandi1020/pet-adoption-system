import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../../services/api'
import '../../styles/Admin.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/pets`).then(res => res.json()),
      fetch(`${BASE_URL}/applications`).then(res => res.json())
    ]).then(([pets, applications]) => {
      setStats({
        totalPets: pets.length,
        availablePets: pets.filter(p => p.status === 'AVAILABLE').length,
        adoptedPets: pets.filter(p => p.status === 'ADOPTED').length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(a => a.status === 'PENDING').length,
        approvedApplications: applications.filter(a => a.status === 'APPROVED').length,
      })
      setLoading(false)
    })
  }, [])

  return (
    <div className="admin-page">
      <h1 className="admin-title">📊 Admin Dashboard</h1>

      {loading ? (
        <p className="loading">Loading stats...</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-box" style={{background:'#EEEDFE'}}>
              <h2>{stats.totalPets}</h2>
              <p>Total Pets</p>
            </div>
            <div className="stat-box" style={{background:'#E1F5EE'}}>
              <h2>{stats.availablePets}</h2>
              <p>Available</p>
            </div>
            <div className="stat-box" style={{background:'#FAECE7'}}>
              <h2>{stats.adoptedPets}</h2>
              <p>Adopted</p>
            </div>
            <div className="stat-box" style={{background:'#FAEEDA'}}>
              <h2>{stats.totalApplications}</h2>
              <p>Total Applications</p>
            </div>
            <div className="stat-box" style={{background:'#E6F1FB'}}>
              <h2>{stats.pendingApplications}</h2>
              <p>Pending</p>
            </div>
            <div className="stat-box" style={{background:'#EAF3DE'}}>
              <h2>{stats.approvedApplications}</h2>
              <p>Approved</p>
            </div>
          </div>

          <div className="admin-links">
            <Link to="/admin/applications" className="admin-link-btn">
              📋 View Applications
            </Link>
            <Link to="/admin/pets" className="admin-link-btn">
              🐾 Manage Pets
            </Link>
            <Link to="/admin/stories" className="admin-link-btn">
             🌟 Manage Stories
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard