import React, { useState } from 'react';
import { Button, Card, Typography, Modal } from 'antd';
import '../../css/events/concerts/ConcertDetails.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Login from '../../login/Login';

const { Link } = Typography;

const ConcertDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="concert-details">
      <Header />

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
          <div className="poster-details">
            {showDetails && (
              <>
                <img src="/images/olivia.jpg" alt="Concert Poster" className="concert-poster" />
                <div className="concert-extra-details">
                  <p>Join us for an unforgettable night as Maroon 5 brings their Asia 2025 tour to the SM Mall of Asia Arena. Experience live performances of their top hits and enjoy exclusive ticket packages tailored for every fan.</p>
                </div>
              </>
            )}
          </div>
          <Button type="link" onClick={toggleDetails}>
            {showDetails ? 'Hide details' : 'Show more details'}
          </Button>
        </Card>
      </div>

      <div className="concert-ticket-section">
        <div className="seat-plan">
          <h3>SEAT PLAN</h3>
          <img src="/images/olivia.jpg" alt="Seat Plan" className="seat-plan-image" />
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

      <Modal
        // title="Sign In"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default ConcertDetails;
