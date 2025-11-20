import React, { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'How do I book a trip?',
    answer: 'Click the "Plan a trip" button, fill out the booking form with your preferences, and our concierge team will contact you within 24 hours with a personalized itinerary.'
  },
  {
    id: 2,
    question: 'What is included in the price?',
    answer: 'Our packages typically include accommodations, guided tours, select meals, and ground transportation. International flights and travel insurance are usually separate unless specified.'
  },
  {
    id: 3,
    question: 'Can I customize my itinerary?',
    answer: 'Absolutely! Every journey is bespoke. Our travel designers work with you to create an itinerary that matches your interests, pace, and budget.'
  },
  {
    id: 4,
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 60+ days before departure receive a full refund minus a 10% processing fee. 30-59 days: 50% refund. Less than 30 days: no refund unless you have travel insurance.'
  },
  {
    id: 5,
    question: 'Do you offer travel insurance?',
    answer: 'We strongly recommend travel insurance and can connect you with our preferred providers. Insurance typically covers trip cancellation, medical emergencies, and lost luggage.'
  },
  {
    id: 6,
    question: 'Are your trips sustainable?',
    answer: 'Yes! We offset 150% of carbon emissions, partner with eco-certified accommodations, and ensure our trips benefit local communities through fair wages and cultural preservation.'
  }
]

export default function Faq() {
  const [activeId, setActiveId] = useState(null)

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <main>
      <section className="section is-visible">
        <div className="section-heading">
          <p className="eyebrow">Got questions?</p>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about booking and traveling with us.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${activeId === faq.id ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                {faq.question}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
