import React, { useState } from 'react';
import { Card, Button, Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard3.css'; // Import the CSS file
import axios from 'axios';

const MovieCard3 = ({ name, date, image, place, time, price, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    try {
      // Step 1: Add the movie to the cart by making a POST request
      const cartResponse = await axios.post('http://localhost:8031/cart', {
        name,
        date,
        place,
        time,
        price,
        image,
      });
      console.log('Item added to cart:', cartResponse.data);

     
      // Step 2: Add the concert/event to the user's ticket array
      const ticketResponse = await axios.post(`http://localhost:8031/user/${userId}/add-ticket/${cartResponse.data.item._id}`);
      console.log('Item added to user tickets:', ticketResponse.data);

      // Show success notification
      notification.success({
        message: 'Success',
        description: 'Item added to cart and tickets successfully!',
      });

    } catch (error) {
      console.error('Failed to add item to cart or user tickets:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to add item to cart or tickets.',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='movie-card-container3'>
        <div className='button-container3'>
        <Button type='primary' onClick={showModal}>Buy Tickets</Button>
          </div>
        <div>
          <img src={image} className='card-posters3'></img>
        </div>
        <div className='details3'>
          <div className='deet-title3'>{name}</div>
          <div className='deet-date3'>{date}</div>
          <div className='deet-venue3'>{place}</div>
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
          <div className="modal-content-container3">
            <div className="modal-image-container3">
              <img src={image} alt={name} />
            </div>
            <div className="modal-details-container3">
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
} 

export default MovieCard3;
