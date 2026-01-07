import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesPage from './pages/MoviesPage';
import ShowsPage from './pages/ShowsPage';
import SeatsPage from './pages/SeatsPage';
import BookingsPage from './pages/BookingsPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import LoginPage from './pages/LoginPage';
import { SonexWidget } from '@sonex/sdk-browser';
import { createSonexConfig } from '../sonex-config';

function App() {
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (token && storedUserId) {
      setUserId(storedUserId);
      setUserName(storedUserName || '');
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (id: string, name: string) => {
    setUserId(id);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remove all auth-related data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Clear state
    setUserId(null);
    setUserName('');
    setIsAuthenticated(false);
  };

  const handleChatEvent = (eventType: string, data?: any) => {
    console.log(`🔥 CHAT EVENT: ${eventType}`, data || '');

    // Add alert for debugging
    if (eventType === 'open') {
      console.log('🚨 WIDGET OPENED - This should only happen when user clicks the icon!');
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
        <div className="header-actions">
          <div className="user-badge">
            <span className="user-icon">●</span>
            {userName || userId?.slice(0, 12)}
          </div>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            Logout
          </button>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/shows/:movieId" element={<ShowsPage />} />
          <Route path="/seats/:showId" element={<SeatsPage userId={userId!} />} />
          <Route path="/bookings" element={<BookingsPage userId={userId!} />} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 BookMyShow · Cinema Experience Redefined</p>
      </footer>

      {/* Sonex Widget - Expense Splitting Assistant (floats independently) */}
      <SonexWidget config={createSonexConfig(handleChatEvent)} />
    </div>
  );
}

export default App;

