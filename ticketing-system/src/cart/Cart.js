  import React, { useState, useEffect, useCallback } from 'react';
  import { Layout, message, Modal, Button, Radio, Input, Form, notification } from 'antd';
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
    const [modalCartDetails, setModalCartDetails] = useState([]);
    const [timer, setTimer] = useState(60); // 5-minute countdown timer

    const [form] = Form.useForm();

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
            quantity: ticket.quantity 
          })));

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    // Countdown timer effect
    // useEffect(() => {
    //   if (timer > 0) {
    //     const countdown = setInterval(() => {
    //       setTimer((prev) => prev - 1);
    //     }, 1000);
    //     return () => clearInterval(countdown);
    //   } else {
    //     // Remove all items from cart when timer hits zero
    //     // setUserCart([]);
    //     handleClearCart();
    //     message.warning('Your session expired, items have been removed from your cart.');
    //   }
    // }, [timer]);

    useEffect(() => {
      if (userCart.length > 0 && timer > 0) { // Only start timer if cart has items
        const countdown = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(countdown);

      } else if (timer === 0) {
        // Remove all items from cart when timer hits zero
        handleClearCart();
        message.warning('Your session expired, items have been removed from your cart.');
      }
    }, [timer, userCart.length]); 

    const handleClearCart = async () => {
      try {
        const userID = JSON.parse(localStorage.getItem('user')).id;
        await axios.delete(`http://localhost:8031/user/${userID}/clear-cart`);
        setUserCart([]); // Clear cart in frontend
        setTimer(60); 

      } catch (error) {
        console.error('Error clearing cart:', error);
        message.error('Failed to clear cart in the database.');
      }
    };

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
          price: show.price,
          ticketId: cartItem.id
        } : null;
      }).filter(item => item !== null);

      setModalCartDetails(cartDetails); // Set the modal details
      setIsModalVisible(true);
    };

    // const handleOk = async () => {
    //   if (!selectedPaymentMethod) {
    //     message.warning('Please select a payment method.');
    //     return;
    //   }

    //   try {
    //     console.log("Selected Payment Method:", selectedPaymentMethod); // Debug line
    
    //     const userID = JSON.parse(localStorage.getItem('user')).id;
    //     await axios.post(`http://localhost:8031/user/${userID}/purchase`, {
    //       tickets: userCart,
    //       paymentMethod: selectedPaymentMethod
    //     });
    
    //     await handleClearCart();
    
    //     message.success(`Payment successful! Your selected payment method: ${selectedPaymentMethod}`);
    //       notification.success({
    //           message: 'Success',
    //           description: 'Check your ticket on Ticket Purchased Page!',
    //           placement: 'bottomRight',
    //       });
    //     setIsModalVisible(false);
    //   } catch (error) {
    //     console.error("Error during purchase:", error);
    //     message.error("Failed to complete purchase.");
    //   }
    // };
    
    // const handleOk = async () => {
    //   if (!selectedPaymentMethod) {
    //     message.warning('Please select a payment method.');
    //     return;
    //   }
  
    //   // Check if "Credit Card" is selected and validate the form fields
    //   if (selectedPaymentMethod === 'Credit Card') {
    //     try {
    //       await form.validateFields(); // Validates only if fields are filled
    //     } catch (error) {
    //       message.error('Please fill in all required credit card details.');
    //       return; // Stop if validation fails
    //     }
    //   }
  
    //   try {
    //     const userID = JSON.parse(localStorage.getItem('user')).id;
    //     await axios.post(`http://localhost:8031/user/${userID}/purchase`, {
    //       tickets: userCart,
    //       paymentMethod: selectedPaymentMethod,
    //     });
  
    //     await handleClearCart();
    //     message.success(`Payment successful! Your selected payment method: ${selectedPaymentMethod}`);
    //     notification.success({
    //       message: 'Success',
    //       description: 'Check your ticket on Ticket Purchased Page!',
    //       placement: 'bottomRight',
    //     });
    //     setIsModalVisible(false);
    //   } catch (error) {
    //     console.error("Error during purchase:", error);
    //     message.error("Failed to complete purchase.");
    //   }
    // };

    const handleOk = async () => {
      // Check if cart is empty before proceeding with payment
      if (userCart.length === 0) {
        message.error('Your cart is empty. Unable to proceed with payment.');
        setIsModalVisible(false); // Close the modal since there's no items in cart
        return; // Stop the function here if cart is empty
      }
    
      if (!selectedPaymentMethod) {
        message.warning('Please select a payment method.');
        return;
      }
    
      // If "Credit Card" is selected, validate form fields
      if (selectedPaymentMethod === 'Credit Card') {
        try {
          await form.validateFields(); // Validate only if fields are filled
        } catch (error) {
          message.error('Please fill in all required credit card details.');
          return; // Stop if validation fails
        }
      }
    
      try {
        const userID = JSON.parse(localStorage.getItem('user')).id;
        await axios.post(`http://localhost:8031/user/${userID}/purchase`, {
          tickets: userCart,
          paymentMethod: selectedPaymentMethod,
        });
    
        await handleClearCart();
        message.success(`Payment successful! Your selected payment method: ${selectedPaymentMethod}`);
        notification.success({
          message: 'Success',
          description: 'Check your ticket on Ticket Purchased Page!',
          placement: 'bottomRight',
        });
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error during purchase:", error);
        message.error("Failed to complete purchase.");
      }
    };
    
    

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleProceedToCheckout = () => {
      if (userCart.length === 0) {
        message.warning('Your Cart is empty');
        return;
      }
      showModal(); // Show modal only if cart is not empty
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
          
          <p>Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>

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
              <p className="no-items" style={{marginBottom: '100px'}}>There are no items in your cart</p>
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

          <div className="total-cost-container" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </div>

          <Modal
            title="Select Payment Method"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
            okText="Confirm Payment"
            width={700}
          >
            <div>
              {modalCartDetails.map((item, index) => (
                <div key={index} className="modal-cart-item">
                  <p><strong>{item.ticketname}</strong></p>
                  <p>Ticket ID: {item.ticketId}</p>
                  <p>Date: {item.date}</p>
                  <p>Venue: {item.place}</p>
                  <p>Time: {item.time}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per Ticket: ₱{item.price}</p>
                  <p>Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
                  <hr />
                </div>
              ))}

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
          <Form layout="vertical" form={form}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please enter your card number' }]}
          >
            <Input placeholder="1234 5678 9012 3456" maxLength={16} />
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[{ required: true, message: 'Please enter the expiry date' }]}
          >
            <Input placeholder="MM/YY" />
          </Form.Item>
          <Form.Item
            label="CVV"
            name="cvv"
            rules={[{ required: true, message: 'Please enter the CVV' }]}
            
          >
            <Input placeholder="123" maxLength={3} />
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
