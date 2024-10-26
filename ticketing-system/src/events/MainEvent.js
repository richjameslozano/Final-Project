import React, { useEffect, useState } from 'react';
import { Card, Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../css/events/MainEvent.css';
import MovieCard3 from '../components/MovieCard3';
 
const { Meta } = Card;
 
const MainEvent = ({ movie, isVisible }) => {
  const [allShows, setAllShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [sports, setSports] = useState([]);
  const [Tours, setTours] = useState([]);
  const [family, setFamily] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
 
  //---------------------------------------------//
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
  const [isAnimating, setIsAnimating] = useState(false);
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
    const fetchAll = async () => {
      try {
        const response = await axios.get('http://localhost:8031/AllShows');
        setAllShows(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchAll();
  }, []);
  // ... other useEffect hooks remain unchanged ...
 
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsAnimating(true);
 
    setTimeout(() => {
      setSelectedCategory(category);
      setIsAnimating(false); // Start fade-in animation
    }, 500);
  };
 
  const getFilteredData = () => {
    switch (selectedCategory) {
      case 'All Shows':
        return allShows;
      case 'Movies':
        return movies;
      case 'Concerts':
        return concerts;
      case 'Sports':
        return sports;
      case 'Tours':
        return Tours;
      case 'Family':
        return family;
      default:
        return allShows;
    }
  };
 
  return (
    <Layout className='main-layout'>
      <Header />
      <div className='slider-event-bg' style={{ backgroundImage: 'url(/images/bg4.jpg)' }}></div>
 
      <h2 className='title-main-events'>UPCOMING EVENTS</h2>
 
      <div className='main-event-container' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
        <div className='categories-container-main'>
          <button
            onClick={() => handleCategoryClick('All Shows')}
            className={selectedCategory === 'All Shows' ? 'active' : ''}
          >
            All Shows
          </button>
          <button
            onClick={() => handleCategoryClick('Movies')}
            className={selectedCategory === 'Movies' ? 'active' : ''}
          >
            Movies
          </button>
          <button
            onClick={() => handleCategoryClick('Concerts')}
            className={selectedCategory === 'Concerts' ? 'active' : ''}
          >
            Concerts
          </button>
          <button
            onClick={() => handleCategoryClick('Family')}
            className={selectedCategory === 'Family' ? 'active' : ''}
          >
            Family
          </button>
          <button
            onClick={() => handleCategoryClick('Sports')}
            className={selectedCategory === 'Sports' ? 'active' : ''}
          >
            Sports
          </button>
          <button
            onClick={() => handleCategoryClick('Tours')}
            className={selectedCategory === 'Tours' ? 'active' : ''}
          >
            Tours and Attractions
          </button>
        </div>
 
        <div className={`other-card-container2 ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          {getFilteredData().length === 0 ? (
            <h1 className='neven2'>NO EVENTS YET</h1>
          ) : (
            getFilteredData().map((item) => (
              <div key={item._id}>
                <MovieCard3
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
 
              </div>
            ))
          )}
        </div>
      </div>
 
      {/* Hard-coded trailer at the bottom */}
      <div className='trailer-container'>
          <div className='trailer-title'>NEWEST TRAILER</div>
        <iframe
          height="1000px"
          width="1400px"
          margin-bottom = '1px'
          src='https://www.youtube.com/embed/3n5u-zWC4mY' // Use your hard-coded trailer URL here
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
 
      <Footer />
    </Layout>
  );
};
 
 
export default MainEvent;