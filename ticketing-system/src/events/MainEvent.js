import React, { useEffect, useState } from 'react';
import { Card, Layout, Button } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../css/events/MainEvent.css';

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
              const response = await axios.get('http://localhost:8030/movies');
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
            const response = await axios.get('http://localhost:8030/concerts');
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
              const response = await axios.get('http://localhost:8030/featuredshows');
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
              const response = await axios.get('http://localhost:8030/sports');
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
      <Layout>
        <Header />

        <div className='slider-event-bg' style={{ backgroundImage: 'url(/images/bg4.jpg)' }}></div>

        <h2 className='title-main-events'>UPCOMING EVENTS</h2>


        <div className='main-event-container' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
       

          <div className='categories-container-main'>
          <Button onClick={() => handleCategoryClick('All Shows')} className={selectedCategory === 'All Shows' ? 'active' : ''}>All Shows</Button>
          <Button onClick={() => handleCategoryClick('Movies')} className={selectedCategory === 'Movies' ? 'active' : ''}>Movies</Button>
          <Button onClick={() => handleCategoryClick('Concerts')} className={selectedCategory === 'Concerts' ? 'active' : ''}>Concerts</Button>
          <Button onClick={() => handleCategoryClick('Featured Shows')} className={selectedCategory === 'Featured Shows' ? 'active' : ''}>Featured Shows</Button>
          <Button onClick={() => handleCategoryClick('Sports')} className={selectedCategory === 'Sports' ? 'active' : ''}>Sports</Button>
        </div>

          <div className='events-grid'>
            {getFilteredData().map((event, index) => (
              <Card
                key={index}
                hoverable
                className='event-card'  
                cover={<img alt={event.name} src={event.image} />}
              >
                <Meta title={event.name} description={event.date} />
                <p>{event.location}</p>
                <Button type='primary' href={event.link}>Buy Tickets</Button>
              </Card>
            ))}
          </div>
        </div>

        <Footer />
      </Layout>
    );

    // display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    // gap: 20px;
    // padding: 20px;
};

export default MainEvent;
