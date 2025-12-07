# TravelHub - Tourist Management System

A complete, production-ready Tourist Management System built with React, JavaScript, and Material UI. This application helps tourists browse destinations, view detailed information, book packages, and manage their travel itineraries from a centralized platform.

## Features

### 1. Homepage
- Hero banner with destination search functionality
- Popular destinations carousel showcasing top travel spots
- Featured travel packages section
- Why choose us section highlighting key features
- Call-to-action sections for user engagement

### 2. Destination Listing Page
- Grid view with beautiful Material UI Cards
- Advanced filtering system:
  - Search by destination name, location, or country
  - Filter by location region
  - Filter by category (Beach, City, Adventure, etc.)
  - Price range slider (0 - $5000)
  - Minimum rating filter
- Responsive layout across all devices
- Real-time filter results with count display

### 3. Destination Detail Page
- Image gallery with lightbox functionality
- Comprehensive destination information
- Customer reviews and ratings
- Highlights and inclusions list
- Sticky booking panel
- Direct booking button

### 4. Booking System
- Multi-step booking form with validation
- Fields: Full name, email, phone, start date, travelers, special requests
- Real-time price calculation based on travelers
- Booking summary card
- Success confirmation page with booking ID
- Email confirmation (simulated)

### 5. User Dashboard
- Responsive sidebar navigation
- View all bookings with complete details
- Manage itineraries
- Cancel bookings functionality
- Empty state for new users
- Mobile-friendly drawer navigation

### 6. Profile Management
- User profile display with avatar
- Edit personal information (name, email, phone)
- Form validation
- Success notifications
- Account statistics

### 7. Navigation
- Material UI AppBar with sticky positioning
- Responsive mobile menu
- Quick links to all pages
- User profile icon
- Smooth transitions

### 8. Global Features
- Material UI v5+ theming
- Responsive design (mobile, tablet, desktop)
- Reusable components
- Smooth animations and transitions
- Loading skeletons
- Error handling
- Context API state management
- Mock JSON data with localStorage persistence
- Professional color scheme

## Tech Stack

- **React 18.3** - Functional components with hooks
- **JavaScript** - No TypeScript
- **Material UI v7** - Complete UI framework
- **React Router v7** - Client-side routing
- **Context API** - Global state management
- **Emotion** - CSS-in-JS styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   │   └── Navbar.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── DestinationCard/
│   │   └── DestinationCard.jsx
│   ├── PackageCard/
│   │   └── PackageCard.jsx
│   ├── SearchBar/
│   │   └── SearchBar.jsx
│   ├── ImageGallery/
│   │   └── ImageGallery.jsx
│   ├── Loader/
│   │   └── Loader.jsx
│   └── Error/
│       └── Error.jsx
│
├── pages/
│   ├── Home/
│   │   └── Home.jsx
│   ├── Destinations/
│   │   └── Destinations.jsx
│   ├── DestinationDetails/
│   │   └── DestinationDetails.jsx
│   ├── Booking/
│   │   └── Booking.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   └── Profile/
│       └── Profile.jsx
│
├── context/
│   ├── AppContext.jsx
│   └── AppReducer.jsx
│
├── data/
│   ├── destinations.json
│   ├── packages.json
│   └── bookings.json
│
├── hooks/
│   ├── useFetch.jsx
│   └── useBooking.jsx
│
├── theme/
│   └── theme.js
│
├── App.jsx
├── Layout.jsx
├── main.jsx
└── router.jsx
```

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```
The application will open at `http://localhost:5173`

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

## Key Components

### Context API State Management
- **AppContext**: Global state container
- **AppReducer**: State management logic
- Manages destinations, packages, bookings, user data, and filters
- LocalStorage integration for booking persistence

### Custom Hooks
- **useFetch**: Simulates API calls with loading states
- **useBooking**: Handles booking creation and price calculations

### Reusable Components
- **DestinationCard**: Display destination information
- **PackageCard**: Display package offers
- **SearchBar**: Global search functionality
- **ImageGallery**: Lightbox image viewer
- **Loader**: Loading states with messages
- **Error**: Error handling display

### Pages
- **Home**: Landing page with hero and features
- **Destinations**: Filterable destination listing
- **DestinationDetails**: Detailed destination information
- **Booking**: Multi-step booking form
- **Dashboard**: User booking management
- **Profile**: User profile settings

## Features in Detail

### Form Validation
All forms include comprehensive validation:
- Required field checks
- Email format validation
- Phone number format validation
- Date validation (future dates only)
- Numeric range validation

### Responsive Design
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Mobile drawer navigation
- Responsive grid layouts
- Touch-friendly interfaces

### Mock API Simulation
- Simulated API delays using setTimeout
- Loading states during data fetch
- Error handling for failed requests
- LocalStorage for data persistence

### Theming
- Custom Material UI theme
- Primary color: Blue (#2196F3)
- Secondary color: Orange (#FF9800)
- Professional typography
- Consistent spacing system
- Custom shadows and transitions

## Data Structure

### Destination Object
```javascript
{
  id: 1,
  name: "Bali, Indonesia",
  location: "Southeast Asia",
  country: "Indonesia",
  category: "Beach",
  price: 1200,
  rating: 4.8,
  reviews: 1543,
  image: "url",
  description: "...",
  highlights: [...],
  duration: "7 days",
  includes: [...]
}
```

### Booking Object
```javascript
{
  id: timestamp,
  destinationId: 1,
  destinationName: "...",
  fullName: "...",
  email: "...",
  phone: "...",
  startDate: "...",
  travelers: 2,
  totalPrice: 2400,
  specialRequests: "...",
  bookingDate: "...",
  status: "confirmed"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading for images
- Memoized components where applicable
- Optimized re-renders
- Efficient state management

## Future Enhancements

- Backend API integration
- User authentication
- Payment gateway integration
- Real-time availability checking
- Email notifications
- Social media integration
- Multi-language support
- Currency conversion
- Reviews and ratings system
- Admin panel

## License

This project is open source and available under the MIT License.

## Credits

- Images from Pexels
- Icons from Lucide React
- UI Framework: Material UI
- Built with React and Vite

---

**Enjoy exploring the world with TravelHub!** 🌍✈️
