// import React from 'react';
import { Layout, message } from 'antd';
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
  const [animationClass, setAnimationClass] = useState('slide-in');
  
  const [selectedCategory, setSelectedCategory] = useState('Movies');

  const [userData, setUserData] =useState({})
  useEffect (()=>{
    getUser()
  },[])
 
  const getUser = () => {
    const userID = localStorage.getItem("user");
  
    // Check if userID exists before proceeding
    if (userID) {
      try {
        const userholder = JSON.parse(userID).id;
        console.log(userholder);
  
        axios.get(`http://localhost:8031/getUser/${userholder}`)
          .then((response) => {
            setUserData(response.data);
            console.log(userData);
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("Error parsing user ID:", error);
      }
    } else {
      console.warn("No user is logged in.");
    }
  };
  
//------------------------------------------------//

useEffect(() => {
  // Step 2: Check for the showLoginSuccess flag
  const showLoginSuccess = localStorage.getItem('showLoginSuccess');
  
  if (showLoginSuccess) {
    // Display a success notification
    message.success('Login successful!');
    
    // Remove the flag from local storage
    localStorage.removeItem('showLoginSuccess');
  }
}, []); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8031/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
 
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get('http://localhost:8031/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchSports();
  }, []);
 
  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get('http://localhost:8031/concerts');
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchConcert();
  }, []);
 
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8031/tours');
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchTours();
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

const handleCategoryClick = (category) => {
  if (selectedCategory !== category) {
    setAnimationClass('slide-out'); // Trigger slide-out first
    setTimeout(() => {
      setSelectedCategory(category);
      setAnimationClass('slide-in'); // Then trigger slide-in after category update
    }, 300); // Delay to allow slide-out animation to complete
  }
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
            <h2 className='sub-title' style={{marginBottom: '50px'}}>FROM INFORMATION TECHNOLOGY</h2>
        
            <div className="movie-card-container-main">
            {fshows.map((featureds) => (
            <MovieCard
            key={featureds._id}
            name={featureds.Name || featureds.name}
            date={featureds.date}
            place={featureds.place}
            price={featureds.price}
            image={featureds.image}
            time={featureds.time}
            eventId={featureds._id}
            userData={userData}
            setUserData={setUserData} // Use movie.image (make sure the path is correct)  
            />
            ))}


        </div>

            <div className='other-events-container'>
              <h1 className='title-one'>Other Events</h1>
              <div className='category-poster-container'>


                
                <div className='category-container'>
  <ul className='categories'>
    <li 
      className={selectedCategory === 'Movies' ? 'active-category' : ''} 
      onClick={() => handleCategoryClick('Movies')} >
      Movies
    </li>

    <li 
      className={selectedCategory === 'Concerts & Shows' ? 'active-category' : ''} 
      onClick={() => handleCategoryClick('Concerts & Shows')}>
      Concerts & Shows
    </li>

    <li 
      className={selectedCategory === 'Sports' ? 'active-category' : ''} 
      onClick={() => handleCategoryClick('Sports')} >
      Sports
    </li>

    <li 
      className={selectedCategory === 'Tours & Attractions' ? 'active-category' : ''} 
      onClick={() => handleCategoryClick('Tours & Attractions')} >
      Tours & Attractions
    </li>

    <li 
      className={selectedCategory === 'Family' ? 'active-category' : ''} 
      onClick={() => handleCategoryClick('Family')}>
      Family
    </li>
    
  </ul>
</div>

                

                  <div className={`other-card-container ${animationClass}`} >
                  {getFilteredData().length === 0 ? (
                <h1 className = "neven">NO EVENTS YET</h1>  // Display this message if no events are found
                ) :
    
                    (getFilteredData().map((item) => (
                    <MovieCard2
                    key={item._id}
                    name={item.Name || item.name}
                    date={item.date}
                    place={item.place}
                    price={item.price}
                    image={item.image}
                    time={item.time}
                    eventId={item._id}
                    userData={userData}
                    setUserData={setUserData}
                   />
                    )))}    
                  </div>


              </div>
            </div>
                  <div className='main-about-us-container'>
                    <div className='about-us-title'> Know more about 
                      <img src='/images/HomeImages/ONEPIXEL-LOGO-BLACK.png' 
                      style={{
                        height: '100px', 
                        width: '100px',
                        marginLeft: '40px'}}></img> 
                      
                      </div>


                    
                      <div className='dev-card-container'>
                            <div className='dev-cards'>
                            <img src='/images/tristan.jpg' className='dev-image' alt="dev-photo"></img>

                              <div className='card-contents'>
                             <div className='dev-name'>Aquino, Tristan Jay</div>
                             <div className='description'>DIV MASTER (?)</div>

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
