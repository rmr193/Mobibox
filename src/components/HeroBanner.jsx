import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Search, Sparkles, Film } from 'lucide-react';

export default function HeroBanner() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/movies');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-backdrop" />
      <div className="hero-grid-overlay" />

      <div className="container hero-content">
        {/* Floating Category Pill */}
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Unlimited Movies & TV Series</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          DISCOVER <span className="gradient-text">MOVIES</span> & TV SHOWS
        </h1>

        {/* Hero Description */}
        <p className="hero-description">
          Explore and discover your favorite movies and shows from around the world.
          Track ratings, browse by genre, read cast details, and save titles to your personal watchlist.
        </p>

        {/* Quick Search Bar in Hero */}
        <form onSubmit={handleSearchSubmit} className="search-bar-container">
          <div className="search-input-box">
            <div className="search-icon-left">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for movies, series (e.g., Breaking Bad, Girls)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search movies from hero banner"
            />
            <button type="submit" className="search-submit-btn">
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Call to Action Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn-primary"
            onClick={() => navigate('/movies')}
            id="hero-explore-btn"
          >
            <Compass size={19} />
            <span>Explore Now</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              const el = document.getElementById('featured-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/movies');
            }}
          >
            <Film size={19} />
            <span>Trending Highlights</span>
          </button>
        </div>

        {/* Hero Quick Stats */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Titles Indexed</span>
          </div>
          <div className="hero-stat-item">
            <span className="stat-number" style={{ color: '#fbbf24' }}>★ 8.8+</span>
            <span className="stat-label">Verified Ratings</span>
          </div>
          <div className="hero-stat-item">
            <span className="stat-number" style={{ color: '#4ade80' }}>100%</span>
            <span className="stat-label">Free & Live API</span>
          </div>
        </div>
      </div>
    </section>
  );
}
