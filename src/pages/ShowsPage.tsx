import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import type { Show, Movie } from '../types';

export default function ShowsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [shows, setShows] = useState<Show[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) return;

    Promise.all([
      api.getShows(movieId),
      api.getMovie(movieId)
    ])
      .then(([showsData, movieData]) => {
        setShows(showsData);
        setMovie(movieData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
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
      <Link to="/" className="back-link">
        ← Back to Movies
      </Link>

      {movie && (
        <>
          <h1 className="page-title">{movie.title}</h1>
          <p className="page-subtitle">
            {movie.genre} · {movie.language} · {movie.duration} min · ★ {movie.rating.toFixed(1)}
          </p>
        </>
      )}

      {shows.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🎭</div>
          <p>No shows available for this movie</p>
        </div>
      ) : (
        <div className="cards-grid">
          {shows.map(show => (
            <div
              key={show.id}
              className="card show-card"
              onClick={() => navigate(`/seats/${show.id}`)}
            >
              <div className="show-time">{formatTime(show.startTime)}</div>
              <div className="card-meta">
                <span className="card-tag">{formatDate(show.startTime)}</span>
                {show.theater && (
                  <span className="card-tag">{show.theater.name}</span>
                )}
              </div>
              {show.theater && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  📍 {show.theater.location}
                </div>
              )}
              <div className="show-price">₹{show.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

