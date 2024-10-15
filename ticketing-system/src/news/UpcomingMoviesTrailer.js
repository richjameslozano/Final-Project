import React, { useRef, useEffect } from 'react';
import '../css/news/UpcomingMoviesTrailer.css';

const UpcomingMovieTrailer = ({ movie, isVisible }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isVisible && iframeRef.current) {
      // When the modal is visible, set the iframe src to the movie's trailer URL
      iframeRef.current.src = movie.trailerUrl;
    } else if (iframeRef.current) {
      // Stop the video when modal is not visible
      iframeRef.current.src = ''; // Clear the source to stop playback
    }
  }, [isVisible, movie]);

  const handleBuyTickets = () => {
    alert(`Buying tickets for ${movie.title}`);
  };

  return (
    <div>
      <h2>{movie.title} - Trailer</h2>
      {movie.trailerUrl ? (
        <iframe
          ref={iframeRef}
          width="100%"
          height="400px"
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <p>No trailer available</p>
      )}
      <p>{movie.description}</p>
      <button onClick={handleBuyTickets} className="buy-tickets-button">
        Buy Tickets
      </button>
    </div>
  );
};

export default UpcomingMovieTrailer;
