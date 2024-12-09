import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';

const AddRoleModal = ({ open, onClose, onSubmit, editRole }) => {
  const [formData, setFormData] = useState({ name: '', permissions: [] });
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [errors, setErrors] = useState({ name: '', permissions: '' });

  // Fetch permissions from API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/permissions'); // Replace with your API URL
        setAvailablePermissions(response.data);
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      }
    };
    fetchPermissions();
  }, []);

  useEffect(() => {
    // Initialize form data when editing
    if (editRole) {
      setFormData(editRole);
    } else {
      setFormData({ name: '', permissions: [] });
    }
  }, [editRole]);

  const handlePermissionChange = (permission) => {
    // Toggle permission in the permissions array
    setFormData((prevData) => {
      const newPermissions = prevData.permissions.includes(permission)
        ? prevData.permissions.filter((p) => p !== permission)
        : [...prevData.permissions, permission];
      return { ...prevData, permissions: newPermissions };
    });
  };

  const handleSubmit = () => {
    // Validation
    let hasError = false;
    const newErrors = { name: '', permissions: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Role Name is required';
      hasError = true;
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Trigger the parent function to handle add/edit role
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="role-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography id="role-modal-title" variant="h5" fontWeight="bold" mb={2}>
          {editRole ? 'Edit Role' : 'Add New Role'}
        </Typography>

        <TextField
          fullWidth
          label="Role Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
          sx={{ mb: 2 }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Permissions
        </Typography>

        <Grid container spacing={1}>
          {availablePermissions.map((permission) => (
            <Grid item xs={6} key={permission}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            </Grid>
          ))}
        </Grid>

        {errors.permissions && (
          <FormHelperText error>{errors.permissions}</FormHelperText>
        )}

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editRole ? 'Update Role' : 'Add Role'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddRoleModal;
