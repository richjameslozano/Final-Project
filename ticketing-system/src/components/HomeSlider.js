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


      <div className='slider-content'>
        <Carousel autoplay ref={carouselRef}>
          {/* Add your images, text, and button here */}
          <div className='slider-slide'>
            <img src='/images/unis-slider2.webp' alt='Slide 1' className='carousel-image' />
            <div className='slider-text'>
            <div className='slider-title'>UNIS in Curiousland</div>
              <p>UNIS is bringing their charm and talent to Manila with their “WE UNIS” Fansign Philippine Tour. </p>
           
            </div>
          </div>

          <div className='slider-slide'>
            <img src='/images/bluelock.jpg' alt='Slide 2' className='carousel-image' />
            <div className='slider-text'>
              <div className='slider-title'>Blue Lock: Episode Nagi</div>
              <p>Join sophomore Seishiro Nagi become one of the  greatest strikers from all over the country.</p>

            </div>
          </div>

          <div className='slider-slide'>
            <img src='/images/pbacup.jpg' alt='Slide 3' className='carousel-image' />
            <div className='slider-text'>
            <div className='slider-title'> PBA 49th Governor's Cup</div>
              <p>Witness Philippine's basketball teams fight for the PBA Governor's Cup Title.</p>
         
            </div>
          </div>
          
          <div className='slider-slide'>
            <img src='/images/balota.jpg' alt='Slide 4' className='carousel-image' />
            <div className='slider-text'>
            <div className='slider-title'>BALOTA</div>
              <p>Assigned to the Board of Election Inspectors, she must protect a ballot box 
                containing final election results.  </p>

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
