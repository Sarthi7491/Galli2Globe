import { Link } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { currency, setCurrency } = useCurrency()

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <footer className="site-footer">
      <div>
        <strong>Galli2Globe</strong>
        <p>Bureau of Responsible Travel | Lic. 12345/067/068</p>
        <div className="social-share" style={{ marginTop: '1rem' }}>
          <a href="#" aria-label="Facebook" style={{ textDecoration: 'none', color: 'var(--clr-muted)' }}>📘</a>
          <a href="#" aria-label="Instagram" style={{ textDecoration: 'none', color: 'var(--clr-muted)' }}>📷</a>
          <a href="#" aria-label="Twitter" style={{ textDecoration: 'none', color: 'var(--clr-muted)' }}>🐦</a>
          <a href="#" aria-label="YouTube" style={{ textDecoration: 'none', color: 'var(--clr-muted)' }}>📺</a>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="footer-links">
          <Link to="/about">Studio</Link>
          <Link to="/journeys">Journeys</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div>
        <div className="currency-widget" style={{ marginBottom: '1rem' }}>
          <span>Currency:</span>
          <select 
            value={currency}
            onChange={handleCurrencyChange}
            style={{ background: 'transparent', border: 'none', color: 'var(--clr-heading)' }}
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--clr-muted)' }}>
          &copy; {currentYear} Galli2Globe. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
