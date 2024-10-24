import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/news/News.css"
import { useState } from "react";




const News = () => { 
    const [fadeOut, setFadeOut] = useState(false); // Trigger fade-out for loading overlay

    setTimeout(() => {
        setFadeOut(true); // Trigger fade-out effect for the loading overlay
      }, 400); // Initial delay before starting fade-out
      
    return (
      <Layout>
        <Header />

        <div className='top-image-bg' style={{ backgroundImage: 'url(/images/bg4.jpg)' }}></div>
{/* //check */}
            <h2 className='news-title-main'>NEWS</h2>
            {/* //check */}

        <div className='news-event-container' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
        
            <div className="news-grid">

                <div className="news-blog">  
                    <img className="news-image" src='/images/unis-slider2.webp' alt='Slide 1' />
                    <div className="news-content">
                    <span className="news-date"> OCTOBER 25, 2024</span>
                        <h2 className="news-title"> 'UNIS in CURIOUSland' fancon in Manila and Cebu</h2>
                        <div className="news-description">
                        <p>South Korean K-Pop sensation UNIS are set to thrill their Filipino EverAfters with their first-ever fan con in the Philippines. <br/>
                            The special event, titled 'UNIS in CURIOUSland,' is set to be a double treat this October. <br/>
                            Following the exciting announcement of their fan con in Manila, 'UNIS in CURIOUSland' will also be making a stop in Cebu. <br/>
                            Filipino fans can now catch the girls in two cities for their first-ever fan con in the Philippines, happening on:<br/>
                            October 25, 2024, at 7 PM at the New Frontier Theater, Manila<br/>
                            October 26, 2024, at 7 PM at the Waterfront Cebu City Hotel, Cebu
                        </p>
                        </div>
                    </div>
                    
                </div>
                    <div className="news-blog">  
                        <img className="news-image" src='/images/unis-slider2.webp' alt='Slide 1' />
                        <div className="news-content">
                        <span className="news-date"> OCTOBER 25, 2024</span>
                            <h2 className="news-title"> 'UNIS in CURIOUSland' fancon in Manila and Cebu</h2>
                            <div className="news-description">
                            <p>South Korean K-Pop sensation UNIS are set to thrill their Filipino EverAfters with their first-ever fan con in the Philippines. <br/>
                                The special event, titled 'UNIS in CURIOUSland,' is set to be a double treat this October. <br/>
                                Following the exciting announcement of their fan con in Manila, 'UNIS in CURIOUSland' will also be making a stop in Cebu. <br/>
                                Filipino fans can now catch the girls in two cities for their first-ever fan con in the Philippines, happening on:<br/>
                                October 25, 2024, at 7 PM at the New Frontier Theater, Manila<br/>
                                October 26, 2024, at 7 PM at the Waterfront Cebu City Hotel, Cebu
                            </p>
                            </div>
                        </div>
                    
                </div>


            </div>
       
        </div>

        <Footer />
      </Layout>
    );

};
export default News;