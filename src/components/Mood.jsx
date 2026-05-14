import React, { useEffect, useState } from 'react';
import MoodSelector from './MoodSelector';
import MediaGrid from './MediaGrid';
import { tmdb, MOOD_GENRE_IDS } from '../api/tmdb';

function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedMood) {
      setMovies([]);
      return;
    }
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const genreId = MOOD_GENRE_IDS[selectedMood];
        if (!genreId) return;
        const res = await tmdb.discoverMoviesByGenre(genreId, 1);
        if (!cancelled) setMovies(res.results || []);
      } catch (e) {
        if (!cancelled) setMovies([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [selectedMood]);

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">What are you in the mood for?</h1>
        <p className="text-zinc-400 mb-8">Select a genre to discover movies</p>

        <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />

        {selectedMood && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 capitalize">
              {selectedMood} Movies
            </h2>
            <MediaGrid items={movies} type="movie" loading={loading} />
          </div>
        )}

        {!selectedMood && (
          <div className="mt-16 text-center text-zinc-500">
            <p className="text-lg">Choose a mood above to get personalized recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mood;
