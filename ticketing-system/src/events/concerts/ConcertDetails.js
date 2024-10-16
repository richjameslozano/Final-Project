import React, { useState } from 'react';
import { Button, Card, Typography, Modal, Select } from 'antd';
import '../../css/events/concerts/ConcertDetails.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Login from '../../login/Login';

const { Link } = Typography;
const { Option } = Select;

const ConcertDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const ticketPackages = [
    { location: 'SVIP', price: '₱ 4,490.00', type: 'Reserved Seating', ticketsLeft: 10 },
    { location: 'VIP', price: '₱ 3,950.00', type: 'Reserved Seating', ticketsLeft: 5 },
    { location: 'Lower Box A', price: '₱ 2,950.00', type: 'Reserved Seating', ticketsLeft: 8 },
    { location: 'Lower Box B', price: '₱ 2,350.00', type: 'Reserved Seating', ticketsLeft: 12 },
    { location: 'Upper Box', price: '₱ 1,650.00', type: 'Reserved Seating', ticketsLeft: 20 },
    { location: 'General Admission', price: '₱ 690.00', type: 'Reserved Seating', ticketsLeft: 50 },
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
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Section</th>
                <th>Price</th>
                <th>Tickets Left</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {ticketPackages.map((ticket, index) => (
                <tr key={index} className="ticket-row">
                  <td>
                    <div className="ticket-info">
                      <p><strong>{ticket.location}</strong></p>
                      <span>{ticket.type}</span>
                    </div>
                  </td>
                  <td>
                    <Select placeholder="Select Section" className="section-select">
                      <Option value="Section A">Section A</Option>
                      <Option value="Section B">Section B</Option>
                      <Option value="Section C">Section C</Option>
                    </Select>
                  </td>
                  <td>{ticket.price}</td>
                  <td>{ticket.ticketsLeft}</td>
                  <td>
                    <Button type="primary" className="select-seats-button">Select Seats</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
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
