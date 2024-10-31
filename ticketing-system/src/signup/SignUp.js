import React, { useState } from 'react';
import axios from 'axios';
import '../css/SignUp.css';
import Header from '../components/Header';
import { message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

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
        e.preventDefault(); // Prevent default form submission

        const { username, password, confirmPassword, firstName, lastName, mobileNumber } = formData;

        // Check if all required fields are filled
        if (!username || !password || !confirmPassword || !firstName || !lastName || !mobileNumber) {
            message.warning('Please fill in all fields');
            return;
        }

        // Check length validations
        if (username.length < 4 || username.length > 10) {
            message.warning('Username must be between 4 and 10 characters');
            return;
        }

        if (password.length < 4) {
            message.warning('Password must be at least 4 characters');
            return;
        }

        if (firstName.length < 2 || firstName.length > 20) {
            message.warning('First name must be between 2 and 20 characters');
            return;
        }

        if (lastName.length < 2 || lastName.length > 20) {
            message.warning('Last name must be between 2 and 20 characters');
            return;
        }

        if (!/^\d{11}$/.test(mobileNumber)) {
            message.warning('Mobile number must be exactly 11 digits');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            message.warning('Passwords do not match');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            message.warning('Please enter a valid email address');
            return;
        }
        

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8031/signup', formData);
            if (response.status === 201) {
                message.success('User registered successfully');
                navigate('/'); // Redirect to the homepage
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                message.error(`Error: ${error.response?.data?.message || 'Failed to register user'}`);
            } else {
                message.error('Failed to register user');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{backgroundImage: 'url(/images/HomeImages/footer-bg.png)', backgroundColor: '#202020'}}>
            <Header/>
            <form className="signup-container" onSubmit={handleSubmit}>
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
                                className='name-input'
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
                                className='name-input'
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
                                className='name-input'
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
                                className='name-input'
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
                                className='name-input'
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="signup-buttons">
                        <button type="submit" className="register-button">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <button type="button" className="cancel-button" onClick={() => console.log('Cancel')}>Cancel</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default SignUp;
