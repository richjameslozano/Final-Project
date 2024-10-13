// src/components/SliderComponent.js
import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import ConcertCard from '../events/concerts/ConcertCard';
import '../css/componentsStyle/SliderComponent.css'; 

const SliderComponent = ({ concertData }) => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="carousel-wrapper">
      <Button className="carousel-nav left-nav" onClick={handlePrev}>
        ◀
      </Button>
      <Carousel ref={carouselRef} dots={false} slidesToShow={3} slidesToScroll={1} autoplay>
        {concertData.map((concert, index) => (
          <div key={index}>
            <ConcertCard
              title={concert.title}
              date={concert.date}
              venue={concert.venue}
              image={concert.image}
            />
          </div>
        ))}
      </Carousel>
      <Button className="carousel-nav right-nav" onClick={handleNext}>
        ▶
      </Button>
    </div>
  );
};

export default SliderComponent;
