import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tmdb, getBackdropUrl, getPosterUrl } from '../api/tmdb';
import MediaCard from './MediaCard';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [trendRes, moviesRes, tvRes] = await Promise.all([
          tmdb.getTrending('all', 'day'),
          tmdb.getPopularMovies(1),
          tmdb.getPopularTv(1),
        ]);
        if (!cancelled) {
          setTrending(trendRes.results?.slice(0, 10) || []);
          setPopularMovies(moviesRes.results?.slice(0, 6) || []);
          setPopularTv(tvRes.results?.slice(0, 6) || []);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl text-red-400">Failed to load content</p>
          <p className="text-zinc-400 mt-2 text-sm">Check your API key and connection</p>
        </div>
      </div>
    );
  }

  const hero = trending[0];
  const heroBackdrop = hero && getBackdropUrl(hero.backdrop_path);
  const heroTitle = hero?.title || hero?.name;
  const heroType = hero?.media_type;
  const heroId = hero?.id;

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      {hero && (
        <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
          {heroBackdrop ? (
            <>
              <img
                src={heroBackdrop}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-zinc-800" />
          )}
          <div className="relative z-10 h-full flex items-end pb-16 md:pb-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {heroTitle}
              </h1>
              <p className="text-zinc-300 text-lg max-w-2xl line-clamp-3 mb-6">
                {hero.overview}
              </p>
              <div className="flex flex-wrap gap-3">
                {hero.vote_average != null && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 font-semibold">
                    ★ {hero.vote_average.toFixed(1)}
                  </span>
                )}
                <Link
                  to={heroType === 'tv' ? `/series/${heroId}` : `/movie/${heroId}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Movies */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
          <Link
            to="/movies"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularMovies.map((m) => (
            <MediaCard key={m.id} item={m} type="movie" />
          ))}
        </div>
      </section>

      {/* Popular TV */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular TV Series</h2>
          <Link
            to="/series"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularTv.map((s) => (
            <MediaCard key={s.id} item={s} type="tv" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
