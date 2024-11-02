import '../css/CustomerCare.css';  
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import React, { useState, useEffect } from 'react'; 
import { Layout } from 'antd';  
import { useNavigate } from 'react-router-dom';

const CustomerCare = () => {  

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

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
    return (  
        <Layout>  
            <Header />  

            <div className='top-image-bg' style={{ backgroundImage: 'url(/images/fabg.jpg)' }}></div>  
            
            <h2 className='news-title-main2'>Customer Care</h2>  
            <h4 className='news-title-mainb2'>FAQs | Feedback and Inquiry</h4>  

            <div className='news-event-container2' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>  
                <div className="news-grid2">  
                    <div className="recent-articles">  
                        <h1>Recent News</h1>  
                        <div className='Container'>  
                            <div className="article-card" onClick={() => handleNavigation('/news')}>  
                                <img className="article-image" src='/images/unis-slider2.webp' alt='UNIS in CURIOUSland'/>  
                                <div className="article-content">  
                                    <span className="article-date">December 1, 2024</span>  
                                    <h2 className="article-title">UNIS in CURIOUSland fancon in Manila and Cebu</h2>  
                                </div>  
                            </div>  
                            <div className="article-card" onClick={() => handleNavigation('/news')}>  
                                <img className="article-image" src='/images/bininews.jpg' alt='BINI'/>  
                                <div className="article-content">  
                                    <span className="article-date">November 16 and 17, 2024</span>  
                                    <h2 className="article-title">The Grand BINIverse</h2>  
                                </div>  
                            </div>  
                            <div className="article-card" onClick={() => handleNavigation('/news')}>  
                                <img className="article-image" src='/images/avengersnews.avif' alt='Avengers'/>  
                                <div className="article-content">  
                                    <span className="article-date">November 19, 2024</span>  
                                    <h2 className="article-title">Avengers: Secret Wars is an upcoming superhero film in the MCU</h2>  
                                </div>  
                            </div>  
                        </div>  
                    </div>  

                    {/* FAQ Section */}  
                    <div className="faq-section">  
                        <h1>Frequently Asked Questions</h1>  
                        <h3>How can I buy tickets through ONEPIXEL.Ticket? You have 3 options:</h3>  
                        <ul>  
                            <li>Via Onepixel.Ticket Box Office - located at National University MOA.</li>  
                            <li>Via Onepixel.Ticket Outlets - select at NU-Laguna, NU-Manila,...</li>  
                            <li>Via Online - www.onepixel.ticket.com.ph</li>  
                        </ul>  
                        <h3>What do I do if I purchased tickets online but still haven’t received my email receipt?</h3>  
                        <p>Please check under Junk Mail or Spam Mail.</p>  
                        <p>If upon checking, there really is no email receipt received, please call our Customer Service Hotline at +632 8911-5555</p>
                        <br></br>

                        <h3>Do I still need to have my electronic tickets be changed to a hard ticket?</h3>  
                        <p>No, your electronic ticket is your ticket. No need to fall in line to outlets or booths to have it exchanged to a hard ticket (unless specified otherwise on the electronic ticket)</p> 
        <br></br>
                        <h3>Another person is selling me his electronic tickets, is it safe to buy it from him/her?</h3>  
                        <p>For your own safety and protection, please buy tickets only from AUTHORIZED Onepixel.Ticket Agents (e.g. Box Office, Outlets & www.ticketnet.com.ph)
                        Other people may be trying to earn money via scam by selling fraud tickets at a lower price, only for you to find out on the day of the venue that your tickets are being denied entry by the scanners.</p>
                        <br></br>
                        <h3>Can I make multiple copies of my electronic ticket?</h3>  
                        <p>Your tickets are your responsibilty. To avoid problems at the venue, DO NOT DUPLICATE OR MAKE MULTIPLE COPIES of your tickets. 
                            Onepixel.Ticket or the Venue will not be held liable for reproduced tickets.</p> 
                        <br></br>
                        <h3>How are ticket prices determined?</h3>  
                        <p>Ticket prices are set by the performers and their promoters/producers. Onepixel.Ticket has no role when it concerns determining ticket prices for the events.</p> 
<br></br>
                        <h3>How to purchase Tickets Online?</h3>  
                        <p>BUY YOUR TICKETS ONLINE! WWW.ONEPIXEL.TICKET.COM.PH</p> 
<br></br>
                        <h3>Credit Cards Accepted Online</h3>  
                        <p>Onepixel.ticket Online only accept the following credit cards: (for online transactions only) 1. MasterCard cards
                        issued in the Philippines 2. Visa cards issued in the Philippines Please call 8911.5555 for more information.</p> 
                    </div>  
                    <br/>
                        <br/>
                        <br/>

                    <div className="faq-section2">  
                        
                        <h1>Feedback and Inquiry</h1>  
                        <h3>User Experience</h3>   
                        <p>Navigating the website is a breeze. The layout is intuitive, and I can find events easily.</p>  

                        <h3>Performance</h3>  
                        <p>The site loads quickly, even during peak hours. It's impressive how smoothly everything runs.</p> 
                        
                        <h3>Design</h3>  
                        <p>The design is visually appealing and modern. The color scheme is pleasant and the overall look is very professional.</p>
                        
                        <h3>Functionality</h3>  
                        <p>I love the event recommendations feature. It's great to see personalized suggestions that make finding events even easier.</p> 
                        
                        <h3>Customer Support</h3>  
                        <p>The customer support team was very helpful and responsive. It's reassuring to know that help is readily available when needed.</p> 

                    </div>  
                </div>  
            </div>  

            <Footer />  
        </Layout>  
    );  
};  

export default CustomerCare;