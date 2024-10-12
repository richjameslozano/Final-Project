import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/home/HomePage'; // Import HomePage
import Signup from '../src/signup/SignUp'; // Import Signup component
import Login from '../src/login/Login';   // Import Login component
import ContactUs from './contact/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Use 'element' instead of 'component' */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
