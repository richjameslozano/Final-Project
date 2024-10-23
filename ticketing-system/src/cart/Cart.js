import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/HomePage.css';
import MovieCard2 from '../components/MovieCard2';
import Footer from '../components/Footer';


const Cart = () => {


  
    return (
      <Layout className="home-page-layout">
        <Header />
          <div className='main-content-container' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one'>MY CART</h1>
            <h2 className='sub-title'>TICKET LISTS</h2>
        
            <div className="movie-card-container-main">
              <h1> DITO YUNG MGA MOVIES</h1>
            </div>

         

          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default Cart;
