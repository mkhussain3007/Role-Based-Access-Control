import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
import { useAuth } from './AuthContext'; // Import AuthContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded credentials for demonstration
    const validUsername = 'admin';
    const validPassword = 'password123';

    if (username === validUsername && password === validPassword) {
      login(); // Update authentication state
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: '#f0f4f8' }}>
        <Grid item xs={12}>
          <Box
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              animation: 'fadeIn 1s ease-out',
            }}
          >
            <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333' }} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" style={{ color: '#888', marginBottom: '20px' }}>
              Please log in to your account.
            </Typography>

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" align="center" style={{ marginBottom: '20px' }}>
                {error}
              </Typography>
            )}

            {/* Username Input */}
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              style={{
                borderRadius: '8px',
                background: '#f5f5f5',
                '& .MuiInputLabel-root': {
                  color: '#2196f3',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#2196f3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />

            {/* Password Input */}
            <TextField
              type="password"
              fullWidth
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              style={{
                borderRadius: '8px',
                background: '#f5f5f5',
                '& .MuiInputLabel-root': {
                  color: '#2196f3',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#2196f3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />

            {/* Login Button */}
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              style={{
                marginTop: '20px',
                borderRadius: '8px',
                padding: '12px',
                background: '#2196f3',
                color: '#fff',
                '&:hover': {
                  background: '#1976d2',
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
