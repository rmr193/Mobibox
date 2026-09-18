import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import WatchlistPage from './pages/WatchlistPage';
import MovieModal from './components/MovieModal';
import { WatchlistProvider } from './context/WatchlistContext';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <WatchlistProvider>
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ScrollToTop />
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage onSelectMovie={handleSelectMovie} />} />
            <Route path="/movies" element={<MoviesPage onSelectMovie={handleSelectMovie} />} />
            <Route path="/watchlist" element={<WatchlistPage onSelectMovie={handleSelectMovie} />} />
            <Route path="*" element={<HomePage onSelectMovie={handleSelectMovie} />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Movie Details Modal */}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
    </WatchlistProvider>
  );
}
