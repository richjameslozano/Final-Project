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

const { Sider, Content } = Layout;

const HomePage = () => {
    return (
      <Layout className="home-page-layout">
        <Header />
        <div >
          <div className='slider-container'>
            {/* <HomePageSlider /> */}
            
            <HomeSlider/>
          </div>


          <div className='main-content-container'>
            <h1>HELLO WORLDDDD</h1>
            <div className="movie-card-container">
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
            
            </div>
          </div>
            

        </div>
      </Layout>
    );
  };

export default HomePage;
