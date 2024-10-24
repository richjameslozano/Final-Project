import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Cart = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8025/movies');
            console.log(response.data);
            setMovies(response.data); // Set the movie data into state
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
}, []);

  
    return (
      <Layout className="cart-page-layout">
        <Header />
          <div className='main-content-container-cart' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one-cart'>MY CART</h1>
            <h2 className='sub-title-cart'>TICKET LIST</h2>
        
            <div className="movie-cart-container-main">
                
              {movies.map((ticket) =>(
                <CartItem
                  key={ticket._id}
                  ticketname={ticket.name}
                  date={ticket.date}
                  place={ticket.place}
                  image={ticket.image}
                  time={ticket.time}
                  price={ticket.price}
                />
              ))}
                
             
             </div>

             
          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default Cart;
