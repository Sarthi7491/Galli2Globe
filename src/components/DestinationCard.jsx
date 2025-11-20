import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'

export default function DestinationCard({ destination, onBook, onViewDetails }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { formatPrice } = useCurrency()

  return (
    <article className="destination-card" onClick={() => onViewDetails(destination)}>
      <div className="card-media">
        <img src={destination.image} alt={destination.alt} loading="lazy" />
        <span className="card-badge">{destination.badge}</span>
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '❤' : '♡'}
        </button>
      </div>
      <div className="card-body">
        <div className="card-header">
          <h3>{destination.name}</h3>
          <p>{destination.location}</p>
        </div>
        <ul className="card-meta">
          {destination.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="card-footer">
          <div>
            <span className="price">{formatPrice(destination.price)}</span>
            <small className="duration">{destination.duration}</small>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={(e) => {
              e.stopPropagation()
              onBook(destination)
            }}
          >
            Book
          </button>
        </div>
      </div>
    </article>
  )
}
