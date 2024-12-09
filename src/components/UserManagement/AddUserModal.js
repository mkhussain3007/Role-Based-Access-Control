import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../../redux/slices/userSlice';
import { fetchRoles } from '../../redux/slices/rolesSlice';
import { Modal, Box, TextField, Button, MenuItem, Typography, IconButton, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Close button icon

const AddUserModal = ({ open, onClose, userToEdit }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    dispatch(fetchRoles());
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        status: userToEdit.status,
      });
    }
  }, [dispatch, userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { name: '', email: '', role: '' };

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.role) {
      errors.role = 'Role is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (userToEdit) {
        dispatch(updateUser({ ...userToEdit, ...formData }));
      } else {
        dispatch(addUser(formData));
      }
      onClose(); // Close the modal after adding/updating user
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-user-modal" aria-describedby="modal-to-add-or-edit-user">
      <Box
        p={3}
        sx={{
          width: '400px',
          margin: 'auto',
          marginTop: '10%',
          background: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#333',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" mb={2} sx={{ fontWeight: 'bold' }}>
          {userToEdit ? 'Edit User' : 'Add New User'}
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          sx={{ background: '#f9f9f9', borderRadius: 1 }}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          sx={{ background: '#f9f9f9', borderRadius: 1 }}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
          sx={{ background: '#f9f9f9', borderRadius: 1 }}
          error={!!formErrors.role}
          helperText={formErrors.role}
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
          value={formData.status}
          onChange={handleChange}
          margin="normal"
          sx={{ background: '#f9f9f9', borderRadius: 1 }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {userToEdit ? 'Save Changes' : 'Add User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
