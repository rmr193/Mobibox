import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/MovieGrid';
import { Bookmark, Compass, Trash2 } from 'lucide-react';

export default function WatchlistPage({ onSelectMovie }) {
  const { watchlist, clearWatchlist, count } = useWatchlist();

  return (
    <div className="watchlist-page">
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title">
              My <span className="gradient-text">Watchlist</span>
            </h1>
            <p className="page-subtitle">
              {count > 0
                ? `You have saved ${count} ${count === 1 ? 'title' : 'titles'} to your collection.`
                : 'Save movies and series to watch later.'}
            </p>
          </div>

          {count > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={clearWatchlist}
              style={{ color: '#f87171' }}
            >
              <Trash2 size={16} />
              <span>Clear Watchlist</span>
            </button>
          )}
        </div>

        {count === 0 ? (
          <div className="empty-state-box">
            <div className="empty-icon" style={{ color: 'var(--accent-pink)' }}>
              <Bookmark size={36} />
            </div>
            <h3 className="empty-title">Your Watchlist is Empty</h3>
            <p className="empty-desc">
              You haven't added any movies or TV series to your watchlist yet. Browse the collection and click the bookmark icon on any card!
            </p>
            <Link to="/movies" className="btn-primary">
              <Compass size={18} />
              <span>Discover Movies Now</span>
            </Link>
          </div>
        ) : (
          <MovieGrid
            movies={watchlist}
            loading={false}
            error={null}
            onSelectMovie={onSelectMovie}
          />
        )}
      </div>
    </div>
  );
}
