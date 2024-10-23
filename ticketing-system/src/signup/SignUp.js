import React, { useState } from 'react';
import axios from 'axios';
import '../css/SignUp.css';
import Header from '../components/Header';
import { Layout } from 'antd';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Send the form data to the backend
        try {
            const response = await axios.post('http://localhost:8020/signup', formData);
            if (response.status === 201) {
                alert('User registered successfully');


            }   
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    return (
        <Layout style={{backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020'}}>
            <Header/>
            <form className="signup-container" onSubmit={handleSubmit} >
                <div className='register-title'>Register</div>
                <hr></hr>
                <div className="signup-form">
                    <div className="signup-section">
                        <h3>User and Password</h3>
                        <div className="signup-field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="signup-section">
                        <h3>Personal Information</h3>
                        <div className="form-group">
                            <div className="half-width">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className='name-input'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="half-width">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className='name-input'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="signup-section">
                        <h3>Contact Information</h3>
                        <div className="signup-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="signup-field">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="signup-buttons">
                        <button type="submit" className="register-button">Register</button>
                        <button type="button" className="cancel-button" onClick={() => console.log('Cancel')}>Cancel</button>
                    </div>
                </div>
            </form>
        </Layout>

            
            
 
    );
};

export default SignUp;
