import React, { useState, useEffect, useCallback } from 'react';
import { Layout, message, Modal, Button, Radio, Input, Form } from 'antd';
import Header from '../components/Header';
import '../css/cart/Cart.css';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [allShows, setAllShows] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [modalCartDetails, setModalCartDetails] = useState([]); // NEW STATE for modal details

  // Fetch all shows and user cart when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await axios.get('http://localhost:8031/allevents');
        setAllShows(showsResponse.data);

        const userID = JSON.parse(localStorage.getItem('user')).id;
        const userResponse = await axios.get(`http://localhost:8031/getUser/${userID}`);
        const ticketArray = userResponse.data.ticket;

        // Set the userCart with the correct quantity from the database
        setUserCart(ticketArray.map(ticket => ({
          id: ticket._id,
          quantity: ticket.quantity // Set quantity from the database
        }))); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate total cost based on current userCart and allShows
  const calculateTotalCost = useCallback(() => {
    return userCart.reduce((acc, cartItem) => {
      const show = allShows.find(show => show._id === cartItem.id);
      return show ? acc + show.price * cartItem.quantity : acc;
    }, 0);
  }, [userCart, allShows]);

  // Update total cost if necessary
  useEffect(() => {
    const newTotalCost = calculateTotalCost();
    if (newTotalCost !== totalCost) {
      setTotalCost(newTotalCost);
    }
  }, [calculateTotalCost, totalCost]);

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

  // Handle modal open and populate details
  const showModal = () => {
    const cartDetails = userCart.map(cartItem => {
      const show = allShows.find(show => show._id === cartItem.id);
      return show ? {
        ticketname: show.name,
        date: show.date,
        place: show.place,
        time: show.time,
        quantity: cartItem.quantity,
        price: show.price
      } : null;
    }).filter(item => item !== null);

    setModalCartDetails(cartDetails); // Set the modal details
    setIsModalVisible(true);
  };

  const handleOk = () => {
    message.success(`Payment method selected: ${selectedPaymentMethod}`);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                      userholder={ticket.userholder}
                      eventId={ticket.eventId}
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
            <div className='instructions'>
              <ol>
                <li> Make sure to finalize/check your tickets (ticketname, venue, quantity, price, etc.) as this cannot be undone.</li>
                <li> Only a maximum of 3 tickets can be ordered per purchase.</li>
                <li> Should you have any trouble ordering a ticket, please contact our <a>customer service</a>.</li>
              </ol>
            </div>
  
            <div className='price-container'>
              <h3 style={{ fontSize: '30px' }}>
                Total Cost: <span style={{ color: 'orange' }}>₱{totalCost.toFixed(2)}</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="total-cost-container" onClick={showModal}>
          Proceed to Checkout
        </div>

        <Modal
          title="Select Payment Method"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Confirm Payment"
          width={700}
        >
          <div>
            {modalCartDetails.map((item, index) => (
              <div key={index} className="modal-cart-item">
                <p><strong>{item.ticketname}</strong></p>
                <p>Date: {item.date}</p>
                <p>Venue: {item.place}</p>
                <p>Time: {item.time}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price per Ticket: ₱{item.price}</p>
                <p>Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
                <hr />
              </div>
            ))}

            {/* Display Total Cost here */}
            <div className="modal-total-cost">
              <h3>Total Cost: <span style={{ color: 'orange' }}>₱{totalCost.toFixed(2)}</span></h3>
            </div>
          </div>

          <Radio.Group
            onChange={e => setSelectedPaymentMethod(e.target.value)}
            value={selectedPaymentMethod}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <Radio value="Credit Card">Credit Card</Radio>
            <Radio value="PayPal">PayPal</Radio>
            <Radio value="Gcash">Gcash</Radio>
          </Radio.Group>

          {selectedPaymentMethod === 'Credit Card' && (
            <Form layout="vertical">
              <Form.Item label="Card Number">
                <Input placeholder="1234 5678 9012 3456" />
              </Form.Item>
              <Form.Item label="Expiry Date">
                <Input placeholder="MM/YY" />
              </Form.Item>
              <Form.Item label="CVV">
                <Input placeholder="123" />
              </Form.Item>
            </Form>
          )}

          {selectedPaymentMethod === 'PayPal' && (
            <p>After clicking confirm, you’ll be redirected to PayPal to complete your payment.</p>
          )}

          {selectedPaymentMethod === 'Gcash' && (
            <p>Please ensure your Gcash account is linked and ready for payment processing.</p>
          )}
        </Modal>


      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
