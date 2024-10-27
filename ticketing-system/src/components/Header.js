import React, { useState, useEffect } from 'react'; 
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { Modal } from 'antd';
import '../css/componentsStyle/Header.css'; 
import ProfileButton from './ProfileButton';
import SearchResult from './SearchResult';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate(); 

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

    const handleNavigation = (route) => {
        scrollToTop();
        setLoading(true); 
        setTimeout(() => {
            setLoading(false); 
            navigate(route);
        }, 1000); 
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    // Moved handleInputChange to Header.js
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await fetch(`http://localhost:8031/search?query=${value}`);
                const results = await response.json();
                setSearchResults(results); // Update search results
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        } else {
            setSearchResults([]); // Clear results if input is empty
        }
    };

    const handleCartClick = () => {
        scrollToTop();
      
        // Check if the user is logged in
        if (isLoggedIn) {
          handleNavigation('/cart'); // Navigate to the Cart page
        } else {
          showModal(); // Show modal for not logged in
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <div className="header-container">
            {loading && (
                <div className='loading-overlay'>
                    <div className="loading-spinner">
                        <ClipLoader color="#ffffff" loading={loading} size={50} />
                        <div className="loading-text">Loading...</div>
                    </div>
                </div>
            )}
            <div className="header-logo">ONEPIXEL.<span className="ticket-logo">Ticket</span></div>

            <div className="btn-container">
                <button onClick={() => handleNavigation('/')}>Home</button>
                <button onClick={() => handleNavigation('/events')}>Events</button>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Ticket Outlets</button>
                <button onClick={() => handleNavigation('/news')}>News</button>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Contact Us</button>
                
                <div className="search-container">
                    <input
                        placeholder="Looking for anything?"
                        className="search-bar"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <img 
                        className="search-btn" 
                        src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png" 
                        alt="search-btn" 
                        onClick={() => searchTerm && handleInputChange({ target: { value: searchTerm } })} // Trigger search on button click
                    />
                        {searchResults.length > 0 && (
                            <div className="search-results-dropdown">
                                <SearchResult results={searchResults} /> {/* Pass results to SearchResult */}
                            </div>
                        )}

                </div>
                
                <ShoppingCartOutlined className="cart-icon" onClick={handleCartClick} />
                
                <ProfileButton 
                    isLoggedIn={isLoggedIn} 
                    username={username} 
                    setUsername={setUsername} 
                    setIsLoggedIn={setIsLoggedIn} 
                />
                
                {isLoggedIn && <div className="username-display" style={{display:"flex"}}>Hi, {username}!</div>}
            </div>

            <Modal
                title="Login Required"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>You need to log in first to access the cart.</p>
            </Modal>
        </div>
    );
};

export default Header;
