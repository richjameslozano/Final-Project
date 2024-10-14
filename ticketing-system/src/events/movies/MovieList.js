// src/events/movies/MovieList.js
import React from 'react';
import Header from '../../components/Header';
import MovieSliderComponent from './MovieSliderComponent'; // Adjust the path if needed

// Sample movie data
const movieData = [
  { title: 'Action Movie', releaseDate: '2025-01-15', genre: 'Action', image: '/images/olivia.jpg' },
  { title: 'Comedy Movie', releaseDate: '2025-02-20', genre: 'Comedy', image: '/images/ff1.jpg' },
  { title: 'Drama Movie', releaseDate: '2025-03-10', genre: 'Drama', image: '/images/ff2.jpg' },
  // Add more movies as needed
];

const MovieList = () => {
  return (
    <div className="carousel-container">
      <Header />
      <MovieSliderComponent movieData={movieData} />
    </div>
  );
};

export default MovieList;
