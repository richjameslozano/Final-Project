import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file

const MovieCard = ({ name, date, image, place, time }) => {
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
    <div className='movie-card-container'>
      <div className='button-container'>
        <Button type='primary' onClick={showModal}>Buy Tickets</Button>
      </div>
      <div>
        <img src={image} className='card-posters' alt='movie poster' />
      </div>
      <div className='details'>
        <div className='deet-title'>{name}</div>
        <div className='deet-date'>{date}</div>
        <div className='deet-venue'>{place}</div>
      </div>

      <Modal
        title="Event Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Proceed to Purchase"
        cancelText="Cancel"
        className="custom-modal"
        width={800} // Set the width (in pixels)
      >
        <div className="modal-content-container">
          <div className="modal-image-container">
            <img src={image} alt={name} />
          </div>
          <div className="modal-details-container">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Venue:</strong> {place}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;
