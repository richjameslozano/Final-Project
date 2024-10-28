import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
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
        const showsResponse = await axios.get('http://localhost:8031/allevents');
        setAllShows(showsResponse.data);

        const userID = JSON.parse(localStorage.getItem('user')).id;
        const userResponse = await axios.get(`http://localhost:8031/getUser/${userID}`);
        const ticketArray = userResponse.data.ticket;

        setUserCart(ticketArray.map(ticket => ({ id: ticket._id, quantity: 1 }))); // Default quantity 1
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
      return show ? acc + show.price * cartItem.quantity : acc;
    }, 0);
    setTotalCost(total);
  };

  const handleQuantityChange = (id, quantity) => {
    setUserCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleItemDelete = async id => {
    try {
      const userID = JSON.parse(localStorage.getItem('user')).id;

      await axios.delete(`http://localhost:8031/user/${userID}/remove-ticket/${id}`);
      message.success('Item removed successfully.');

      setUserCart(prevCart => prevCart.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      message.error('Failed to remove item.');
    }
  };

  return (
    <Layout className="cart-page-layout">
      <Header />
      <div
        className="main-content-container-cart"
        style={{ backgroundImage: 'url(/images/HomeImages/homepage-bg.png)' }}
      >
        <h1 className="title-one-cart">MY CART</h1>
        <h2 className="sub-title-cart">TICKET LIST</h2>

        <div className="movie-cart-container-main">
          {userCart.length > 0 ? (
            allShows.length > 0 ? (
              allShows.map(ticket => {
                const cartItem = userCart.find(item => item.id === ticket._id);
                return (
                  cartItem && (
                    <CartItem
                      key={ticket._id}
                      id={ticket._id}
                      ticketname={ticket.name}
                      date={ticket.date}
                      place={ticket.place}
                      image={ticket.image}
                      time={ticket.time}
                      price={ticket.price}
                      quantity={cartItem.quantity}
                      onDelete={handleItemDelete}
                      onQuantityChange={handleQuantityChange}
                    />
                  )
                );
              })
            ) : (
              <p className="no-items">No shows available.</p>
            )
          ) : (
            <p className="no-items">There are no items in your cart</p>
          )}

          <div className="total-cost">
            <h3 style={{ fontSize: '30px' }}>
              Total Cost: <span style={{ color: 'orange' }}>₱{totalCost.toFixed(2)}</span>
            </h3>
          </div>
        </div>

        <div className="total-cost-container">
          <h1 style={{ color: 'black' }}>PROCEED TO CHECKOUT</h1>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
