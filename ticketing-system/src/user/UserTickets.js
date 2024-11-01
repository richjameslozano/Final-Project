import { Layout } from 'antd';
import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../css/user/UserTickets.css';
import Purchased from '../components/Purchased';

const UserTickets = () => {
  const navigate = useNavigate()

  const handleMyAccount =(route)=>{
    navigate(route)
  }

  return (
    <Layout  className='main-container-user-account' style={{ backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020' }}>
      <Header/>

      <div className="user-profile-container">
        <div className="sidebar">
          <h1 className='profile-title'>Profile Settings</h1>
          <hr></hr>
          <ul className='sidebar-button-list'>
            <li onClick={() => handleMyAccount('/profile')}>My Account</li>  
            <li style={{backgroundColor:'rgba(255,255,255,0.2)'}}>Tickets Purchased</li>  
          </ul>
        </div>

          <div className="ticket-purchased-details">
          <h2>My Tickets</h2>
          <hr style={{marginBottom: '20px'}}></hr>

        <div className='ticket-list-container'>
            <Purchased/>
        </div>
          
          </div>
      </div>
    </Layout>
   
  );
};

export default UserTickets;
