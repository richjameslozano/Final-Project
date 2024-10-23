import React, { useState, useEffect } from 'react'; 
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/Header.css'; 
import ProfileButton from './ProfileButton';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(null); // State to store the username
  const navigate = useNavigate(); 

  // On component mount, check if the user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setUsername(user.username); // This should set the username
        setIsLoggedIn(true); // Set logged-in status
        console.log('Username set in Header:', user.username); // Log what you're getting
    } else {
        setUsername(null); // Reset if not logged in
        setIsLoggedIn(false); // Reset if not logged in
    }
}, []);


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToHome = () => {
    navigate('/');
  };

  const handleHomeClick = () => {
    goToHome();
    scrollToTop();
  };

  const goToEvent = () => {
    navigate('/events');
  };

  return (
    <div className="header-container">
      <div className="header-logo">ONEPIXEL.<span className="ticket-logo">Ticket</span></div>

      <div className="btn-container">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={goToEvent}>Events</button>
        <button onClick={scrollToBottom}>Ticket Outlets</button>
        <button>News</button>
        <button onClick={scrollToBottom}>Contact Us</button>
        <input placeholder="Looking for anything?" className="search-bar" />
        <img className="search-btn" src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png" alt="search-btn" />
        <ShoppingCartOutlined className="cart-icon" />
        
        <ProfileButton 
          isLoggedIn={isLoggedIn} 
          username={username} 
          setUsername={setUsername} 
          setIsLoggedIn={setIsLoggedIn} 
        />

        {/* Show the username if logged in */}
        {isLoggedIn && <div type ="primary" className="username-display" style={{display:"flex"}}>{username}</div>}
      </div>
    </div>
  );
};

export default Header;