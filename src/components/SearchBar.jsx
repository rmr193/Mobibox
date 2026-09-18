import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-box">
        <Search size={20} className="search-icon" />

        <input
          type="text"
          placeholder="🔍 Search for a movie..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />

        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
}
