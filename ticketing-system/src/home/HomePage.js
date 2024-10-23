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
  const [fshows, setFshows] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8020/movies');
            console.log(response.data);
            setMovies(response.data); // Set the movie data into state
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
}, []);

useEffect(() => {
  const fetchFshows = async () => {
      try {
          const response = await axios.get('http://localhost:8020/featuredshows');
          console.log(response.data);
          setFshows(response.data); // Set the movie data into state
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  fetchFshows();
}, []);

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
            <h2 className='sub-title'>FROM INF224</h2>
        
            <div className="movie-card-container-main">
            {fshows.map((featureds) => (
        <MovieCard
            key={featureds._id} // Unique identifier
            name={featureds.name}  // Use movie.Name
            date={featureds.date}  // Use movie.date
            place={featureds.place}  // Use movie.place for venue
            price={featureds.price}  // Use movie.price
            image={featureds.image}  // Use movie.image (make sure the path is correct)
            
        />
    ))}


</div>

                {/* <div className="movie-card-container-main">
              <MovieCard title="movie.title" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15}  image="/images/HomeImages/hardstuck-poster.png" />
              
            </div> */}
            
            <div className='other-events-container'>
              <h1 className='title-one'>Other Events</h1>
              <div className='category-poster-container'>
                <div className='category-container'>
                  <ul className='categories'>
                    <li>Movies</li>
                    <li>Concerts & Shows</li>
                    <li>Sports </li>
                    <li>Tours & Attractions</li>
                    <li>Family</li>
                    <li>Promos</li>
                  </ul>
                </div>
                  <div className="other-card-container">
                  {movies.map((movie) => (
        <MovieCard2
            key={movie._id} // Unique identifier
            Name={movie.Name}  // Use movie.Name
            date={movie.date}  // Use movie.date
            place={movie.place}  // Use movie.place for venue
            price={movie.price}  // Use movie.price
            image={movie.image}  // Use movie.image (make sure the path is correct)
            
        />
    ))}
                  </div>
              </div>
            </div>

          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default HomePage;
