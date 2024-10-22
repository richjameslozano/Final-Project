import React, { useRef } from 'react';
import { Carousel } from 'antd';
import '../css/componentsStyle/HomeSlider.css'; // External CSS for styling

const HomeSlider = () => {
  const carouselRef = useRef(null); // Create a ref for Carousel

  // Custom handlers for next and previous
  const handleNext = () => carouselRef.current.next();
  const handlePrev = () => carouselRef.current.prev();

  return (
    <div className='slider-wrapper'>
      {/* Background Image */}
      <img src='/images/HomeImages/slider-bg.jpg' className='slider-bg' alt='slider background' />

      {/* Dark Overlay */}
      <div className='dark-overlay'></div> 

      <div className='slider-content'>
        <Carousel autoplay ref={carouselRef}>
          {/* Add your images, text, and button here */}
          <div className='slider-slide'>
            <img src='/images/ff7ls.jpg' alt='Slide 1' className='carousel-image' />
            <div className='slider-text'>
              <h2>Final Fantasy VII: Live Show</h2>
              <p>Join us for an unforgettable evening of music and visuals from FFVII.</p>
              <button className='buy-ticket-btn'>Buy Ticket</button>
            </div>
          </div>

          <div className='slider-slide'>
            <img src='/images/ff7ls.jpg' alt='Slide 2' className='carousel-image' />
            <div className='slider-text'>
              <h2>Final Fantasy VII: Live Show</h2>
              <p>Get your tickets now for an amazing experience.</p>
              <button className='buy-ticket-btn'>Buy Ticket</button>
            </div>
          </div>

          <div className='slider-slide'>
            <img src='/images/ff7ls.jpg' alt='Slide 3' className='carousel-image' />
            <div className='slider-text'>
              <h2>Final Fantasy VII: Live Show</h2>
              <p>Witness the magic of the Final Fantasy universe live.</p>
              <button className='buy-ticket-btn'>Buy Ticket</button>
            </div>
          </div>
          
          <div className='slider-slide'>
            <img src='/images/ff7ls.jpg' alt='Slide 4' className='carousel-image' />
            <div className='slider-text'>
              <h2>Final Fantasy VII: Live Show</h2>
              <p>Secure your spot and enjoy the live concert.</p>
              <button className='buy-ticket-btn'>Buy Ticket</button>
            </div>
          </div>
        </Carousel>
        
        {/* Custom navigation buttons */}
        <button className='prev-btn' onClick={handlePrev}>&lt;</button>
        <button className='next-btn' onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default HomeSlider;
