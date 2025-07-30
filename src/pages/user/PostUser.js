import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';

function PostUser() {
  const [user, setUser] = useState({
    userName: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://to-do-list-app-production-a9dd.up.railway.app/public', user,{
        // const response = await axios.post('http://localhost:8080/public', user,{
        headers: {'Content-Type': 'application/json'}
      });
      console.log('User created:', response.data);
      alert('User Created Successfully!');
      setUser({ userName: '', email: '', password: '' });
      const token = response.data;
      login(token);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create User</h2>
          <Form onSubmit={handleSubmit}>

            <Form.Group id="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Create User
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostUser;
