import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between shadow-lg">

      {/* Left Section - Logo + Title */}
      <Link to="/home" className="flex items-center space-x-3 cursor-pointer">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" 
          alt="IMDB logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
          IMDB Clone
        </h1>
      </Link>

      {/* Right Section - Nav Links */}
      <ul className="flex space-x-8 text-lg font-medium">
        <li>
          <Link 
            to="/home" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
        </li>

        <li>
          <Link 
            to="/movies" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Movies
          </Link>
        </li>

        <li>
          <Link 
            to="/series" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Series
          </Link>
        </li>

        <li>
          <Link 
            to="/mood" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Mood
          </Link>
        </li>

        <li>
          <Link 
            to="/watchlist" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Watchlist
          </Link>
        </li>

        <li>
          <Link 
            to="/login" 
            className="hover:text-yellow-400 transition duration-300"
          >
            Login
          </Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
