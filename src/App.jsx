import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import Header from './components/Header'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import { SignupModal, LoginModal } from './components/AuthModals'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Journeys from './pages/Journeys'
import Gallery from './pages/Gallery'
import Guides from './pages/Guides'
import Faq from './pages/Faq'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'

export default function App() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    fetch('/data/destinations.json')
      .then(res => res.json())
      .then(data => setDestinations(data))
  }, [])

  const handleBookingOpen = (destination = null) => {
    setSelectedDestination(destination)
    setShowBookingModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  const handleSwitchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  return (
    <CurrencyProvider>
      <div className="page">
        <Header 
          onBookingOpen={handleBookingOpen}
          onSignupOpen={() => setShowSignupModal(true)}
          onLoginOpen={() => setShowLoginModal(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <Home 
              onBookingOpen={handleBookingOpen}
              onSignupOpen={() => setShowSignupModal(true)}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/journeys" element={<Journeys onBookingOpen={handleBookingOpen} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          destinations={destinations}
          selectedDestination={selectedDestination}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={handleSwitchToSignup}
        />
      </div>
    </CurrencyProvider>
  )
}
