import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, fetchPermissions, addPermission, togglePermissionForRole } from '../../redux/slices/permissionSlice';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TextField } from '@mui/material';

const PermissionsMatrix = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data);
  const permissions = useSelector((state) => state.roles.permissions);
  const [newPermission, setNewPermission] = useState('');

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handlePermissionToggle = (roleId, permissionId) => {
    // Dispatch an action to toggle the permission for the role
    dispatch(togglePermissionForRole({ roleId, permissionId }));
  };

  const handlePermissionCreate = () => {
    if (newPermission.trim()) {
      // Dispatch an action to add the new permission
      dispatch(addPermission({ name: newPermission }));
      setNewPermission('');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>Permissions Matrix</Typography>

      {/* Permission Creation Form */}
      <Box mb={3}>
        <TextField
          label="New Permission"
          variant="outlined"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handlePermissionCreate} sx={{ mt: 2 }}>
          Add Permission
        </Button>
      </Box>

      {/* Permissions Matrix Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {permissions.map((permission) => (
              <TableCell key={permission.id}>{permission.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              {permissions.map((permission) => (
                <TableCell key={permission.id}>
                  <Checkbox
                    checked={role.permissions.some((p) => p.id === permission.id)}
                    onChange={() => handlePermissionToggle(role.id, permission.id)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PermissionsMatrix;
