import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/news/News.css"
import { useState } from "react";




const News = () => { 
      
    return (
      <Layout>
        <Header />

        <div className='top-image-bg' style={{ backgroundImage: 'url(/images/news.jpg)' }}></div>
{/* //check */}
            <h2 className='news-title-main'>NEWS</h2>
            {/* //check */}

        <div className='news-event-container' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
        
            <div className="news-grid">

                <div className="news-blog">  
                    <img className="news-image" src='/images/unis-slider2.webp' alt='Slide 1' />
                    <div className="news-content">
                    <span className="news-date"> December 1, 2024</span>
                        <h2 className="news-title"> 'UNIS in CURIOUSland' fancon in Manila and Cebu</h2>
                        <div className="news-description">
                        <p>South Korean K-Pop sensation UNIS are set to thrill their Filipino EverAfters with their first-ever fan con in the Philippines. <br/>
                            The special event, titled 'UNIS in CURIOUSland,' is set to be a double treat this October. <br/>
                            Following the exciting announcement of their fan con in Manila, 'UNIS in CURIOUSland' will also be making a stop in Cebu. <br/>
                            Filipino fans can now catch the girls in two cities for their first-ever fan con in the Philippines, happening on:<br/>
                            December 1, 2024, at 7 PM at the New Frontier Theater, Manila<br/>
                            December 2, 2024, at 7 PM at the Waterfront Cebu City Hotel, Cebu
                        </p>
                        </div>
                    </div>
                    
                </div>
                    <div className="news-blog">  
                        <img className="news-image" src='/images/bininews.jpg' alt='Slide 1' />
                        <div className="news-content">
                        <span className="news-date"> November 16 and 17, 2024</span>
                            <h2 className="news-title"> The Grand BINIverse</h2>
                            <div className="news-description">
                            <p>The Biniverse event, titled "The Grand BINIverse," is scheduled to take place on November 16 and 17, 2024, at the Araneta Coliseum in Manila, Philippines. This highly anticipated concert event will showcase the popular Filipino girl group BINI, known for their vibrant performances and dynamic music.

The event will feature various activities, including live performances, special guest appearances, and fan engagement opportunities. BINI has been gaining significant traction in the P-pop scene, and this concert is expected to attract many fans, highlighting their growth and popularity within the industry. 

As excitement builds for the event, fans are encouraged to participate in pre-concert activities and stay updated on ticket sales and additional announcements related to the event. The "Grand BINIverse" aims to celebrate the group's musical journey and connect with their fanbase in a grand and memorable way.
                            </p>
                            </div>
                        </div>
                    
                </div>

                <div className="news-blog">  
                        <img className="news-image" src='/images/avengersnews.avif' alt='Slide 1' />
                        <div className="news-content">
                        <span className="news-date">November 19, 2024</span>
                            <h2 className="news-title">Avengers: Secret Wars is an upcoming superhero film in the Marvel Cinematic Universe (MCU)</h2>
                            <div className="news-description">
                            <p>Avengers: Secret Wars is an upcoming superhero film in the Marvel Cinematic Universe (MCU) that is anticipated to serve as a climax to the Multiverse Saga. Scheduled for release on November 19, 2024, the film follows Avengers: The Kang Dynasty, which is set to premiere in 2024. The movie is being developed with a focus on bringing together various characters and storylines that have been introduced throughout the MCU, particularly those related to the multiverse and its complexities.

 <br/> <br/>The film will be penned by Stephen McFeely, taking over from Michael Waldron, who wrote the scripts for earlier installments like Doctor Strange in the Multiverse of Madness.

While specific casting details have yet to be confirmed, there is speculation about the return of numerous fan-favorite characters from various phases of the MCU. This includes the opportunity for characters previously thought to have exited the franchise, such as Robert Downey Jr.'s Iron Man and Chris Evans' Captain America, potentially appearing through the multiverse concept.

Avengers: Secret Wars promises to be a landmark entry in the MCU, integrating numerous arcs and characters while expanding the narrative scope of the franchise, attuning to audience expectations and the evolving nature of superhero storytelling in cinema. As more information becomes available, fans are eager to learn about further developments and the ensemble cast that will bring this epic saga to life on screen.<br/><br/>
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