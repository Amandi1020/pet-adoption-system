import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../../services/api'
import Spinner from '../../components/Spinner'
import '../../styles/Admin.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentApps, setRecentApps] = useState([])

  useEffect(() => {
  Promise.all([
    fetch(`${BASE_URL}/pets`).then(res => res.json()),
    fetch(`${BASE_URL}/applications`).then(res => res.json())
  ]).then(([pets, applications]) => {
    const availablePets = pets.filter(p => p.status === 'AVAILABLE')
    const adoptedPets = pets.filter(p => p.status === 'ADOPTED')
    setStats({
      totalPets: pets.length,
      availablePets: availablePets.length,
      adoptedPets: adoptedPets.length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'PENDING').length,
      approvedApplications: applications.filter(a => a.status === 'APPROVED').length,
      rejectedApplications: applications.filter(a => a.status === 'REJECTED').length,
    })
    setRecentApps(applications.slice(-5).reverse())
    setLoading(false)
  }).catch(() => setLoading(false))
}, [])

  const statCards = [
    { label: 'Total Pets', value: stats.totalPets, icon: '🐾', bg: '#EFEBE9', border: '#D7CCC8' },
    { label: 'Available', value: stats.availablePets, icon: '✅', bg: '#E8F5E9', border: '#A5D6A7' },
    { label: 'Adopted', value: stats.adoptedPets, icon: '🏠', bg: '#FFF3E0', border: '#FFCC80' },
    { label: 'Total Applications', value: stats.totalApplications, icon: '📋', bg: '#E3F2FD', border: '#90CAF9' },
    { label: 'Pending', value: stats.pendingApplications, icon: '⏳', bg: '#FFF8E1', border: '#FFE082' },
    { label: 'Approved', value: stats.approvedApplications, icon: '🎉', bg: '#F3E5F5', border: '#CE93D8' },
  ]

  const getStatusStyle = (status) => {
    switch(status) {
      case 'APPROVED': return { background: '#6D4C41', color: '#FFF8E7' }
      case 'REJECTED': return { background: '#D84315', color: '#FFF8E7' }
      case 'REVIEWING': return { background: '#8D6E63', color: '#FFF8E7' }
      default: return { background: '#D7CCC8', color: '#4E342E' }
    }
  }

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">📊 Admin Dashboard</h1>
          <p className="dash-sub">Welcome back! Here is what is happening at PawFind today.</p>
        </div>
        <div className="dash-header-actions">
          <Link to="/admin/pets" className="dash-action-btn">+ Add Pet</Link>
        </div>
      </div>

      {loading ? <Spinner message="Loading dashboard..." /> : (
        <>
          {/* STAT CARDS */}
          <div className="dash-stats-grid">
            {statCards.map((s, i) => (
              <div key={i} className="dash-stat-card" style={{background: s.bg, border: `1px solid ${s.border}`}}>
                <div className="dash-stat-icon">{s.icon}</div>
                <div>
                  <p className="dash-stat-value">{s.value}</p>
                  <p className="dash-stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="dash-progress-card">
            <h3>Adoption rate</h3>
            <div className="dash-progress-bar-wrap">
              <div
                className="dash-progress-bar-fill"
                style={{width: stats.totalPets > 0 ? `${(stats.adoptedPets / stats.totalPets) * 100}%` : '0%'}}
              ></div>
            </div>
            <p className="dash-progress-label">
              {stats.totalPets > 0
                ? `${Math.round((stats.adoptedPets / stats.totalPets) * 100)}% of pets have been adopted`
                : 'No pets yet'}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="dash-quick-links">
            <Link to="/admin/applications" className="dash-quick-card">
              <span className="dash-quick-icon">📋</span>
              <p className="dash-quick-title">Applications</p>
              <p className="dash-quick-sub">{stats.pendingApplications} pending review</p>
            </Link>
            <Link to="/admin/pets" className="dash-quick-card">
              <span className="dash-quick-icon">🐾</span>
              <p className="dash-quick-title">Manage Pets</p>
              <p className="dash-quick-sub">{stats.availablePets} available now</p>
            </Link>
            <Link to="/admin/stories" className="dash-quick-card">
              <span className="dash-quick-icon">🌟</span>
              <p className="dash-quick-title">Stories</p>
              <p className="dash-quick-sub">Approve success stories</p>
            </Link>
                <Link to="/" className="dash-quick-card">
                <span className="dash-quick-icon">🌐</span>
                <p className="dash-quick-title">View Site</p>
                <p className="dash-quick-sub">See the public home page</p>
              </Link>
          </div>

          {/* RECENT APPLICATIONS */}
          <div className="dash-recent">
            <div className="dash-recent-header">
              <h3>Recent applications</h3>
              <Link to="/admin/applications" className="dash-view-all">View all →</Link>
            </div>
            {recentApps.length === 0 ? (
              <p style={{color:'#8D6E63',fontSize:'13px'}}>No applications yet.</p>
            ) : (
              <div className="dash-recent-list">
                {recentApps.map(app => (
                  <div key={app.id} className="dash-recent-item">
                    <div className="dash-recent-info">
                      <p className="dash-recent-name">Application #{app.id}</p>
                      <p className="dash-recent-pet">🐾 {app.pet?.name} — {app.adopter?.name}</p>
                    </div>
                    <span className="dash-recent-status" style={getStatusStyle(app.status)}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </>
      )}
    </div>
  )
}

export default Dashboard