import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import '../css/componentsStyle/Footer.css';

const Footer = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false); // Track loading state
    const [fadeOut, setFadeOut] = useState(false); // Trigger fade-out for loading overlay

    const handleNavigation = (route) => {
        setLoading(true); // Show loading spinner
        setFadeOut(false); // Reset fade-out for new loading
      
        // Start the fade-out effect after a short delay
        setTimeout(() => {
          setFadeOut(true); // Trigger fade-out effect for the loading overlay
        }, 400); // Initial delay before starting fade-out
      
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
    const handleCustomerCare = () => {
        scrollToTop();
        handleNavigation('/customer-care');
      };

    return(
        <div className="footer-container" style={{backgroundImage: 'url(/images/HomeImages/footer-bg.png)'}}>
            <div className='footer-details-container'>
                <div className='about-us-container'>
                    <h1 className='footer-title'>About us</h1>
                
                    <div>Who we are</div>
                    <div>Our Mission & Vision</div>
                </div>
                <div className='customer-care-container'>                   
                        <a className="links" onClick={handleCustomerCare}>
                        <h1 className='customer-care-title'> Customer Care</h1>
                        </a>
                        <div>FAQs</div>
                    <div>Feedback & Inquiry</div>
                </div>
                <div className='partnerships-container'>
                    <h1 className='footer-title'>Partnerships</h1>
                    <div>National University - MOA</div>
                    <div>
                        <a className="links" href="https://www.facebook.com/makanthonygipit" target="_blank" rel="noopener noreferrer">
                            Mark Anthony Gipit
                        </a>
                    </div>
                    <div>ChatGPT</div>
                </div>
                <div className='ticket-outlets-container'>
                    <h1 className='footer-title'>Ticket Outlets</h1>
                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-moa/" target="_blank" rel="noopener noreferrer">
                                NU MOA
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-dasmarinas/" target="_blank" rel="noopener noreferrer">
                                NU Dasmarinas
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-manila/" target="_blank" rel="noopener noreferrer">
                                NU Manila
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-laguna/" target="_blank" rel="noopener noreferrer">
                                NU Laguna
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-fairview/" target="_blank" rel="noopener noreferrer">
                                NU Fairview
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-lipa/" target="_blank" rel="noopener noreferrer">
                                NU Lipa
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-bacolod/" target="_blank" rel="noopener noreferrer">
                                NU Bacolod
                            </a>
                        </div>

                        <div>
                            <a className="links" href="https://national-u.edu.ph/nu-clark/" target="_blank" rel="noopener noreferrer">
                                NU Clark
                            </a>
                        </div>
        
                </div>
            </div>
        </div>

        
    );
}

export default Footer;