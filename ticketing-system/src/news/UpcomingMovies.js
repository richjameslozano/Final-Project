import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import '../../src/css/news/UpcomingMovies.css';
import Header from '../../src/components/Header';
import UpcomingMovieTrailer from '../news/UpcomingMoviesTrailer';

const movies = [
  { 
    title: 'Alice', 
    rating: 'R-16', 
    poster: '/images/ff1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/EUoe7cf0HYw', 
    description: 'Alice, a brave girl, embarks on a journey through a fantastical world to save her family.' 
  },
  { 
    title: 'Friendly Fire', 
    rating: 'PG', 
    poster: '/images/ff2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p8HQ2JLlc4E',
    description: 'A comedy that explores the chaotic lives of friends during a weekend getaway.' 
  },
  { 
    title: 'Alice', 
    rating: 'R-16', 
    poster: '/images/ff1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/EUoe7cf0HYw', 
    description: 'Alice, a brave girl, embarks on a journey through a fantastical world to save her family.' 
  },
  { 
    title: 'Friendly Fire', 
    rating: 'PG', 
    poster: '/images/ff2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p8HQ2JLlc4E',
    description: 'A comedy that explores the chaotic lives of friends during a weekend getaway.' 
  },
  { 
    title: 'Alice', 
    rating: 'R-16', 
    poster: '/images/ff1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/EUoe7cf0HYw', 
    description: 'Alice, a brave girl, embarks on a journey through a fantastical world to save her family.' 
  },
  { 
    title: 'Friendly Fire', 
    rating: 'PG', 
    poster: '/images/ff2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p8HQ2JLlc4E',
    description: 'A comedy that explores the chaotic lives of friends during a weekend getaway.' 
  },
  { 
    title: 'Alice', 
    rating: 'R-16', 
    poster: '/images/ff1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/EUoe7cf0HYw', 
    description: 'Alice, a brave girl, embarks on a journey through a fantastical world to save her family.' 
  },
  { 
    title: 'Friendly Fire', 
    rating: 'PG', 
    poster: '/images/ff2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p8HQ2JLlc4E',
    description: 'A comedy that explores the chaotic lives of friends during a weekend getaway.' 
  },
  { 
    title: 'Alice', 
    rating: 'R-16', 
    poster: '/images/ff1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/EUoe7cf0HYw', 
    description: 'Alice, a brave girl, embarks on a journey through a fantastical world to save her family.' 
  },
  { 
    title: 'Friendly Fire', 
    rating: 'PG', 
    poster: '/images/ff2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p8HQ2JLlc4E',
    description: 'A comedy that explores the chaotic lives of friends during a weekend getaway.' 
  },
];

const getBadgeClass = (rating) => {
  switch (rating) {
    case 'R-16':
      return 'r16';
    case 'PG':
      return 'pg';
    case 'TBC':
      return 'tbc';
    default:
      return '';
  }
};


const UpcomingMovies = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMovie(null); // Reset selectedMovie when closing modal
  };

  return (
    <div className="upcoming-movies">
      <Header />
      <h2>COMING SOON</h2>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <Card
            className="movie-card"
            key={index}
            hoverable
            onClick={() => handleCardClick(movie)}
          >
            <div className={`rating-badge ${getBadgeClass(movie.rating)}`}>
              {movie.rating}
            </div>
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-title">{movie.title}</div>
          </Card>
        ))}
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={800}
      >
        {selectedMovie && (
          <UpcomingMovieTrailer movie={selectedMovie} isVisible={isModalVisible} />
        )}
      </Modal>
    </div>
  );
};

export default UpcomingMovies;
