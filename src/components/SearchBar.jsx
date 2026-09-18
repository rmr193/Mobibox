import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, onSubmit, placeholder = 'Search for a movie or TV show...' }) {
  return (
    <div className="search-bar-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(value);
        }}
        className="search-input-box"
      >
        <div className="search-icon-left">
          <Search size={20} />
        </div>

        <input
          type="text"
          id="movie-search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />

        {value && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}

        <button type="submit" className="search-submit-btn">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
