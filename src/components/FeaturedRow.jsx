import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function FeaturedRow({
  title,
  subtitle,
  movies,
  loading,
  onSelectMovie,
  viewAllLink = '/movies',
}) {
  return (
    <section id="featured-section" className="featured-row-section" style={{ margin: '4rem 0' }}>
      <div className="section-header">
        <div>
          <h2 className="section-header-title">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="var(--primary)" />
              {title}
            </span>
          </h2>
          {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
        </div>

        <Link to={viewAllLink} className="view-all-link">
          <span>View All Movies</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="movies-grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : (
        <div className="movies-grid">
          {movies.slice(0, 8).map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
          ))}
        </div>
      )}
    </section>
  );
}
