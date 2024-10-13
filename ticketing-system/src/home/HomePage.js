import React from 'react';
import { Layout } from 'antd';
import MovieList from '../components/MovieList';
import UpcomingMovie from '../components/UpcomingMovie';
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
        <Layout>
          {/* <Sider width={250} style={{ backgroundColor: '#2a2a2a' }}>
            <Sidebar />
          </Sider> */}
          <Content className="home-page-content">
            <UpcomingMovie />
            <div className="movie-card-container">
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
              <MovieCard title="Fast & Furious" screen="Platinum" price={15} image="/images/ff1.jpg" />
              {/* Add more MovieCard components as needed */}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  };

export default HomePage;
