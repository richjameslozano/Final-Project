import React from 'react';
import { Layout } from 'antd';
import MovieList from '../components/MovieList';
import HomePageSlider from '../components/HomePageSlider';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import '../css/HomePage.css';
import HomeSlider from '../components/HomeSlider';
import MovieCard2 from '../components/MovieCard2';
import Footer from '../components/Footer';
import { Color } from 'antd/es/color-picker';

const { Sider, Content } = Layout;

const HomePage = () => {
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
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15}  image="/images/HomeImages/hardstuck-poster.png" />
              {/* Add more MovieCard components as needed */}
            </div>

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
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                    <MovieCard2 title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NU MOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
                  </div>
              </div>
            </div>

          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default HomePage;
