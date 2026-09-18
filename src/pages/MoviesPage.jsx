import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

export default function MoviesPage({ onSelectMovie }) {
  // Store the list of movies
  const [movies, setMovies] = useState([]);
  // Store user search input
  const [searchTerm, setSearchTerm] = useState('');
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch all default movies on page load
  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please check your internet connection.');
        setLoading(false);
      });
  }, []);

  // Function to reload all movies
  const fetchAllMovies = () => {
    setLoading(true);
    setError('');

    fetch('https://api.tvmaze.com/shows')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please check your internet connection.');
        setLoading(false);
      });
  };

  // 2. Function to search movies
  const searchMovies = (query) => {
    if (!query || query.trim() === '') {
      fetchAllMovies();
      return;
    }

    setLoading(true);
    setError('');

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        // TVMaze search returns [{ score, show }, ...], extract the show objects
        const results = data.map((item) => item.show);
        setMovies(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error searching movies:', err);
        setError('Error searching movies. Please try again.');
        setLoading(false);
      });
  };

  // Handle typing in the search box
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchAllMovies();
    } else {
      searchMovies(value);
    }
  };

  // Handle clicking the Search button or pressing Enter
  const handleSearchSubmit = () => {
    searchMovies(searchTerm);
  };

  // Handle clicking the Clear button (✕)
  const handleClearSearch = () => {
    setSearchTerm('');
    fetchAllMovies();
  };

  return (
    <div className="movies-page">
      <div className="container">
        {/* Page Header */}
        <div className="movies-page-header">
          <h1>Browse & Search Movies</h1>
          <p>Find your favorite movies and shows from our live database.</p>
        </div>

        {/* Search Bar Component */}
        <div className="search-section">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
          />
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="status-message">
            <p>Loading movies, please wait...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="status-message error">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="status-message empty">
            <p>No movies found matching "{searchTerm}". Try searching for another title!</p>
          </div>
        )}

        {/* Movies Grid */}
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
