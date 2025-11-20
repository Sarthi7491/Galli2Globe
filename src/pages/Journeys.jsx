import React, { useState, useEffect } from 'react'
import DestinationCard from '../components/DestinationCard'
import TripModal from '../components/TripModal'

export default function Journeys({ onBookingOpen }) {
  const [destinations, setDestinations] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [showTripModal, setShowTripModal] = useState(false)

  useEffect(() => {
    fetch('/data/destinations.json')
      .then(res => res.json())
      .then(data => setDestinations(data))
  }, [])

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination)
    setShowTripModal(true)
  }

  const handleBook = (destination) => {
    setSelectedDestination(destination)
    onBookingOpen(destination)
  }

  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">All destinations</p>
          <h2>Explore our curated journeys</h2>
          <p>From luxury escapes to adventure expeditions, find your perfect journey.</p>
        </div>
        <div className="destination-grid" style={{ marginTop: '2rem' }}>
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onBook={handleBook}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </section>

      <TripModal
        isOpen={showTripModal}
        onClose={() => setShowTripModal(false)}
        destination={selectedDestination}
        onBook={handleBook}
      />
    </main>
  )
}
