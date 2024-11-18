import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../App'; // Import Auth Context

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Use Auth Context
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        toast.success('Login successful! Redirecting to the dashboard...');
        login(response.data.userId); // Update Auth Context
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard after a delay
        }, 2000); // 2-second delay
      } else {
        toast.error(response.data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(
        error.response?.data?.error || 'Error logging in. Please try again.'
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: '98vh', // Use the full height of the viewport
        overflow: 'hidden', // Disable scrolling
        background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
        color: '#fff',
      }}
    >
      <ToastContainer />
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card
          elevation={10}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              background: '#fff',
              textAlign: 'center',
              py: 5,
              px: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              color="primary"
              gutterBottom
              fontWeight="bold"
            >
              Welcome Back to LockBox!
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={4}>
              Please enter your credentials to continue.
            </Typography>
            <Box>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;