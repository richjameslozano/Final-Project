import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import ConcertCard from './ConcertCard';
import '../../css/events/concerts/ConcertList.css';
import Header from '../../components/Header';
import SliderComponent from '../../components/SliderComponent';

const concertData = [
    { title: 'Rock Festival', date: '2024-10-20', venue: 'Madison Square Garden', image: '/images/olivia.jpg' },
    { title: 'Jazz Night', date: '2024-11-05', venue: 'Blue Note', image: '/images/olivia.jpg' },
    { title: 'Pop Extravaganza', date: '2024-12-15', venue: 'The Forum', image: '/images/olivia.jpg' },
    // Add more concerts as needed
  ];
  
  const ConcertList = () => {
    return (
      <div className="carousel-container">
        <Header />
        <SliderComponent concertData={concertData}/>
      </div>
    );
  };
  
  export default ConcertList;
