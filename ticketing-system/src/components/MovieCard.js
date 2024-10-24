import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file
import axios from 'axios';

const MovieCard = ({ name, date, image, place, time, price }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    // Add the movie to the cart by making a POST request to the backend
    try {
      const response = await axios.post('http://localhost:8031/cart', {
        name,
        date,
        place,
        time,
        price,
        image,
      });

      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        okText="Add to Cart"
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
            <p><strong>Price:</strong> {price}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;
