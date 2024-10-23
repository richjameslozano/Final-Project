  import React, { useState, useEffect } from 'react';
  import { Menu, Input, Button, Modal } from 'antd';
  import { ShoppingCartOutlined } from '@ant-design/icons';
  import { useNavigate } from 'react-router-dom';
  import '../css/componentsStyle/Header.css'; 
  import ProfileButton from './ProfileButton';

  const { Search } = Input;
  const { SubMenu } = Menu;

  const Header = () => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    const navigate = useNavigate(); 

    const goToHome = () => {
      navigate('/')

    }
    const handleHomeClick = () => {
      goToHome();
      scrollToTop();
    };

    return (
      <div className="header-container">
        <div className="header-logo">ONEPIXEL.<span className='ticket-logo'>Ticket</span></div>


        <div className='btn-container'>
          <button onClick={handleHomeClick}>Home</button>
          <button >Events</button>
          <button  onClick={scrollToBottom}>Ticket Outlets</button>
          <button>News</button>
          <button onClick={scrollToBottom}>Contact Us</button>
          <input placeholder='Looking for anything?'></input>
          <img className='search-btn' src='https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png'></img>
          <ShoppingCartOutlined className='cart-icon'/> 
          <ProfileButton />
          </div>
      </div>
    );
  };

  export default Header;
