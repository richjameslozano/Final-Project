import React, { useState, useEffect } from 'react'; 
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Spinner component
import '../css/componentsStyle/Header.css'; 
import ProfileButton from './ProfileButton';



const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [username, setUsername] = useState(null); // Store the username
  const [loading, setLoading] = useState(false); // Track loading state
  
  const navigate = useNavigate(); 

  // On component mount, check if the user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      setUsername(null);
      setIsLoggedIn(false);
    } else {
        const user = JSON.parse(loggedInUser);
        setUsername(user.username);
        setIsLoggedIn(true);
    }
  }, []);

  // Handle navigation with smooth loading effect
  const handleNavigation = (route) => {
    setLoading(true); // Show loading spinner
  
    // Start the fade-out effect after a short delay

  
    // Hide loading spinner and navigate after the fade-out completes
    setTimeout(() => {
      setLoading(false); // Hide spinner after fade-out duration
      navigate(route); // Navigate to the new route
    }, 1000); // Total time is the initial delay (1200ms) plus fade-out duration (600ms)
  };  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleHomeClick = () => {
    scrollToTop();
    handleNavigation('/');
  };

  const handleNewsClick = () => {
    scrollToTop();
    handleNavigation('/news');
  };

  const handleEventClick = () => {
    scrollToTop();
    handleNavigation('/events');
  };

  const handleCartClick = () => {
    scrollToTop();
    handleNavigation('/cart');
  };

  return (
    <div className="header-container">
      {loading && (
        <div className= 'loading-overlay'>
          <div className="loading-spinner">
            <ClipLoader color="#ffffff" loading={loading} size={50} />
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      )}
      <div className="header-logo">ONEPIXEL.<span className="ticket-logo">Ticket</span></div>

      <div className="btn-container">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleEventClick}>Events</button>
        <button onClick={scrollToBottom}>Ticket Outlets</button>
        <button onClick={handleNewsClick}>News</button>
        <button onClick={scrollToBottom}>Contact Us</button>
        <input placeholder="Looking for anything?" className="search-bar" />
        <img className="search-btn" src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png" alt="search-btn" />
        <ShoppingCartOutlined className="cart-icon" onClick={handleCartClick} />
        
        <ProfileButton 
          isLoggedIn={isLoggedIn} 
          username={username} 
          setUsername={setUsername} 
          setIsLoggedIn={setIsLoggedIn} 
        />

        {/* Show the username if logged in */}
        {isLoggedIn && <div className="username-display" style={{display:"flex"}}>Hi, {username}!</div>}
      </div>
    </div>
  );
};

export default Header;
