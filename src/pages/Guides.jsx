import { useState } from 'react';

const guides = [
  {
    id: 1,
    title: "First-Time Traveler's Guide",
    description: 'Everything you need to know before your first international trip.',
    icon: '✈️',
    topics: ['Passport & Visas', 'Packing Tips', 'Travel Insurance', 'Cultural Etiquette']
  },
  {
    id: 2,
    title: 'Sustainable Travel Practices',
    description: 'How to travel responsibly and minimize your environmental impact.',
    topics: ['Carbon Offsetting', 'Eco-Friendly Accommodations', 'Local Communities', 'Wildlife Ethics']
  },
  {
    id: 3,
    title: 'Photography on the Road',
    description: 'Capture stunning travel photos with your smartphone or camera.',
    topics: ['Composition Tips', 'Golden Hour', 'Cultural Sensitivity', 'Editing Apps']
  }
];

export default function Guides() {
  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">Travel resources</p>
          <h2>Expert travel guides</h2>
          <p>Comprehensive guides to help you plan and enjoy your journey.</p>
        </div>
        <div className="article-grid">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-info-card">
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <ul>
                {guide.topics.map((topic, index) => (
                  <li key={index}>
                    <span>✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                Read Guide
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
} 