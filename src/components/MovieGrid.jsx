import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import { Film, AlertTriangle, RefreshCw } from 'lucide-react';

export default function MovieGrid({
  movies,
  loading,
  error,
  onRetry,
  onSelectMovie,
  emptyMessage = 'No movies or TV shows found matching your criteria.',
  onResetFilters,
}) {
  if (loading) {
    return (
      <div className="movies-grid" aria-busy="true" aria-label="Loading movies">
        {Array.from({ length: 12 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state-box">
        <AlertTriangle size={42} color="#f87171" />
        <h3 className="error-title">Unable to Load Titles</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{error}</p>
        {onRetry && (
          <button type="button" className="btn-primary" onClick={onRetry}>
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state-box">
        <div className="empty-icon">
          <Film size={36} />
        </div>
        <h3 className="empty-title">No Results Found</h3>
        <p className="empty-desc">{emptyMessage}</p>
        {onResetFilters && (
          <button type="button" className="btn-secondary" onClick={onResetFilters}>
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="movies-grid" role="region" aria-label="Movie and show cards">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </div>
  );
}
