import React from 'react';
import { Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../css/componentsStyle/NavBar.css'; // Import the CSS file

function Navbar() {
  return (
    <Menu mode="horizontal" theme="dark" className="navbar-menu">
      <div className="navbar-logo">M4You</div>
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="movies">Movies</Menu.Item>
      <Menu.Item key="theaters">Theaters</Menu.Item>
      <Menu.Item key="news">News</Menu.Item>
      <div className="navbar-icons">
        <ShoppingCartOutlined className="navbar-icon" />
        <UserOutlined className="navbar-icon" />
      </div>
    </Menu>
  );
}

export default Navbar;
