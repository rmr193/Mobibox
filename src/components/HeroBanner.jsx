import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <div className="hero-overlay" />
      <div className="container hero-content">
        {/* Title */}
        <h1 className="hero-title">DISCOVER MOVIES</h1>

        {/* Short Description */}
        <p className="hero-description">
          Explore and discover your favorite movies from around the world.
        </p>

        {/* Call to Action Button navigating to Movie Listing Page */}
        <button
          type="button"
          className="hero-cta-btn"
          onClick={() => navigate('/movies')}
        >
          <Compass size={18} />
          <span>Explore Now</span>
        </button>
      </div>
    </section>
  );
}
