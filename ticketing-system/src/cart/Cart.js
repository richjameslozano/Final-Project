import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [allShows, setAllShows] = useState([]);
  const [userCart, setUserCart] = useState([]);

  // Fetch all shows and user cart when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await axios.get(`http://localhost:8031/AllShows`);
        setAllShows(showsResponse.data);

        const userID = localStorage.getItem("user");
        const userholder = JSON.parse(userID).id;
        const userResponse = await axios.get(`http://localhost:8031/getUser/${userholder}`);
        const ticketArray = userResponse.data.ticket;

        const ticketIds = [...new Set(ticketArray.map(ticket => ticket._id))];
        setUserCart(ticketIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate total cost whenever userCart or allShows changes
  useEffect(() => {
    calculateTotalCost();
  }, [userCart, allShows]);

  const calculateTotalCost = () => {
    const total = userCart.reduce((acc, ticketId) => {
      const show = allShows.find(show => show._id === ticketId);
      return show ? acc + parseFloat(show.price) : acc;
    }, 0);
    setTotalCost(total);
  };

  const handleQuantityChange = (id, quantity) => {
    // Update the userCart state to reflect the new quantity for the ticket
    const updatedCart = userCart.map(ticketId => {
      if (ticketId === id) {
        return { id: ticketId, quantity }; // Include quantity in the object if needed
      }
      return { id: ticketId };
    });

    setUserCart(updatedCart);
    calculateTotalCost();
  };

  const handleItemDelete = (id) => {
    setUserCart(prevCart => prevCart.filter(ticketId => ticketId !== id)); // Remove the ticket ID from the userCart
    calculateTotalCost();
  };

  return (
    <Layout className="cart-page-layout">
      <Header />
      <div className='main-content-container-cart' style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}>
        <h1 className='title-one-cart'>MY CART</h1>
        <h2 className='sub-title-cart'>TICKET LIST</h2>

        <div className="movie-cart-container-main">
        {userCart.length > 0 ? (
            allShows.length > 0 ? (
              allShows.map((ticket) => {
                const isInCart = userCart.includes(ticket._id);
                if (isInCart) {
                  return (
                    <CartItem
                      key={ticket._id}
                      id={ticket._id}
                      ticketname={ticket.name}
                      date={ticket.date}
                      place={ticket.place}
                      image={ticket.image}
                      time={ticket.time}
                      price={ticket.price}
                      quantity={ticket.quantity || 1}
                      onDelete={handleItemDelete}
                      onQuantityChange={handleQuantityChange}
                    />
                  );
                }
                return null;
              })
            ) : (
              <p className='no-items'>No shows available.</p>
            )
          ) : (
            <p className='no-items'>There are no items in your cart</p>
          )}

          <div className='total-cost'>
            <h3 style={{ fontSize: '30px' }}>Total Cost: <span style={{ color: 'orange' }}>₱{totalCost.toFixed(2)}</span></h3>
          </div>
        </div>

        <div className='total-cost-container'>
          <h1 style={{ color: 'black' }}>PROCEED TO CHECKOUT</h1>
        </div>
      </div>
      <Footer />
    </Layout>
    
  );
};

export default Cart;
