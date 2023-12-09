// src/MovieDetails.js
import React, { useState, useEffect } from 'react';
import './MovieDetails.css';
const MovieDetails = ({ movie }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'bfa6304718692979d53b57428c2654c7';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Error fetching movie details. Please try again later.');
        }

        const data = await response.json();
        setDetails(data);
        console.log(details);
        setError(null);
       
      } catch (error) {
        setDetails(null);
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [movie.id, apiKey]);

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      {details && (
        <div className="additional-details">
          <p>Overview: {details.overview}</p>
          <p>Runtime: {details.runtime} minutes</p>
          <p>Genres: {details.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MovieDetails;
