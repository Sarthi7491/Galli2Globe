import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ onBookingOpen, onSignupOpen, onLoginOpen }) {
  const [navOpen, setNavOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <header className="site-header" id="top">
      <nav className="navbar" aria-label="Primary">
        <Link className="brand" to="/" aria-label="Galli2Globe home">
          <span className="brand-mark">
            <img src="/images/logo-mark.svg" alt="Galli2Globe planet logo" />
          </span>
          <span className="brand-text">
            <span>Galli2Globe</span>
            <small>Travel studio</small>
          </span>
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="navMenu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true"></span>
        </button>
        <div className={`nav-links ${navOpen ? 'is-open' : ''}`} id="navMenu">
          <Link to="/about">Studio</Link>
          <Link to="/journeys">Journeys</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="nav-links nav-links--right">
          <button className="btn btn-outline" onClick={onBookingOpen}>Plan a trip</button>
          {!user ? (
            <button className="btn btn-secondary" onClick={onLoginOpen}>Sign in</button>
          ) : (
            <Link to="/profile" className="account-chip">
              <span className="account-chip__avatar">👤</span>
              <span className="account-chip__name">{user.name}</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
