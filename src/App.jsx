import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieModal from './components/MovieModal';

export default function App() {
  // State to track which movie is currently selected for the details modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Pages */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/movies"
            element={<MoviesPage onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="*"
            element={<HomePage onSelectMovie={handleSelectMovie} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
