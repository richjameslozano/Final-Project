import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const Login = ({ onCancel }) => {

  const onFinish = (values) => {
    console.log('Received values:', values);
    onCancel(); // Handle the sign-in logic and form submission
  };

  const navigate = useNavigate(); 

  const goToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div style={{ width: 300, margin: '0 auto', padding: '50px 0' }}> {/* Center the form */}
      <h1 style={{ textAlign: 'center' }}>Sign In</h1> {/* Sign In label */}
      
      <Form
        name="signin"
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
          <Button type="primary" htmlType="submit" block> {/* Full width button */}
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
