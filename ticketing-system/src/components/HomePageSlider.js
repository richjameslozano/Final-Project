import React, { useRef } from 'react'; // Import useRef
import { Button, Carousel } from 'antd';
import '../css/componentsStyle/HomePageSlider.css'; // Import the CSS file

const UpcomingMovie = () => {
  const carouselRef = useRef(null); // Create a ref for the Carousel

  const movieData = [
    { 
      image: `${process.env.PUBLIC_URL}/images/tokyodrift.jpg`, 
      backgroundImage: `${process.env.PUBLIC_URL}/images/test.png`, // Use your actual image
      title: 'Tokyo Drift', 
      date: '20-26 November 2024', 
      director: 'Tristan Aquino' 
    },  
    { 
      image: `${process.env.PUBLIC_URL}/images/ff7ls.jpg`, 
      backgroundImage: `${process.env.PUBLIC_URL}/images/test.png`, // Use the same for testing
      title: 'Avengers', 
      date: '15-20 December 2024', 
      director: 'John Doe' 
    },
    { 
      image: `${process.env.PUBLIC_URL}/images/ff2ls.jpg`, 
      backgroundImage: `${process.env.PUBLIC_URL}/images/test.png`, // Use the same for testing
      title: 'Avatar 2', 
      date: '10-17 January 2025', 
      director: 'Jane Smith' 
    },
  ];  

  return (
    <div className="upcoming-movie-carousel-container">
      <Carousel autoplay className="upcoming-movie-carousel" ref={carouselRef}>
        {movieData.map((movie, index) => (
          <div 
            key={index} 
            className="upcoming-movie-container"
            style={{ 
              backgroundImage: `url(${movie.backgroundImage})`, // Use the image from movie data
              height: '500px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="upcoming-movie-poster">
              <img src={movie.image} alt={movie.title} className="upcoming-movie-image" />
            </div>
            
            <div className="upcoming-movie-info">
              <h1 className="upcoming-movie-title">{movie.title}</h1>
              <p className="upcoming-movie-director">Directed By {movie.director}</p>
              <p className="upcoming-movie-dates">📅 {movie.date}</p>
              <p>🎬 All Cinemas Nationwide</p>
              <div className="upcoming-movie-buttons">
                <Button type="primary" className="upcoming-movie-button-primary">
                  Buy Ticket
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {/* Custom Navigation Buttons */}
      <Button 
        className="carousel-left-button" 
        onClick={() => carouselRef.current.prev()} // Use the ref to call prev()
      >
        ‹
      </Button>
      <Button 
        className="carousel-right-button" 
        onClick={() => carouselRef.current.next()} // Use the ref to call next()
      >
        ›
      </Button>
    </div>
  );
};

export default UpcomingMovie;
