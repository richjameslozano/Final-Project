import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/user/UserAccount.css';
import { Layout } from 'antd';
import axios from 'axios'

const UserAccount = () => {
    const[userInfo, setUserInfo] = useState();

    useEffect(() =>{
      const fetchUsers = async () => {
        try{
          const response = await axios.get('http://localhost:8020/movies');
        console.log(response.data);
        setUserInfo(response.data)
        }
        catch (error) {
          console.error('Error fetching movies:', error);
      }
      }
      
      fetchUsers()
    }, [])
   



  return (
    <Layout className='main-container-user-account' style={{backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020'}}>
          <Header />
          
          <div className="user-profile-container">
        <div className="sidebar">
          <h1 className='profile-title'>Profile Settings</h1>
          <ul className='sidebar-button-list'>
            <li style={{listStyleType: 'none'}}>My Account</li>
            <li style={{listStyleType: 'none'}}>Tickets Purchased</li>
          </ul>

        </div>

      <div className="profile-details">
        <h2>My Account</h2>
        <hr></hr>
        <div className="account-info">
          <h3>Account Information</h3>
          
          <div className="two-column-grid">
            <div className="input-group">
              <label>First Name</label>
              <input
                className='input-info-profile'
                type="text"
                name="firstName"
                // value={userData.firstName}
                // onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                className='input-info-profile'
                type="text"
                name="lastName"
                // value={userData.lastName}
                // onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              className='input-info-profile'
              type="text"
              name="username"
              // value={userData.username}
              // onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              className='input-info-profile'
              type="email"
              name="email"
              // value={userData.email}
              // onChange={handleInputChange}
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
              // value={password}
              // onChange={handlePasswordChange}
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
