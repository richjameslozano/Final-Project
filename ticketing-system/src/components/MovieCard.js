import React from 'react';
import { Card, Button } from 'antd';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file

const MovieCard = ({ title, screen, price, image }) => (
  <Card
    hoverable
    className="movie-card"
    cover={<img alt={title} src={image} />}
  >
    <Card.Meta title={title} description={`Screen: ${screen}`} className="movie-card-meta" />
    <div className="movie-card-price">{price}$</div>
    <Button type="primary" className="movie-card-button">Buy Tickets</Button>
  </Card>
);

export default MovieCard;
