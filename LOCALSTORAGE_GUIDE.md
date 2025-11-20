# LocalStorage Implementation Guide

## 📦 Data Structure

### User Object
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "travelStyle": "adventure",
  "joinedDate": "2024-11-20T12:30:00.000Z",
  "bookings": [],
  "wishlist": []
}
```

### Storage Keys
- **`user`** - Complete user profile object
- **`userEmail`** - Quick email reference for login checks

## 🔐 Authentication Flow

### Signup Process
```javascript
// 1. User fills signup form
const formData = {
  fullName: "John Doe",
  email: "john@example.com",
  password: "******",
  travelStyle: "adventure",
  terms: true
}

// 2. Create user object
const userData = {
  name: formData.fullName,
  email: formData.email,
  travelStyle: formData.travelStyle,
  joinedDate: new Date().toISOString(),
  bookings: [],
  wishlist: []
}

// 3. Save to localStorage
localStorage.setItem('user', JSON.stringify(userData))
localStorage.setItem('userEmail', formData.email)

// 4. Reload page to show logged-in state
window.location.reload()
```

### Login Process
```javascript
// 1. User enters email and password
const formData = {
  email: "john@example.com",
  password: "******"
}

// 2. Check if user exists
const storedEmail = localStorage.getItem('userEmail')
const storedUser = localStorage.getItem('user')

// 3. If exists, reload to show logged-in state
if (storedEmail === formData.email && storedUser) {
  window.location.reload()
}

// 4. If not exists, create new user (simplified auth)
```

### Logout Process
```javascript
// 1. Remove user data
localStorage.removeItem('user')
localStorage.removeItem('userEmail')

// 2. Redirect to home
navigate('/')
```

## 🎯 Usage Examples

### Check if User is Logged In
```javascript
const user = localStorage.getItem('user')
if (user) {
  const userData = JSON.parse(user)
  console.log('Welcome back,', userData.name)
}
```

### Get User Data
```javascript
const getUserData = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const user = getUserData()
if (user) {
  console.log('Email:', user.email)
  console.log('Travel Style:', user.travelStyle)
}
```

### Update User Data
```javascript
const updateUser = (updates) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const updatedUser = { ...user, ...updates }
  localStorage.setItem('user', JSON.stringify(updatedUser))
}

// Example: Add a booking
updateUser({
  bookings: [...user.bookings, newBooking]
})
```

### Add to Wishlist
```javascript
const addToWishlist = (destinationId) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user.wishlist.includes(destinationId)) {
    user.wishlist.push(destinationId)
    localStorage.setItem('user', JSON.stringify(user))
  }
}
```

### Add a Booking
```javascript
const addBooking = (bookingData) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const booking = {
    id: Date.now(),
    ...bookingData,
    bookedAt: new Date().toISOString(),
    status: 'pending'
  }
  user.bookings.push(booking)
  localStorage.setItem('user', JSON.stringify(user))
}
```

## 🔍 Debugging

### View All LocalStorage Data
```javascript
// In browser console
console.log('User:', localStorage.getItem('user'))
console.log('Email:', localStorage.getItem('userEmail'))

// Or view all
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(key, localStorage.getItem(key))
}
```

### Clear All Data
```javascript
// Clear everything
localStorage.clear()

// Or clear specific items
localStorage.removeItem('user')
localStorage.removeItem('userEmail')
```

## ⚠️ Important Notes

### Security Considerations
1. **Never store passwords** in localStorage (we don't in this implementation)
2. **Don't store sensitive data** like credit cards
3. **Use HTTPS** in production
4. **Validate data** before using it

### Limitations
1. **5-10MB limit** per domain
2. **Synchronous API** (can block UI)
3. **String only** (must JSON.stringify/parse)
4. **No expiration** (data persists forever)
5. **Not secure** (accessible via JavaScript)

### Best Practices
```javascript
// Always wrap in try-catch
try {
  const user = JSON.parse(localStorage.getItem('user'))
  // Use user data
} catch (error) {
  console.error('Error parsing user data:', error)
  localStorage.removeItem('user')
}

// Check for null/undefined
const user = localStorage.getItem('user')
if (user && user !== 'undefined') {
  const userData = JSON.parse(user)
}

// Use helper functions
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}
```

## 🚀 Future Enhancements

### Session Management
```javascript
// Add session timeout
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

const checkSession = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const loginTime = new Date(user.joinedDate).getTime()
    const now = Date.now()
    if (now - loginTime > SESSION_TIMEOUT) {
      localStorage.clear()
      window.location.reload()
    }
  }
}
```

### Sync Across Tabs
```javascript
// Listen for storage changes
window.addEventListener('storage', (e) => {
  if (e.key === 'user') {
    // User logged in/out in another tab
    window.location.reload()
  }
})
```

### Backup to Server
```javascript
// Periodically sync to backend
const syncToServer = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    await fetch('/api/users/sync', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }
}
```

---

**Note**: This is a simplified authentication system for demonstration. In production, use proper backend authentication with JWT tokens, secure sessions, and encrypted passwords.
