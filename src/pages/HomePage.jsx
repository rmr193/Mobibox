import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { getAllShows } from '../api/tvmaze';

export default function HomePage({ onSelectMovie }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch some popular shows for the home landing page
  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getAllShows();
        // Take the first 8 shows to highlight on the home page
        setFeaturedMovies(data.slice(0, 8));
      } catch (err) {
        console.error('Failed to load featured movies:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Featured / Trending Movies Section */}
      <section className="container featured-section">
        <div className="section-title-row">
          <h2>Trending Movies & Shows</h2>
          <Link to="/movies" className="view-more-link">
            View All Movies →
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">Loading popular movies...</div>
        ) : (
          <div className="movies-grid">
            {featuredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
