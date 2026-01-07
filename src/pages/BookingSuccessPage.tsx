import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import type { Booking } from '../types';

export default function BookingSuccessPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    api.getBooking(bookingId)
      .then(setBooking)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <h1 className="success-title">Booking Confirmed!</h1>
      <p className="success-message">
        Your tickets have been booked successfully.
        {booking && (
          <> Booking ID: <strong>#{booking.id.slice(0, 8)}</strong></>
        )}
      </p>

      {booking && (
        <div className="booking-card" style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'left' }}>
          <div className="booking-details">
            <div className="booking-detail">
              <span className="booking-label">Seats Booked</span>
              <span className="booking-value">{booking.seatIds.length}</span>
            </div>
            <div className="booking-detail">
              <span className="booking-label">Total Amount</span>
              <span className="booking-value" style={{ color: 'var(--accent-secondary)' }}>
                ₹{booking.totalAmount}
              </span>
            </div>
            <div className="booking-detail">
              <span className="booking-label">Booked On</span>
              <span className="booking-value" style={{ fontSize: '0.9rem' }}>
                {new Date(booking.bookedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/" className="btn btn-primary">
          Browse Movies
        </Link>
        <Link to="/bookings" className="btn btn-secondary">
          My Bookings
        </Link>
      </div>
    </div>
  );
}

