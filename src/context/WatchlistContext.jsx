import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'imdb-watchlist';

const WatchlistContext = createContext(null);

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(watchlist);
  }, [watchlist]);

  const addToWatchlist = (item, type = 'movie') => {
    const genreIds = item.genre_ids || (item.genres || []).map((g) => g.id) || [];
    const genre_id = genreIds[0] ?? null;
    const entry = {
      id: item.id,
      type,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date || item.first_air_date,
      vote_average: item.vote_average,
      genre_id,
    };
    setWatchlist((prev) => {
      if (prev.some((w) => w.id === item.id && w.type === type)) return prev;
      return [...prev, entry];
    });
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist((prev) => prev.filter((w) => !(w.id === id && w.type === type)));
  };

  const isInWatchlist = (id, type) =>
    watchlist.some((w) => w.id === id && w.type === type);

  const toggleWatchlist = (item, type = 'movie') => {
    if (isInWatchlist(item.id, type)) {
      removeFromWatchlist(item.id, type);
    } else {
      addToWatchlist(item, type);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
