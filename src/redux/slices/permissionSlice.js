import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000';
// Fetch roles from API
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await axios.get('${API_URL}/api/roles');
  return response.data;
});

// Fetch permissions from API
export const fetchPermissions = createAsyncThunk('roles/fetchPermissions', async () => {
  const response = await axios.get('${API_URL}/api/permissions');
  return response.data;
});

// Add new permission to the API
export const addPermission = createAsyncThunk('roles/addPermission', async ({ name }) => {
  const response = await axios.post('${API_URL}/api/permissions', { name });
  return response.data;
});

// Toggle permission for a role (add/remove permission)
export const togglePermissionForRole = createAsyncThunk('roles/togglePermissionForRole', async ({ roleId, permissionId }) => {
  const response = await axios.patch(`${API_URL}/api/roles/${roleId}/permissions`, { permissionId });
  return response.data;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    data: [],
    permissions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })
      .addCase(togglePermissionForRole.fulfilled, (state, action) => {
        const { roleId, permissionId } = action.payload;
        const role = state.data.find(role => role.id === roleId);
        if (role) {
          if (role.permissions.some(permission => permission.id === permissionId)) {
            // Remove the permission if it exists
            role.permissions = role.permissions.filter(permission => permission.id !== permissionId);
          } else {
            // Add the permission if it doesn't exist
            role.permissions.push({ id: permissionId });
          }
        }
      });
  },
});

export default rolesSlice.reducer;
