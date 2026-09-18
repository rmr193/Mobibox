import { ArrowDownWideNarrow } from 'lucide-react';

const GENRES = [
  'All',
  'Drama',
  'Comedy',
  'Action',
  'Sci-Fi',
  'Thriller',
  'Romance',
  'Crime',
  'Adventure',
  'Horror',
  'Mystery',
  'Fantasy',
  'Animation',
];

export default function FilterBar({
  selectedGenre,
  onSelectGenre,
  sortBy,
  onSortChange,
  totalCount,
}) {
  return (
    <div className="filter-bar">
      {/* Genre Pills */}
      <div className="genre-pills-scroll" role="tablist" aria-label="Filter by genre">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`genre-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Sort & Count Section */}
      <div className="sort-and-count">
        <span className="results-count">
          Showing <strong>{totalCount}</strong> {totalCount === 1 ? 'title' : 'titles'}
        </span>

        <div className="sort-select-box">
          <ArrowDownWideNarrow size={16} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort movies"
          >
            <option value="default">Featured / Default</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="year-desc">Premiered: Newest First</option>
            <option value="year-asc">Premiered: Oldest First</option>
            <option value="name-asc">Title: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
