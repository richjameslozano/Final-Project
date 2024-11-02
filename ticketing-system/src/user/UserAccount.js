import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { Layout, Modal, message, Input } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
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

  const [activeSection, setActiveSection] = useState('account');

  const [initialUserInfo, setInitialUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const naavigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id || user._id);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8031/user/${user.id || user._id}`);
          setUserInfo(response.data);
          setInitialUserInfo(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
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
      if (hasChanges()) {
        Modal.confirm({
          title: 'Cancel Changes',
          content: 'Are you sure you want to cancel the changes?',
          okText: 'Yes',
          cancelText: 'No',
          onOk: () => {
            setUserInfo(initialUserInfo);
            setIsEditing(false);
          },
          onCancel: () => {}
        });
      } else {
        setIsEditing(false);
      }
    } else {
      setInitialUserInfo(userInfo);
      setIsEditing(true);
    }
  };

  const saveUserInfo = async () => {
    setPasswordModalVisible(true); // Show modal for password input
};

const handlePasswordSubmit = async () => {
    try {
        // Verify the user's password
        const verifyResponse = await axios.post(`http://localhost:8031/user/${userId}/verify-password`, { password: passwordInput });
        if (verifyResponse.status === 200) {
            // Proceed to update user info if password verification is successful
            const response = await axios.put(`http://localhost:8031/user/${userId}`, userInfo);
            if (response.status === 200) {
                message.success('Profile updated successfully');
                localStorage.setItem('user', JSON.stringify({ ...userInfo, id: userId }));
                setInitialUserInfo(userInfo);
                setPasswordModalVisible(false); // Close password modal
                setPasswordInput(''); // Clear password input
            } else {
                message.error(`Failed to update profile: ${response.data.message}`);
            }
        }
    } catch (error) {
        console.error('Error during update:', error);
        if (error.response && error.response.data && error.response.data.message) {
            message.error(`Error: ${error.response.data.message}`);
        } else {
            message.error('Failed to update profile');
        }
    }
};

const onhandlePurchased = (route)=>{
  naavigate(route)
}


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout className='main-container-user-account' style={{ backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020' }}>
      <Header />
      <div className="user-profile-container">
        <div className="sidebar">
          <h1 className='profile-title'>Account Settings</h1>
          <hr></hr>
          <ul className='sidebar-button-list'>
<<<<<<< HEAD
            <li className={activeSection === 'account' ? 'active' : ''}
                onClick={() => setActiveSection('account')}
               style= {{ listStyleType: 'none' }}>My Account</li>
            <li
                className={activeSection === 'tickets' ? 'active' : ''}
                onClick={() => setActiveSection('tickets')}
                 style={{ listStyleType: 'none' }}
                 >Tickets Purchased</li>
=======
            <li style={{backgroundColor:'rgba(255,255,255,0.2)'}}>Profile</li>
            <li onClick={() => onhandlePurchased('/purchased-tickets')}>Tickets Purchased</li>
>>>>>>> dc0362e74e36afd8b2d7830c0dfed9b20074e443
          </ul>
        </div>

        <div className="profile-details">
          <h2>My Profile</h2>
          <hr />
          <div className="account-info">
            <h3>Account Information</h3>
            <div className="two-column-grid">
              <div className="input-group">
                <label>First Name</label>
                <input
                  className={isEditing ? 'info-editing' : 'input-info-profile'}
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
                  className={isEditing ? 'info-editing' : 'input-info-profile'}
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
                className={isEditing ? 'info-editing' : 'input-info-profile'}
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
                className={isEditing ? 'info-editing' : 'input-info-profile'}
                type="email"
                name="email"
                value={userInfo.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
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
                disabled={!isEditing || !hasChanges()}
              >
                Save Changes
              </button>
            )}
          </div>

          <Modal
              title="Verify Password"
              visible={passwordModalVisible}
              onOk={handlePasswordSubmit}
              onCancel={() => setPasswordModalVisible(false)}
          >
              <input
                  type="password"
                  placeholder="Enter your password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
              />
          </Modal>

        </div>
      </div>
    </Layout>
  );
};

export default UserAccount;
