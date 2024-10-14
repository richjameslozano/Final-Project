// src/components/MovieSliderComponent.js
import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import MovieCard from '../movies/MovieCard'; // Adjust the import path if needed
import '../../css/events/movies/MovieSliderComponent.css'; // Adjust the path as necessary

const MovieSliderComponent = ({ movieData }) => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="carousel-wrapper">
      <Button className="carousel-nav left-nav" onClick={handlePrev}>
        ◀
      </Button>
      <Carousel ref={carouselRef} dots={false} slidesToShow={3} slidesToScroll={1} autoplay>
        {movieData.map((movie, index) => (
          <div key={index}>
            <MovieCard
              title={movie.title}
              date={movie.releaseDate}  // Assuming `releaseDate` is the same as `date`
              venue={movie.genre}        // Assuming `genre` is being used as a venue for this example
              image={movie.image}
            />
          </div>
        ))}
      </Carousel>
      <Button className="carousel-nav right-nav" onClick={handleNext}>
        ▶
      </Button>
    </div>
  );
};

export default MovieSliderComponent;
