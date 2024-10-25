// import React from 'react';
import { Layout } from 'antd';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import '../css/HomePage.css';
import HomeSlider from '../components/HomeSlider';
import MovieCard2 from '../components/MovieCard2';
import Footer from '../components/Footer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { Sider, Content } = Layout;


const HomePage = () => {

  const [movies, setMovies] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [fshows, setFshows] = useState([]);
  const [sports, setSports] = useState([]);
  const [Tours, setTours] = useState([]);
  const [family, setFamily] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState('Movies');

  
  
  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8031/movies');
            console.log(response.data);
            setMovies(response.data); // Set the movie data into state
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
}, []);

useEffect(() => {
  const fetchTours = async () => {
      try {
          const response = await axios.get('http://localhost:8031/tours');
          console.log(response.data);
          setTours(response.data); // Set the movie data into state
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  fetchTours();
}, []);


useEffect(() => {
  const fetchConcerts = async () => {
      try {
          const response = await axios.get('http://localhost:8031/concerts');
          console.log(response.data);
          setConcerts(response.data); // Set the movie data into state
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  fetchConcerts();
}, []);

useEffect(() => {
  const fetchFshows = async () => {
      try {
          const response = await axios.get('http://localhost:8031/featuredshows');
          console.log(response.data);
          setFshows(response.data); // Set the movie data into state
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  fetchFshows();
}, []);

useEffect(() => {
  const fetchSports = async () => {
      try {
          const response = await axios.get('http://localhost:8031/sports');
          console.log(response.data);
          setSports(response.data); // Set the movie data into state
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  fetchSports();
}, []);


const handleCategoryClick = (category) => {
  setSelectedCategory(category);
};
  const getFilteredData = () => {
    switch (selectedCategory) {
      case 'Movies':
        return movies;
      case 'Concerts & Shows':
        return concerts;

        case 'Sports':
        return sports;
        
        case 'Tours & Attractions':
          return Tours;

          case 'Family':
          return family;


          
      // Add cases for other categories as needed
      default:
        return movies; // Default to movies
    }
  
};


    return (
      <Layout className="home-page-layout">
        <Header />
     
        <div className='slider-container'>
            <HomeSlider />
            <div className='black-fade'/>
            <img src='/images/HomeImages/slider-bg.jpg' className='slider-bg'></img>
          </div>

          <div className='main-content-container' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one'>FEATURED SHOWS</h1>
            <h2 className='sub-title' style={{marginBottom: '50px'}}>FROM INF 224</h2>
        
            <div className="movie-card-container-main">
            {fshows.map((featureds) => (
            <MovieCard
            key={featureds._id} // Unique identifier
            name={featureds.name}  // Use movie.Name
            date={featureds.date}  // Use movie.date
            place={featureds.place}  // Use movie.place for venue
            time ={featureds.time}
            price={featureds.price}  // Use movie.price
            image={featureds.image}  // Use movie.image (make sure the path is correct)  
            />
            ))}


        </div>

            <div className='other-events-container'>
              <h1 className='title-one'>Other Events</h1>
              <div className='category-poster-container'>
                <div className='category-container'>
                  <ul className='categories'>
                    <li onClick={() => handleCategoryClick('Movies')}>Movies</li>
                    <li onClick={() => handleCategoryClick('Concerts & Shows')}>Concerts & Shows</li>
                    <li onClick={() => handleCategoryClick('Sports')}>Sports </li>
                    <li onClick={() => handleCategoryClick('Tours & Attractions')}>Tours & Attractions</li>
                    <li onClick={() => handleCategoryClick('Family')}>Family</li>
                    
                  </ul>
                </div>
                

                  <div className="other-card-container">
                  {getFilteredData().length === 0 ? (
                <h1 className = "neven">NO EVENTS YET</h1>  // Display this message if no events are found
                ) :
    
                    (getFilteredData().map((item) => (
                    <MovieCard2
                    key={item._id}
                    name={item.Name || item.name} // Adjust based on movie or show
                    date={item.date}
                    place={item.place}
                    price={item.price}
                    image={item.image}
                    time ={item.time}
                   />
                    )))}    
                  </div>


              </div>
            </div>
                  <div className='main-about-us-container'>
                    <div className='about-us-title'> ABOUT US </div>
                      <div className='dev-card-container'>
                            <div className='dev-cards'>
                            <img src='/images/tristan.jpg' className='dev-image' alt="dev-photo"></img>

                              <div className='card-contents'>
                             <div className='dev-name'>Aquino, Tristan Jay</div>
                             <div className='description'>DIV MASTER</div>

                             <div className='social-container'>

                             <a href='https://www.facebook.com/tj.a.pogi' target='blank'>
                                <img className = "facebook" src='/images/Facebook_Icon.png'></img>
                             </a>
                             <a href='https://www.instagram.com/trstn_tj/' target='blank'>
                             <img className = "instagram" src='/images/Instagram_Icon.png'></img></a>
                             <a href='mailto:tristanquino814@gmail.com'>
                             <img className = "instagram" src='/images/Email_Icon.png' ></img>
                             </a>
                             </div>
                             
                              
                              </div>
                           </div>
                           
                           <div className='dev-cards'>
                            <img src='/images/hen.jpg' className='dev-image' alt="dev-photo"></img>

                            

                              <div className='card-contents'>
                             <div className='dev-name'>Aruta, Henreizh Nathan</div>
                             <div className='description'>POGI LANG</div>
                             <div className='social-container'>
                            <a href='https://www.facebook.com/nathan.aruta.9/' target='blank'>
                            <img className = "facebook" src='/images/Facebook_Icon.png'></img></a>
                            <a href='https://www.instagram.com/hen.richh/' target='blank'>
                            <img className = "instagram" src='/images/Instagram_Icon.png'></img></a>
                            <a href='mailto:henreizharuta@gmail.com'>
                            <img className = "instagram" src='/images/Email_Icon.png'></img></a>
                             </div>
                              
                              </div>
                           </div>

                           <div className='dev-cards'>
                            <img src='/images/berlene.jpg' className='dev-image' alt="dev-photo"></img>

                              <div className='card-contents'>
                             <div className='dev-name'>Bernabe, Berlene</div>
                             <div className='description'>MIKMIK'S OWNER</div>
                             <div className='social-container'>

                             <a href='https://www.facebook.com/blyn30' target='blank'>
                             <img className = "facebook" src='/images/Facebook_Icon.png'></img></a>

                             <a href='https://www.instagram.com/bellrinsu/' target='blank'>
                             <img className = "instagram" src='/images/Instagram_Icon.png'></img></a>

                             <a href='mailto:berlenebernabe12@gmail.com'>
                             <img className = "instagram" src='/images/Email_Icon.png'></img></a>
                             
                             </div>
                              
                              </div>

                           </div>
                           <div className='dev-cards'>
                            <img src='/images/rj.jpg' className='dev-image' alt="dev-photo"></img>

                              <div className='card-contents'>
                             <div className='dev-name'>Lozano, Rich James</div>
                             <div className='description'>GIT GADZZ</div>
                             <div className='social-container'>

                            <a href='https://www.facebook.com/richjames.lozano.3' target='blank'>
                            <img className = "facebook" src='/images/Facebook_Icon.png'></img></a>
                            <a href='https://www.instagram.com/richjameslozano/' target='blank'>
                            <img className = "instagram" src='/images/Instagram_Icon.png'></img></a>
                            <a href='mailto:richjameslozano@gmail.com'>
                            <img className = "instagram" src='/images/Email_Icon.png'></img>
                            </a>
                             
                             </div>
                              
                              </div>
                           </div>
                      </div>

                      
                </div>  

                <div className='mission-vision-container'>
                        <div className='mission-container'>
                          <img src='/images/mission-icon.png' className='mission-icon'></img>
                          <h1 className='mission'>MISSION</h1>
                          <p>MAKAPASA.</p>
                        </div>
                        <div className='vision-container'>
                        <img src='/images/vision-icon.png' className='vision-icon'></img>
                          <h1 className='vision'>VISION</h1>
                          <p>MALABO NA.</p>
                        </div>
                      </div>
          </div>
          
            

          <Footer/>
      </Layout>
    );
  };

export default HomePage;
