import React from 'react';
import { Input } from 'antd';  // Import Ant Design's Input component
import '../css/user/Profile.css';  // Add your custom styles here

const UserProfile = () => {
    return (
        <div className="profile-content">
            <h2>My Account</h2>
            <section className="account-info">
                <h3>Account Information</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <Input className="input-field" value="Berlene" disabled />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <Input className="input-field" value="Bernabe" disabled />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Username</label>
                        <Input className="input-field" value="BellrinSu30" disabled />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email</label>
                        <Input className="input-field" value="berlenebamabe12@gmail.com" disabled />
                        <a href="#" className="change-link">Change Email</a>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Status</label>
                        <Input className="input-field" value="Verified" disabled />
                    </div>
                </div>

                <div className="form-row">
                    <h3>Password</h3>
                    <div className="form-group">
                        <label>Password</label>
                        <Input.Password className="input-field" value="*********" disabled />
                        <a href="#" className="change-link">Change Password</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
