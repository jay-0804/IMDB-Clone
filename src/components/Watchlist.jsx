import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { getPosterUrl } from '../api/tmdb';
import { GENRE_LABELS } from '../api/tmdb';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genresInWatchlist = useMemo(() => {
    const ids = new Set();
    watchlist.forEach((item) => {
      if (item.genre_id != null) ids.add(item.genre_id);
    });
    return Array.from(ids).sort((a, b) =>
      (GENRE_LABELS[a] || '').localeCompare(GENRE_LABELS[b] || '')
    );
  }, [watchlist]);

  const filteredItems = useMemo(() => {
    if (selectedGenre === 'all') return watchlist;
    const genreId = parseInt(selectedGenre, 10);
    return watchlist.filter((item) => item.genre_id === genreId);
  }, [watchlist, selectedGenre]);

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
        <p className="text-zinc-400 mb-6">
          {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved
        </p>

        {watchlist.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by genre">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedGenre === 'all'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white'
              }`}
            >
              All
            </button>
            {genresInWatchlist.map((genreId) => (
              <button
                key={genreId}
                onClick={() => setSelectedGenre(String(genreId))}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedGenre === String(genreId)
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white'
                }`}
              >
                {GENRE_LABELS[genreId] || `Genre ${genreId}`}
              </button>
            ))}
          </div>
        )}

        {watchlist.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-xl mb-2">Your watchlist is empty</p>
            <p className="text-sm">Add movies or series from the Home, Movies, or Series pages</p>
            <Link
              to="/movies"
              className="mt-6 inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-xl">No items in this genre</p>
            <button
              onClick={() => setSelectedGenre('all')}
              className="mt-4 text-yellow-400 hover:underline"
            >
              Show all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="group relative rounded-xl overflow-hidden bg-zinc-800 shadow-lg"
              >
                <Link to={item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}>
                  <div className="aspect-[2/3] relative overflow-hidden bg-zinc-700">
                    {item.poster_path ? (
                      <img
                        src={getPosterUrl(item.poster_path)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-4xl">
                        {item.type === 'movie' ? '🎬' : '📺'}
                      </div>
                    )}
                    {item.vote_average != null && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-md text-sm font-bold">
                        ★ {item.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-white line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      {item.release_date ? new Date(item.release_date).getFullYear() : '—'}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWatchlist(item.id, item.type)}
                  className="absolute top-2 left-2 px-2 py-1 rounded-md bg-red-500/90 hover:bg-red-500 text-white text-sm font-medium transition"
                  title="Remove from watchlist"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
