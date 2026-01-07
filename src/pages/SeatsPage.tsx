import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import type { Show, Seat } from '../types';

interface Props {
  userId: string;
}

export default function SeatsPage({ userId }: Props) {
  const { showId } = useParams<{ showId: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showId) return;

    Promise.all([
      api.getShow(showId),
      api.getSeats(showId)
    ])
      .then(([showData, seatsData]) => {
        setShow(showData);
        setSeats(seatsData.seats);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [showId]);

  const toggleSeat = (seatId: string, isBooked: boolean) => {
    if (isBooked) return;
    
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
  };

  const handleBooking = async () => {
    if (!showId || selectedSeats.size === 0) return;

    setBooking(true);
    try {
      const booking = await api.createBooking(
        showId,
        Array.from(selectedSeats),
        userId
      );
      navigate(`/booking-success/${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
      setBooking(false);
    }
  };

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Sort seats within each row by number
  Object.values(seatsByRow).forEach(rowSeats => {
    rowSeats.sort((a, b) => a.number - b.number);
  });

  const rows = Object.keys(seatsByRow).sort();

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

  const totalPrice = show ? selectedSeats.size * show.price : 0;

  return (
    <div className="seats-container">
      <Link to={show?.movie ? `/shows/${show.movie.id}` : '/'} className="back-link">
        ← Back to Shows
      </Link>

      {show && (
        <>
          <h1 className="page-title">{show.movie?.title}</h1>
          <p className="page-subtitle">
            {show.theater?.name} · {show.theater?.location}
          </p>
        </>
      )}

      <div className="screen" />

      <div className="seats-grid">
        {rows.map(row => (
          <div key={row} className="seats-row">
            <span className="row-label">{row}</span>
            {seatsByRow[row].map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.isBooked ? 'booked' : ''} ${selectedSeats.has(seat.id) ? 'selected' : ''}`}
                onClick={() => toggleSeat(seat.id, seat.isBooked)}
                disabled={seat.isBooked}
                title={`${seat.row}${seat.number}`}
              >
                {seat.number}
              </button>
            ))}
            <span className="row-label">{row}</span>
          </div>
        ))}
      </div>

      <div className="seats-legend">
        <div className="legend-item">
          <div className="legend-box available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box booked" />
          <span>Booked</span>
        </div>
      </div>

      {selectedSeats.size > 0 && (
        <div className="booking-summary">
          <div className="summary-info">
            <div className="summary-item">
              <span className="summary-label">Seats</span>
              <span className="summary-value">{selectedSeats.size}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total</span>
              <span className="summary-value price">₹{totalPrice}</span>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleBooking}
            disabled={booking}
          >
            {booking ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      )}
    </div>
  );
}

