import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CircularProgress, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../Login/AuthContext';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(false); // Loading state for button clicks
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State to open/close the logout confirmation dialog
  const [sessionExpired, setSessionExpired] = useState(false); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSessionDialog, setOpenSessionDialog] = useState(false); // Dialog for session expiry warning
  const navigate = useNavigate();

  // Simulate session expiration
  useEffect(() => {
    const sessionTimer = setTimeout(() => {
      setSessionExpired(true);
      setOpenSessionDialog(true); // Show session expiry warning dialog
    }, 9 * 60 * 1000); // 9 minutes (1 minute before actual expiration)

    return () => clearTimeout(sessionTimer);
  }, []);

  // Triggered when logout icon is clicked
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true); // Open the logout confirmation dialog
  };

  // Handle confirmation of logout
  const handleLogoutConfirm = () => {
    setLoading(true); // Set loading state to true
    logout();
    setOpenSnackbar(true);
    setTimeout(() => {
      setLoading(false); // Reset loading state
      navigate('/'); // Redirect after logout
    }, 2000);
  };

  // Handle cancel logout
  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false); // Close the logout confirmation dialog
  };

  // Simulate data fetching for loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s loading simulation
    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box p={4} sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h3"
          mb={3}
          component={motion.div}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ fontWeight: 700 }}
        >
          Welcome to the RBAC Dashboard
        </Typography>
        
        {/* Logout Icon */}
        <PowerSettingsNewIcon
          sx={{
            cursor: 'pointer',
            fontSize: '32px',
            color: '#0077b6',
            '&:hover': {
              color: '#005f8e',
            },
          }}
          onClick={handleLogoutClick}
        />
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Cards Section */}
          <Grid item xs={12} md={4}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              sx={{
                background: '#fff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Manage Users</Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Add, edit, or remove users to manage access.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/users"
                  onClick={() => setLoading(true)} // Set loading when button is clicked
                  sx={{
                    mt: 2,
                    background: '#0077b6',
                    '&:hover': {
                      backgroundColor: '#005f8e',
                    },
                  }}
                >
                  {loading ? 'Loading...' : 'Go to Users'} {/* Show loading text */}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              sx={{
                background: '#fff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Manage Roles</Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Assign roles and define permissions to control access.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/roles"
                  onClick={() => setLoading(true)} // Set loading when button is clicked
                  sx={{
                    mt: 2,
                    background: '#ff7f50',
                    '&:hover': {
                      backgroundColor: '#e7662f',
                    },
                  }}
                >
                  {loading ? 'Loading...' : 'Go to Roles'} {/* Show loading text */}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Session Expiry Dialog */}
      <Dialog
        open={openSessionDialog}
        onClose={() => setOpenSessionDialog(false)}
        aria-labelledby="session-expiry-dialog"
      >
        <DialogTitle id="session-expiry-dialog">Session Expiring Soon</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your session is about to expire in less than a minute. Please save your work.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSessionDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog"
      >
        <DialogTitle id="logout-dialog">Are you sure you want to logout?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            If you log out now, you will need to log in again to access the dashboard.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification for Logout or Session Expiry */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message={sessionExpired ? 'Session expired. Please re-login.' : 'Successfully logged out.'}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Dashboard;
