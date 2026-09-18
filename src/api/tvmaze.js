// TVMaze API helper functions
// TVMaze Documentation: https://www.tvmaze.com/api

const BASE_URL = 'https://api.tvmaze.com';

// Helper function to remove HTML tags like <p>, <b> from TVMaze summary text
export function cleanSummary(html) {
  if (!html) return 'No description available for this show.';
  return html.replace(/<\/?[^>]+(>|$)/g, '').trim();
}

// 1. Fetch all TV shows for the default listing
export async function getAllShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies from TVMaze API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all shows:', error);
    throw error;
  }
}

// 2. Search TV shows by title
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error('Failed to search shows');
    }
    const data = await response.json();
    // TVMaze search returns an array of { score: ..., show: { ... } }
    // We map it to return just the show objects
    return data.map((item) => item.show);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
}
