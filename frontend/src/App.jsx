import { Navigate, Route, Routes } from 'react-router-dom'
import FAQ from './pages/FAQ'
import CareGuide from './pages/CareGuide'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import MyApplications from './pages/MyApplications'
import PetDetail from './pages/PetDetail'
import Quiz from './pages/Quiz'
import AdminStories from './pages/admin/AdminStories'
import Stories from './pages/Stories'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageMeta from './components/PageMeta'
import Home from './pages/Home'
import PetList from './pages/PetList'
import Login from './pages/Login'
import Register from './pages/Register'
import AdoptForm from './pages/AdoptForm'
import Dashboard from './pages/admin/Dashboard'
import ManagePets from './pages/admin/ManagePets'
import Applications from './pages/admin/Applications'
import BackToTop from './components/BackToTop'
import Messages from './pages/admin/Messages'
import ProtectedRoute from './components/ProtectedRoute'
import { ADMIN_ROLES } from './utils/roles'

function App() {
  return (
    <>
      <PageMeta />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopt" element={<Navigate to="/pets" replace />} />
        <Route
          path="/adopt/:petId"
          element={(
            <ProtectedRoute>
              <AdoptForm />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/my-applications"
          element={(
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/pets"
          element={(
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <ManagePets />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/applications"
          element={(
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Applications />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/stories"
          element={(
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <AdminStories />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/messages"
          element={(
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Messages />
            </ProtectedRoute>
          )}
        />
        <Route path="/stories" element={<Stories />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/care-guide" element={<CareGuide />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />

      <BackToTop />
    </>
  )
}

export default App
