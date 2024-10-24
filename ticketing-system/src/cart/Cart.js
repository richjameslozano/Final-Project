import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
  const [movies, setMovies] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // State to track total cost

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8031/cart');
        const fetchedMovies = response.data.map((movie) => ({
          ...movie,
          quantity: 1, // Initialize quantity to 1 for each movie
        }));
        setMovies(fetchedMovies);
        updateTotalCost(fetchedMovies); // Calculate initial total cost
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  // Handle item delete
  const handleItemDelete = (id) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.filter(ticket => ticket._id !== id);
      updateTotalCost(updatedMovies); // Pass the updated movie list to recalculate total cost
      return updatedMovies;
    });
  };

  // Handle quantity change and update total cost
  const handleQuantityChange = (id, quantity, price) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map(ticket => 
        ticket._id === id ? { ...ticket, quantity } : ticket
      );
      updateTotalCost(updatedMovies); // Update total cost with new quantities
      return updatedMovies;
    });
  };

  // Function to update total cost
  const updateTotalCost = (updatedMovies) => {
    const total = updatedMovies.reduce((sum, movie) => {
      const moviePrice = Number(movie.price); // Ensure price is a number
      const movieQuantity = Number(movie.quantity); // Ensure quantity is a number
      
      console.log(`Calculating cost for movie: ${movie.name}, Price: ${moviePrice}, Quantity: ${movieQuantity}`);
  
      if (!isNaN(moviePrice) && !isNaN(movieQuantity)) {
        return sum + (moviePrice * movieQuantity); // Calculate total cost
      }
      return sum;
    }, 0);
    setTotalCost(total);
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
                id={ticket._id}
                ticketname={ticket.name}
                date={ticket.date}
                place={ticket.place}
                image={ticket.image}
                time={ticket.time}
                price={ticket.price}
                quantity={ticket.quantity} // Pass the current quantity to CartItem
                onDelete={handleItemDelete}
                onQuantityChange={handleQuantityChange} // Pass down the quantity change handler
              />
            ))
          ) : (
            <p>No items in your cart.</p>
          )}
        </div>
        
        {/* Display total cost */}
        <div className='total-cost'>
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
