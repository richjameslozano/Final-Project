import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';


const Cart = () => {


  
    return (
      <Layout className="cart-page-layout">
        <Header />
          <div className='main-content-container-cart' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one-cart'>MY CART</h1>
            <h2 className='sub-title-cart'>TICKET LISTS</h2>
        
            <div className="movie-cart-container-main">
                <div className='ticket-lists'>
              <h1> DITO YUNG MGA MOVIES</h1>
              <h1> DITO YUNG MGA MOVIES</h1>

              <h1> DITO YUNG MGA MOVIES</h1>

              <h1> DITO YUNG MGA MOVIES</h1>

              <h1> DITO YUNG MGA MOVIES</h1>

              </div>
              
              
              <div className='price-container'>
                <h1>Ticket Price</h1>
                <h1>Booking Price</h1>
                </div>
            </div>

         

          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default Cart;
