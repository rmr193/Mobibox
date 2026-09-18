import { useState } from 'react';
import { Star, Calendar, Bookmark, Info, Film } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ movie, onSelectMovie }) {
  const [imgError, setImgError] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const isSaved = isInWatchlist(movie.id);
  const posterUrl = !imgError && movie.image?.medium ? movie.image.medium : null;

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    onSelectMovie(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => onSelectMovie(movie)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectMovie(movie);
        }
      }}
    >
      {/* Poster Image Container */}
      <div className="poster-wrapper">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.name} Poster`}
            className="movie-poster-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <Film size={36} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{movie.name}</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>No Poster Available</span>
          </div>
        )}

        <div className="poster-overlay-gradient" />

        {/* Top Badges: Rating & Watchlist Toggle */}
        <div className="card-top-badges">
          <div className="rating-badge">
            <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
            <span>{movie.rating ? movie.rating : 'N/A'}</span>
          </div>

          <button
            type="button"
            className={`card-watchlist-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleWatchlistClick}
            aria-label={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
            title={isSaved ? 'In your Watchlist' : 'Add to Watchlist'}
          >
            <Bookmark size={16} fill={isSaved ? '#ec4899' : 'none'} stroke={isSaved ? '#ec4899' : 'currentColor'} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="movie-card-body">
        <div className="movie-card-meta">
          <span className="year-pill">
            <Calendar size={13} />
            <span>{movie.year}</span>
          </span>
          <span className="meta-dot">•</span>
          <span className="genre-subtext">
            {movie.genres.slice(0, 2).join(', ')}
          </span>
        </div>

        <h3 className="movie-card-title" title={movie.name}>
          {movie.name}
        </h3>

        {/* See Details Button */}
        <div className="movie-card-footer">
          <button
            type="button"
            className="btn-see-details"
            onClick={handleDetailsClick}
            aria-label={`See details for ${movie.name}`}
          >
            <Info size={16} />
            <span>See Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
