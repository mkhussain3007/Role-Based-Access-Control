import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser, addUser } from '../../redux/slices/userSlice';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import AddUserModal from './AddUserModal';
import { useNavigate } from 'react-router-dom'; // For navigation

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook
  const users = useSelector((state) => state.users.data);
  const roles = useSelector((state) => state.roles.data);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('active');
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // For add, update, delete actions

  const isLoadingUsers = useSelector((state) => state.users.loading);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUsers()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleUpdateUser = () => {
    setActionLoading(true);
    const updatedUser = {
      ...selectedUser,
      name: updatedName,
      email: updatedEmail,
      role: updatedRole,
      status: updatedStatus,
    };
    dispatch(updateUser(updatedUser))
      .finally(() => setActionLoading(false));
    setOpenModal(false);
  };

  const handleStatusChange = (userId, status) => {
    setActionLoading(true);
    const updatedUser = {
      ...users.find((user) => user.id === userId),
      status: status ? 'active' : 'inactive',
    };
    dispatch(updateUser(updatedUser))
      .finally(() => setActionLoading(false));
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedRole(user.role);
    setUpdatedStatus(user.status);
    setOpenModal(true);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleDeleteUser = () => {
    setActionLoading(true);
    dispatch(deleteUser(selectedUser.id))
      .finally(() => setActionLoading(false));
    setOpenDeleteDialog(false);
  };

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const handleAddUser = (newUser) => {
    setActionLoading(true);
    dispatch(addUser(newUser))
      .finally(() => setActionLoading(false));
    setOpenAddUserModal(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        User Management
      </Typography>
      <Box mb={2} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard')} // Navigate back to the dashboard
        >
          Back to Dashboard
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddUserModal}
          disabled={actionLoading}
        >
          {actionLoading ? <CircularProgress size={24} color="secondary" /> : 'Add New User'}
        </Button>
      </Box>

      {/* Loading Spinner for Users List */}
      {isLoadingUsers || loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.status === 'active'}
                    onChange={(e) => handleStatusChange(user.id, e.target.checked)}
                    name="status"
                    color="primary"
                    disabled={actionLoading}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenModal(user)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <CircularProgress size={24} color="secondary" /> : 'Edit'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(user)}
                    sx={{ ml: 2 }}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <CircularProgress size={24} color="secondary" /> : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit User Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} sx={{ '& .MuiDialog-container': { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
            margin="normal"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary" disabled={actionLoading}>
            {actionLoading ? <CircularProgress size={24} color="secondary" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} sx={{ '& .MuiDialog-container': { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" disabled={actionLoading}>
            {actionLoading ? <CircularProgress size={24} color="secondary" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Modal */}
      <AddUserModal
        open={openAddUserModal}
        onClose={handleCloseAddUserModal}
        handleAddUser={handleAddUser}
        roles={roles}
      />
    </Box>
  );
};

export default UserList;
