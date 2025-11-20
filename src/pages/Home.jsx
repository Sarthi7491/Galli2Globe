import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import TripModal from '../components/TripModal'

export default function Home({ onBookingOpen, onSignupOpen }) {
  const [destinations, setDestinations] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [showTripModal, setShowTripModal] = useState(false)
  const [filters, setFilters] = useState({
    tag: 'all',
    price: 500000,
    sort: 'default'
  })

  useEffect(() => {
    fetch('/data/destinations.json')
      .then(res => res.json())
      .then(data => {
        setDestinations(data)
        setFilteredDestinations(data)
      })
  }, [])

  useEffect(() => {
    let filtered = [...destinations]

    if (filters.tag !== 'all') {
      filtered = filtered.filter(d => d.tags.includes(filters.tag))
    }

    filtered = filtered.filter(d => d.price <= filters.price)

    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (filters.sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredDestinations(filtered)
  }, [filters, destinations])

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination)
    setShowTripModal(true)
  }

  const handleBook = (destination) => {
    setSelectedDestination(destination)
    onBookingOpen(destination)
  }

  return (
    <>
      <Hero onBookingOpen={onBookingOpen} onSignupOpen={onSignupOpen} />

      <main>
        <section id="about" className="section section--padded is-visible">
          <div className="section-heading">
            <p className="eyebrow">Why travel with us</p>
            <h2>Human travel experts backed by smart tech</h2>
            <p>
              Every journey is co-created by local insiders, climate-positive partners, and
              verified guides so you can travel responsibly.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature">
              <div className="feature-icon" aria-hidden="true">🧭</div>
              <h3>Insider itineraries</h3>
              <p>
                Craft intimate access moments, private tastings, and after-hours museum
                visits curated by storytellers.
              </p>
            </article>
            <article className="feature">
              <div className="feature-icon" aria-hidden="true">🛡️</div>
              <h3>Safety &amp; support</h3>
              <p>
                Real-time travel advisories, carbon footprint reports, and secure escrow
                payments keep you informed.
              </p>
            </article>
            <article className="feature">
              <div className="feature-icon" aria-hidden="true">🌱</div>
              <h3>Purpose-led travel</h3>
              <p>
                Each booking funds local conservation and grassroots communities in the
                destination you explore.
              </p>
            </article>
          </div>
        </section>

        <section id="destinations" className="section section--alt is-visible">
          <div className="section-heading">
            <p className="eyebrow">Trending now</p>
            <h2>Curated destinations across climates</h2>
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="tagFilter">Filter by theme</label>
              <select 
                id="tagFilter" 
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
              >
                <option value="all">All themes</option>
                <option value="wellness">Wellness</option>
                <option value="adventure">Adventure</option>
                <option value="culture">Culture</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="priceFilter">Price range</label>
              <div className="price-range">
                <input 
                  type="range" 
                  id="priceFilter" 
                  min="0" 
                  max="500000" 
                  value={filters.price}
                  onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})}
                  step="10000" 
                />
                <span style={{ minWidth: '100px', textAlign: 'right', color: 'var(--clr-heading)' }}>
                  Up to ₹{(filters.price / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
            <div className="filter-group">
              <label htmlFor="sortFilter">Sort by</label>
              <select 
                id="sortFilter"
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
              >
                <option value="default">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onBook={handleBook}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          <div className="section-cta">
            <p>Need something bespoke?</p>
            <button className="btn btn-outline" onClick={onBookingOpen}>Talk to a consultant</button>
          </div>
        </section>

        <section id="testimonials" className="section is-visible">
          <div className="section-heading">
            <p className="eyebrow">Traveler stories</p>
            <h2>Real guests. Real moments.</h2>
          </div>
          <div className="testimonial-slider">
            <div className="testimonial">
              <p>
                "The Maldives escape was beyond our wildest dreams. Every detail was perfect, 
                from the overwater villa to the private sunset cruise. Galli2Globe made our 
                honeymoon truly unforgettable."
              </p>
              <footer>
                <strong>Priya & Rahul</strong>
                <span>Maldives Escape, 2024</span>
              </footer>
            </div>
          </div>
        </section>

        <section className="section stats is-visible">
          <div className="stat">
            <span>98%</span>
            <p>Repeat guest rate</p>
          </div>
          <div className="stat">
            <span>42</span>
            <p>Countries covered</p>
          </div>
          <div className="stat">
            <span>1.5M+</span>
            <p>CO₂ offsets (kg)</p>
          </div>
          <div className="stat">
            <span>120+</span>
            <p>Local hosts onboard</p>
          </div>
        </section>

        <section className="section section--alt is-visible">
          <div className="newsletter-widget">
            <h3 style={{ color: 'var(--clr-heading)', marginBottom: '0.5rem' }}>Never miss a journey</h3>
            <p>Get weekly travel inspiration, exclusive deals, and destination guides delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-muted)', marginTop: '1rem' }}>
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>

        <section id="contact" className="section section--padded is-visible">
          <div className="section-heading">
            <p className="eyebrow">Concierge desk</p>
            <h2>Share your travel wishlist</h2>
            <p>We reply within 24 hours with a personal itinerary preview.</p>
          </div>
          <div className="contact-layout">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <label htmlFor="contactName">Full name</label>
                <input id="contactName" type="text" required maxLength="60" />
              </div>
              <div className="form-row">
                <label htmlFor="contactEmail">Email</label>
                <input id="contactEmail" type="email" required />
              </div>
              <div className="form-row">
                <label htmlFor="contactPhone">Phone</label>
                <input id="contactPhone" type="tel" required />
              </div>
              <div className="form-row">
                <label htmlFor="contactMessage">Trip goals</label>
                <textarea
                  id="contactMessage"
                  rows="4"
                  placeholder="Tell us about your guests, dates, vibe..."
                  required
                ></textarea>
              </div>
              <button className="btn btn-primary" type="submit">Send brief</button>
            </form>
            <div className="contact-card">
              <h3>Need instant help?</h3>
              <ul>
                <li><strong>Phone:</strong> +91 98300 12345</li>
                <li><strong>Email:</strong> concierge@galli2globe.com</li>
                <li><strong>HQ:</strong> DLF Cyber Hub, Gurugram</li>
              </ul>
              <p>Our global incident desk monitors flights, weather, and logistics 24/7.</p>
            </div>
          </div>
        </section>
      </main>

      <TripModal
        isOpen={showTripModal}
        onClose={() => setShowTripModal(false)}
        destination={selectedDestination}
        onBook={handleBook}
      />
    </>
  )
}
