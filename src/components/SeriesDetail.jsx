import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tmdb, getBackdropUrl, getPosterUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

function SeriesDetail() {
  const { id } = useParams();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await tmdb.getTvDetails(id);
        if (!cancelled) setSeries(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">Failed to load series</p>
          <Link to="/series" className="mt-4 inline-block text-yellow-400 hover:underline">Back to Series</Link>
        </div>
      </div>
    );
  }

  const backdrop = getBackdropUrl(series.backdrop_path);
  const poster = getPosterUrl(series.poster_path);
  const startYear = series.first_air_date ? new Date(series.first_air_date).getFullYear() : null;
  const endYear = series.last_air_date ? new Date(series.last_air_date).getFullYear() : null;

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
        {backdrop ? (
          <>
            <img
              src={backdrop}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <Link
            to="/series"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4 transition"
          >
            ← Back to Series
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-40 md:w-56 mx-auto md:mx-0">
            {poster ? (
              <img
                src={poster}
                alt={series.name}
                className="rounded-xl shadow-2xl w-full"
              />
            ) : (
              <div className="aspect-[2/3] rounded-xl bg-zinc-700 flex items-center justify-center text-6xl">
                📺
              </div>
            )}
          </div>
          <div className="flex-1 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{series.name}</h1>
              <button
                onClick={() => toggleWatchlist(series, 'tv')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isInWatchlist(series.id, 'tv')
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                }`}
              >
                {isInWatchlist(series.id, 'tv') ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-zinc-400 text-sm mb-4">
              {startYear && <span>{startYear}{endYear && endYear !== startYear ? ` – ${endYear}` : ''}</span>}
              {series.number_of_seasons && <span>• {series.number_of_seasons} season{series.number_of_seasons !== 1 ? 's' : ''}</span>}
              {series.vote_average != null && (
                <span className="text-yellow-400 font-semibold">★ {series.vote_average.toFixed(1)}</span>
              )}
            </div>
            {series.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {series.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-full bg-zinc-700 text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            {series.tagline && (
              <p className="text-yellow-400/90 italic mb-4">&ldquo;{series.tagline}&rdquo;</p>
            )}
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-zinc-300 leading-relaxed">{series.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetail;
