import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard2.css'; // Import the CSS file
import axios from 'axios';

const MovieCard2 = ({ name, date, image, place, time, price, userId }) => {
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
      // Show success message
      message.success('Added to Cart Successfully');

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
    <div className='movie-card-wrapper'>

    
    <div className='movie-card-container2'>
        <div className='button-container2'>
          <Button type='primary' onClick={showModal}>Buy Tickets</Button>
        </div>
        <div className='image'>
          <img src={image} className='card-posters2' alt='movie poster' />
        </div>
        <div className='details2'>
          <div className='deet-title2'>{name}</div>
          <div className='deet-date2'>{date}</div>
          <div className='deet-venue2'>{place}</div>
        </div>
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
              <p><strong>Price:</strong> {price}</p>
            </div>
          </div>
        </Modal>
      </div>
  )
}

export default MovieCard2;
