import { useEffect } from 'react'
import { useCurrency } from '../context/CurrencyContext'

export default function TripModal({ isOpen, onClose, destination, onBook }) {
  const { formatPrice } = useCurrency()

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  if (!isOpen || !destination) return null

  return (
    <section className="trip-modal is-visible" role="dialog" aria-modal="true">
      <div className="trip-modal__backdrop" onClick={onClose}></div>
      <article className="trip-modal__dialog">
        <button className="icon-button trip-modal__close" onClick={onClose} aria-label="Close trip details">
          ×
        </button>
        <div className="trip-modal__media">
          <img src={destination.image} alt={destination.alt} />
          <span className="trip-modal__badge">{destination.badge}</span>
        </div>
        <div className="trip-modal__content">
          <p className="eyebrow">Every trip is bespoke</p>
          <h3>{destination.name}</h3>
          <p className="trip-modal__location">{destination.location}</p>
          <p className="trip-modal__duration">{destination.duration}</p>
          <p>
            Immerse yourself in an unforgettable journey crafted by local experts. 
            This curated experience includes handpicked accommodations, exclusive access, 
            and personalized itineraries designed around your interests.
          </p>
          <ul className="trip-modal__tags">
            {destination.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="social-share">
            <button type="button" aria-label="Share on Facebook">📘</button>
            <button type="button" aria-label="Share on Twitter">🐦</button>
            <button type="button" aria-label="Share on WhatsApp">💬</button>
            <button type="button" aria-label="Copy link">🔗</button>
          </div>
        </div>
        <footer className="trip-modal__footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--clr-primary)', fontWeight: '700' }}>
              {formatPrice(destination.price)}
            </span>
            <button className="btn btn-primary" onClick={() => { onBook(destination); onClose(); }}>
              Book this journey
            </button>
          </div>
        </footer>
      </article>
    </section>
  )
}
