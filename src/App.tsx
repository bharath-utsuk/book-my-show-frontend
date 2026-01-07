import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MoviesPage from './pages/MoviesPage';
import ShowsPage from './pages/ShowsPage';
import SeatsPage from './pages/SeatsPage';
import BookingsPage from './pages/BookingsPage';
import BookingSuccessPage from './pages/BookingSuccessPage';

function App() {
  const location = useLocation();
  const [userId] = useState(() => `user_${Math.random().toString(36).slice(2, 9)}`);

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">BookMyShow</span>
        </Link>
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Movies
          </Link>
          <Link 
            to="/bookings" 
            className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`}
          >
            My Bookings
          </Link>
        </nav>
        <div className="user-badge">
          <span className="user-icon">●</span>
          {userId.slice(0, 12)}
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/shows/:movieId" element={<ShowsPage />} />
          <Route path="/seats/:showId" element={<SeatsPage userId={userId} />} />
          <Route path="/bookings" element={<BookingsPage userId={userId} />} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccessPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 BookMyShow · Cinema Experience Redefined</p>
      </footer>
    </div>
  );
}

export default App;

