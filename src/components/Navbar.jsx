import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Clapperboard, Bookmark, Compass, Menu, X } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useWatchlist();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={handleNavClick}>
          <div className="brand-icon">
            <Clapperboard size={22} strokeWidth={2.4} />
          </div>
          <span>MovieExplorer<span className="dot">.</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Movies
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) => `watchlist-nav-link ${isActive ? 'active' : ''}`}
          >
            <Bookmark size={16} />
            <span>Watchlist</span>
            {count > 0 && <span className="badge-count">{count}</span>}
          </NavLink>
        </nav>

        {/* Right CTA / Action Button */}
        <div className="nav-actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/movies')}
            title="Browse all movies and shows"
          >
            <Compass size={17} />
            <span>Explore Movies</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer open">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Browse Movies & Shows
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) => `watchlist-nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
            style={{ width: 'fit-content' }}
          >
            <Bookmark size={16} />
            <span>My Watchlist</span>
            {count > 0 && <span className="badge-count">{count}</span>}
          </NavLink>
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => {
              handleNavClick();
              navigate('/movies');
            }}
          >
            <Compass size={18} />
            <span>Explore All Movies</span>
          </button>
        </div>
      )}
    </header>
  );
}
