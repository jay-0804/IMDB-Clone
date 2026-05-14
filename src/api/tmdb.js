const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const getPosterUrl = (path) => getImageUrl(path, 'w500');
export const getBackdropUrl = (path) => getImageUrl(path, 'w1280');

async function fetchApi(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const tmdb = {
  getPopularMovies: (page = 1) =>
    fetchApi('/movie/popular', { page }),

  getPopularTv: (page = 1) =>
    fetchApi('/tv/popular', { page }),

  getTrending: (type = 'all', timeWindow = 'day') =>
    fetchApi(`/trending/${type}/${timeWindow}`),

  getMovieDetails: (id) =>
    fetchApi(`/movie/${id}`),

  getTvDetails: (id) =>
    fetchApi(`/tv/${id}`),

  searchMovies: (query, page = 1) =>
    fetchApi('/search/movie', { query, page }),

  searchTv: (query, page = 1) =>
    fetchApi('/search/tv', { query, page }),

  discoverMoviesByGenre: (genreId, page = 1) =>
    fetchApi('/discover/movie', { with_genres: genreId, page }),

  discoverTvByGenre: (genreId, page = 1) =>
    fetchApi('/discover/tv', { with_genres: genreId, page }),

  getMovieGenres: () => fetchApi('/genre/movie/list'),
  getTvGenres: () => fetchApi('/genre/tv/list'),
};

// TMDB genre IDs for mood mapping
export const MOOD_GENRE_IDS = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  romance: 10749,
};

// Genre ID to label for display (common TMDB genres)
export const GENRE_LABELS = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
