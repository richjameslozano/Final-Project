import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard3.css'; // Import the CSS file
import axios from 'axios';

const MovieCard3 = ({ name, date, image, place, time, price, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
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
    setLoading(true); // Start loading

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
      const movieId = cartResponse.data.item._id; // Get the movie ID from the cart response

      console.log('Item added to cart:', cartResponse.data);
      message.success('Added to Cart Successfully');

      // Step 2: Add the movie/event to the user's ticket array
      const addEventToUserResponse = await axios.put('http://localhost:8031/addEventToUser', {
        userId,
        movieId, // Pass the movie ID
      });

      console.log('Event added to user tickets:', addEventToUserResponse.data);

      // Show success message
      message.success('Movie added to cart and tickets!');

      // Show success notification
      notification.success({
        message: 'Success',
        description: 'Item added to cart and tickets successfully!',
      });

    } catch (error) {
      console.error('Failed to add item to cart or user tickets:', error);
      message.error('Failed to add movie to cart or tickets.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAddToCart = async (item) => {
    try {
        const response = await axios.post('http://localhost:8031/cart', item);
        console.log('Item added to cart:', response.data);
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
  };

  // Example function to add a ticket for the user
  const handleAddTicket = async (userId, eventId) => {
      try {
          const response = await axios.put(`http://localhost:8031/user/${userId}/add-ticket/${eventId}`);
          console.log('Ticket added:', response.data);
      } catch (error) {
          console.error('Failed to add ticket:', error);
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
    <div className='movie-card-container3'>
      <div className='button-container3'>
        <Button type='primary' onClick={showModal}>Buy Tickets</Button>
      </div>
      <div>
        <img src={image} className='card-posters3' alt="Event Poster" />
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
        okText={loading ? 'Adding...' : 'Add to Cart'} // Show loading text
        cancelText="Cancel"
        confirmLoading={loading} // Disable the button while loading
        className="custom-modal"
        width={800}
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
};

export default MovieCard3;
