import { useState, useEffect } from 'react'

const heroSlides = [
  {
    image: '/images/maldives-escape.jpg',
    title: 'Bespoke Maldives Escape',
    subtitle: 'Now booking for winter 2025',
    description: 'Luxury overwater villas with private pools'
  },
  {
    image: '/images/patagonia-traverse.jpg',
    title: 'Patagonia Glacier Traverse',
    subtitle: 'Adventure awaits in Argentina',
    description: 'Epic hiking through pristine wilderness'
  },
  {
    image: '/images/swiss-alps.jpg',
    title: 'Swiss Alps Panorama Rail',
    subtitle: 'Luxury rail experience',
    description: 'Scenic mountain views from comfort'
  },
  {
    image: '/images/santorini-sunset.jpg',
    title: 'Santorini Signature Stay',
    subtitle: 'Mediterranean paradise',
    description: 'Cliffside villas with stunning sunsets'
  },
  {
    image: '/images/kyoto-cultural.jpg',
    title: 'Kyoto Culture Immersion',
    subtitle: 'Ancient traditions meet modern luxury',
    description: 'Temple visits and authentic experiences'
  }
]

export default function Hero({ onBookingOpen, onSignupOpen }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const handleNextSlide = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrevSlide = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      setIsAnimating(false)
    }, 300)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const element = document.getElementById('destinations')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero is-visible" id="home">
      <div className="hero-content">
        <div className="hero-badge-float">✨ Trusted by 10,000+ travelers</div>
        <p className="eyebrow">Luxury &amp; adventure handcrafted for you</p>
        <h1>Experience the world beyond the guidebook</h1>
        <p className="hero-subtitle">
          From secluded island escapes to high-altitude expeditions, our concierge team
          curates journeys that blend culture, comfort, and conservation.
        </p>
        <div className="hero-stats-inline">
          <div className="stat-inline">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
          <div className="stat-inline">
            <span className="stat-number">42</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-inline">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary btn-glow" onClick={onBookingOpen}>
            <span>🌍</span> Start Your Journey
          </button>
          <button className="btn btn-secondary btn-signup" onClick={onSignupOpen}>
            <span>✨</span> Join Free
          </button>
          <a className="btn btn-link" href="#destinations">
            Explore Destinations →
          </a>
        </div>
        <form className="search-panel search-panel-enhanced" onSubmit={handleSearch}>
          <label htmlFor="searchInput">🔍 Find your dream destination</label>
          <div className="search-field">
            <input
              id="searchInput"
              type="search"
              placeholder="Try 'Bali', 'desert', 'wellness', 'adventure'…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxLength="40"
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
          <div className="search-tags">
            <button type="button" className="tag-btn" onClick={() => setSearchQuery('luxury')}>🏖️ Luxury</button>
            <button type="button" className="tag-btn" onClick={() => setSearchQuery('adventure')}>⛰️ Adventure</button>
            <button type="button" className="tag-btn" onClick={() => setSearchQuery('wellness')}>🧘 Wellness</button>
            <button type="button" className="tag-btn" onClick={() => setSearchQuery('culture')}>🏛️ Culture</button>
          </div>
        </form>
      </div>
      <div className="hero-media">
        <div className="hero-slider hero-slider-enhanced" aria-label="Featured journeys">
          <button 
            className="slider-control prev" 
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className={`hero-slide ${isAnimating ? 'slide-animating' : ''}`}>
            <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} />
            <div className="hero-card__content hero-card__content-enhanced">
              <span className="slide-badge">Featured</span>
              <h3>{heroSlides[currentSlide].title}</h3>
              <p className="slide-subtitle">{heroSlides[currentSlide].subtitle}</p>
              <p className="slide-description">{heroSlides[currentSlide].description}</p>
              <button className="btn btn-outline btn-sm" onClick={onBookingOpen}>
                Book Now →
              </button>
            </div>
          </div>
          <button 
            className="slider-control next" 
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                aria-current={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
                className={currentSlide === index ? 'active' : ''}
              />
            ))}
          </div>
        </div>
        <div className="hero-badges hero-badges-enhanced">
          <div className="badge-card">
            <div className="badge-icon">🎯</div>
            <strong>500+</strong>
            <span>Trips curated</span>
          </div>
          <div className="badge-card">
            <div className="badge-icon">🛡️</div>
            <strong>24/7</strong>
            <span>Concierge line</span>
          </div>
          <div className="badge-card">
            <div className="badge-icon">🌱</div>
            <strong>Carbon</strong>
            <span>Neutral trips</span>
          </div>
        </div>
      </div>
    </section>
  )
}
