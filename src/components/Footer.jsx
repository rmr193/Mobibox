import { Link } from 'react-router-dom';
import { Clapperboard, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <div className="brand-icon">
                <Clapperboard size={20} />
              </div>
              <span>MovieExplorer<span className="dot">.</span></span>
            </Link>
            <p className="footer-brand-text">
              Your ultimate movie and TV show companion. Browse thousands of titles, search top releases, read detailed overviews, and build your personalized watchlist.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/movies">Movie Listing</Link></li>
              <li><Link to="/watchlist">My Watchlist</Link></li>
              <li><Link to="/movies?genre=Drama">Popular Dramas</Link></li>
              <li><Link to="/movies?genre=Comedy">Top Comedies</Link></li>
            </ul>
          </div>

          {/* Resources & Attribution */}
          <div>
            <h4 className="footer-col-title">Data & Resources</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">
                  TVMaze API Documentation ↗
                </a>
              </li>
              <li>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                  Built with React 18+ ↗
                </a>
              </li>
              <li>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                  Powered by Vite ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © 2026 MovieExplorer. All rights reserved. Made for movie enthusiasts worldwide.
          </p>
          <div className="footer-social-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub Repository"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Twitter Profile"
              title="Twitter"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.tvmaze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="TVMaze Website"
              title="TVMaze"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
