import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Booking } from '../types';

interface Props {
  userId: string;
}

export default function BookingsPage({ userId }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getUserBookings(userId)
      .then(setBookings)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">My Bookings</h1>
      <p className="page-subtitle">Your booking history</p>

      {bookings.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🎟️</div>
          <p>No bookings yet. Book your first show!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="booking-id">#{booking.id.slice(0, 8)}</div>
                <div className="booking-date">{formatDate(booking.bookedAt)}</div>
              </div>
              <div className="booking-details">
                <div className="booking-detail">
                  <span className="booking-label">Show ID</span>
                  <span className="booking-value">{booking.showId.slice(0, 8)}...</span>
                </div>
                <div className="booking-detail">
                  <span className="booking-label">Seats</span>
                  <span className="booking-value">{booking.seatIds.length} seat(s)</span>
                </div>
                <div className="booking-detail">
                  <span className="booking-label">Total</span>
                  <span className="booking-value" style={{ color: 'var(--accent-secondary)' }}>
                    ₹{booking.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

