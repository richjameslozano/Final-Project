import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import '../css/user/UserAccount.css';

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Fetch user data from localStorage and set state
    const storedUser = localStorage.getItem('user');
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedUser && storedFirstName && storedLastName && storedEmail && storedPassword) {
      setUserInfo({
        username: JSON.parse(storedUser).username,
        firstName: JSON.parse(storedFirstName).firstName,
        lastName: JSON.parse(storedLastName).lastName,
        email: JSON.parse(storedEmail).email,
        password: JSON.parse(storedPassword).password
      });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Layout className='main-container-user-account' style={{ backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020' }}>
      <Header />

      <div className="user-profile-container">
        <div className="sidebar">
          <h1 className='profile-title'>Profile Settings</h1>
          <ul className='sidebar-button-list'>
            <li style={{ listStyleType: 'none' }}>My Account</li>
            <li style={{ listStyleType: 'none' }}>Tickets Purchased</li>
          </ul>
        </div>

        <div className="profile-details">
          <h2>My Account</h2>
          <hr />
          <div className="account-info">
            <h3>Account Information</h3>

            <div className="two-column-grid">
              <div className="input-group">
                <label>First Name</label>
                <input
                  className='input-info-profile'
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  className='input-info-profile'
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  readOnly
                />
              </div>
            </div>

            <div className="input-group">
              <label>Username</label>
              <input
                className='input-info-profile'
                type="text"
                name="username"
                value={userInfo.username}
                readOnly
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                className='input-info-profile'
                type="email"
                name="email"
                value={userInfo.email}
                readOnly
              />
              <span className="change-link">Change Email</span>
            </div>
          </div>

          <div className="password-section">
            <h3>Password</h3>
            <div className="input-group">
              <label>Password</label>
              <input
                className='input-info-profile'
                type="password"
                value={userInfo.password}
                readOnly
              />
              <span className="change-link">Change Password</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccount;
