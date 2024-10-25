import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { Layout, Modal, message } from 'antd'; // Import Modal from antd
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

  const [initialUserInfo, setInitialUserInfo] = useState(null);
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
          setInitialUserInfo(response.data); // Set initialUserInfo to fetched data
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

  const hasChanges = () => {
    return JSON.stringify(userInfo) !== JSON.stringify(initialUserInfo);
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Check if there are changes before showing the confirmation
      if (hasChanges()) {
        // Use Ant Design's Modal.confirm for cancellation confirmation
        Modal.confirm({
          title: 'Cancel Changes',
          content: 'Are you sure you want to cancel the changes?',
          okText: 'Yes',
          cancelText: 'No',
          onOk: () => {
            setUserInfo(initialUserInfo); // Revert changes if canceling edit mode
            setIsEditing(false); // Exit edit mode
          },
          onCancel: () => {
            // Do nothing if user cancels
          }
        });
      } else {
        // If no changes, just exit edit mode without confirmation
        setIsEditing(false);
      }
    } else {
      setInitialUserInfo(userInfo); // Store current data when entering edit mode
      setIsEditing(true); // Toggle editing mode  
    }
  };

  const saveUserInfo = async () => {
    setIsEditing(false); // Hide the 'Update' button after saving

    try {
      const response = await axios.put(`http://localhost:8031/user/${userId}`, userInfo);
      if (response.status === 200) {
        message.success('Profile updated successfully'); // Use Ant Design's message
        localStorage.setItem('user', JSON.stringify({ ...userInfo, id: userId }));
        setInitialUserInfo(userInfo); // Update initial user info to new state after saving
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update profile'); // Use Ant Design's error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field being edited
    }));
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
              {/* <span className="change-link" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"} Password
              </span> */}
            </div>
          </div>

          <div className="action-buttons">
            <button className={isEditing ? 'cancel-btn' : 'edit-btn'} onClick={handleEditClick}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                className="save-btn"
                onClick={saveUserInfo}
                disabled={!isEditing || !hasChanges()}  // Disable if not editing or no changes made
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccount;
