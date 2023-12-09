// src/MovieSearch.js
import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import './MovieSearch.css';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = 'bfa6304718692979d53b57428c2654c7';

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error('Error fetching movies. Please try again later.');
        }

        const data = await response.json();
        setSearchResults(data.results);
        setError(null);
        //console.log(searchResults);
      } catch (error) {
        setSearchResults([]);
        setError(error.message);
      }
    };

    fetchMovies();
  }, [searchTerm, apiKey]);

  return (
    <div className="movie-search-container">
      <h1>Movie Database</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error-message">{error}</p>}

      <MovieList movies={searchResults} />
    </div>
  );
};

export default MovieSearch;
