// src/events/concerts/ConcertDetails.js
import React, { useState } from 'react';
import { Button, Card, Divider, Typography, Modal } from 'antd';
import '../../css/events/concerts/ConcertDetails.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const ConcertDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigate = useNavigate(); 

  const ticketPackages = [
    { location: 'Early Entry VIP Package', price: '₱ 21,350.00', type: 'Standing' },
    { location: 'Floor Standing', price: '₱ 15,850.00', type: 'Standing' },
    { location: 'Lower Box B Premium', price: '₱ 15,250.00', type: 'Reserved Seating' },
    { location: 'Upper Box Premium', price: '₱ 8,850.00', type: 'Reserved Seating' },
  ];

  const goToLogin = () => {
    navigate('/login');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    goToLogin();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="concert-details">
      <Header/>

      <div className="concert-header">
        <img src="/images/olivia.jpg" alt="Maroon 5 Concert" className="concert-image" />
        <div className="concert-info">
          <h2>MAROON 5 ASIA 2025</h2>
          <p>SM Mall of Asia Arena</p>
          <Button type="primary" className="date-button">JAN 29, 2025</Button>
        </div>
      </div>

      <div className="concert-description">
        <h3>ABOUT</h3>
        <Card className="description-card">
          <img src="/images/maroon5-poster.jpg" alt="Concert Poster" className="concert-poster" />
        </Card>
      </div>

      <div className="concert-ticket-section">
        <div className="seat-plan">
          <h3>SEAT PLAN</h3>
          <img src="/images/seat-plan.jpg" alt="Seat Plan" className="seat-plan-image" />
        </div>
        <div className="tickets">
          <h3>TICKETS</h3>
          <p>To buy or to view price availability, please log in <Link onClick={showModal}>Here</Link>.</p>
          {ticketPackages.map((ticket, index) => (
            <div className="ticket-package" key={index}>
              <div className="ticket-info">
                <p>{ticket.location}</p>
                <span>{ticket.type}</span>
              </div>
              <div className="ticket-price">
                <p>{ticket.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <Modal 
        title="Login Required" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="Go to Login"
        cancelText="Close"
      >
        <p>You need to log in to view ticket availability and purchase tickets.</p>
      </Modal>
    </div>
  );
};

export default ConcertDetails;
