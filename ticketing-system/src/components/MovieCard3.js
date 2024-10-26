import React, { useState } from 'react';
import { Card, Button, Modal, message, notification } from 'antd';
import '../css/componentsStyle/MovieCard3.css';
import axios from 'axios';

const MovieCard3 = ({ name, date, image, place, time, price, userData, setUserData, eventId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const userID = localStorage.getItem("user");
    const userholder = JSON.parse(userID).id;

    setIsModalVisible(false);
    setLoading(true);

    try {
      // Check if the ticket is already in the cart
      if (userData.ticket.some(ticket => ticket._id === eventId)) {
        message.warning('This ticket is already in your cart!');
        return; // Exit if ticket is already in cart
      }

      const addEventToUserResponse = await axios.post(`http://localhost:8031/user/${userholder}/add-ticket/${eventId}`);
      console.log('Event added to user tickets:', addEventToUserResponse.data);

      notification.success({
        message: 'Success',
        description: 'Item added to cart and tickets successfully!',
      });

      // Update userData state
      setUserData(prevData => ({
        ...prevData,
        ticket: [...prevData.ticket, addEventToUserResponse.data], // Update with new cart data
      }));
    } catch (error) {
      console.error('Failed to add item to cart or user tickets:', error.response ? error.response.data : error.message);
      message.error('Failed to add movie to cart or tickets.');
    } finally {
      setLoading(false);
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
        okText={loading ? 'Adding...' : 'Add to Cart'}
        cancelText="Cancel"
        confirmLoading={loading}
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
