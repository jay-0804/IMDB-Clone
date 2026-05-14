import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Movies from './components/Movies';
import Series from './components/Series';
import Mood from './components/Mood';
import Watchlist from './components/Watchlist';
import MovieDetail from './components/MovieDetail';
import SeriesDetail from './components/SeriesDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;