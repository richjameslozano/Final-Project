import React, { useState, useRef, useEffect } from 'react';
import '../css/componentsStyle/ProfileButton.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { Menu, Input, Button, Modal } from 'antd';
import Login from '../login/Login';

function ProfileButton() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference for the 
  
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigate = useNavigate(); 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false); 
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  const handleClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleOptionClick = (option) => {
    alert(`${option} clicked!`); // Handle option click (replace with actual navigation if needed)
    setDropdownVisible(false); // Close dropdown after option click
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for clicks

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener on unmount
    };
  }, [dropdownRef]);

  return (
    <div className="profile-button-container" ref={dropdownRef}>
      <img
        src='https://www.citypng.com/public/uploads/small/11639594342hjraqgbufi3xlb66lt30fz1pwfcydxkjqbynfqdpvufz41ysjtngiet4dyrywgqqqqu56w5nozgrhyecs4ixrlllkl150ogbiid1.png'
        className='profile-btn'
        alt='Profile Button'
        onClick={handleClick} // Toggle dropdown on click
      />
      {dropdownVisible && (
        <div className="dropdown">
          <a href="/create-account" onClick={() => handleOptionClick('Create Account')}>Create Account</a>
          <a href="/sign-in" onClick={() => handleOptionClick('Sign In')}>Sign In</a>
        </div>
      )}


      <Modal
        // title="Sign In"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login onCancel={handleCancel} />
      </Modal> 
    </div>
  );
}

export default ProfileButton;
