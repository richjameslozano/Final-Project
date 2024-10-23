import Header from '../components/Header';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/user/UserAccount.css';

const UserAccount = () => {
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('My Profile');
    const navigate = useNavigate(); 

    const [userData, setUserData] = useState({
        firstName: 'Berlene',
        lastName: 'Bernabe',
        username: 'BellrinSu30',
        email: 'berlenebarnabe12@gmail.com',
        status: 'Verified',
    });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSaveChanges = () => {
        console.log('User data saved', userData);
        console.log('Password updated', password);
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        // You can add navigation functionality or content switching here
    };

    const goToProfile = () => {
        navigate('/profile'); 
    };

    const goToTickets = () => {
        navigate('/my-tickets'); 
    };

  return (
    <div className="user-profile">
        <Header />
        <div className="sidebar">
        <ul>
            <li>
                <button
                className={activeTab === 'My Profile' ? 'active' : ''}
                onClick={goToProfile}
                >
                My Profile
                </button>
            </li>

            <li>
                <button
                className={activeTab === 'My Tickets' ? 'active' : ''}
                onClick={goToTickets}
                >
                My Tickets
                </button>
            </li>
        
        </ul>
      </div>

      <div className="profile-details">
        <h2>My Account</h2>
        <div className="account-info">
          <h3>Account Information</h3>

          <div className="two-column-grid">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <span className="change-link">Change Email</span>
          </div>

          <div className="input-group">
            <label>Status</label>
            <input type="text" value={userData.status} disabled />
          </div>
        </div>

        <div className="password-section">
          <h3>Password</h3>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="change-link">Change Password</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
