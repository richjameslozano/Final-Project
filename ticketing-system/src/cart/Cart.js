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
        const showsResponse = await axios.get(`http://localhost:8031/allevents`);
        setAllShows(showsResponse.data);

        const userID = localStorage.getItem("user");
        const userholder = JSON.parse(userID).id;
        const userResponse = await axios.get(`http://localhost:8031/getUser/${userholder}`);
        const ticketArray = userResponse.data.ticket;

        const ticketIds = [...new Set(ticketArray.map(ticket => ticket._id))];
        // Initialize userCart with objects that contain id and quantity
        setUserCart(ticketIds.map(ticketId => ({ id: ticketId, quantity: 1 }))); // Set default quantity to 1
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
    const total = userCart.reduce((acc, cartItem) => {
      const show = allShows.find(show => show._id === cartItem.id);
      return show ? acc + (parseFloat(show.price) * cartItem.quantity) : acc; // Multiply by quantity
    }, 0);
    setTotalCost(total);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = userCart.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
  
    setUserCart(updatedCart);
    localStorage.setItem('userCart', JSON.stringify(updatedCart)); // Save updated cart to local storage
    calculateTotalCost();
  };

  const handleItemDelete = (id) => {
    setUserCart(prevCart => prevCart.filter(ticket => ticket.id !== id)); // Remove the ticket from the userCart
    calculateTotalCost();
  };


  //DELETE FUNTION TEST:

  //   const handleRemoveTicket = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/users/${userId}/tickets`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ ticketId }),
  //     });

  //     const data = await response.json();
  //     setMessage(data.message);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessage('Failed to remove ticket');
  //   }
  // };

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
                const cartItem = userCart.find(item => item.id === ticket._id); // Find the cart item
                if (cartItem) {
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
                      quantity={cartItem.quantity} // Pass the quantity from the cart
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
