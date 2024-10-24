import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
  const [movies, setMovies] = useState([]);

  // Fetch movies (or tickets) from the server
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8031/cart');
        console.log(response.data);
        setMovies(response.data); // Set the movie data into state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Handle item delete (remove from the state)
  const handleItemDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter(ticket => ticket._id !== id)); // Safely update state
  };

  return (
    <Layout className="cart-page-layout">
      <Header />
      <div className='main-content-container-cart' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
        <h1 className='title-one-cart'>MY CART</h1>
        <h2 className='sub-title-cart'>TICKET LIST</h2>

        <div className="movie-cart-container-main">
          {movies.length > 0 ? (
            movies.map((ticket) => (
              <CartItem
                key={ticket._id}
                id={ticket._id}  // Pass the movie/ticket ID
                ticketname={ticket.name}
                date={ticket.date}
                place={ticket.place}
                image={ticket.image}
                time={ticket.time}
                price={ticket.price}
                onDelete={handleItemDelete} // Pass delete handler to remove item
              />
            ))
          ) : (
            <p>No items in your cart.</p> // Message when cart is empty
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
