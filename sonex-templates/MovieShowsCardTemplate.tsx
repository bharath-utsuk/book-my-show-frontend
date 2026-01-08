import React from 'react';
import './TemplateStyles.css';

interface Show {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  price: number;
  movie?: {
    id: string;
    title: string;
    genre: string;
    duration: number;
    language: string;
    rating: number;
  };
  theater?: {
    id: string;
    name: string;
    location: string;
    totalSeats: number;
  };
}

interface MovieShowsCardTemplateProps {
  data: {
    text?: string;
    intent?: string | null;
    parameters?: {
      movieId?: string;
      data?: Show[];
      [key: string]: any;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering movie shows in BookMyShow style
 * Displays available movie showtimes with theater and pricing info
 */
export const MovieShowsCardTemplate: React.FC<MovieShowsCardTemplateProps> = ({ data }) => {
  const { parameters = {}, clarification } = data;
  const shows = parameters.data || [];

  if (shows.length === 0) {
    return null;
  }

  const movie = shows[0]?.movie;

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="sonex-template-card movie-shows-card">
      <div className="template-card-header movie-header">
        <div className="template-card-icon">🎬</div>
        <div className="movie-header-content">
          <div className="template-card-title">{movie?.title || 'Movie Shows'}</div>
          {movie && (
            <div className="movie-meta">
              {movie.genre} • {movie.duration} min • {movie.language} • ⭐ {movie.rating}
            </div>
          )}
        </div>
      </div>
      
      <div className="template-card-body movie-shows-body">
        {shows.map((show, index) => (
          <div key={show.id} className="show-item">
            <div className="show-theater">
              <div className="theater-name">{show.theater?.name || 'Theater'}</div>
              <div className="theater-location">📍 {show.theater?.location || 'Location'}</div>
            </div>
            
            <div className="show-details">
              <div className="show-time-container">
                <div className="show-date">{formatDate(show.startTime)}</div>
                <div className="show-time">{formatTime(show.startTime)}</div>
              </div>
              
              <div className="show-price">
                <div className="price-label">Price</div>
                <div className="price-value">₹{show.price}</div>
              </div>
            </div>

            <button className="book-button">
              Book Now
            </button>
          </div>
        ))}
      </div>
      
      {clarification && (
        <div className="template-card-footer movie-footer">
          <p className="template-clarification">{clarification}</p>
        </div>
      )}
    </div>
  );
};

