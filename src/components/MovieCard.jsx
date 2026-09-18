import { useState } from 'react';
import { Star, Calendar, Info, Film } from 'lucide-react';

export default function MovieCard({ movie, onSelectMovie }) {
  const [imageError, setImageError] = useState(false);

  // Get poster image URL or fallback to null if missing or error
  const posterUrl = !imageError && movie.image?.medium ? movie.image.medium : null;

  // Format release year from premiered date (e.g., "2024-05-10" -> "2024")
  const releaseYear = movie.premiered ? movie.premiered.slice(0, 4) : 'N/A';

  // Format rating (e.g., 8.5 or 'N/A')
  const rating = movie.rating?.average ? movie.rating.average : 'N/A';

  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <div className="poster-wrapper">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.name}
            className="movie-poster-img"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <Film size={36} />
            <span className="placeholder-title">{movie.name}</span>
            <span className="placeholder-sub">No Poster</span>
          </div>
        )}

        {/* Rating Badge on top-right */}
        <div className="card-rating-badge">
          <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="movie-card-body">
        {/* Release Year and Genres */}
        <div className="movie-card-meta">
          <span className="year-pill">
            <Calendar size={13} />
            <span>{releaseYear}</span>
          </span>
          {movie.genres && movie.genres.length > 0 && (
            <span className="genre-text">
              • {movie.genres.slice(0, 2).join(', ')}
            </span>
          )}
        </div>

        {/* Movie Title */}
        <h3 className="movie-card-title" title={movie.name}>
          {movie.name}
        </h3>

        {/* See Details Button */}
        <button
          type="button"
          className="btn-see-details"
          onClick={() => onSelectMovie(movie)}
        >
          <Info size={16} />
          <span>See Details</span>
        </button>
      </div>
    </div>
  );
}
