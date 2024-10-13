import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/home/HomePage'; // Import HomePage
import Signup from '../src/signup/SignUp'; // Import Signup component
import Login from '../src/login/Login';   // Import Login component
import ContactUs from './contact/ContactUs';
import ConcertList from './events/concerts/ConcertList';
import ConcertDetails from './events/concerts/ConcertDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Use 'element' instead of 'component' */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/concerts" element={<ConcertList />} />
        <Route path="/concert-details" element={<ConcertDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
