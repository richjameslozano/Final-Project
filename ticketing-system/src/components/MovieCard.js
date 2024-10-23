import React from 'react';
import { Card, Button } from 'antd';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file


const MovieCard = ({ Name, date, image, place }) => (

  <div className='movie-card-container'>
    <div className='button-container'>
    <Button type='primary'>Buy Tickets</Button>
      </div>
    <div>
      <img src={image} className='card-posters'></img>
    </div>
    <div className='details'>
      <div className='deet-title'>{Name}</div>
      <div className='deet-date'>{date}</div>
      <div className='deet-venue'>{place}</div>
    </div>

    
  </div>
);


export default MovieCard;