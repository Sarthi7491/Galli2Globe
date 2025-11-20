import React from 'react'

export default function About() {
  return (
    <main>
      <section className="section section--padded is-visible">
        <div className="section-heading">
          <p className="eyebrow">Our story</p>
          <h2>Crafting journeys that matter</h2>
          <p>
            Galli2Globe emerged from a simple belief: travel should transform 
            both the traveler and the destination. We're a collective of travel designers, 
            local storytellers, and sustainability advocates.
          </p>
        </div>
      </section>

      <section className="section is-visible">
        <div className="feature-grid">
          <article className="feature">
            <div className="feature-icon">🌍</div>
            <h3>Global Network</h3>
            <p>120+ local partners across 42 countries ensuring authentic experiences.</p>
          </article>
          <article className="feature">
            <div className="feature-icon">♻️</div>
            <h3>Carbon Neutral</h3>
            <p>Every trip offsets 150% of its carbon footprint through verified projects.</p>
          </article>
          <article className="feature">
            <div className="feature-icon">🏆</div>
            <h3>Award Winning</h3>
            <p>Recognized by Travel + Leisure and Condé Nast for sustainable luxury.</p>
          </article>
        </div>
      </section>

      <section className="section section--alt is-visible">
        <div className="timeline-grid">
          <div className="timeline-card">
            {/* <div className="timeline-year">2018</div> */}
            <h3>The Beginning</h3>
            <p>Started with 5 destinations and a dream to change travel.</p>
          </div>
          <div className="timeline-card">
            {/* <div className="timeline-year">2020</div> */}
            <h3>Going Virtual</h3>
            <p>Launched virtual experiences keeping travel alive.</p>
          </div>
          <div className="timeline-card">
            {/* <div className="timeline-year">2023</div> */}
            <h3>Global Expansion</h3> 
            <p>Reached 42 countries with 500+ curated journeys.</p>
          </div>
          <div className="timeline-card">
            {/* <div className="timeline-year">2024</div> */}
            <h3>Today</h3>
            <p>Leading the way in sustainable luxury travel experiences.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
