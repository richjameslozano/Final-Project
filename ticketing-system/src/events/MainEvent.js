import React from 'react';
import { Card, Button, Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainEvent = () => { 

    return(
        <>
        <Layout>
        <Header></Header>
        <div className='slider-container'>
          
     
         
            </div>

          <div className='main-content-container' style={{backgroundImage: 'url(/images/HomeImages/homepage-bg.png)'}}>
            <h1 className='title-one'>FEATURED SHOWS</h1>
            <h2 className='sub-title'>FROM INF224</h2>
        
            

          </div>
        <Footer></Footer>
        </Layout>



        </>
    )



}

export  default MainEvent;