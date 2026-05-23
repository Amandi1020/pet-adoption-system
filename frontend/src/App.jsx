import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PetDetail from './pages/PetDetail'
import Quiz from './pages/Quiz'
import AdminStories from './pages/admin/AdminStories'
import Stories from './pages/Stories'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PetList from './pages/PetList'
import Login from './pages/Login'
import Register from './pages/Register'
import AdoptForm from './pages/AdoptForm'
import Dashboard from './pages/admin/Dashboard'
import ManagePets from './pages/admin/ManagePets'
import Applications from './pages/admin/Applications'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopt" element={<AdoptForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/pets" element={<ManagePets />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/admin/stories" element={<AdminStories />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/pets/:id" element={<PetDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App