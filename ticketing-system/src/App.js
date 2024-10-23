import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/home/HomePage'; 
import SignUp from './signup/SignUp'; 


import AppController from './components/AppController';
import UserProfile from './user/UserProfile';
import UserTickets from './user/UserTickets';
import UserAccount from './user/UserAccount';

const App = () => {
  return (
    <AppController />
  );
};

export default App;
