// src/MovieList.js
import React from 'react';
import MovieDetails from './MovieDetails';
import './MovieList.css';
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
