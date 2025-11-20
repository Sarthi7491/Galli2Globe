import React from 'react'

const galleryImages = [
  { id: 1, src: '/images/maldives-escape.jpg', alt: 'Maldives overwater villas' },
  { id: 2, src: '/images/patagonia-traverse.jpg', alt: 'Patagonia mountains' },
  { id: 3, src: '/images/bali-retreat.jpg', alt: 'Bali rice terraces' },
  { id: 4, src: '/images/swiss-alps.jpg', alt: 'Swiss Alps panorama' },
  { id: 5, src: '/images/kyoto-cultural.jpg', alt: 'Kyoto temple' },
  { id: 6, src: '/images/sahara-expedition.jpg', alt: 'Sahara desert' },
  { id: 7, src: '/images/iceland-saga.jpg', alt: 'Iceland northern lights' },
  { id: 8, src: '/images/newzealand-alpine.jpg', alt: 'New Zealand mountains' },
  { id: 9, src: '/images/santorini-sunset.jpg', alt: 'Santorini sunset' },
  { id: 10, src: '/images/namibia-dunes.jpg', alt: 'Namibia sand dunes' }
]

export default function Gallery() {
  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">Visual journey</p>
          <h2>Moments captured around the world</h2>
          <p>A glimpse into the extraordinary experiences awaiting you.</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
