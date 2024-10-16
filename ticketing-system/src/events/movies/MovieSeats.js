import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import '../../css/events/movies/MovieSeats.css';
import Header from '../../components/Header';

const { Title, Paragraph } = Typography;

const seatLayout = {
  A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const soldSeats = ['D5', 'E3', 'E4', 'E5'];

const MovieSeats = () => {
  const location = useLocation();
  const { movie } = location.state || {}; // Destructure movie from state
  console.log('Received movie data:', movie); // Debug point

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (soldSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="movie-details">
      <Header />
      <div className="movie-header">
        <img src="/images/ff1.jpg" alt="Movie Poster" className="movie-image" />
        <div className="movie-info">
          <Title level={2}>{movie ? movie.title : "Movie Title"}</Title>
          <Paragraph>{movie ? `Location: ${movie.location}` : "Location not available."}</Paragraph>
          <Paragraph>{movie ? `Date: ${movie.date}` : "Date not available."}</Paragraph>
          <Paragraph>{movie ? `Time: ${movie.time}` : "Time not available."}</Paragraph>
        </div>
      </div>

      <div className="movie-seat-selection">
        <h3>SELECT SEATS</h3>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color selected"></div> Your Seat
          </div>
          <div className="legend-item">
            <div className="legend-color available"></div> Available
          </div>
          <div className="legend-item">
            <div className="legend-color sold"></div> Sold
          </div>
        </div>

        <div className="screen">SCREEN</div>
        <div className="seat-grid">
          {Object.keys(seatLayout).map((row) => (
            <React.Fragment key={row}>
              <div className="row-label">{row}</div>
              {seatLayout[row].map((seatNumber) => {
                const seatId = `${row}${seatNumber}`;
                const isSold = soldSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <div
                    key={seatId}
                    className={`seat ${isSold ? 'sold' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatNumber}
                  </div>
                );
              })}
              <div className="row-label">{row}</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Button type="primary" className="checkout-button">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default MovieSeats;
