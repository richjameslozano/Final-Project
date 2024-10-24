import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import '../css/user/UserAccount.css';
import axios from 'axios';

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id || user._id); // Store the user ID

      // Fetch user data from the server
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8031/user/${user.id || user._id}`);
          console.log('Fetched user data:', response.data); // Log the response
          setUserInfo(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData(); // Call the fetch function
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      saveUserInfo(); // Call function to save updated user info
    }
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field being edited
    }));
  };

  const saveUserInfo = async () => {
    try {
      const response = await axios.put(`http://localhost:8031/user/${userId}`, userInfo); // Use the userId in the URL
      if (response.status === 200) {
        console.log('User updated successfully', response.data);
        alert('Profile updated successfully');
        localStorage.setItem('user', JSON.stringify({ ...userInfo, id: userId })); // Update localStorage
        setIsEditing(false); // Switch back to read-only mode
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

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
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  className='input-info-profile'
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
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
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                className='input-info-profile'
                type="email"
                name="email"
                value={userInfo.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
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
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                name="password"
                value={userInfo.password}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <span className="change-link" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"} Password
              </span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn" onClick={handleEditClick}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button className="save-btn" onClick={isEditing ? saveUserInfo : handleEditClick}>
              {isEditing ? "Save Changes" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccount;
