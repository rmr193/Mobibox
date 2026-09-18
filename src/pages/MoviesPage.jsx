import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';
import { getShows, searchShows } from '../api/tvmaze';

export default function MoviesPage({ onSelectMovie }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlGenre = searchParams.get('genre') || 'All';

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [activeSearch, setActiveSearch] = useState(urlSearch);
  const [selectedGenre, setSelectedGenre] = useState(urlGenre);
  const [sortBy, setSortBy] = useState('default');

  const [allShows, setAllShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state with URL params if they change
  useEffect(() => {
    if (urlSearch !== activeSearch) {
      setSearchInput(urlSearch);
      setActiveSearch(urlSearch);
    }
    if (urlGenre !== selectedGenre) {
      setSelectedGenre(urlGenre);
    }
  }, [urlSearch, urlGenre]);

  // Initial load of default shows from /shows
  const fetchDefaultShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getShows(0);
      setAllShows(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch movies. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultShows();
  }, [fetchDefaultShows]);

  // Perform search when activeSearch changes
  useEffect(() => {
    let isCancelled = false;

    async function performSearch() {
      if (!activeSearch.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await searchShows(activeSearch.trim());
        if (!isCancelled) {
          setSearchResults(results);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || `Failed to search for "${activeSearch}". Please try again.`);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    // Debounce search by 350ms to prevent spamming the API while typing
    const timer = setTimeout(() => {
      performSearch();
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [activeSearch]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearchInput(val);
    setActiveSearch(val);
    
    // Update URL query parameters
    const nextParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      nextParams.set('search', val.trim());
    } else {
      nextParams.delete('search');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('search');
    setSearchParams(nextParams, { replace: true });
  };

  // Handle Genre selection
  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    const nextParams = new URLSearchParams(searchParams);
    if (genre !== 'All') {
      nextParams.set('genre', genre);
    } else {
      nextParams.delete('genre');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setActiveSearch('');
    setSelectedGenre('All');
    setSortBy('default');
    setSearchParams({}, { replace: true });
  };

  // Base list depending on whether a search is active
  const baseList = activeSearch.trim() ? searchResults : allShows;

  // Filter and Sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...baseList];

    // 1. Filter by Genre
    if (selectedGenre !== 'All') {
      result = result.filter(
        (m) => m.genres && m.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // 2. Sort
    switch (sortBy) {
      case 'rating-desc':
        result.sort((a, b) => (b.ratingNumber || 0) - (a.ratingNumber || 0));
        break;
      case 'rating-asc':
        result.sort((a, b) => (a.ratingNumber || 0) - (b.ratingNumber || 0));
        break;
      case 'year-desc':
        result.sort((a, b) => {
          const ya = parseInt(a.year, 10) || 0;
          const yb = parseInt(b.year, 10) || 0;
          return yb - ya;
        });
        break;
      case 'year-asc':
        result.sort((a, b) => {
          const ya = parseInt(a.year, 10) || 0;
          const yb = parseInt(b.year, 10) || 0;
          return ya - yb;
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // default order preserved
        break;
    }

    return result;
  }, [baseList, selectedGenre, sortBy]);

  return (
    <div className="movies-page">
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Page Title & Intro */}
        <div className="page-header" style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '1.5rem' }}>
          <h1 className="page-title">
            Explore <span className="gradient-text">Movies & Shows</span>
          </h1>
          <p className="page-subtitle">
            Search our extensive database, filter by genre, and discover your next binge-worthy title.
          </p>
        </div>

        {/* 1. Search Bar */}
        <div className="search-filter-wrapper">
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSubmit={(val) => {
              setActiveSearch(val);
            }}
            placeholder="Search by title (e.g. Breaking Bad, Girls, Batman, Stranger Things)..."
          />

          {/* 2. Filter & Sort Bar */}
          <FilterBar
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredAndSortedMovies.length}
          />
        </div>

        {/* 3. Movie Grid */}
        <MovieGrid
          movies={filteredAndSortedMovies}
          loading={loading}
          error={error}
          onRetry={activeSearch.trim() ? () => setActiveSearch(searchInput) : fetchDefaultShows}
          onSelectMovie={onSelectMovie}
          emptyMessage={
            activeSearch.trim()
              ? `No titles found matching "${activeSearch}" in genre "${selectedGenre}".`
              : `No titles found in genre "${selectedGenre}".`
          }
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}
