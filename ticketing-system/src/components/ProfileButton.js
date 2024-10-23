import React, { useState, useRef, useEffect } from 'react';
import '../css/componentsStyle/ProfileButton.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../login/Login';
import axios from 'axios';

function ProfileButton() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
      fetchUserData(); // Fetch user data if logged in
    }
  }, []);

  const fetchUserData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(`http://localhost:8020/user/${user.id}`); // Assuming user object has an 'id' field
      setUserData(response.data); // Store user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data on logout
    setIsLoggedIn(false);
    setDropdownVisible(false); // Close dropdown after logout
    setUserData(null); // Clear user data
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Callback function to set login state to true when login is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchUserData(); // Fetch user data on login success
  };

  return (
    <div className="profile-button-container" ref={dropdownRef}>
      <img
        src="https://www.citypng.com/public/uploads/small/11639594342hjraqgbufi3xlb66lt30fz1pwfcydxkjqbynfqdpvufz41ysjtngiet4dyrywgqqqqu56w5nozgrhyecs4ixrlllkl150ogbiid1.png"
        className="profile-btn"
        alt="Profile Button"
        onClick={handleClick}
      />
      {dropdownVisible && (
        <div className="dropdown">
          {isLoggedIn ? (
            <>
              <a className="header-button" onClick={goToProfile}>
                My Profile
              </a>
              <a className="header-button" onClick={handleLogout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <a className="header-button" onClick={showModal}>
                Sign In
              </a>
              <a className="header-button" onClick={goToSignup}>
                Create Account
              </a>
            </>
          )}
        </div>
      )}

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Login onCancel={handleCancel} onLoginSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
}

export default ProfileButton;
