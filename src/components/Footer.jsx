import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">🎬 MovieExplorer</span>
            <p className="footer-tagline">
              Discover and explore your favorite movies and shows from around the world.
            </p>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
          </div>

          <div className="footer-links">
            <h4>Credits & Links</h4>
            <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
              TVMaze API ↗
            </a>
            <a href="https://github.com/rmr193/Mobibox" target="_blank" rel="noreferrer">
              GitHub Repository ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 MovieExplorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
