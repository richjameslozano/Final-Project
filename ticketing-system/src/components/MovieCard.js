import React from 'react';
import { Card, Button } from 'antd';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file


const MovieCard = ({ title, date, price, image, venue }) => (

  <div className='movie-card-container'>
      <div className='button-container'>
      <Button type='primary'>Buy Tickets</Button>
    </div>
    <div className='card-posters'>
      <img src={image} className='images'></img>

    </div>
    <div className='details'>
      <div className='deet-title'>{title}</div>
      <div className='deet-date'>{date}</div>
      <div className='deet-venue'>{venue}</div>
    </div>
  
  </div>
);


export default MovieCard;