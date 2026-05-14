import React from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

function MediaCard({ item, type = 'movie' }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : '—';
  const href = type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;
  const inList = isInWatchlist(item.id, type);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(item, type);
  };

  return (
    <Link
      to={href}
      className="group block rounded-xl overflow-hidden bg-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-zinc-700">
        {item.poster_path ? (
          <img
            src={getPosterUrl(item.poster_path)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-4xl">
            🎬
          </div>
        )}
        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 left-2 px-2 py-1 rounded-md text-sm font-medium transition z-10 ${
            inList
              ? 'bg-yellow-500 text-black'
              : 'bg-black/70 text-white hover:bg-zinc-800'
          }`}
          title={inList ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {inList ? '✓ Watchlist' : '+ Watchlist'}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-zinc-300 line-clamp-2">{item.overview}</p>
        </div>
        {item.vote_average != null && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
            ★ {item.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mt-0.5">{year}</p>
      </div>
    </Link>
  );
}

export default MediaCard;
