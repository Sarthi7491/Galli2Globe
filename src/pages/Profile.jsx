import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    travelStyle: ''
  });
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        country: userData.country || '',
        travelStyle: userData.travelStyle || ''
      });
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
      navigate('/');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFeedback('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFeedback('');
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      country: user.country || '',
      travelStyle: user.travelStyle || ''
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...user,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      country: editForm.country,
      travelStyle: editForm.travelStyle,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('userEmail', editForm.email);

    setUser(updatedUser);
    setIsEditing(false);
    setFeedback('✓ Profile updated successfully!');

    setTimeout(() => setFeedback(''), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getBookingCount = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter(b => b.status === 'confirmed').length;
  };

  const getMemberSince = () => {
    if (user?.joinedDate) {
      const date = new Date(user.joinedDate);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return '2024';
  };

  if (!user) return null;

  return (
    <main>
      <section className="section section--padded is-visible">
        <div className="section-heading">
          <p className="eyebrow">Account</p>
          <h2>Welcome back, {user.name}!</h2>
          <p>Manage your profile and travel preferences.</p>
        </div>

        {feedback && (
          <div className="profile-feedback success">
            {feedback}
          </div>
        )}

        <div className="profile-layout">
          <div className="profile-card">
            <div className="profile-card-header">
              <h3>Profile Information</h3>
              {!isEditing && (
                <button className="btn btn-secondary btn-sm" onClick={handleEditClick}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="profile-info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{user.phone || 'Not provided'}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Country</span>
                  <span className="info-value">{user.country || 'Not provided'}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Travel Style</span>
                  <span className="info-value travel-style">
                    {user.travelStyle === 'luxury' && '🏖️ Luxury & Leisure'}
                    {user.travelStyle === 'adventure' && '⛰️ Adventure & Nature'}
                    {user.travelStyle === 'culture' && '🏛️ Culture & Heritage'}
                    {user.travelStyle === 'wellness' && '🧘 Wellness & Slow Travel'}
                    {!user.travelStyle && 'Not selected'}
                  </span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">{getMemberSince()}</span>
                </div>
              </div>
            ) : (
              <form className="profile-edit-form" onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={editForm.country}
                    onChange={handleInputChange}
                    placeholder="India"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="travelStyle">Travel Style</label>
                  <select
                    id="travelStyle"
                    name="travelStyle"
                    value={editForm.travelStyle}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your travel style</option>
                    <option value="luxury">🏖️ Luxury & Leisure</option>
                    <option value="adventure">⛰️ Adventure & Nature</option>
                    <option value="culture">🏛️ Culture & Heritage</option>
                    <option value="wellness">🧘 Wellness & Slow Travel</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    💾 Save Changes
                  </button>
                  <button type="button" className="btn btn-outline" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="profile-card">
            <h3>Travel Stats</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">✈️</div>
                <div className="stat-number">{getBookingCount()}</div>
                <div className="stat-label">Active Bookings</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-number">{user.wishlist?.length || 0}</div>
                <div className="stat-label">Wishlisted Trips</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌱</div>
                <div className="stat-number">2.5K</div>
                <div className="stat-label">CO₂ Offset (kg)</div>
              </div>
            </div>
            <button className="btn btn-outline btn-full" onClick={handleLogout} style={{ marginTop: '1.5rem' }}>
              🚪 Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
