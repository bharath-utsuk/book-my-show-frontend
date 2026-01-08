import React from 'react';
import './TemplateStyles.css';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  language: string;
  rating: number;
}

interface MoviesListCardTemplateProps {
  data: {
    text?: string;
    intent?: string | null;
    parameters?: {
      data?: Movie[];
      [key: string]: any;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering movies list in BookMyShow style
 * Displays available movies with details
 */
export const MoviesListCardTemplate: React.FC<MoviesListCardTemplateProps> = ({ data }) => {
  const { parameters = {}, clarification } = data;
  const movies = parameters.data || [];

  if (movies.length === 0) {
    return null;
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getGenreEmoji = (genre: string) => {
    const genreMap: { [key: string]: string } = {
      'Sci-Fi': '🚀',
      'Action': '💥',
      'Drama': '🎭',
      'Comedy': '😂',
      'Horror': '👻',
      'Romance': '💕',
      'Thriller': '🔪',
      'Adventure': '🗺️',
      'Fantasy': '🧙',
      'Animation': '🎨',
    };
    return genreMap[genre] || '🎬';
  };

  return (
    <div className="sonex-template-card movies-list-card">
      <div className="template-card-header movies-list-header">
        <div className="template-card-icon">🎬</div>
        <div className="template-card-title">Now Showing</div>
      </div>
      
      <div className="template-card-body movies-list-body">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-poster-placeholder">
              <span className="genre-emoji">{getGenreEmoji(movie.genre)}</span>
            </div>
            
            <div className="movie-info">
              <div className="movie-title">{movie.title}</div>
              
              <div className="movie-details">
                <span className="movie-genre">{movie.genre}</span>
                <span className="movie-separator">•</span>
                <span className="movie-duration">{formatDuration(movie.duration)}</span>
                <span className="movie-separator">•</span>
                <span className="movie-language">{movie.language}</span>
              </div>
              
              <div className="movie-rating">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{movie.rating}</span>
                <span className="rating-max">/10</span>
              </div>
            </div>
            
            <div className="movie-actions">
              <button className="view-shows-button">
                View Shows
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {clarification && (
        <div className="template-card-footer movies-list-footer">
          <p className="template-clarification">{clarification}</p>
        </div>
      )}
    </div>
  );
};

