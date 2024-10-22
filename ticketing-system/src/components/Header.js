// import React, { useState } from 'react';
// import { Menu, Input, Button, Modal } from 'antd';
// import { ShoppingCartOutlined } from '@ant-design/icons';
// import '../css/componentsStyle/Header.css'; // Updated path to the css file
// import Login from '../login/Login';

// const { Search } = Input; // Destructure Search from Input
// const { SubMenu } = Menu; // Destructure SubMenu from Menu

// const Header = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

//   const showModal = () => {
//     setIsModalVisible(true); // Show modal
//   };

//   const handleOk = () => {
//     setIsModalVisible(false); // Close modal
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false); // Close modal
//   };

//   return (
//     <div className="header-container">
//       <div className="header-logo">ONEPIXEL</div>
//       <Menu mode="horizontal" className="header-menu">
//         <Menu.Item key="home">Home</Menu.Item>
//         <SubMenu key="events" title="Events">
//           <Menu.Item key="movies">Movies</Menu.Item>
//           <Menu.Item key="concerts">Concerts</Menu.Item>
//           <Menu.Item key="sports">Sports</Menu.Item>
//           <Menu.Item key="theaters">Theaters</Menu.Item>
//         </SubMenu>
//         <Menu.Item key="news">News</Menu.Item>
//         <Menu.Item key="ticket-outlets">Ticket Outlets</Menu.Item>
//         <Menu.Item key="contact">Contact Us</Menu.Item>
//       </Menu>
//       <div className="header-search">
//         <Search
//           placeholder="Search movies..."
//           enterButton
//           style={{ width: 200 }}
//           onSearch={(value) => console.log(value)} // Placeholder for search functionality
//         />
//       </div>
//       <div className="header-icons">
//         <ShoppingCartOutlined className="header-icon" />
//         <Button className="header-button" onClick={showModal} >
//           Sign In
//         </Button>
//         <Button className="header-button">
//           Create Account
//         </Button>
//       </div>

//       {/* Modal for Create Account */}
//       <Modal
//         title="Create Account"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null} // To use custom footer if needed
//       >
//         <Login onCancel={handleCancel}/>

//       </Modal>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { Menu, Input, Button, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/componentsStyle/Header.css'; 
import Login from '../login/Login';
import ProfileButton from './ProfileButton';

const { Search } = Input;
const { SubMenu } = Menu;

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigate = useNavigate(); 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false); 
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  const goToSignup = () => {
    navigate('/signup'); 
  };

  const goToHomePage = () => {
    navigate('/'); 
  };

  const goToContactUs = () => {
    navigate('/contactus');
  };

  const goToConcertList = () => {
    navigate('/concerts');
  };

  const goToMoviesList = () => {
    navigate('/movies');
  };

  const goToUpcomingMovies = () => {
    navigate('/upcoming-movies');
  };

  const goToTicketOutlets = () => {
    navigate('/ticket-outlets');
  };
  
  const goToUpcomingEvents = () => {
    navigate('/upcoming-events');
  };

  // Effect to remove bullets from menu items
  useEffect(() => {
    const menuItems = document.querySelectorAll('.header-menu li');
    menuItems.forEach(item => {
      item.style.listStyleType = 'none';
      item.style.margin = '0'; // Remove margin if necessary
      item.style.padding = '0'; // Remove padding if necessary
    });
  }, []); // Empty dependency array to run only once after the component mounts

  return (
    <div className="header-container">
      <div className="header-logo">ONEPIXEL.<span className='ticket-logo'>Ticket</span></div>

      {/* <Menu mode="horizontal" className="header-menu">
        <Menu.Item key="home" onClick={goToHomePage}>Home</Menu.Item>
        <SubMenu key="events" title="Events">
          <Menu.Item key="movies" onClick={goToMoviesList}>Movies</Menu.Item>
          <Menu.Item key="concerts" onClick={goToConcertList}>Concerts</Menu.Item>
          <Menu.Item key="sports">Sports</Menu.Item>
          <Menu.Item key="theaters">Performing Arts</Menu.Item>
        </SubMenu>
        <SubMenu key="news" title="news">
          <Menu.Item key="movies" onClick={goToUpcomingMovies}>Upcoming Movies</Menu.Item>
          <Menu.Item key="concerts" onClick={goToUpcomingEvents}>Upcoming Events</Menu.Item>
          <Menu.Item key="sports">Ticket Sales</Menu.Item>
        </SubMenu>
        <Menu.Item key="ticket-outlets" onClick={goToTicketOutlets}>Ticket Outlets</Menu.Item>
        <Menu.Item key="contact" onClick={goToContactUs}>Contact Us</Menu.Item>
      </Menu>

      <div className="header-search">
        <Search
          placeholder="Search movies..."
          enterButton
          style={{ width: 200 }}
          onSearch={(value) => console.log(value)} // Implement search functionality
        />
      </div>

      <div className="header-icons">
        <ShoppingCartOutlined className="header-icon" />
        <Button className="header-button" onClick={showModal}>
          Sign In
        </Button>
        <Button className="header-button" onClick={goToSignup}>
          Create Account
        </Button>
      </div>

      <Modal
        // title="Sign In"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login onCancel={handleCancel} />
      </Modal> */}


      <div className='btn-container'>
        <button>Home</button>
        <button>Events</button>
        <button>Ticket Outlets</button>
        <button>News</button>
        <button>Contact Us</button>
        <input placeholder='Looking for anything?'></input>
        <img className='search-btn' src='https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png'></img>
        <ShoppingCartOutlined className='cart-icon'/> 
        <ProfileButton />
        </div>
    </div>
  );
};

export default Header;
