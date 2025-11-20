import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const navigate = useNavigate()
  const { formatPrice } = useCurrency()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('/')
      return
    }

    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(storedBookings)
  }, [navigate])

  const formatMonth = (monthString) => {
    if (!monthString) return 'Not specified'
    const [year, month] = monthString.split('-')
    const date = new Date(year, month - 1)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setShowDetails(true)
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Update booking status
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      )
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      
      // Update user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      if (userData.bookings) {
        userData.bookings = userData.bookings.map(b => 
          b.id === bookingId ? { ...b, status: 'cancelled' } : b
        )
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      setShowDetails(false)
    }
  }

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to permanently delete this booking? This action cannot be undone.')) {
      // Remove booking from state
      const updatedBookings = bookings.filter(b => b.id !== bookingId)
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      
      // Update user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      if (userData.bookings) {
        userData.bookings = userData.bookings.filter(b => b.id !== bookingId)
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      setShowDetails(false)
    }
  }

  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">Your trips</p>
          <h2>Manage your bookings</h2>
          <p>View and manage all your upcoming and past journeys.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✈️</div>
            <h3>No bookings yet</h3>
            <p>Start planning your dream vacation today!</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <article key={booking.id} className="booking-card">
                <div className="booking-card-image">
                  <img src={booking.destinationImage} alt={booking.destinationName} />
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="booking-card-content">
                  <h3>{booking.destinationName}</h3>
                  <p className="booking-location">📍 {booking.destinationLocation}</p>
                  <div className="booking-details">
                    <div className="booking-detail-item">
                      <span className="detail-label">Booking ID</span>
                      <span className="detail-value">{booking.id}</span>
                    </div>
                    <div className="booking-detail-item">
                      <span className="detail-label">Travel Month</span>
                      <span className="detail-value">{formatMonth(booking.travelMonth)}</span>
                    </div>
                    <div className="booking-detail-item">
                      <span className="detail-label">Group Size</span>
                      <span className="detail-value">{booking.groupSize}</span>
                    </div>
                    <div className="booking-detail-item">
                      <span className="detail-label">Total Price</span>
                      <span className="detail-value price">{formatPrice(booking.price)}</span>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleViewDetails(booking)}
                    >
                      View Full Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <button 
                        className="btn btn-outline" 
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                    {booking.status === 'cancelled' && (
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="booking-modal is-visible">
          <div className="booking-modal__backdrop" onClick={() => setShowDetails(false)}></div>
          <div className="booking-modal__dialog booking-details-modal">
            <header className="booking-modal__header">
              <h2>Booking Details</h2>
              <button className="icon-button" onClick={() => setShowDetails(false)}>
                ×
              </button>
            </header>
            <div className="booking-details-content">
              <div className="booking-details-image">
                <img src={selectedBooking.destinationImage} alt={selectedBooking.destinationName} />
              </div>
              <div className="booking-details-info">
                <h3>{selectedBooking.destinationName}</h3>
                <p className="booking-location">📍 {selectedBooking.destinationLocation}</p>
                
                <div className="details-section">
                  <h4>Trip Information</h4>
                  <div className="details-grid">
                    <div className="detail-row">
                      <span className="label">Booking ID:</span>
                      <span className="value">{selectedBooking.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Status:</span>
                      <span className={`value status-${selectedBooking.status}`}>
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Travel Month:</span>
                      <span className="value">{formatMonth(selectedBooking.travelMonth)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Booked On:</span>
                      <span className="value">{selectedBooking.bookedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Traveler Information</h4>
                  <div className="details-grid">
                    <div className="detail-row">
                      <span className="label">Name:</span>
                      <span className="value">{selectedBooking.fullName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span className="value">{selectedBooking.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{selectedBooking.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Country:</span>
                      <span className="value">{selectedBooking.country}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Group Size:</span>
                      <span className="value">{selectedBooking.groupSize}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="details-section">
                    <h4>Special Requests</h4>
                    <p className="notes">{selectedBooking.notes}</p>
                  </div>
                )}

                <div className="details-section">
                  <h4>Payment Summary</h4>
                  <div className="payment-summary">
                    <div className="payment-row">
                      <span>Trip Cost:</span>
                      <span>{formatPrice(selectedBooking.price)}</span>
                    </div>
                    <div className="payment-row total">
                      <span>Total Amount:</span>
                      <span>{formatPrice(selectedBooking.price)}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-details-actions">
                  <button className="btn btn-primary" onClick={() => window.print()}>
                    📄 Download Receipt
                  </button>
                  {selectedBooking.status === 'confirmed' && (
                    <button 
                      className="btn btn-outline" 
                      onClick={() => handleCancelBooking(selectedBooking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  {selectedBooking.status === 'cancelled' && (
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDeleteBooking(selectedBooking.id)}
                    >
                      🗑️ Delete Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
