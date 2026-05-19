import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdoptForm from './pages/AdoptForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PetList from './pages/PetList'
import Login from './pages/Login'
import Register from './pages/Register'

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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App