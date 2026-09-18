import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import FeaturedRow from '../components/FeaturedRow';
import { getShows } from '../api/tvmaze';
import { Film, Zap, Star, Compass } from 'lucide-react';

export default function HomePage({ onSelectMovie }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getShows(0);
        if (mounted) {
          // Sort by highest rating for featured row
          const topRated = [...data]
            .filter((s) => s.ratingNumber > 0)
            .sort((a, b) => b.ratingNumber - a.ratingNumber)
            .slice(0, 8);
          setFeaturedMovies(topRated.length > 0 ? topRated : data.slice(0, 8));
        }
      } catch (err) {
        console.error('Failed to load featured movies', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="home-page">
      {/* 1. Hero Banner */}
      <HeroBanner />

      <div className="container">
        {/* 2. Top-Rated Spotlight Section */}
        <FeaturedRow
          title="Top Rated & Trending"
          subtitle="Critically acclaimed movies and series loved by millions worldwide"
          movies={featuredMovies}
          loading={loading}
          onSelectMovie={onSelectMovie}
          viewAllLink="/movies"
        />

        {/* 3. Platform Highlights / Features */}
        <section className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Film size={26} />
            </div>
            <h3 className="feature-title">Vast Catalog</h3>
            <p className="feature-desc">
              Access thousands of TV shows, anime, miniseries, and documentaries updated live from the TVMaze database.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ color: '#ec4899', background: 'rgba(236, 72, 153, 0.15)' }}>
              <Zap size={26} />
            </div>
            <h3 className="feature-title">Instant Search & Filter</h3>
            <p className="feature-desc">
              Find any title instantly by name, refine by genres such as Drama, Action, Comedy, or Sci-Fi, and sort by rating.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Star size={26} />
            </div>
            <h3 className="feature-title">In-Depth Details Modal</h3>
            <p className="feature-desc">
              Inspect rich synopses, release dates, runtime, platform channels, high-resolution backdrops, and official websites.
            </p>
          </div>
        </section>

        {/* 4. Bottom Call-To-Action Banner */}
        <section className="home-cta-banner">
          <h2>Ready to Dive into Endless Entertainment?</h2>
          <p>
            Explore our curated selection of movies and series right now. No sign-up or subscription required.
          </p>
          <button
            className="btn-primary"
            style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}
            onClick={() => navigate('/movies')}
          >
            <Compass size={20} />
            <span>Browse All Titles</span>
          </button>
        </section>
      </div>
    </div>
  );
}
