// TVMaze API Service

const BASE_URL = 'https://api.tvmaze.com';

/**
 * Strips HTML tags for clean plain-text fallback
 */
export function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Normalizes show data from both /shows and /search/shows?q=:query
 */
export function normalizeShow(data) {
  if (!data) return null;
  const show = data.show ? data.show : data;

  const posterMedium = show.image?.medium || null;
  const posterOriginal = show.image?.original || show.image?.medium || null;
  
  // Extract year from premiered or ended
  let year = 'N/A';
  if (show.premiered) {
    year = show.premiered.slice(0, 4);
  } else if (show.ended) {
    year = show.ended.slice(0, 4);
  }

  const ratingVal = show.rating?.average ? Number(show.rating.average).toFixed(1) : null;
  const cleanSummary = show.summary ? stripHtml(show.summary) : 'No summary available for this title.';

  return {
    id: show.id,
    name: show.name || 'Untitled Show',
    type: show.type || 'Show',
    language: show.language || 'English',
    genres: show.genres && show.genres.length > 0 ? show.genres : ['General'],
    status: show.status || 'Unknown',
    runtime: show.runtime || show.averageRuntime || null,
    premiered: show.premiered || null,
    ended: show.ended || null,
    year,
    rating: ratingVal,
    ratingNumber: show.rating?.average ? Number(show.rating.average) : 0,
    officialSite: show.officialSite || null,
    networkName: show.network?.name || show.webChannel?.name || 'Various',
    scheduleTime: show.schedule?.time || '',
    scheduleDays: show.schedule?.days?.join(', ') || '',
    image: {
      medium: posterMedium,
      original: posterOriginal,
    },
    summaryHtml: show.summary || '<p>No summary available for this title.</p>',
    summaryText: cleanSummary,
    url: show.url || null,
  };
}

/**
 * Fetches all available shows (default page 0 or specific page)
 */
export async function getShows(page = 0) {
  try {
    const res = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch shows: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data.map(normalizeShow) : [];
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
}

/**
 * Searches shows by title/query
 */
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return [];
  }
  try {
    const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!res.ok) {
      throw new Error(`Failed to search shows: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data.map(normalizeShow) : [];
  } catch (error) {
    console.error(`Error searching shows for "${query}":`, error);
    throw error;
  }
}

/**
 * Fetches single show details by ID
 */
export async function getShowById(id) {
  try {
    const res = await fetch(`${BASE_URL}/shows/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch show with ID ${id}: ${res.status}`);
    }
    const data = await res.json();
    return normalizeShow(data);
  } catch (error) {
    console.error(`Error fetching show ${id}:`, error);
    throw error;
  }
}
