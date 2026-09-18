import { useEffect } from 'react';
import {
  X,
  Star,
  Calendar,
  Clock,
  Bookmark,
  Film,
  ExternalLink,
} from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieModal({ movie, onClose }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const isSaved = isInWatchlist(movie.id);
  const backdropUrl = movie.image?.original || movie.image?.medium || null;
  const posterUrl = movie.image?.medium || movie.image?.original || null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-movie-title"
    >
      <div className="modal-content">
        {/* Top-Right Close Icon Button */}
        <button
          type="button"
          className="modal-close-icon-btn"
          onClick={onClose}
          aria-label="Close modal"
          id="modal-close-btn"
        >
          <X size={20} />
        </button>

        {/* Modal Backdrop Header */}
        <div className="modal-header-hero">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={`${movie.name} Backdrop`}
              className="modal-backdrop-img"
            />
          ) : (
            <div className="poster-placeholder" style={{ height: '100%' }}>
              <Film size={48} />
              <span>{movie.name}</span>
            </div>
          )}
          <div className="modal-hero-gradient" />
        </div>

        {/* Modal Content Body */}
        <div className="modal-body">
          {/* Top Row: Poster Thumbnail & Title Area */}
          <div className="modal-top-row">
            <div className="modal-poster-thumb">
              {posterUrl ? (
                <img src={posterUrl} alt={`${movie.name} Poster`} />
              ) : (
                <div className="poster-placeholder" style={{ height: '100%' }}>
                  <Film size={24} />
                </div>
              )}
            </div>

            <div className="modal-title-area">
              <h2 id="modal-movie-title" className="modal-title">
                {movie.name}
              </h2>

              <div className="modal-quick-meta">
                {/* Rating Badge */}
                <div className="meta-chip rating-chip">
                  <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                  <span>{movie.rating ? `${movie.rating} / 10` : 'No Rating'}</span>
                </div>

                {/* Release Year */}
                <div className="meta-chip">
                  <Calendar size={14} />
                  <span>{movie.premiered ? movie.premiered : movie.year}</span>
                </div>

                {/* Runtime */}
                {movie.runtime && (
                  <div className="meta-chip">
                    <Clock size={14} />
                    <span>{movie.runtime} mins</span>
                  </div>
                )}

                {/* Status Badge */}
                {movie.status && (
                  <span
                    className={`status-badge ${
                      movie.status.toLowerCase() === 'running' ? 'running' : 'ended'
                    }`}
                  >
                    {movie.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Genres Badges */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="modal-genres-list">
              {movie.genres.map((genre) => (
                <span key={genre} className="modal-genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview / Summary */}
          <div>
            <h3 className="modal-section-title">Overview</h3>
            <div
              className="modal-overview-text"
              dangerouslySetInnerHTML={{ __html: movie.summaryHtml }}
            />
          </div>

          {/* Detailed Metadata Grid */}
          <div className="modal-details-grid">
            <div className="detail-item">
              <span className="detail-label">Network / Platform</span>
              <span className="detail-value">{movie.networkName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Original Language</span>
              <span className="detail-value">{movie.language || 'English'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">{movie.type || 'Scripted'}</span>
            </div>

            {movie.scheduleDays && (
              <div className="detail-item">
                <span className="detail-label">Schedule</span>
                <span className="detail-value">
                  {movie.scheduleDays} {movie.scheduleTime ? `at ${movie.scheduleTime}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Modal Action Bar */}
          <div className="modal-action-bar">
            <div className="modal-action-bar-left">
              <button
                type="button"
                className={`btn-watchlist-toggle ${isSaved ? 'active' : ''}`}
                onClick={() => toggleWatchlist(movie)}
              >
                <Bookmark
                  size={17}
                  fill={isSaved ? '#fff' : 'none'}
                  stroke="currentColor"
                />
                <span>{isSaved ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              {movie.officialSite && (
                <a
                  href={movie.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-official-site"
                >
                  <span>Official Site</span>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <button
              type="button"
              className="btn-close-modal"
              onClick={onClose}
              aria-label="Close movie details dialog"
            >
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
