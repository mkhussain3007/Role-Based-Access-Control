import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, deleteRole, addRole, updateRole } from '../../redux/slices/rolesSlice';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import AddRoleModal from './AddRoleModal';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RoleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: roles, status, error } = useSelector((state) => state.roles);

  const [openModal, setOpenModal] = useState(false);
  const [editRole, setEditRole] = useState(null); // Holds the role to be edited
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    // Set loading to false after roles are fetched
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  const handleAddEditRole = (role) => {
    if (editRole) {
      dispatch(updateRole(role));
    } else {
      dispatch(addRole(role));
    }
    setOpenModal(false);
    setEditRole(null);
  };

  const handleOpenEditModal = (role) => {
    setEditRole(role);
    setOpenModal(true);
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      dispatch(deleteRole(selectedRole.id));
      setDeleteDialogOpen(false);
      setSelectedRole(null);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Role Management</Typography>

      {/* Flex container for buttons */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Role
        </Button>
      </Box>

      <AddRoleModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditRole(null);
        }}
        onSubmit={handleAddEditRole}
        editRole={editRole}
      />

      {/* Loading effect before content is displayed */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} color="primary" />
        </Box>
      ) : (
        <>
          {status === 'failed' && <p>Error: {error}</p>}

          {/* Table for displaying roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>
                        {role.permissions?.length ? (
                          role.permissions.map((permission, index) => (
                            <Chip key={index} label={permission} color="primary" variant="outlined" sx={{ marginRight: 1 }} />
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No permissions assigned.
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="text" onClick={() => handleOpenEditModal(role)}>
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => {
                            setSelectedRole(role);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the role "{selectedRole?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteRole}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleList;
