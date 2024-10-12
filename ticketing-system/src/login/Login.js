import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import SignUp from '../signup/SignUp';

const { Link } = Typography;

const Login = ({ onCancel }) => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle the sign-up logic here
    onCancel(); // Close the modal after submission
  };

  const navigate = useNavigate(); 

  const goToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <Form
      name="signup"
      onFinish={onFinish}
      layout="vertical"
    >
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
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
      <Form.Item>
        <span>Don't have an account? </span>
        <Link onClick={goToSignup}>
          Register Here!
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
