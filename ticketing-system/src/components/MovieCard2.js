import React from 'react';
import { Card, Button } from 'antd';
import '../css/componentsStyle/MovieCard2.css'; // Import the CSS file

const MovieCard2 = ({ title, date, price, image, venue }) => (

  <div className='movie-card-container2'>
    <div>
      <img src={image} className='card-posters2'></img>
    </div>
    <div className='details2'>
      <div className='deet-title2'>{title}</div>
      <div className='deet-date2'>{date}</div>
      <div className='deet-venue2'>{venue}</div>
    </div>
    
  </div>
);


export default MovieCard2;
