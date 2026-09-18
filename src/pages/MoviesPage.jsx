import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getAllShows, searchShows } from '../api/tvmaze';

export default function MoviesPage({ onSelectMovie }) {
  // State variables
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch initial shows when component mounts
  useEffect(() => {
    async function fetchInitialMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllShows();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Could not load movies. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchInitialMovies();
  }, []);

  // 2. Search movies when search query changes
  useEffect(() => {
    // If search is empty, load all shows again
    if (!searchQuery.trim()) {
      getAllShows()
        .then((data) => setMovies(data))
        .catch((err) => {
          console.error('Error loading default movies:', err);
          setError('Failed to load movies.');
        });
      return;
    }

    // Set a timer to debounce the search (so it waits until the user finishes typing)
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchShows(searchQuery);
        setMovies(results);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Error searching movies. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400);

    // Cleanup timeout when user types before 400ms
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle clearing the search
  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="movies-page">
      <div className="container">
        {/* Page Title */}
        <div className="movies-page-header">
          <h1>Browse & Search Movies</h1>
          <p>Find your favorite movies and shows from our live database.</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onClear={handleClear}
          />
        </div>

        {/* Loading Indicator */}
        {loading && <div className="status-message">Loading movies...</div>}

        {/* Error Message */}
        {error && !loading && (
          <div className="status-message error">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="status-message empty">
            No movies found matching "{searchQuery}". Try searching for another title!
          </div>
        )}

        {/* Movie Cards Grid */}
        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
