import React, { useState, useEffect, useRef } from 'react';
import '../css/componentsStyle/ProfileButton.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../login/Login';

function ProfileButton({ isLoggedIn, username, setUsername, setIsLoggedIn }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

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
    setUsername(''); // Clear username on logout
    setDropdownVisible(false); // Close dropdown after logout
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

  return (
    <div className="profile-button-container" ref={dropdownRef}>
      {isLoggedIn} {/* Show username if logged in */}
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
        <Login 
          onCancel={handleCancel} 
          onLoginSuccess={(username) => { 
            setIsLoggedIn(true);
            setUsername(username); // Update the username state here
          }} 
        />
      </Modal>

    </div>
  );
}

export default ProfileButton;
