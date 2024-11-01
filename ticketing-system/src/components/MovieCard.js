import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/MovieCard.css'; // Import the CSS file
import axios from 'axios';

const MovieCard = ({ name, date, image, place, time, price, userData, setUserData, eventId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = async () => {
  //   const userID = localStorage.getItem("user");

  //   // Check if user is logged in
  //   if (!userID) {
  //     message.warning('You need to log in first!');
  //     setIsModalVisible(false);
  //     return; // Exit if no user is logged in
  //   }

  //   const userholder = JSON.parse(userID).id;
  //   setIsModalVisible(false);
  //   setLoading(true);

  //   try {
  //     // Check if the ticket is already in the cart
  //     if (userData.ticket.some(ticket => ticket._id === eventId)) {
  //       message.warning('This ticket is already in your cart!');
  //       return; // Exit if ticket is already in cart
  //     }

  //     const addEventToUserResponse = await axios.post(`http://localhost:8031/user/${userholder}/add-ticket/${eventId}`);
  //     console.log('Event added to user tickets:', addEventToUserResponse.data);

  //     notification.success({
  //       message: 'Success',
  //       description: 'Item added to cart and tickets successfully!',
  //       placement: 'bottomRight'
  //     });

  //     // Update userData state
  //     setUserData(prevData => ({
  //       ...prevData,
  //       ticket: [...prevData.ticket, addEventToUserResponse.data], // Update with new cart data
  //     }));
      
  //   } catch (error) {
  //     console.error('Failed to add item to cart or user tickets:', error.response ? error.response.data : error.message);
  //     message.error('Failed to add movie to cart or tickets.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleOk = async () => {
    const userID = localStorage.getItem("user");
  
    if (!userID) {
      message.warning('You need to log in first!');
      setIsModalVisible(false);
      return;
    }
  
    const userholder = JSON.parse(userID).id;
    setIsModalVisible(false);
    setLoading(true);
  
    try {
      if (userData.ticket.some(ticket => ticket._id === eventId)) {
        message.warning('This ticket is already in your cart!');
        return;
      }
  
      // Send the selected quantity along with the eventId
      const addEventToUserResponse = await axios.post(
        `http://localhost:8031/user/${userholder}/add-ticket/${eventId}`,
        { quantity: selectedQuantity }
      );
  
      notification.success({
        message: 'Success',
        description: 'Item added to cart and tickets successfully!',
        placement: 'bottomRight',
      });
  
      setUserData(prevData => ({
        ...prevData,
        ticket: [...prevData.ticket, { ...addEventToUserResponse.data, quantity: selectedQuantity }],
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
    <div className='movie-card-wrapper1'>
    <div className='movie-card-container'>
      <div className='button-container'>
        <button type='primary' onClick={showModal}>Buy Tickets</button>
      </div>
      <div className='image1'>
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
          okText={loading ? 'Adding...' : 'Add to Cart'}
          cancelText="Cancel"
          confirmLoading={loading}
          className="custom-modal"
          width={800}
        >
          <div className="modal-content-container" >
            <div className="modal-image-container">
              <img src={image} alt={name} />
            </div>
            <div className="modal-details-container">
              <h1 className='item-title'>{name}</h1>
              <hr style={{marginTop: '-20px', marginBottom: '40px',height: '1px', backgroundColor: '#37FD12', border: 'none'}}></hr>
              <p style={{color: 'orange', fontWeight: '700', marginTop: '-30px', fontSize:'30px', marginBottom: '70px'}}> {price}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Venue:</strong> {place}</p>
              <p><strong>Time:</strong> {time}</p>
              
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MovieCard;
