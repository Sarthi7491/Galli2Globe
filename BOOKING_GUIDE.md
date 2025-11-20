# 📅 Booking System Guide

## How to View Your Trip Details

### Method 1: Navigation Menu
1. Click on **"My Bookings"** in the top navigation menu
2. You'll see all your booked trips with details

### Method 2: Direct URL
- Navigate to: `http://localhost:3000/bookings`

## 🎯 Features Implemented

### 1. **Date Validation**
✅ **Past dates are now blocked!**
- The travel month selector only allows current month and future months
- You cannot select any date before today
- Implemented using `min` attribute on the month input

```javascript
// Automatically sets minimum date to current month
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
setMinDate(`${year}-${month}`)
```

### 2. **Complete Booking Storage**
When you book a trip, the following information is saved:

```javascript
{
  id: "BK1700123456789",              // Unique booking ID
  destinationId: "maldives-escape",    // Destination reference
  destinationName: "Maldives Overwater Escape",
  destinationImage: "/images/maldives-escape.jpg",
  destinationLocation: "Noonu Atoll, Maldives",
  price: 399900,                       // Price in rupees
  travelMonth: "2025-03",              // Selected travel month
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  country: "India",
  groupSize: "2",                      // Solo, Duo, 3-5, 6+
  notes: "Honeymoon trip",             // Special requests
  status: "confirmed",                 // confirmed/pending/cancelled
  bookedAt: "2024-11-20T12:30:00.000Z",
  bookedDate: "November 20, 2024"
}
```

### 3. **Bookings Page Features**

#### View All Bookings
- Grid layout showing all your trips
- Each card displays:
  - Destination image
  - Status badge (Confirmed/Pending/Cancelled)
  - Booking ID
  - Travel month
  - Group size
  - Total price

#### View Full Details
Click "View Full Details" to see:
- **Trip Information**
  - Booking ID
  - Status
  - Travel month
  - Booking date

- **Traveler Information**
  - Full name
  - Email
  - Phone
  - Country
  - Group size

- **Special Requests**
  - Any notes you added

- **Payment Summary**
  - Trip cost breakdown
  - Total amount

#### Actions Available
- 📄 **Download Receipt** - Print or save booking details
- ❌ **Cancel Booking** - Cancel confirmed bookings

### 4. **Empty State**
If you haven't booked any trips yet:
- Shows a friendly message
- "Explore Destinations" button to start booking

## 📍 Where Data is Stored

### LocalStorage Keys:
1. **`bookings`** - Array of all bookings
2. **`user`** - User object with bookings array

### Example:
```javascript
// View your bookings in browser console
console.log(JSON.parse(localStorage.getItem('bookings')))

// View user data with bookings
console.log(JSON.parse(localStorage.getItem('user')))
```

## 🔄 Booking Flow

1. **Browse Destinations**
   - Home page or Journeys page
   - Click on a destination card

2. **Open Booking Modal**
   - Click "Book" button
   - Or click "Plan a trip" in header

3. **Fill Booking Form**
   - Select destination (pre-filled if clicked from card)
   - Choose travel month (only current/future months)
   - Enter personal details
   - Add group size
   - Optional: Add special requests

4. **Submit Booking**
   - Click "Submit request"
   - Booking is saved to localStorage
   - Success message appears

5. **View Booking**
   - Go to "My Bookings" page
   - See your trip details
   - View full details or cancel if needed

## 🎨 Status Colors

- **Confirmed** 🟢 - Green (Trip is confirmed)
- **Pending** 🟡 - Yellow (Awaiting confirmation)
- **Cancelled** 🔴 - Red (Trip cancelled)

## 💡 Tips

### To Test the System:
1. **Create a booking**
   ```
   - Go to home page
   - Click "Start Your Journey"
   - Fill the form
   - Submit
   ```

2. **View your booking**
   ```
   - Click "My Bookings" in menu
   - See your trip card
   - Click "View Full Details"
   ```

3. **Try date validation**
   ```
   - Open booking modal
   - Try to select a past month
   - You'll see it's disabled!
   ```

### To Clear All Bookings:
```javascript
// In browser console
localStorage.removeItem('bookings')
localStorage.setItem('user', JSON.stringify({
  ...JSON.parse(localStorage.getItem('user')),
  bookings: []
}))
window.location.reload()
```

## 🔐 Security Notes

- Bookings are stored locally in your browser
- Data persists until you clear browser data
- In production, this should be stored in a backend database
- Current implementation is for demonstration purposes

## 🚀 Future Enhancements

Possible additions:
- Email confirmation
- Payment integration
- Booking modifications
- Itinerary download
- Calendar sync
- Reminder notifications
- Review system after trip completion

---

**Need Help?**
- Check the browser console for any errors
- Verify you're logged in (signup first)
- Make sure JavaScript is enabled
- Try clearing cache if issues persist
