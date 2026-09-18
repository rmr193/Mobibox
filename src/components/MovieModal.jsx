import { useEffect } from 'react';
import { X, Star, Calendar, Clock, Film } from 'lucide-react';
import { cleanSummary } from '../api/tvmaze';

export default function MovieModal({ movie, onClose }) {
  // Close modal when pressing Escape key and disable background scrolling
  useEffect(() => {
    if (!movie) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  // Backdrop or original image if available
  const backdropImage = movie.image?.original || movie.image?.medium || null;
  const rating = movie.rating?.average ? movie.rating.average : 'N/A';
  const releaseDate = movie.premiered || 'Unknown';
  const plainSummary = cleanSummary(movie.summary);

  // Close modal if user clicks outside the modal content (on the overlay backdrop)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Top-Right ✕ Close Button */}
        <button
          type="button"
          className="modal-close-icon"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Hero Backdrop Image */}
        <div className="modal-hero-image">
          {backdropImage ? (
            <img src={backdropImage} alt={movie.name} />
          ) : (
            <div className="modal-hero-placeholder">
              <Film size={48} />
              <span>{movie.name}</span>
            </div>
          )}
          <div className="modal-hero-gradient" />
        </div>

        {/* Modal Information Body */}
        <div className="modal-content-body">
          <h2 className="modal-title">{movie.name}</h2>

          {/* Quick Badges: Rating & Release Date */}
          <div className="modal-badges-row">
            <span className="modal-badge rating">
              <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
              <span>Rating: {rating} / 10</span>
            </span>
            <span className="modal-badge date">
              <Calendar size={14} />
              <span>Release: {releaseDate}</span>
            </span>
            {movie.runtime && (
              <span className="modal-badge runtime">
                <Clock size={14} />
                <span>{movie.runtime} mins</span>
              </span>
            )}
            {movie.status && (
              <span className="modal-badge status">
                {movie.status}
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="modal-genres">
              {movie.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview / Summary */}
          <div className="modal-overview-section">
            <h3>Overview:</h3>
            <p>{plainSummary}</p>
          </div>

          {/* Additional Information */}
          <div className="modal-extra-info">
            <p>
              <strong>Language:</strong> {movie.language || 'English'}
            </p>
            <p>
              <strong>Network:</strong> {movie.network?.name || movie.webChannel?.name || 'Various'}
            </p>
            {movie.officialSite && (
              <p>
                <strong>Official Site:</strong>{' '}
                <a href={movie.officialSite} target="_blank" rel="noreferrer">
                  Visit Website ↗
                </a>
              </p>
            )}
          </div>

          {/* Bottom Close Button */}
          <div className="modal-footer-btn">
            <button type="button" className="btn-close-bottom" onClick={onClose}>
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
