import React from 'react';
import { Form, Input, Button, Typography, message, notification } from 'antd'; // Added message
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Link } = Typography;

const Login = ({ onCancel, onLoginSuccess }) => {
    const navigate = useNavigate();

    // const onFinish = async (values) => {
    //     try {

    //         const response = await axios.post('http://localhost:8031/login', values);
    //         console.log('Login Success:', response.data);
    //         const { id, username, lastName, firstName, email } = response.data;

    //         localStorage.setItem('user', JSON.stringify({ id, username, firstName, lastName, email }));

    //         onLoginSuccess(username);

    //         message.success('Login successful!');

    //         onCancel();

    //         navigate('/homepage');
    //     } catch (error) {
    //         console.error('Login Failed:', error.response?.data?.message || error.message);

    //         if (error.response?.status === 400) {
    //             message.warning('Invalid credentials or user not found.');
    //         } else {
    //             message.error('Login failed. Please try again.');
    //         }
    //     }
    // };
    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8031/login', values);
            console.log('Login Success:', response.data);
            const { id, username, lastName, firstName, email } = response.data;
    
            localStorage.setItem('user', JSON.stringify({ id, username, firstName, lastName, email }));
            localStorage.setItem('showLoginSuccess', 'true'); // Set the flag
    
            onLoginSuccess(username);
            onCancel();
            
            navigate('/homepage');
            window.location.reload(); // Reload the page after navigating
        } catch (error) {
            console.error('Login Failed:', error.response?.data?.message || error.message);
    
            if (error.response?.status === 400) {
                message.warning('Invalid credentials or user not found.');
            } else {
                message.error('Login failed. Please try again.');
            }
        }
    };
    
    

    const goToSignup = () => {
        navigate('/signup');
    };

    return (
        <div style={{ width: 300, margin: '0 auto', padding: '50px 0' }}>
            <h1 style={{ textAlign: 'center' }}>Sign In</h1>

            <Form name="signin" onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button className='sign-in-button' type="primary" htmlType="submit" block>
                        Sign In
                    </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <span>Don't have an account? </span>
                    <Link onClick={goToSignup}>
                        Register Here!
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
