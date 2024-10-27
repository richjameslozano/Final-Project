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
        const showsResponse = await axios.get(`http://localhost:8031/allevents`);
        setAllShows(showsResponse.data);

        const userID = localStorage.getItem("user");
        const userholder = JSON.parse(userID).id;
        const userResponse = await axios.get(`http://localhost:8031/getUser/${userholder}`);
        const ticketArray = userResponse.data.ticket;

        // Initialize userCart with objects that contain id and quantity
        setUserCart(ticketArray.map(ticket => ({ id: ticket._id, quantity: 1 }))); // Set default quantity to 1
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

const handleItemDelete = async (id) => {
  try {
    const userID = localStorage.getItem("user");
    const userholder = JSON.parse(userID).id;

    console.log(`Deleting ticket with ID: ${id} for user: ${userholder}`);

    const response = await axios.delete(`http://localhost:8031/user/${userholder}/remove-ticket/${id}`);

    if (response.status === 200) {
      // Update userCart state correctly by filtering out the deleted item
      setUserCart(prevCart => prevCart.filter(ticket => ticket.id !== id)); // Use 'id' here directly since it's a string
      calculateTotalCost(); // Recalculate total cost
      message.success("Item removed successfully.");
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    message.error("Failed to remove item.");
  }
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
