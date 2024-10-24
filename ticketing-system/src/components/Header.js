import React, { useState, useEffect } from 'react'; 
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; 
import '../css/componentsStyle/Header.css'; 
import ProfileButton from './ProfileButton';
import SearchResult from './SearchResult';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [searchTerm, setSearchTerm] = useState('');
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
        setLoading(true); 
        setTimeout(() => {
            setLoading(false); 
            navigate(route);
        }, 1000); 
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Don't search if the query is empty
        try {
            const response = await fetch(`http://localhost:8031/search?query=${searchQuery}`);
            const results = await response.json();
            console.log(results); // Handle the results as needed
            // You can set results in state and display them as desired
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
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
                <input
                    placeholder="Looking for anything?"
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && <SearchResult searchTerm={searchTerm} />}
                
                <img 
                    className="search-btn" 
                    src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png" 
                    alt="search-btn" 
                    onClick={handleSearch} 
                />
                <ShoppingCartOutlined className="cart-icon" onClick={() => handleNavigation('/cart')} />
                
                <ProfileButton 
                    isLoggedIn={isLoggedIn} 
                    username={username} 
                    setUsername={setUsername} 
                    setIsLoggedIn={setIsLoggedIn} 
                />
                
                {isLoggedIn && <div className="username-display" style={{display:"flex"}}>Hi, {username}!</div>}
            </div>
        </div>
    );
};

export default Header;
