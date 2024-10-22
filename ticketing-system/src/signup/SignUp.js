import React, { useState } from 'react';
import '../css/SignUp.css';
import Header from '../components/Header'; // Import the Header component

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        agreeToTerms: false,
        receiveNewsletter: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log(formData);
    };

    return (
        <div>
            <Header /> {/* Include the Header here */}
            <form className="signup-container" onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                                value={formData.password}
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

                    <div className="signup-checkbox">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                        />
                        <label>I agree to the Terms & Conditions and Data Privacy Policy</label>
                    </div>
                    <div className="signup-checkbox">
                        <input
                            type="checkbox"
                            name="receiveNewsletter"
                            checked={formData.receiveNewsletter}
                            onChange={handleChange}
                        />
                        <label>I agree to receive News Letters, Updates and Promotions</label>
                    </div>

                    <div className="signup-buttons">
                        <button type="submit" className="register-button">Register</button>
                        <button type="button" className="cancel-button" onClick={() => console.log('Cancel')}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
