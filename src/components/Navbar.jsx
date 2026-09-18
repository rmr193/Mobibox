import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo / Brand Name */}
        <Link to="/" className="navbar-brand" onClick={handleCloseMenu}>
          <span className="brand-logo-icon">🎬</span>
          <span className="brand-name">MovieExplorer</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Movies
          </NavLink>
        </div>

        {/* Prominent CTA button to navigate to Movie Listing Page */}
        <div className="navbar-cta-wrapper">
          <button
            type="button"
            className="navbar-cta-btn"
            onClick={() => navigate('/movies')}
          >
            <Compass size={16} />
            <span>Explore Movies</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-menu-dropdown">
          <NavLink to="/" end className="mobile-nav-item" onClick={handleCloseMenu}>
            Home
          </NavLink>
          <NavLink to="/movies" className="mobile-nav-item" onClick={handleCloseMenu}>
            Movies
          </NavLink>
          <button
            type="button"
            className="navbar-cta-btn mobile-cta"
            onClick={() => {
              handleCloseMenu();
              navigate('/movies');
            }}
          >
            <Compass size={16} />
            <span>Explore Movies</span>
          </button>
        </div>
      )}
    </nav>
  );
}
