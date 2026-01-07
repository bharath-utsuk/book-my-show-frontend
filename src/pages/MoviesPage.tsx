import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import type { Movie } from '../types';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getMovies()
      .then(setMovies)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
      <h1 className="page-title">Now Showing</h1>
      <p className="page-subtitle">Select a movie to view available shows</p>

      {movies.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🎬</div>
          <p>No movies available</p>
        </div>
      ) : (
        <div className="cards-grid">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="card"
              onClick={() => navigate(`/shows/${movie.id}`)}
            >
              <h2 className="card-title">{movie.title}</h2>
              <div className="card-meta">
                <span className="card-tag accent">{movie.genre}</span>
                <span className="card-tag">{movie.language}</span>
                <span className="card-tag">{movie.duration} min</span>
                <span className="card-tag rating">
                  ★ {movie.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

