import React, { useEffect, useState } from 'react';
import { tmdb } from '../api/tmdb';
import MediaGrid from './MediaGrid';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const isSearching = debouncedQuery.length > 0;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = isSearching
          ? await tmdb.searchMovies(debouncedQuery, 1)
          : await tmdb.getPopularMovies(1);
        if (!cancelled) {
          setMovies(res.results || []);
          setPage(1);
          setHasMore((res.total_pages || 1) > 1);
        }
      } catch (e) {
        if (!cancelled) setMovies([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [debouncedQuery, isSearching]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = isSearching
        ? await tmdb.searchMovies(debouncedQuery, nextPage)
        : await tmdb.getPopularMovies(nextPage);
      setMovies((prev) => [...prev, ...(res.results || [])]);
      setPage(nextPage);
      setHasMore(nextPage < (res.total_pages || 1));
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Movies</h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition"
          />
        </div>

        <MediaGrid items={movies} type="movie" loading={loading} />

        {!loading && movies.length > 0 && hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-semibold rounded-lg transition"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
