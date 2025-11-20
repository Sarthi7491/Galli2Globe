import React, { useState, useEffect } from 'react'

export function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    travelStyle: '',
    terms: false
  })
  const [feedback, setFeedback] = useState('')

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
    if (!formData.terms) {
      setFeedback('⚠️ Please accept the terms and conditions')
      return
    }
    
    // Store user data in localStorage
    const userData = {
      name: formData.fullName,
      email: formData.email,
      travelStyle: formData.travelStyle,
      joinedDate: new Date().toISOString(),
      bookings: [],
      wishlist: []
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userEmail', formData.email)
    
    setFeedback('✓ Account created successfully! Welcome to Galli2Globe!')
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <section className="signup-modal is-visible" role="dialog" aria-modal="true">
      <div className="signup-modal__backdrop" onClick={onClose}></div>
      <article className="signup-modal__dialog">
        <header className="signup-modal__header">
          <div>
            <p className="eyebrow">Member benefits</p>
            <h2>Create your traveler account</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close signup form">
            ×
          </button>
        </header>
        <form className="signup-form" onSubmit={handleSubmit}>
          <button className="btn btn-secondary btn-google" type="button">
            <span>Continue with Google</span>
          </button>
          <div className="divider">
            <span>or</span>
          </div>
          <label>
            Full name
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required 
            />
          </label>
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
            Password
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              minLength="6"
              required 
            />
          </label>
          <label>
            Travel style
            <select 
              value={formData.travelStyle}
              onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
              required
            >
              <option value="">Select your vibe</option>
              <option value="luxury">Luxury & leisure</option>
              <option value="adventure">Adventure & nature</option>
              <option value="culture">Culture & heritage</option>
              <option value="wellness">Wellness & slow travel</option>
            </select>
          </label>
          <label className="checkbox-field">
            <input 
              type="checkbox" 
              checked={formData.terms}
              onChange={(e) => setFormData({...formData, terms: e.target.checked})}
              required 
            />
            <span>I agree to the terms, privacy policy, and curated concierge emails.</span>
          </label>
          <button className="btn btn-primary" type="submit">Join Galli2Globe</button>
          <p className="auth-switch">
            Already a member?
            <button type="button" onClick={onSwitchToLogin}>Sign in</button>
          </p>
          {feedback && <p className="form-feedback">{feedback}</p>}
        </form>
        <div className="signup-perks">
          <p>Unlock:</p>
          <ul>
            <li>Saved trips & seamless re-booking</li>
            <li>Personalized alerts for launches & flash upgrades</li>
            <li>Concierge chat history synced across devices</li>
          </ul>
        </div>
      </article>
    </section>
  )
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [feedback, setFeedback] = useState('')

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
    
    // Check if user exists in localStorage
    const storedEmail = localStorage.getItem('userEmail')
    const storedUser = localStorage.getItem('user')
    
    if (storedEmail === formData.email && storedUser) {
      setFeedback('✓ Signed in successfully! Welcome back!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      // Create new user if not exists
      const userData = {
        name: formData.email.split('@')[0],
        email: formData.email,
        travelStyle: 'adventure',
        joinedDate: new Date().toISOString(),
        bookings: [],
        wishlist: []
      }
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userEmail', formData.email)
      setFeedback('✓ Signed in successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  if (!isOpen) return null

  return (
    <section className="signup-modal is-visible" role="dialog" aria-modal="true">
      <div className="signup-modal__backdrop" onClick={onClose}></div>
      <article className="signup-modal__dialog">
        <header className="signup-modal__header">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your account</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close login form">
            ×
          </button>
        </header>
        <form className="signup-form" onSubmit={handleSubmit}>
          <button className="btn btn-secondary btn-google" type="button">
            <span>Sign in with Google</span>
          </button>
          <div className="divider">
            <span>or</span>
          </div>
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
            Password
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              minLength="6"
              required 
            />
          </label>
          <button className="btn btn-primary" type="submit">Sign in</button>
          <p className="auth-switch">
            New here?
            <button type="button" onClick={onSwitchToSignup}>Create account</button>
          </p>
          {feedback && <p className="form-feedback form-success">{feedback}</p>}
        </form>
      </article>
    </section>
  )
}
