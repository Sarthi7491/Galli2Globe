# Galli2Globe - React Travel Website

A modern, responsive travel booking platform built with React and Vite.

## Features

- 🌍 Browse curated travel destinations
- 🔍 Filter and sort destinations by theme, price, and name
- 📱 Fully responsive design
- 🎨 Modern dark theme with smooth animations
- 🔐 User authentication (signup/login)
- 📅 Booking system with modal forms
- 📸 Image gallery
- 📝 Travel blog and guides
- ❓ FAQ section
- 👤 User profile management

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

## Project Structure

```
react-vite-app/
├── public/
│   ├── data/
│   │   └── destinations.json
│   └── images/
├── src/
│   ├── components/
│   │   ├── AuthModals.jsx
│   │   ├── BookingModal.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── TripModal.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Bookings.jsx
│   │   ├── Faq.jsx
│   │   ├── Gallery.jsx
│   │   ├── Guides.jsx
│   │   ├── Home.jsx
│   │   ├── Journeys.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Installation

```bash
cd react-vite-app
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Pages

- **Home** (`/`) - Hero section, featured destinations, testimonials, contact form
- **About** (`/about`) - Company story and timeline
- **Journeys** (`/journeys`) - All available travel destinations
- **Blog** (`/blog`) - Travel articles and tips
- **Gallery** (`/gallery`) - Photo gallery of destinations
- **Guides** (`/guides`) - Travel guides and resources
- **FAQ** (`/faq`) - Frequently asked questions
- **Bookings** (`/bookings`) - User's booking history
- **Profile** (`/profile`) - User profile and stats

## Features in Detail

### Destination Filtering
- Filter by theme (wellness, adventure, culture, luxury)
- Price range slider
- Sort by price or name

### Booking System
- Modal-based booking form
- Pre-filled destination selection
- Form validation

### Authentication
- Signup with email/password
- Login functionality
- Google OAuth placeholder
- LocalStorage-based session management

### Responsive Design
- Mobile-first approach
- Breakpoints at 640px and 960px
- Touch-friendly navigation

## License

© 2024 Galli2Globe. All rights reserved.
