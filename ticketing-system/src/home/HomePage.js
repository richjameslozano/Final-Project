import React from 'react';
import { Layout } from 'antd';
import MovieList from '../components/MovieList';
import HomePageSlider from '../components/HomePageSlider';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import '../css/HomePage.css';

const { Sider, Content } = Layout;

const HomePage = () => {
    return (
      <Layout className="home-page-layout">
        <Header />
     
          <div className='slider-container'>
            {/* <HomePageSlider /> */}
            <div className='black-fade'/>
            <img src='/images/HomeImages/slider-bg.jpg' className='slider-bg'></img>
      

          <div className='main-content-container' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one'>FEATURED SHOWS</h1>
            <h2 className='sub-title'>FROM INF224</h2>
        
            <div className="movie-card-container-main">
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NUMOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NUMOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NUMOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NUMOA" price={15} image="/images/HomeImages/hardstuck-poster.png" />
              <MovieCard title="HARD STUCK" date="November 6, 2024" venue="CASE ROOM - NUMOA" price={15}  image="/images/HomeImages/hardstuck-poster.png" />
              {/* Add more MovieCard components as needed */}
            </div>
          </div>
            

        </div>
      </Layout>
    );
  };

export default HomePage;
