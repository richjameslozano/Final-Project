// src/events/concerts/ConcertCard.js
import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../css/events/movies/MovieCard.css';

const MovieCard = ({ title, date, venue, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie-details`);
  };

  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} />}
      className="concert-card"
      onClick={handleCardClick}
    >
      <Card.Meta title={title} description={`${date} at ${venue}`} />
      <div className="concert-card-footer">
        <Button type="primary" className="buy-tickets-button">
          Buy Tickets
        </Button>
      </div>
    </Card>
  );
};

export default MovieCard;
