import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file
import axios from 'axios';

const MovieCard = ({ name, date, image, place, time, price, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isItemInCart, setIsItemInCart] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const checkItemInCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8031/cart`);
      const cartItems = response.data;

      // Check if the current item already exists in the cart
      const itemExists = cartItems.some(item => item.name === name && item.date === date);
      setIsItemInCart(itemExists);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const handleOk = async () => {
    if (isItemInCart) {
      // Show a message if the item is already in the cart
      message.warning('This item is already in your cart!');
      setIsModalVisible(false);
      return;
    }

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

    } catch (error) {
      console.error('Failed to add item to cart or user tickets:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      checkItemInCart(); // Check if the item is in the cart when the modal is opened
    }
  }, [isModalVisible]);

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
