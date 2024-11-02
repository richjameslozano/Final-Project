import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/user/UserTickets.css';
import Purchased from '../components/Purchased';

const UserTickets = () => {
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Fetch user details and purchased tickets from the backend
  useEffect(() => {
    const fetchUserAndTickets = async () => {
      try {
        const userID = JSON.parse(localStorage.getItem('user')).id;

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:8031/user/${userID}`);
        setUser(userResponse.data); // Assuming the user data contains firstName and lastName

        // Fetch purchased tickets
        const ticketsResponse = await axios.get(`http://localhost:8031/user/${userID}/purchased-tickets`);
        console.log('Fetched tickets:', ticketsResponse.data);
        setPurchasedTickets(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching user details or purchased tickets:', error);
        message.error('Failed to load user details or purchased tickets');
      }
    };

    fetchUserAndTickets();
  }, []);

  const handleMyAccount = (route) => {
    navigate(route);
  };

  return (
    <Layout className="main-container-user-account" style={{ backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020' }}>
      <Header />

      <div className="user-profile-container">
        <div className="sidebar">
          <h1 className="profile-title">Account Settings</h1>
          <hr />
          <ul className="sidebar-button-list">
            <li onClick={() => handleMyAccount('/profile')}>Profile</li>
            <li style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>Tickets Purchased</li>
          </ul>
        </div>

        <div className="ticket-purchased-details">
          <h2>My Tickets</h2>
          <hr style={{ marginBottom: '20px' }} />

          <div className="ticket-list-container">
            {purchasedTickets.length > 0 ? (
              purchasedTickets.map((ticket, index) => (
                <Purchased key={index} ticket={ticket} firstName={user.firstName} lastName={user.lastName} />
              ))
            ) : (
              <p>No tickets purchased yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserTickets;
