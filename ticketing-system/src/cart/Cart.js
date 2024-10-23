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
            <h2 className='sub-title-cart'>TICKET LIST</h2>
        
            <div className="movie-cart-container-main">
                <div className='main-cart-item'>
                <div className='cart-item-container'>
                        <img className='item-image'></img>
                          <div className='main-item-details'>
                            <div className='ticket-title'>Name</div>
                            <hr className='hr'></hr>
                                    <div className='ticket-details'>
                                          <div className='detail-one'>
                                            <div>September 28, 2003</div>
                                            <div>Mall of Asia Arena</div>
                                            <div>3:00pm-5:00pm</div>
                                          </div>
                                          <div className='detail-two'>
                                            <div style={{marginBottom: '10px'}}>Quantity:</div>
                                              <select className='select-quantity'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                              </select>
                                            <div style={{paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange'}}>PHP 800</div>
                                          </div>
                                    </div>     
                          </div>   
                      </div>

                      <div className='trash-container'>
                        <img className='trash-icon' src='/images/trash.png'></img>
                      </div>
                </div>

                
                <div className='main-cart-item'>
                <div className='cart-item-container'>
                        <img className='item-image'></img>
                          <div className='main-item-details'>
                            <div className='ticket-title'>Name</div>
                            <hr className='hr'></hr>
                                    <div className='ticket-details'>
                                          <div className='detail-one'>
                                            <div>September 28, 2003</div>
                                            <div>Mall of Asia Arena</div>
                                            <div>3:00pm-5:00pm</div>
                                          </div>
                                          <div className='detail-two'>
                                            <div style={{marginBottom: '10px'}}>Quantity:</div>
                                              <select className='select-quantity'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                              </select>
                                            <div style={{paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange'}}>PHP 800</div>
                                          </div>
                                    </div>     
                          </div>   
                      </div>

                      <div className='trash-container'>
                        <img className='trash-icon' src='/images/trash.png'></img>
                      </div>
                </div>
             </div>

             
          </div>
            

          <Footer/>
      </Layout>
    );
  };

export default Cart;
