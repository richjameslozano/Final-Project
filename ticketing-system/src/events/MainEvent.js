import React, { useEffect, useState } from 'react';
import { Card, Layout, Button } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../css/events/MainEvent.css';
import MovieCard3 from '../components/MovieCard3';


const { Meta } = Card;

const MainEvent = () => { 
    const [allShows, setAllShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [concerts, setConcerts] = useState([]);
    const [fshows, setFshows] = useState([]);
    const [sports, setSports] = useState([]);
    const [Tours, setTours] = useState([]);
    const [family, setFamily] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Shows & Concerts');

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
              setFshows(response.data);
          } catch (error) {
              console.error('Error fetching featured shows:', error);
          }
      };
      fetchFshows();
    }, []);

    useEffect(() => {
      const fetchSports = async () => {
          try {
              const response = await axios.get('http://localhost:8031/sports');
              setSports(response.data);
          } catch (error) {
              console.error('Error fetching sports:', error);
          }
      };
      fetchSports();
    }, []);

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };

    const getFilteredData = () => {
        switch (selectedCategory) {
          case 'All Shows':
            return allShows;
          case 'Movies':
            return movies;
          case 'Concerts':  
            return concerts;
          case 'Featured Shows':
            return fshows;
          case 'Sports':
            return sports;
          default:
            return movies;
        }
    };

    return (
      <Layout className='main-layout'>
        <Header />

        <div className='slider-event-bg' style={{ backgroundImage: 'url(/images/bg4.jpg)' }}></div>

        <h2 className='title-main-events'>UPCOMING EVENTS</h2>


        <div className='main-event-container' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
       

          <div className='categories-container-main'>
          <button onClick={() => handleCategoryClick('All Shows')} className={selectedCategory === 'All Shows' ? 'active' : ''}>All Shows</button>
          <button onClick={() => handleCategoryClick('Movies')} className={selectedCategory === 'Movies' ? 'active' : ''}>Movies</button>
          <button onClick={() => handleCategoryClick('Concerts')} className={selectedCategory === 'Concerts' ? 'active' : ''}>Concerts</button>
          <button onClick={() => handleCategoryClick('Featured Shows')} className={selectedCategory === 'Featured Shows' ? 'active' : ''}>Featured Shows</button>
          <button onClick={() => handleCategoryClick('Sports')} className={selectedCategory === 'Sports' ? 'active' : ''}>Sports</button>
        </div>

<div className="other-card-container2">
                  {getFilteredData().length === 0 ? (
                <h1 className = "neven2">NO EVENTS YET</h1>  // Display this message if no events are found
              ) :
  
              (getFilteredData().map((item) => (
                <MovieCard3
                  key={item._id}
                  Name={item.Name || item.name} // Adjust based on movie or show
                  date={item.date}
                  place={item.place}
                  price={item.price}
                  image={item.image}
                  time ={item.time}
                />
              )))}
            </div>

        </div>

        <Footer />
      </Layout>
    );

};

export default MainEvent;
