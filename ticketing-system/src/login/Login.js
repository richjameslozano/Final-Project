import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Link } = Typography;

const Login = ({ onCancel, onLoginSuccess }) => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Send POST request to the login endpoint
            const response = await axios.post('http://localhost:8031/login', values);
            console.log('Login Success:', response.data);

            // Destructure user details from the response
            const { id, username, lastName, firstName, email } = response.data;

            // Save the user details in local storage as a single object
            localStorage.setItem('user', JSON.stringify({ id, username, firstName, lastName, email }));

            // Trigger login success callback to update the parent component state
            onLoginSuccess(username);

            // Close the modal using the parent-provided onCancel function
            onCancel();

            // Redirect to the main page
            navigate('/homepage');
        } catch (error) {
            console.error('Login Failed:', error.response?.data?.message || error.message);
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
                    <Button type="primary" htmlType="submit" block>
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
