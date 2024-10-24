import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard2.css'; // Import the CSS file

const MovieCard2 = ({ name, date, image, place, time }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Add logic for proceeding to purchase if needed
    handleCartClick();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCartClick = () => {
    scrollToTop();
    navigate('/cart');
  };

  return (
    <div className='movie-card-container2'>
        <div className='button-container2'>
          <Button type='primary' onClick={showModal}>Buy Tickets</Button>
        </div>
        <div>
          <img src={image} className='card-posters2' alt='movie poster' />
        </div>
        <div className='details2'>
          <div className='deet-title2'>{name}</div>
          <div className='deet-date2'>{date}</div>
          <div className='deet-venue2'>{place}</div>
        </div>

        <Modal
          title="Event Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to Cart"
          cancelText="Cancel"
          className="custom-modal"
          width={800} // Set the width (in pixels)
        >
          <div className="modal-content-container2">
            <div className="modal-image-container2">
              <img src={image} alt={name} />
            </div>
            <div className="modal-details-container2">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Venue:</strong> {place}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
          </div>
        </Modal>
      </div>
  )
}

export default MovieCard2;
