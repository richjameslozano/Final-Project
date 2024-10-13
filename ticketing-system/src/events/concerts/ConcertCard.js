// src/events/concerts/ConcertCard.js
import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../css/events/concerts/ConcertCard.css';

const ConcertCard = ({ title, date, venue, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/concert-details`);
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

export default ConcertCard;
