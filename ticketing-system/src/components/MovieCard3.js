import React from 'react';
import { Card, Button } from 'antd';
import '../css/componentsStyle/MovieCard3.css'; // Import the CSS file

const MovieCard3 = ({ name, date, image, place }) => (

  <div className='movie-card-container3'>
    <div className='button-container3'>
    <Button type='primary'>Buy Tickets</Button>
      </div>
    <div>
      <img src={image} className='card-posters3'></img>
    </div>
    <div className='details3'>
      <div className='deet-title3'>{name}</div>
      <div className='deet-date3'>{date}</div>
      <div className='deet-venue3'>{place}</div>
    </div>
    
  </div>
);


export default MovieCard3;
