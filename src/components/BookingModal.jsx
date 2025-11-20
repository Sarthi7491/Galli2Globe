import { useState, useEffect } from 'react'

export default function BookingModal({ isOpen, onClose, destinations, selectedDestination }) {
  const [formData, setFormData] = useState({
    package: selectedDestination?.id || '',
    month: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    groupSize: '',
    notes: ''
  })
  const [feedback, setFeedback] = useState('')
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    // Set minimum date to today
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    setMinDate(`${year}-${month}`)
  }, [])

  useEffect(() => {
    if (selectedDestination) {
      setFormData(prev => ({ ...prev, package: selectedDestination.id }))
    }
  }, [selectedDestination])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Get the selected destination details
    const destination = destinations.find(d => d.id === formData.package)
    
    // Create booking object
    const booking = {
      id: `BK${Date.now()}`,
      destinationId: formData.package,
      destinationName: destination?.name || 'Unknown',
      destinationImage: destination?.image || '',
      destinationLocation: destination?.location || '',
      price: destination?.price || 0,
      travelMonth: formData.month,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      groupSize: formData.groupSize,
      notes: formData.notes,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      bookedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    // Get existing user data
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Add booking to user's bookings array
    if (!userData.bookings) {
      userData.bookings = []
    }
    userData.bookings.push(booking)
    
    // Save updated user data
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Also save to a separate bookings array for easy access
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    allBookings.push(booking)
    localStorage.setItem('bookings', JSON.stringify(allBookings))
    
    setFeedback('✓ Booking confirmed! Check your bookings page to view details.')
    
    setTimeout(() => {
      onClose()
      setFeedback('')
      setFormData({
        package: '',
        month: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        groupSize: '',
        notes: ''
      })
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <section className="booking-modal is-visible" role="dialog" aria-modal="true">
      <div className="booking-modal__backdrop" onClick={onClose}></div>
      <div className="booking-modal__dialog">
        <header className="booking-modal__header">
          <h2>Book your adventure</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </header>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="grid-two">
            <label>
              Preferred package
              <select 
                value={formData.package} 
                onChange={(e) => setFormData({...formData, package: e.target.value})}
                required
              >
                <option value="">Select a trip</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.id}>{dest.name}</option>
                ))}
              </select>
            </label>
            <label>
              Travel month
              <input 
                type="month" 
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                min={minDate}
                required 
              />
            </label>
          </div>
          <div className="grid-two">
            <label>
              First name
              <input 
                type="text" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required 
              />
            </label>
            <label>
              Last name
              <input 
                type="text" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required 
              />
            </label>
          </div>
          <div className="grid-two">
            <label>
              Email
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </label>
            <label>
              Phone
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </label>
          </div>
          <div className="grid-two">
            <label>
              Country
              <input 
                type="text" 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required 
              />
            </label>
            <label>
              Group size
              <select 
                value={formData.groupSize}
                onChange={(e) => setFormData({...formData, groupSize: e.target.value})}
                required
              >
                <option value="">Select group size</option>
                <option value="1">Solo</option>
                <option value="2">Duo</option>
                <option value="3-5">3-5 guests</option>
                <option value="6+">6+ guests</option>
              </select>
            </label>
          </div>
          <label>
            Notes
            <textarea 
              rows="3" 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Dietary needs, celebrations, accessibility..."
            />
          </label>
          <button className="btn btn-primary" type="submit">Submit request</button>
          {feedback && <p className="form-feedback form-success">{feedback}</p>}
        </form>
      </div>
    </section>
  )
}
